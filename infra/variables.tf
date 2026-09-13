variable "aws_region" {
  description = "AWS region where the contact form infrastructure is deployed."
  type        = string
  default     = "us-east-1"
}

variable "sender_email" {
  description = "Verified Amazon SES identity used as the From address."
  type        = string
  default     = "567498jav@gmail.com"

  validation {
    condition     = can(regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", var.sender_email))
    error_message = "sender_email must be a valid email address."
  }
}

variable "recipient_email" {
  description = "Address that receives LEVEX contact submissions."
  type        = string
  default     = "567498jav@gmail.com"

  validation {
    condition     = can(regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", var.recipient_email))
    error_message = "recipient_email must be a valid email address."
  }
}

variable "allowed_origins" {
  description = "Browser origins allowed to call the contact API. Add CloudFront in Phase 10."
  type        = list(string)
  default     = ["http://localhost:5173"]

  validation {
    condition     = length(var.allowed_origins) > 0 && alltrue([for origin in var.allowed_origins : can(regex("^https?://", origin))])
    error_message = "allowed_origins must contain at least one HTTP or HTTPS origin."
  }
}

variable "project_name" {
  description = "Prefix used for AWS resource names and tags."
  type        = string
  default     = "levex-contact"
}
