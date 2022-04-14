resource "aws_s3_bucket" "static_content" {
  bucket              = local.domain
  object_lock_enabled = false
}

resource "aws_s3_bucket_policy" "static_content" {
  bucket = aws_s3_bucket.static_content.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = {
      Effect    = "Allow"
      Principal = {
        AWS = aws_cloudfront_origin_access_identity.static_content.iam_arn
      }
      Action   = "s3:GetObject"
      Resource = "${aws_s3_bucket.static_content.arn}/*"
    }
  })
}

resource "aws_s3_bucket" "redirection" {
  bucket              = local.wwwDomain
  object_lock_enabled = false
}

resource "aws_s3_bucket_policy" "redirection" {
  bucket = aws_s3_bucket.redirection.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = {
      Effect    = "Allow"
      Principal = {
        AWS = aws_cloudfront_origin_access_identity.redirection.iam_arn
      }
      Action   = "s3:GetObject"
      Resource = "${aws_s3_bucket.redirection.arn}/*"
    }
  })
}

resource "aws_s3_bucket_website_configuration" "redirection" {
  bucket = aws_s3_bucket.redirection.bucket
  redirect_all_requests_to {
    host_name = local.domain
    protocol  = "https"
  }
}
