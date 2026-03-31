# Directory Submission Guide

This document contains templates and instructions for submitting ducky to free directories and developer communities. These submissions will create valuable backlinks and increase organic visibility.

---

## 1. Product Hunt

**URL**: https://www.producthunt.com/posts/create

**Timeline**: Best to launch on Tuesday-Thursday morning PST for maximum visibility.

### Submission Template

**Product Name**: ducky

**Tagline** (60 chars max): Free ngrok alternative with unlimited bandwidth

**Description**:
```
ducky is a free ngrok alternative that lets you expose localhost to the internet in seconds. Perfect for testing webhooks, sharing demos, and mobile testing.

Key features:
• Unlimited bandwidth (ngrok free tier: 1GB/month)
• No interstitial warning pages
• True anonymous tunneling - no signup required
• Magic-link authentication - no passwords
• Static URLs available ($7/month vs ngrok $8/month)
• Open source & self-hostable

Get started in 30 seconds:
$ npm install -g @ducky.wtf/cli
$ ducky http 3000
→ https://abc123.ducky.wtf
```

**First Comment** (introduce yourself):
```
Hey Product Hunt! 👋

I built ducky because I was frustrated with ngrok's free tier limitations. As developers, we need to test webhooks and share local demos constantly, but the 1GB bandwidth cap and interstitial warnings make it painful.

ducky is my answer:
• Unlimited bandwidth on free tier
• No warning pages
• No signup required to start
• Open source full stack (tunnel server, CLI, dashboard)

Would love your feedback! What features would make local tunneling better for your workflow?
```

**Topics/Categories**: Developer Tools, Open Source, SaaS, Productivity

**Links**:
- Website: https://ducky.wtf
- GitHub: https://github.com/mjweaver01/ducky
- npm: https://www.npmjs.com/package/@ducky.wtf/cli

---

## 2. AlternativeTo

**URL**: https://alternativeto.net/software/ngrok/suggest/

**Timeline**: Immediate submission, takes 1-2 days for approval.

### Submission Template

**Software Name**: ducky

**Short Description** (160 chars):
```
Free ngrok alternative with unlimited bandwidth, no interstitial warnings, and instant anonymous tunneling for testing webhooks and sharing localhost.
```

**Full Description**:
```
ducky is a free and open-source ngrok alternative for exposing localhost to the internet via secure HTTPS tunnels.

Why choose ducky over ngrok:
- Unlimited bandwidth on free tier (ngrok: 1GB/month limit)
- No interstitial warning pages (ngrok shows warnings on HTML traffic)
- True anonymous tunneling - no account required to start
- Magic-link authentication - no passwords to manage
- Static URLs available at $7/month (vs ngrok $8/month)
- Full open-source stack - self-hostable

Use cases:
- Testing webhooks from Stripe, GitHub, Shopify, Discord
- Sharing local demos with clients
- Mobile device testing
- API development and integration testing
- Collaborative development across networks

Installation:
$ npm install -g @ducky.wtf/cli
$ ducky http 3000
→ https://abc123.ducky.wtf

Plans:
- Free: Random URL each session, unlimited tunnels
- Pro ($7/mo): Static URL, custom subdomains
- Enterprise ($49/mo): Custom domains, team management

Tech stack: Node.js, TypeScript, React, PostgreSQL, WebSocket-based tunneling
```

**Platform**: Web, Self-Hosted, Linux, Windows, macOS

**License**: MIT

**Categories**: 
- Development Tools
- Networking
- Web Development
- DevOps

**Tags**: tunnel, localhost, webhook, ngrok, port-forwarding, https, development

**Alternatives to**: ngrok, localtunnel, Cloudflare Tunnel

---

## 3. StackShare

**URL**: https://stackshare.io/tools/new

**Timeline**: Immediate submission, manual approval process.

### Submission Template

**Tool Name**: ducky

**Category**: Localhost Tunneling / Developer Tools

