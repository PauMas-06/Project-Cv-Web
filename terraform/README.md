# Infraestructura (Terraform)

## Requisitos previos

1. Cuenta AWS personal con un usuario administrador y MFA, configurado en la AWS CLI (perfil por
   defecto, o el que indiques con `AWS_PROFILE`). Comprobar con `aws sts get-caller-identity`.
2. Dominio `paumassales.dev` comprado en **Cloudflare**. Cloudflare Registrar obliga a usar sus
   nameservers, así que el DNS se queda en Cloudflare (no se usa Route 53).
3. Un **API token de Cloudflare** limitado: My Profile → API Tokens → Create Token → plantilla
   "Edit zone DNS" (incluye leer la zona y editar sus registros) → solo para la zona `paumassales.dev`.
   Antes del primer `apply`, la zona no debe tener ya registros A/AAAA/CNAME para el dominio ni para `www`.
   Se pasa por entorno, nunca en un fichero:
   `export CLOUDFLARE_API_TOKEN=...`
4. Terraform >= 1.10.

## 1. Crear el bucket del state (una sola vez)

Terraform guarda el estado de la infraestructura en S3. Ese bucket no lo gestiona Terraform
(sería el huevo y la gallina), así que se crea a mano:

```bash
aws s3api create-bucket --bucket paumassales-terraform-state --region eu-west-1 \
  --create-bucket-configuration LocationConstraint=eu-west-1
aws s3api put-bucket-versioning --bucket paumassales-terraform-state \
  --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket paumassales-terraform-state \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## 2. Desplegar la infraestructura

```bash
cp terraform.tfvars.example terraform.tfvars   # y rellenar los valores
# github_owner_id y github_repo_id: campos owner.id e id de https://api.github.com/repos/<usuario>/<repo>
terraform init
terraform plan
terraform apply
```

La primera vez tarda ~10-15 min (validación del certificado y propagación de CloudFront).
Terraform crea en Cloudflare los CNAME de validación del certificado y los del dominio y `www`.

## 3. Conectar GitHub Actions

En GitHub → Settings → Secrets and variables → Actions → **Variables**, crear con los outputs:

| Variable | Output de Terraform |
|---|---|
| `AWS_ROLE_ARN` | `github_deploy_role_arn` |
| `S3_BUCKET` | `s3_bucket_name` |
| `CF_DISTRIBUTION_ID` | `cloudfront_distribution_id` |

No hace falta ningún secreto: la autenticación es por OIDC. A partir de aquí, cada push a `main` despliega la web.
