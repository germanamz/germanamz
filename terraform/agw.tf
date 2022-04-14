resource "aws_api_gateway_rest_api" "api" {
  name = local.domain
}

resource "aws_api_gateway_method" "get_index" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_integration" "index" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_rest_api.api.root_resource_id
  http_method             = aws_api_gateway_method.get_index.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.lambda_index.lambda_invoke_arn
}

resource "aws_lambda_permission" "index" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_index.lambda_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.get_index.http_method}/"
}

resource "aws_api_gateway_resource" "_error" {
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "_error"
  rest_api_id = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_method" "get__error" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource._error.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_integration" "_error" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource._error.id
  http_method             = aws_api_gateway_method.get__error.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.lambda__error.lambda_invoke_arn
}

resource "aws_lambda_permission" "_error" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda__error.lambda_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.get__error.http_method}${aws_api_gateway_resource._error.path}"
}

resource "aws_api_gateway_deployment" "live" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([module.lambda__error.code_hash, module.lambda_index.code_hash]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "live" {
  deployment_id = aws_api_gateway_deployment.live.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "live"
}