**Description**:
```
ducky is a free ngrok alternative for exposing localhost to the internet. It provides secure HTTPS tunnels perfect for webhook testing, demo sharing, and local development.

Key advantages:
• Unlimited bandwidth (no 1GB cap like ngrok free tier)
• No interstitial warnings on free tier
• Anonymous tunneling - no signup required
• Magic-link auth - passwordless login
• Full open source stack - self-hostable

Use it for:
- Testing Stripe, GitHub, Shopify webhooks locally
- Sharing local demos with clients or teammates
- Mobile testing on real devices
- API integration development

Install in seconds:
$ npm install -g @ducky.wtf/cli
$ ducky http 3000

Stack: TypeScript, Node.js, React, PostgreSQL, WebSocket tunneling
```

**Website**: https://ducky.wtf

**GitHub**: https://github.com/mjweaver01/ducky

**Pricing**: Free tier + paid plans ($7-$49/month)

**Open Source**: Yes (MIT License)

---

## 4. DEV.to Article

**URL**: https://dev.to/new

**Timeline**: Write and publish immediately, article goes live instantly.

### Article Template

**Title**: Free ngrok Alternative in 2026: Introducing ducky

**Tags**: webdev, tutorial, devtools, opensource

**Series**: (leave empty)

**Cover Image**: Use your duck.svg or duck.png

**Canonical URL**: https://ducky.wtf/ngrok-alternative

**Article Content**:

```markdown
I've been frustrated with ngrok's free tier limitations for a while now. The 1GB bandwidth cap runs out quickly, and the interstitial warning pages break webhook testing and demos. So I built ducky - a free ngrok alternative with unlimited bandwidth.

## What is ducky?

ducky is an open-source localhost tunneling tool that exposes your local server to the internet via secure HTTPS URLs. It's perfect for:
- Testing webhooks (Stripe, GitHub, Shopify, etc.)
- Sharing local demos with clients
- Mobile device testing
- API development and integration testing

## Why ducky over ngrok?

| Feature | ducky (Free) | ngrok (Free) |
|---------|--------------|--------------|
| Bandwidth | ✅ Unlimited | ❌ 1 GB/month |
| Interstitial warnings | ✅ None | ❌ Yes |
| Account required | ✅ Optional | ❌ Yes |
| Setup time | ✅ 30 seconds | ⚠️ ~2 minutes |

## Quick Start

```bash
# Install
$ npm install -g @ducky.wtf/cli

# Start tunneling (no signup required!)
$ ducky http 3000
✓ https://abc123.ducky.wtf → localhost:3000
```

That's it! Copy your public URL and use it anywhere - webhooks, demos, mobile testing, etc.

## How It Works

ducky uses WebSocket-based tunneling:
1. CLI opens an outbound WebSocket connection to ducky.wtf
2. Incoming HTTP requests are forwarded over the WebSocket to your localhost
3. Responses are sent back through the tunnel to the visitor

No inbound ports needed on your machine. Everything is outbound-only, so it works behind firewalls and NAT.

## Testing Webhooks Locally

### Stripe Example

```bash
# Start your local server
$ npm run dev  # localhost:3000

# In another terminal, start the tunnel
$ ducky http 3000
✓ https://abc123.ducky.wtf → localhost:3000

# Configure in Stripe Dashboard:
# Developers → Webhooks → Add endpoint
# URL: https://abc123.ducky.wtf/webhooks/stripe
```

Now when you trigger test events in Stripe, they're forwarded to your localhost in real-time. Perfect for debugging webhook handlers!

### GitHub Example

```bash
$ ducky http 4000

# Repo → Settings → Webhooks → Add webhook
# Payload URL: https://xyz789.ducky.wtf/github/webhook
```

Test push events, pull requests, and issue comments locally without deploying.

## Static URLs for Production Webhooks

The free tier gives you a random URL each session. For webhooks that need persistent configuration, upgrade to Pro ($7/month) to get a static URL that never changes:

```bash
$ ducky login  # magic link, no password
$ ducky http 3000
✓ https://myapp.ducky.wtf → localhost:3000
```

Now `https://myapp.ducky.wtf` stays the same forever. Configure it once in Stripe/GitHub/etc and you're done.

## Open Source & Self-Hostable

The full stack is open source (MIT license):
- Tunnel server (Node.js + WebSocket)
- Web backend (Express + PostgreSQL)
- Dashboard (React + Vite)
- CLI (TypeScript)

