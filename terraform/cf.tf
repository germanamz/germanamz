locals {
  origin_static_content = "static_content"
  origin_redirection    = "redirection"
  origin_api            = "api"
}

data "aws_acm_certificate" "cert" {
  domain   = local.domain
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "static_content" {
  enabled = true
  aliases = [local.domain]

  logging_config {
    bucket = aws_s3_bucket.logs.bucket_domain_name
    prefix = "cf/"
  }

  origin {
    domain_name = aws_s3_bucket.static_content.bucket_regional_domain_name
    origin_id   = local.origin_static_content

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.static_content.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = replace(replace(aws_api_gateway_stage.live.invoke_url, "/${aws_api_gateway_stage.live.stage_name}", ""), "https://", "")
    origin_id   = local.origin_api
    origin_path = "/${aws_api_gateway_stage.live.stage_name}"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2", "TLSv1.1", "TLSv1"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.origin_static_content
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern           = "/"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.origin_api
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    forwarded_values {
      query_string = true
      headers      = ["Accept", "Origin", "Referer"]
      cookies {
        forward = "all"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern           = "/_error"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.origin_api
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    forwarded_values {
      query_string = true
      headers      = ["Accept", "Origin", "Referer"]
      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }

  depends_on = [aws_cloudfront_origin_access_identity.static_content]
}

resource "aws_cloudfront_origin_access_identity" "static_content" {
  comment = "Just the static content"

  depends_on = [aws_s3_bucket.static_content]
}

resource "aws_cloudfront_distribution" "redirection" {
  enabled = true
  aliases = [local.wwwDomain]

  origin {
    domain_name = aws_s3_bucket.redirection.website_endpoint
    origin_id   = local.origin_redirection

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2", "TLSv1.1", "TLSv1"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.origin_redirection
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }

  depends_on = [aws_cloudfront_origin_access_identity.redirection]
}

resource "aws_cloudfront_origin_access_identity" "redirection" {
  comment = "Just the redirection"

  depends_on = [aws_s3_bucket.redirection]
}
