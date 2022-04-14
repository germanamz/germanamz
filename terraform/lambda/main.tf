locals {
  prefix = "germanamz_com"
}

variable "artifact_version" {
  type = string
}

variable "artifacts_bucket" {
  type = string
}

variable "statements" {
  type = list
}

variable "lambda_name" {
  type = string
}

variable "envs" {
  type = map(string)
}
