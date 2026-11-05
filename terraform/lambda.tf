resource "aws_iam_role" "lambda_exec" {
  name = "${var.project_name}-lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# Mínimo privilegio: solo leer e incrementar items de su propia tabla.
resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "${var.project_name}-lambda-dynamodb"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:GetItem", "dynamodb:UpdateItem"]
      Resource = aws_dynamodb_table.visits.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Sin esto Lambda crea el log group sola y guarda los logs para siempre.
resource "aws_cloudwatch_log_group" "visits" {
  name              = "/aws/lambda/${var.project_name}-visits"
  retention_in_days = 14
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../src/lambda/visits.mjs"
  output_path = "${path.module}/lambda_visits.zip"
}

resource "aws_lambda_function" "visits" {
  function_name    = "${var.project_name}-visits"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs22.x"
  handler          = "visits.handler"
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 10
  memory_size      = 128

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visits.name
    }
  }

  depends_on = [aws_cloudwatch_log_group.visits]
}
