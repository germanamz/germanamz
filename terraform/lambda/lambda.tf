resource "aws_iam_role" "role" {
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Action    = "sts:AssumeRole",
        Principal = {
          Service = [
            "lambda.amazonaws.com",
            "edgelambda.amazonaws.com"
          ]
        },
        Effect = "Allow"
      }
    ]
  })
}

resource "aws_iam_role_policy" "role_policy" {
  role   = aws_iam_role.role.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = concat([
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
        Effect   = "Allow"
      }
    ], var.statements)
  })
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.prefix}-${var.lambda_name}"
  retention_in_days = 14
}

resource "aws_lambda_function" "lambda" {
  function_name    = "${local.prefix}-${var.lambda_name}"
  role             = aws_iam_role.role.arn
  handler          = "index.handler"
  s3_bucket        = var.artifacts_bucket
  s3_key           = data.aws_s3_object.artifact.key
  runtime          = "nodejs16.x"
  publish          = true
  source_code_hash = data.aws_s3_object.artifact_checksum.body

  dynamic "environment" {
    for_each = length(keys(var.envs)) > 0 ? [var.envs] : []
    content {
      variables = var.envs
    }
  }
}

data "aws_s3_object" "artifact" {
  bucket = var.artifacts_bucket
  key    = "${local.prefix}/${var.artifact_version}/lambdas/${var.lambda_name}.zip"
}

data "aws_s3_object" "artifact_checksum" {
  bucket = var.artifacts_bucket
  key    = "${local.prefix}/${var.artifact_version}/lambdas/${var.lambda_name}.zip.checksum"
}
