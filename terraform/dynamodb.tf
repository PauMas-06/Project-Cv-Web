resource "aws_dynamodb_table" "visits" {
  name         = "${var.project_name}-visits"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "counter_id"

  attribute {
    name = "counter_id"
    type = "S"
  }

  deletion_protection_enabled = true
}
