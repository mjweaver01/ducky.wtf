# 🦆 ducky.wtf - Production Domain Configuration

## Domain Setup

Your production domain is: **ducky.wtf**

### DNS Configuration

1. **Main Domain** (`ducky.wtf`):
   - Points to: ALB (Application Load Balancer)
   - Handles: Main website, API, tunnel server

2. **Wildcard** (`*.ducky.wtf`):
   - Points to: Same ALB
   - Handles: All tunnel subdomains (e.g., `abc123.ducky.wtf`)

3. **Staging** (`staging.ducky.wtf`):
   - Points to: Staging ALB
   - For testing before production

## Terraform Configuration

Already configured in:
- `terraform/environments/production.tfvars` → `ducky.wtf`
- `terraform/environments/staging.tfvars` → `staging.ducky.wtf`

## SSL Certificates

AWS Certificate Manager (ACM) will automatically provision:
- `ducky.wtf`
- `*.ducky.wtf`

Validation via DNS (CNAME records added by Terraform).

## Example URLs

### Production:
- **Web UI**: https://ducky.wtf
- **API**: https://ducky.wtf/api
- **WebSocket**: wss://ducky.wtf:3001
- **Tunnels**: https://[random].ducky.wtf

### Staging:
- **Web UI**: https://staging.ducky.wtf
- **Tunnels**: https://[random].staging.ducky.wtf

## Route 53 Setup

```bash
# Get your hosted zone ID
aws route53 list-hosted-zones --query 'HostedZones[?Name==`ducky.wtf.`].Id' --output text

# After terraform apply, it will create:
# - A record: ducky.wtf → ALB
# - A record: *.ducky.wtf → ALB
# - CNAME records for ACM validation
```

## Usage Examples

### CLI:
```bash
# Production
ducky http 3000 --token YOUR_TOKEN --server ducky.wtf

# Staging
ducky http 3000 --token YOUR_TOKEN --server staging.ducky.wtf
```

### Web UI:
```bash
# Production
open https://ducky.wtf

# Staging
open https://staging.ducky.wtf
```

## Nameservers

Make sure `ducky.wtf` is pointed to Route 53 nameservers at your domain registrar.

Get nameservers:
```bash
aws route53 get-hosted-zone --id /hostedzone/YOUR_ZONE_ID \
  --query 'DelegationSet.NameServers' --output table
```

Then update at your registrar (e.g., Namecheap, GoDaddy, etc.).

---

**Status**: Domain configured for production deployment! 🦆