Self-host on Railway, Render, or your own infrastructure. See the [deployment guide](https://github.com/mjweaver01/ducky#contributing) for details.

## Try it out

```bash
npm install -g @ducky.wtf/cli
ducky http 3000
```

No signup. No configuration. Just works.

🔗 Website: https://ducky.wtf
🔗 GitHub: https://github.com/mjweaver01/ducky
🔗 npm: https://www.npmjs.com/package/@ducky.wtf/cli

---

What do you use for localhost tunneling? Have you hit ngrok's free tier limits? Let me know in the comments!
```

---

## 5. Hashnode Article

**URL**: https://hashnode.com/create/story

**Timeline**: Publish immediately.

### Article Template

**Title**: How to Test Webhooks Locally in 2026: A Complete Guide

**Subtitle**: Test Stripe, GitHub, and Shopify webhooks on localhost using secure tunnels

**Tags**: webdev, tutorial, webhooks, testing, nodejs

**Cover Image**: Use duck.png or create a custom graphic

**Canonical URL**: https://ducky.wtf/guides/webhook-testing

**Article**: (Use the same content as DEV.to article above, but focus more on the "How to Test Webhooks Locally" angle with provider-specific examples)

---

## 6. Reddit Communities

### r/webdev

**URL**: https://reddit.com/r/webdev

**Submission Type**: Link post

**Title**: "I built a free ngrok alternative with unlimited bandwidth [Open Source]"

**Link**: https://ducky.wtf/ngrok-alternative

**Comment** (post immediately after submission):
```
I've been working on ducky for the past few months because I kept hitting ngrok's 1GB bandwidth limit while testing webhooks.

Key differences from ngrok:
• Unlimited bandwidth on free tier (ngrok: 1GB/month)
• No interstitial warning pages
• No signup required - truly anonymous tunneling
• Full open source stack (MIT license)

It's designed for the same use cases as ngrok - testing webhooks, sharing demos, mobile testing, etc.

The CLI is on npm: npm install -g @ducky.wtf/cli

Would love feedback from the community! What features would make this more useful for your workflow?

Repo: https://github.com/mjweaver01/ducky
```

**Note**: Reddit has strict self-promotion rules. Wait for organic engagement before commenting too much. Be helpful, not salesy.

### r/node

**Title**: "ducky - localhost tunneling CLI for webhook testing [npm package]"

**Link**: https://www.npmjs.com/package/@ducky.wtf/cli

### r/selfhosted

**Title**: "Self-hostable ngrok alternative: ducky (Node.js + PostgreSQL)"

**Link**: https://github.com/mjweaver01/ducky

**Comment**: Focus on the self-hosting story, deployment guides, and open-source stack.

---

## 7. Hacker News (Show HN)

**URL**: https://news.ycombinator.com/submit

**Guidelines**: 
- Use "Show HN: " prefix
- Link directly to GitHub or website
- Post between 8-10 AM PST on Tuesday-Thursday
- Be responsive to comments in the first 2 hours

**Title**: Show HN: ducky – Free ngrok alternative with unlimited bandwidth

**URL**: https://github.com/mjweaver01/ducky

**First Comment** (prepare this):
```
Hi HN! I built ducky as a free alternative to ngrok after constantly hitting the 1GB bandwidth limit while testing webhooks.

Key features:
- Unlimited bandwidth on free tier (vs ngrok's 1GB cap)
- No interstitial warning pages
- True anonymous tunneling - no signup required
- Full open-source stack: tunnel server, API, dashboard, CLI
- Self-hostable on Railway, Render, or your own infrastructure

Tech stack: Node.js + WebSocket-based tunneling, React frontend, PostgreSQL, TypeScript throughout.

The free tier gives you random URLs each session (great for testing). Pro plan ($7/mo) gives you static URLs for persistent webhook configuration.

I'd love feedback on:
1. What other protocols would be useful? (Currently HTTP/WebSocket, considering TCP)
2. Features that would make this more useful than ngrok?
3. Documentation improvements?

Try it: npm install -g @ducky.wtf/cli && ducky http 3000

Live site: https://ducky.wtf
```

---

## 8. GitHub Awesome Lists

Submit PRs to these curated lists:

### awesome-tunneling
**Repo**: https://github.com/anderspitman/awesome-tunneling

**PR Title**: Add ducky - free ngrok alternative

**PR Description**:
```markdown
## ducky

Free ngrok alternative with unlimited bandwidth and no interstitial warnings.

- Unlimited bandwidth on free tier
- No account required to start
- Static URLs available ($7/month)
- Open source (MIT) and self-hostable
- WebSocket support
- Magic-link authentication

GitHub: https://github.com/mjweaver01/ducky
Website: https://ducky.wtf
npm: https://www.npmjs.com/package/@ducky.wtf/cli
```

### awesome-selfhosted
**Repo**: https://github.com/awesome-selfhosted/awesome-selfhosted

**Category**: Software Development - API Management

**PR Entry**:
```markdown
- [ducky](https://github.com/mjweaver01/ducky) - Expose localhost to the internet via secure HTTPS tunnels. Alternative to ngrok with unlimited bandwidth. `MIT` `Nodejs/TypeScript`
```

### awesome-cli-apps
**Repo**: https://github.com/agarrharr/awesome-cli-apps

**Category**: Development → Web Development

**PR Entry**:
```markdown
- [ducky](https://github.com/mjweaver01/ducky) - Expose localhost to the internet for webhook testing and demos. Free ngrok alternative.
```

---

## Timeline & Order

**Week 1** (Immediate):
1. ✅ **npm optimization** - Already done (package.json updates)
2. ✅ Submit to **AlternativeTo** (takes 1-2 days for approval, high SEO value)
3. ✅ Submit to **StackShare** (manual approval, 3-5 days)

**Week 2** (After initial content is live):
1. ✅ Publish **DEV.to article** - "Free ngrok Alternative in 2026"
2. ✅ Publish **Hashnode article** - "How to Test Webhooks Locally"
3. ✅ Submit PRs to **GitHub awesome lists** (awesome-tunneling, awesome-selfhosted)

**Week 3** (Build momentum):
1. ✅ **Product Hunt launch** (Tuesday-Thursday morning PST)
2. ✅ **Hacker News Show HN** (same day as PH launch or next day)
3. ✅ **Reddit posts** to r/webdev, r/node (spread out over 2-3 days)

**Week 4** (Long-tail):
1. ✅ **Reddit r/selfhosted** (focus on self-hosting story)
2. ✅ Monitor and respond to comments across all platforms

---

## Submission Checklist

Before submitting anywhere, ensure:

- [ ] Website loads quickly (< 2 seconds)
- [ ] All new pages are deployed and working
- [ ] Documentation is complete and accurate
- [ ] GitHub README is polished with comparison section
- [ ] npm package page looks good
- [ ] Screenshots/images are high quality
- [ ] Contact email is monitored (support@ducky.wtf)

---

## Tips for Success

1. **Be authentic**: Share your story and motivation for building ducky
2. **Be responsive**: Reply to comments within 1-2 hours during launch
3. **Be helpful, not salesy**: Answer questions, provide value
4. **Cross-link**: Mention your Product Hunt launch in your DEV.to article, etc.
5. **Track results**: Note referral sources in Google Analytics

---

## Backlink Tracking

After submission, track these backlinks in Google Search Console:
- [ ] AlternativeTo: alternativeto.net/software/ducky/
- [ ] StackShare: stackshare.io/ducky
- [ ] DEV.to: dev.to/[your-username]/...
- [ ] Hashnode: [your-blog].hashnode.dev/...
- [ ] Product Hunt: producthunt.com/posts/ducky
- [ ] GitHub awesome-tunneling PR merged
- [ ] GitHub awesome-selfhosted PR merged
- [ ] Reddit posts (check upvotes and comments)

---

## Resources

- [Product Hunt Launch Checklist](https://www.producthunt.com/launch)
- [Hacker News Guidelines](https://news.ycombinator.com/newsguidelines.html)
- [Reddit Self-Promotion Guidelines](https://www.reddit.com/wiki/selfpromotion/)

