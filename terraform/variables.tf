variable "project_name" {
  description = "Prefijo para el nombre de los recursos"
  type        = string
  default     = "paumassales"
}

variable "aws_region" {
  description = "Región principal de AWS"
  type        = string
  default     = "eu-west-1"
}

variable "domain_name" {
  description = "Dominio raíz, registrado y con el DNS en Cloudflare (ej: paumassales.dev)"
  type        = string
}

variable "github_repo" {
  description = "Repositorio GitHub en formato usuario/repo"
  type        = string
}

variable "budget_alert_email" {
  description = "Email que recibe las alertas de presupuesto"
  type        = string
}
