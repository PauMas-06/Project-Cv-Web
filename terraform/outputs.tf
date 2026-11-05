output "website_url" {
  description = "URL pública de la web"
  value       = "https://${var.domain_name}"
}

output "s3_bucket_name" {
  description = "Variable de GitHub S3_BUCKET"
  value       = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  description = "Variable de GitHub CF_DISTRIBUTION_ID"
  value       = aws_cloudfront_distribution.website.id
}

output "github_deploy_role_arn" {
  description = "Variable de GitHub AWS_ROLE_ARN"
  value       = aws_iam_role.github_actions_deploy.arn
}
