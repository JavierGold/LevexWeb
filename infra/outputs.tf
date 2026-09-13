output "api_endpoint" {
  description = "Base URL of the LEVEX contact HTTP API."
  value       = aws_apigatewayv2_api.contact.api_endpoint
}

output "contact_endpoint" {
  description = "POST endpoint consumed by the React contact form."
  value       = "${aws_apigatewayv2_api.contact.api_endpoint}/contact"
}

output "lambda_function_name" {
  description = "Name of the contact form Lambda function."
  value       = aws_lambda_function.contact.function_name
}
