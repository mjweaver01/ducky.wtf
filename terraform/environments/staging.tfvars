aws_region    = "us-east-1"
project_name  = "ducky-staging"
tunnel_domain = "staging.ducky.wtf"

# Use comma-separated tokens (will be stored in Secrets Manager)
valid_tokens_list = ["staging-token-1", "staging-token-2"]

# Smaller resources for staging
task_cpu      = "256"
task_memory   = "512"
desired_count = 1

# Docker image (override with actual image during apply)
docker_image = "placeholder"
