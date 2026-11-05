resource "aws_acm_certificate" "website" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# ACM demuestra que eres dueño del dominio con un CNAME que hay que publicar en el DNS (aquí, Cloudflare).
# trimsuffix quita el punto final que ACM añade y que Cloudflare no necesita.
resource "cloudflare_dns_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      name    = trimsuffix(dvo.resource_record_name, ".")
      content = trimsuffix(dvo.resource_record_value, ".")
    }
  }

  zone_id = data.cloudflare_zone.website.zone_id
  name    = each.value.name
  type    = "CNAME"
  content = each.value.content
  ttl     = 60
  proxied = false
}

# Espera a que ACM confirme la validación DNS antes de que CloudFront use el certificado.
resource "aws_acm_certificate_validation" "website" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.website.arn

  depends_on = [cloudflare_dns_record.cert_validation]
}
