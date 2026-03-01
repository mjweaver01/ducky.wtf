# ducky.wtf - Domain Configuration

## Domain Setup

Your production domain is: **ducky.wtf**

All DNS records point to Railway services. Railway handles TLS automatically via Let's Encrypt.

## DNS Configuration

| Name | Type | Points to |
|---|---|---|
| `ducky.wtf` | CNAME / ALIAS | Railway `web-frontend` service domain |
| `*.ducky.wtf` | CNAME | Railway `tunnel-server` service domain |
| `api.ducky.wtf` | CNAME | Railway `web-backend` service domain |

> The wildcard `*.ducky.wtf` record covers all tunnel subdomains (e.g. `abc123.ducky.wtf`) as well as `tunnel.ducky.wtf` (the CLI WebSocket endpoint).

## Railway Custom Domain Setup

In the Railway dashboard for each service:

1. Go to the service → **Settings** → **Networking** → **Custom Domain**
2. Enter the domain name
3. Railway shows the CNAME target (e.g. `tunnel-server.railway.app`)
4. Copy the CNAME value and create the record at your DNS provider

### Example DNS Records (Cloudflare)

```
ducky.wtf         CNAME   abc123-web-frontend.railway.app   (proxied)
*.ducky.wtf       CNAME   abc123-tunnel-server.railway.app  (DNS only — orange cloud OFF)
api.ducky.wtf     CNAME   abc123-web-backend.railway.app    (proxied)
```

> **Important**: The `*.ducky.wtf` wildcard record should be set to **DNS only** (not proxied) if using Cloudflare, because Railway terminates TLS for that domain. Proxying it through Cloudflare would cause certificate conflicts.

## TLS / HTTPS

Railway automatically provisions Let's Encrypt certificates for all custom domains, including the wildcard. No manual certificate management needed.

Certificates are renewed automatically before expiry.

## Example URLs

### Production
- **Web UI**: https://ducky.wtf
- **API**: https://api.ducky.wtf/api
- **CLI WebSocket**: wss://tunnel.ducky.wtf/_tunnel
- **Tunnels**: https://[random].ducky.wtf
- **Metrics**: https://tunnel.ducky.wtf/metrics (tunnel server, no auth)

## CLI Configuration

```bash
# Save production server URL
ducky config add-server-url wss://tunnel.ducky.wtf/_tunnel

# Start a tunnel
ducky http 3000
# Tunnel established: https://abc123.ducky.wtf -> localhost:3000
```

## Railway Pro Plan Requirement

Wildcard custom domains (`*.ducky.wtf`) require the **Railway Pro plan** ($20/month). Without it:
- `ducky.wtf`, `api.ducky.wtf`, and `tunnel.ducky.wtf` can be added on the Hobby plan
- Individual tunnel subdomains (e.g. `abc123.ducky.wtf`) will **not route** until the wildcard is added

If you want to test before upgrading to Pro, you can use Railway's auto-generated service domains (e.g. `*.up.railway.app`) in the meantime.

## Nameservers

Make sure `ducky.wtf` is pointed to your DNS provider's nameservers at your domain registrar.

If using Cloudflare, get the nameservers from the Cloudflare dashboard and set them at your registrar (e.g. Namecheap, GoDaddy).

---

**Status**: Domain configured for Railway deployment
