# El dominio está registrado en Cloudflare Registrar, que obliga a usar sus nameservers.
# Por eso el DNS vive en Cloudflare y no en Route 53. Leemos la zona que ya existe.
data "cloudflare_zone" "website" {
  filter = {
    name = var.domain_name
  }
}

locals {
  site_hostnames = [var.domain_name, "www.${var.domain_name}"]
}

# Apex y www apuntan a CloudFront. Cloudflare permite un CNAME en el dominio raíz (CNAME flattening).
# proxied = false: solo DNS, sin poner el CDN de Cloudflare delante del de AWS. ttl = 1 significa "automático".
resource "cloudflare_dns_record" "site" {
  for_each = toset(local.site_hostnames)

  zone_id = data.cloudflare_zone.website.zone_id
  name    = each.value
  type    = "CNAME"
  content = aws_cloudfront_distribution.website.domain_name
  ttl     = 1
  proxied = false
}
