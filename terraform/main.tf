terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  # El bucket del state se crea a mano una sola vez (ver terraform/README.md).
  # use_lockfile bloquea el state con un fichero .tflock en S3 (no hace falta DynamoDB).
  backend "s3" {
    bucket       = "paumassales-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "terraform"
    }
  }
}

# CloudFront solo acepta certificados ACM de us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "terraform"
    }
  }
}

# El token se pasa por la variable de entorno CLOUDFLARE_API_TOKEN (nunca en un fichero).
provider "cloudflare" {}

data "aws_caller_identity" "current" {}
