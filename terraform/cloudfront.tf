resource "aws_cloudfront_origin_access_control" "s3" {
  name                              = "${var.project_name}-s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Se ejecuta en cada petición antes de llegar a S3:
#  - www.dominio  -> 301 a dominio
#  - /            -> 301 a /es/, /en/ o /ca/ según el idioma del navegador
#  - /es/cv/      -> /es/cv/index.html (S3 vía OAC no resuelve index.html en subcarpetas)
resource "aws_cloudfront_function" "rewrite" {
  name    = "${var.project_name}-rewrite"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var host = request.headers.host ? request.headers.host.value : '';
      var uri = request.uri;

      if (host.indexOf('www.') === 0) {
        return redirect('https://' + host.substring(4) + uri);
      }

      if (uri === '/') {
        var accept = request.headers['accept-language'] ? request.headers['accept-language'].value : '';
        var lang = 'es';
        if (accept.indexOf('ca') === 0) lang = 'ca';
        else if (accept.indexOf('en') === 0) lang = 'en';
        return redirect('/' + lang + '/');
      }

      if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
      } else if (uri.lastIndexOf('.') < uri.lastIndexOf('/')) {
        request.uri = uri + '/index.html';
      }

      return request;
    }

    function redirect(location) {
      return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: { location: { value: location } }
      };
    }
  EOF
}

# Cabeceras de seguridad declarativas (sin código).
resource "aws_cloudfront_response_headers_policy" "security" {
  name = "${var.project_name}-security-headers"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      override                   = true
    }

    content_type_options {
      override = true
    }

    # SAMEORIGIN (y no DENY) para que el visor del CV pueda incrustar los PDFs propios.
    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    content_security_policy {
      content_security_policy = join("; ", [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "frame-ancestors 'self'",
      ])
      override = true
    }
  }
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

# Reenvía query strings y cabeceras a API Gateway, excepto Host (API Gateway necesita el suyo).
data "aws_cloudfront_origin_request_policy" "all_viewer_except_host" {
  name = "Managed-AllViewerExceptHostHeader"
}

locals {
  s3_origin_id  = "s3-website"
  api_origin_id = "api-gateway-visits"
}

resource "aws_cloudfront_distribution" "website" {
  comment         = "${var.project_name} portfolio"
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"
  aliases         = local.site_hostnames

  origin {
    origin_id                = local.s3_origin_id
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3.id
  }

  origin {
    origin_id   = local.api_origin_id
    domain_name = replace(aws_apigatewayv2_api.visits.api_endpoint, "https://", "")

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    target_origin_id           = local.s3_origin_id
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite.arn
    }
  }

  # Mismo dominio para la web y la API: no hace falta CORS.
  ordered_cache_behavior {
    path_pattern               = "/api/*"
    target_origin_id           = local.api_origin_id
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_disabled.id
    origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.all_viewer_except_host.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id
  }

  # S3 devuelve 403 (no 404) cuando un objeto no existe, porque CloudFront no tiene s3:ListBucket.
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.website.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
