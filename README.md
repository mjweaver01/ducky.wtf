<img src="packages/web-frontend/public/duck.svg" alt="duck" width="200">

# ducky

Expose local services to the internet with HTTPS.

## Features

- HTTPS with automatic certificates (Railway)
- HTTP tunneling to local services
- Token authentication via database or environment variable
- WebSocket persistent tunnels (single-port, no separate WebSocket port)
- Rate limiting and DoS protection
- Structured logging and metrics
- Railway deployment (3 services + managed Postgres)
- Minimal dependencies (only `ws`)

## Quick Start

### Local Development

```bash
npm install && npm run build

# Start everything (Postgres in Docker + all services)
npm run dev
```

Access:
- **Web UI**: http://localhost:5173
- **API**: http://localhost:3002
- **Tunnel metrics**: http://localhost:3000/metrics

### Start a Tunnel

```bash
# 1. Log in at http://localhost:5173, create an auth token in the dashboard
# 2. Configure the CLI
ducky config add-authtoken YOUR_TOKEN

# 3. Expose a local port
ducky http 3000
```

## CLI Usage

```bash
# Configure
ducky config add-authtoken YOUR_TOKEN
ducky config add-server-url wss://tunnel.ducky.wtf/_tunnel

# Tunnel local port
ducky http 3000

# Tunnel a specific address
ducky http 192.168.1.2:8080

# Request a specific subdomain URL
ducky http 3000 --url https://myapp.ducky.wtf
```

## Architecture

```
Public (HTTPS) → Railway tunnel-server → WebSocket /_tunnel → CLI → Local Service
                          ↓
                    PostgreSQL (Railway)
```

**tunnel-server** (Railway, port 3000):
- HTTP proxy — routes by `Host` header to the right tunnel
- WebSocket registration — CLI connects via `wss://tunnel.ducky.wtf/_tunnel`
- Token validation from PostgreSQL or `VALID_TOKENS` env var
- Rate limiting and metrics

**web-backend** (Railway, port 3002):
- REST API for the dashboard (auth, tokens, tunnels, domains, users)

**web-frontend** (Railway, port 3000):
- React SPA served via `serve -s`

**CLI** (local):
- Opens persistent WebSocket to `/_tunnel`
- Proxies requests to local service

## Configuration

### Server Environment Variables

```bash
# Core
PORT=3000
TUNNEL_DOMAIN=ducky.wtf

# Authentication (choose one)
DATABASE_URL=postgresql://...     # Railway Postgres (recommended)
VALID_TOKENS=token1,token2        # Simple (dev/testing)

# Security Limits
MAX_TUNNELS_PER_TOKEN=5
MAX_CONCURRENT_REQUESTS=100
RATE_LIMIT_MAX_REQUESTS=1000

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/ducky/server.log
```

### Web Backend Environment Variables

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
WEB_URL=https://ducky.wtf          # CORS allowed origin
WEB_PORT=3002
NODE_ENV=production
```

### Security Features

- **Request size limit**: 10MB (prevents DoS)
- **Rate limiting**: 1000 req/min per tunnel
- **Tunnel limits**: 5 tunnels per token
- **Concurrent limits**: 100 requests per tunnel
- **Request timeout**: 30s (configurable)

All limits configurable via environment variables.

## Deployment

### Docker (local)

```bash
# Tunnel server only
docker build -t ducky .
docker run -p 3000:3000 \
  -e TUNNEL_DOMAIN=localhost \
  -e VALID_TOKENS=token1,token2 \
  ducky

# Full dev stack
docker compose -f docker-compose.dev.yml up -d
npm run dev:web-backend
npm run dev:web-frontend
```

### Railway (production)

See **[GETTING_LIVE.md](/docs/GETTING_LIVE.md)** for the complete step-by-step guide.

Three Railway services + managed Postgres:

| Service | Dockerfile | Domain |
|---|---|---|
| `tunnel-server` | `Dockerfile` | `*.ducky.wtf` |
| `web-backend` | `Dockerfile.web-backend` | `api.ducky.wtf` |
| `web-frontend` | `Dockerfile.web-frontend` | `ducky.wtf` |

**Cost**: ~$20–30/month (Railway Hobby + usage + Pro plan for wildcard domain)

## Project Structure

```
ducky/
├── packages/
│   ├── shared/          # TypeScript types
│   ├── database/        # PostgreSQL client + repositories
│   ├── server/          # Tunnel server (HTTP proxy + WebSocket)
│   │   ├── auth.ts          # Token validation (DB or env var)
│   │   ├── tunnel-manager.ts # Tunnel registry + rate limiting
│   │   ├── http-server.ts   # HTTP forwarding + WebSocket upgrade
│   │   ├── tunnel-server.ts # WebSocket CLI registration
│   │   ├── logger.ts        # Structured logging
│   │   └── metrics.ts       # Metrics collection
│   ├── web-backend/     # Express REST API
│   ├── web-frontend/    # React + Vite SPA
│   └── cli/             # CLI agent
├── Dockerfile               # tunnel-server image
├── Dockerfile.web-backend   # web-backend image
├── Dockerfile.web-frontend  # web-frontend image (serve -s)
├── railway.toml             # Railway service config
├── docker-compose.yml       # Tunnel server only (CI / minimal)
├── docker-compose.dev.yml   # Development (Postgres + server in Docker)
└── database/schema.sql      # PostgreSQL schema
```

## Limits

| Feature | Limit | Configurable |
|---------|-------|--------------|
| Request size | 10MB | No |
| Rate limit | 1000/min | `RATE_LIMIT_MAX_REQUESTS` |
| Tunnels per token | 5 | `MAX_TUNNELS_PER_TOKEN` |
| Concurrent requests | 100 | `MAX_CONCURRENT_REQUESTS` |
| Request timeout | 30s | `REQUEST_TIMEOUT` |

## Observability

### Structured Logging

```json
{
  "timestamp": "2026-03-01T10:00:00.000Z",
  "level": "info",
  "message": "Tunnel registered",
  "metadata": { "tunnelId": "abc123", "url": "https://abc123.ducky.wtf" }
}
```

### Metrics (auto-logged every 5 min)

```
Metrics Summary
Tunnels:      Active: 5, Total: 12
Requests:     Total: 1543, Succeeded: 1520, Failed: 23
Performance:  Avg: 45ms, P95: 120ms, P99: 250ms
```

Metrics also available live at `/metrics` on the tunnel server.

## Monitoring (Railway)

```bash
# Railway CLI — stream logs
railway logs --service tunnel-server
railway logs --service web-backend

# Or check in the Railway dashboard under each service → Logs
```

## Troubleshooting

**CLI can't connect**:
```bash
# Verify the server URL includes the /_tunnel path
ducky config add-server-url wss://tunnel.ducky.wtf/_tunnel
```

**Tunnel not found for host**:
```bash
# Check active tunnels
curl https://tunnel.ducky.wtf/metrics
```

**Database connection fails**:
```bash
# Locally — check Postgres is running
docker compose -f docker-compose.dev.yml ps

# Production — check DATABASE_URL is set in Railway dashboard
```

## Testing

```bash
# Automated local E2E (uses Docker Compose)
./test-e2e.sh

# Manual
npm run dev:server   # Terminal 1
npm run dev:cli      # Terminal 2
```

## Contributing

Open a PR — tests run automatically on push.

## License

MIT

---

Built with security, observability, and scalability from day one.
