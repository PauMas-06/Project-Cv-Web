# Sin bloque CORS: el navegador llama a /api/* en el mismo dominio a través de CloudFront.
resource "aws_apigatewayv2_api" "visits" {
  name          = "${var.project_name}-visits-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.visits.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 5
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.visits.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visits.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_visits" {
  api_id    = aws_apigatewayv2_api.visits.id
  route_key = "GET /api/visits"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_visits" {
  api_id    = aws_apigatewayv2_api.visits.id
  route_key = "POST /api/visits"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visits.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.visits.execution_arn}/*/*"
}
