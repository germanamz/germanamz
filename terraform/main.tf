locals {
  domain = "germanamz.com"
  wwwDomain = "www.germanamz.com"
  prefix = "germanamz_com"
}

variable "artifact_version" {
  type = string
}

variable "artifacts_bucket" {
  type = string
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

module "edge_next-image-uri" {
  source = "./lambda"
  lambda_name = "next-image-uri"
  artifacts_bucket = var.artifacts_bucket
  artifact_version = var.artifact_version
  envs = {}
  statements = []
}

module "lambda__error" {
  source = "./lambda"
  lambda_name = "_error"
  artifacts_bucket = var.artifacts_bucket
  artifact_version = var.artifact_version
  envs = {}
  statements = []
}

module "lambda_index" {
  source = "./lambda"
  lambda_name = "index"
  artifacts_bucket = var.artifacts_bucket
  artifact_version = var.artifact_version
  envs = {
    TWITTER_BEARER = var.twitter_bearer
  }
  statements = []
}

terraform {
  backend "s3" {
    key = "germanamz.com"
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.8.0"
    }
  }
}

provider "aws" {
  # Configuration options
}
