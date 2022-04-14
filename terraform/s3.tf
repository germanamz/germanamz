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

resource "aws_s3_bucket" "logs" {
  bucket = "${local.domain}-cf-logs"
}

resource "aws_s3_bucket_acl" "logs" {
  bucket = aws_s3_bucket.logs.id
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.bucket
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_logging" "example" {
  bucket = aws_s3_bucket.logs.id

  target_bucket = aws_s3_bucket.logs.id
  target_prefix = ""
}
