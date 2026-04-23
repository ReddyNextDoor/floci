# provider.tf
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    apigateway   = "http://localhost:4566"
    lambda       = "http://localhost:4566"
    rds          = "http://localhost:4566"
    elasticache  = "http://localhost:4566"
    iam          = "http://localhost:4566"
    sts          = "http://localhost:4566"
    cloudwatch   = "http://localhost:4566"
  }
}

# -- Tier 7: Database (RDS PostgreSQL) --
resource "aws_db_instance" "tenant_db" {
  identifier        = "finops-saas-db"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.micro"
  allocated_storage = 5
  username          = "admin"
  password          = "password123"
  skip_final_snapshot = true
}

# -- Tier 6: Cache (ElastiCache Redis) --
resource "aws_elasticache_cluster" "metrics_cache" {
  cluster_id           = "finops-metrics-cache"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}

# -- Tier 2: API Gateway (v2) --
resource "aws_apigatewayv2_api" "api" {
  name          = "finops-saas-api"
  protocol_type = "HTTP"
}
