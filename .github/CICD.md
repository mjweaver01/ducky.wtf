# CI/CD Setup

This project uses GitHub Actions for continuous deployment to Railway.

## Workflow Overview

### On Pull Request

- Build and lint checks
- Run E2E tests (`test-e2e.sh`)
- Test all three Docker image builds (tunnel-server, web-backend, web-frontend)

### On Push to Master

1. **Build & Test** — Full E2E test suite
2. **Deploy** — Deploy all three Railway services in sequence
3. **Notify** — Report deployment status

## Initial Setup

### 1. Create a Railway Token

1. Go to [railway.app](https://railway.app) → **Account Settings** → **Tokens**.
2. Click **New Token**, name it `github-actions`, copy the value.

### 2. Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**.

Add:

```
RAILWAY_TOKEN=<token from step 1>
```

### 3. Link Services in Railway

Each service in Railway must be linked to your GitHub repo and configured with the correct Dockerfile path:

| Service | Dockerfile |
|---|---|
| `tunnel-server` | `Dockerfile` |
| `web-backend` | `Dockerfile.web-backend` |
| `web-frontend` | `Dockerfile.web-frontend` |

The Railway CLI uses the service name to target the correct service during deployment.

## Usage

### Automatic Deployment

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin master

# CI/CD automatically:
# 1. Runs tests
# 2. Deploys all three Railway services
```

### Manual Deployment Trigger

```bash
# Trigger deployment from GitHub UI:
# Actions → Deploy to Railway → Run workflow
```

### View Deployment Status

```bash
# GitHub UI: Actions tab shows progress

# Or via CLI
gh run list --workflow=deploy.yml --limit 5
gh run view <run-id>
```

### Rollback

```bash
# Option 1: Revert commit and push
git revert HEAD
git push origin master

# Option 2: Railway dashboard → service → Deployments → redeploy a previous build

# Option 3: Railway CLI
railway rollback --service tunnel-server
```

## Monitoring Deployments

### Check Deployment Status

```bash
# Railway CLI
railway status --service tunnel-server
railway logs --service tunnel-server

# Check all services
railway status
```

### Health Checks After Deploy

```bash
# API health
curl https://api.ducky.wtf/health

# Tunnel server metrics
curl https://tunnel.ducky.wtf/metrics

# Frontend loads
curl -I https://ducky.wtf
```

## Troubleshooting

### Deployment Failed at Build/Test

```bash
# Check GitHub Actions logs
gh run view <run-id>

# Common fixes:
# - npm ci failed: Update package-lock.json
# - Build failed: Fix TypeScript errors locally with npm run build
# - Tests failed: Run ./test-e2e.sh locally and fix
```

### Deployment Failed at Railway

```bash
# Check Railway logs for the failing service
railway logs --service tunnel-server

# Re-trigger deployment manually
railway up --service tunnel-server
```

### Service Not Starting After Deploy

```bash
# Check environment variables are set in Railway dashboard
# Common missing vars:
# - DATABASE_URL (must be linked from Postgres plugin)
# - JWT_SECRET / SESSION_SECRET (web-backend)
# - BASE_DOMAIN (tunnel-server)
```

## Security Best Practices

1. Store all secrets in GitHub Secrets — never in code
2. Enable branch protection on master
3. Require PR reviews before merge
4. Rotate `RAILWAY_TOKEN` periodically
5. Use Railway's environment variable reference feature (not hardcoded values)

## Cost Considerations

CI/CD adds minimal cost:
- GitHub Actions: Free for public repos, ~$0.008/minute for private
- Railway deployments: Included in usage — each deploy builds a new Docker image and replaces the running container

**Estimated CI/CD cost**: Negligible beyond normal Railway usage

## Advanced Configuration

### Per-Environment Deployment

To deploy to separate Railway environments (e.g. staging vs production):

```yaml
- name: Deploy to staging
  run: railway up --service tunnel-server --environment staging
  env:
    RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Skip Deploy on Docs-Only Changes

```yaml
on:
  push:
    branches:
      - master
    paths-ignore:
      - 'docs/**'
      - '*.md'
```

---

**Status**: CI/CD configured for Railway

Push to master branch to trigger automatic deployment.
