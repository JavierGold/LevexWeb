data "aws_caller_identity" "current" {}

data "archive_file" "contact_lambda" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.mjs"
  output_path = "${path.module}/contact-lambda.zip"
}

locals {
  lambda_name = "${var.project_name}-handler"
  common_tags = {
    Project   = "LEVEX"
    ManagedBy = "Terraform"
    Phase     = "9"
  }
}

resource "aws_cloudwatch_log_group" "contact_lambda" {
  name              = "/aws/lambda/${local.lambda_name}"
  retention_in_days = 14
  tags              = local.common_tags
}

resource "aws_iam_role" "contact_lambda" {
  name = "${var.project_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "contact_lambda" {
  name = "${var.project_name}-lambda-policy"
  role = aws_iam_role.contact_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "WriteFunctionLogs"
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Resource = "${aws_cloudwatch_log_group.contact_lambda.arn}:*"
      },
      {
        Sid      = "SendContactEmail"
        Effect   = "Allow"
        Action   = "ses:SendEmail"
        Resource = "arn:aws:ses:${var.aws_region}:${data.aws_caller_identity.current.account_id}:identity/${var.sender_email}"
      },
    ]
  })
}

resource "aws_lambda_function" "contact" {
  function_name = local.lambda_name
  description   = "Validates LEVEX contact submissions and sends them through Amazon SES."
  role          = aws_iam_role.contact_lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs22.x"
  architectures = ["arm64"]

  filename         = data.archive_file.contact_lambda.output_path
  source_code_hash = data.archive_file.contact_lambda.output_base64sha256

  memory_size = 128
  timeout     = 10

  environment {
    variables = {
      ALLOWED_ORIGINS = join(",", var.allowed_origins)
      RECIPIENT_EMAIL = var.recipient_email
      SENDER_EMAIL    = var.sender_email
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.contact_lambda,
    aws_iam_role_policy.contact_lambda,
  ]

  tags = local.common_tags
}

resource "aws_apigatewayv2_api" "contact" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["content-type"]
    allow_methods = ["POST", "OPTIONS"]
    allow_origins = var.allowed_origins
    max_age       = 3600
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 2
  }

  tags = local.common_tags
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowContactHttpApi"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*"
}
