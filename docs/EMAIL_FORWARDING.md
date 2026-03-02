# Email Forwarding Setup

Set up free email forwarding for your domain using ImprovMX.

## What This Does

Forward emails from your domain to your Gmail:
- `hello@yourdomain.com` → your Gmail
- `support@yourdomain.com` → your Gmail
- `security@yourdomain.com` → your Gmail

## Setup (5 minutes)

### 1. Sign up for ImprovMX

1. Go to https://improvmx.com
2. Create a free account
3. Add your domain (e.g., `ducky.wtf`)

### 2. Add MX Records to Your DNS

ImprovMX will show you these MX records:

```
Type: MX
Host: @
Priority: 10
Value: mx1.improvmx.com

Type: MX
Host: @
Priority: 20
Value: mx2.improvmx.com
```

**For GoDaddy:**
1. Log in and go to "My Products"
2. Find your domain → Click "DNS"
3. Delete any existing MX records
4. Add both MX records above
5. Save changes

**For other DNS providers:**
- Look for DNS management or DNS settings
- Delete existing MX records
- Add the two MX records from ImprovMX

### 3. Add Email Aliases

In the ImprovMX dashboard:

1. Click on your domain
2. Add aliases:
   - `hello@yourdomain.com` → `your-email@gmail.com`
   - `support@yourdomain.com` → `your-email@gmail.com`
   - `security@yourdomain.com` → `your-email@gmail.com`
3. Verify your Gmail (check inbox for verification email)

### 4. Wait & Test

- Wait 30-60 minutes for DNS to propagate
- Send a test email to `hello@yourdomain.com`
- Check your Gmail inbox

## Verify DNS Propagation

Check if your MX records are live:
- Go to https://mxtoolbox.com
- Enter your domain
- Look for `mx1.improvmx.com` and `mx2.improvmx.com`

## Troubleshooting

**Emails not arriving?**
- Check spam folder
- Wait longer (DNS can take up to 48 hours)
- Verify you deleted old MX records
- Check ImprovMX dashboard for errors

**MX records not showing?**
- Make sure you saved changes in your DNS provider
- Try a different DNS checker
- Wait longer

## Cost

ImprovMX is free for:
- Unlimited email aliases
- Unlimited forwarding
- 1 domain

No credit card required.

## Replying to Emails

When you receive forwarded emails in Gmail, just hit reply. Recipients will see your Gmail address (or set up "Send mail as" in Gmail to reply from your custom domain).

---

That's it! Your domain emails now forward to Gmail.
