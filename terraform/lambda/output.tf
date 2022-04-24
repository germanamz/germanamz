output "lambda_arn" {
  value = aws_lambda_function.lambda.arn
}

output "lambda_qualified_arn" {
  value = aws_lambda_function.lambda.qualified_arn
}

output "lambda_invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}

output "lambda_role_id" {
  value = aws_iam_role.role.id
}

output "lambda_role_arn" {
  value = aws_iam_role.role.arn
}

output "lambda_name" {
  value = aws_lambda_function.lambda.function_name
}

output "code_hash" {
  value = data.aws_s3_object.artifact_checksum.body
}
