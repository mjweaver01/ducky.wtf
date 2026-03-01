# Step-by-step: Get ducky live on AWS

This guide walks through deploying the tunnel server to AWS so it’s live with HTTPS and (optional) UI-granted keys.

---

## Step 1: Prerequisites

- **AWS account** and CLI configured (`aws sts get-caller-identity` works).
- **Terraform** ≥ 1.0 (`terraform version`).
- **Domain** you control for tunnel URLs (e.g. `ducky.wtf`). You’ll add DNS records in a later step.
- **Docker** (to build and push the image).

---

## Step 2: Create an ECR repository (if you don’t have one)

```bash
aws ecr create-repository --repository-name ducky --region us-east-1
```

Note the **repository URI** (e.g. `123456789012.dkr.ecr.us-east-1.amazonaws.com/ducky`). You’ll use it as `docker_image` and to push the image.

---

## Step 3: Build and push the Docker image

From the repo root:

```bash
# Build
docker build -t ducky:latest -f Dockerfile .

# Tag for ECR (replace with your account ID and region)
docker tag ducky:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/ducky:latest

# Log in to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Push
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/ducky:latest
```

Use the same URI (with `:latest` or your tag) as `docker_image` in Terraform.

---

## Step 4: Configure Terraform variables

**Option A – Use the production tfvars file**

```bash
cd terraform
cp environments/production.tfvars terraform.tfvars
```

Edit `terraform.tfvars`:

- Set **`tunnel_domain`** to your domain (e.g. `ducky.wtf`).
- Set **`docker_image`** to your full ECR image URI (e.g. `123456789012.dkr.ecr.us-east-1.amazonaws.com/ducky:latest`).
- Set **`database_username`** (e.g. `ducky_admin`).
- **Do not put the real DB password in the file.** Use an env var or `-var` (see below).

**Option B – Use your own tfvars**

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit all required values: `tunnel_domain`, `docker_image`, and either `use_database_auth` + `database_username` or `valid_tokens`.

**Set the database password (when using database auth)**

```bash
export TF_VAR_database_password="your-secure-password"
```

Or pass it on the command line (don’t commit it):

```bash
terraform apply -var-file=terraform.tfvars -var="database_password=your-secure-password"
```

---

## Step 5: Initialize and apply Terraform

```bash
cd terraform
terraform init
terraform plan -var-file=terraform.tfvars
# Fix any errors, then:
terraform apply -var-file=terraform.tfvars
```

If you’re not using a `terraform.tfvars` file:

```bash
terraform plan -var-file=environments/production.tfvars -var="docker_image=YOUR_ECR_URI" -var="database_password=YOUR_PASSWORD"
terraform apply -var-file=environments/production.tfvars -var="docker_image=YOUR_ECR_URI" -var="database_password=YOUR_PASSWORD"
```

Type `yes` when prompted. Wait for the apply to finish (VPC, ALB, NLB, ECS, RDS if enabled, etc.).

---

## Step 6: Create DNS records

Terraform will output what you need. Run:

```bash
terraform output certificate_validation_records
terraform output alb_dns_name
terraform output tunnel_nlb_dns_name   # if using tunnel subdomain
```

**6a. Certificate validation (required for HTTPS)**

In your DNS provider, create the **CNAME** records shown in `certificate_validation_records` (one per domain, e.g. `_xxx.ducky.wtf` and `_xxx.*.ducky.wtf`).  
Wait until ACM shows the certificate as **Issued** (can take 5–30 minutes). You can check in the AWS Console → Certificate Manager.

**6b. ALB (HTTPS traffic)**

Create:

- **Name:** `tunnel_domain` (e.g. `ducky.wtf`) → **Type:** CNAME → **Value:** `alb_dns_name` from output.
- **Name:** `*.tunnel_domain` (e.g. `*.ducky.wtf`) → **Type:** CNAME → **Value:** same ALB DNS name.

**6c. NLB (WebSocket / CLI)**

If you use a tunnel subdomain (e.g. `tunnel_subdomain = "tunnel"`):

- **Name:** `tunnel_subdomain.tunnel_domain` (e.g. `tunnel.ducky.wtf`) → **Type:** CNAME → **Value:** `tunnel_nlb_dns_name` from output.

---

## Step 7: Run database migrations (database auth only)

If you deployed with `use_database_auth = true`, run your schema once RDS is available:

```bash
terraform output -raw rds_endpoint
# Example: ducky-db.xxxx.us-east-1.rds.amazonaws.com:5432
```

Using `psql` (or any Postgres client):

```bash
export PGHOST="ducky-db.xxxx.us-east-1.rds.amazonaws.com"
export PGPORT=5432
export PGDATABASE=ducky
export PGUSER=ducky_admin   # or whatever you set as database_username
export PGPASSWORD="your-secure-password"

psql -f database/schema.sql
```

Or use your usual migration tool against that host, port, database, and user.

---

## Step 8: Verify the deployment

**8a. HTTPS and tunnel routing**

After ACM is issued and DNS has propagated:

- Open `https://<tunnel_domain>` (e.g. `https://ducky.wtf`). You may see “No tunnel found” or a 404 until a tunnel is active; that’s expected.
- Optional: `https://<tunnel_domain>/metrics` should return JSON.

**8b. WebSocket (CLI)**

Get the tunnel endpoint:

```bash
terraform output -raw tunnel_endpoint
# e.g. wss://tunnel.ducky.wtf
```

Configure the CLI and start a tunnel (use a token from your UI if using database auth, or a token from `valid_tokens` in legacy mode):

```bash
ducky config add-server-url wss://tunnel.ducky.wtf
ducky config add-authtoken YOUR_TOKEN
ducky http 3000
```

You should see a public URL like `https://xxxx.ducky.wtf`. Visiting it should hit your local service.

---

## Step 9: Optional – Web UI and API

This Terraform stack runs the **tunnel server** only. If you use the Web UI and API (for creating tokens, etc.):

- Deploy the **web backend** and **frontend** separately (e.g. same ECS cluster with another task/service, or another host).
- Point the API at the same RDS endpoint and DB name/user/password.
- Ensure the API’s `WEB_URL` and CORS match your frontend URL.

The tunnel server reads tokens from RDS when `DATABASE_*` is set, so tokens created in the UI work with the CLI once the tunnel server is using that database.

---

## Summary checklist

| Step | Action |
|------|--------|
| 1 | AWS CLI, Terraform, domain, Docker ready |
| 2 | ECR repo created |
| 3 | Image built and pushed to ECR |
| 4 | `terraform.tfvars` (or env) set: domain, docker_image, database_* or valid_tokens |
| 5 | `terraform init` and `terraform apply` |
| 6 | DNS: ACM validation CNAMEs, ALB CNAMEs, NLB CNAME (if used) |
| 7 | Run DB migrations against RDS endpoint (if database auth) |
| 8 | Test HTTPS and CLI tunnel |
| 9 | (Optional) Deploy Web UI/API and point to same RDS |

For more detail on variables and architecture, see [terraform/README.md](../terraform/README.md).
