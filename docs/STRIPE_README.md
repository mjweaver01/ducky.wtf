# Stripe Payment Integration

This directory contains all documentation for setting up Stripe payments in ducky.

## 📚 Documentation Files

### Quick Start
- **[STRIPE_QUICK_START.md](STRIPE_QUICK_START.md)** - Get Stripe working in 5 minutes
  - Essential environment variables
  - Quick setup steps
  - Test cards reference
  - Common troubleshooting

### Complete Guide
- **[STRIPE_SETUP_WALKTHROUGH.md](STRIPE_SETUP_WALKTHROUGH.md)** - Full setup walkthrough
  - Step-by-step instructions
  - Local development setup
  - Production deployment guide
  - Testing checklist
  - Complete troubleshooting

### Technical Reference
- **[STRIPE_SETUP.md](STRIPE_SETUP.md)** - Technical implementation details
  - API endpoints documentation
  - Webhook events reference
  - Database schema
  - Payment flow diagrams

## 🚀 Which Guide Should I Use?

### I want to set up Stripe quickly
→ Start with **STRIPE_QUICK_START.md** (5 minutes)

### I need detailed instructions
→ Follow **STRIPE_SETUP_WALKTHROUGH.md** (step-by-step)

### I need technical details
→ Reference **STRIPE_SETUP.md** (API docs)

## 🛠️ Validation Script

Run this to check your Stripe configuration:

```bash
./scripts/check-stripe-setup.sh
```

This will verify:
- ✅ Environment variables are set
- ✅ Stripe CLI is installed and logged in
- ✅ Webhook forwarding is running
- ✅ Backend server is running

## 🎯 What's Implemented

- ✅ **Subscription payments** for Pro & Enterprise plans
- ✅ **Stripe Checkout** hosted payment page
- ✅ **Customer Portal** for managing billing
- ✅ **Webhook handling** for automatic plan updates
- ✅ **Plan gating** - static URLs for paid users only
- ✅ **Visual indicators** - plan badges throughout UI

## 📋 Environment Variables Required

```bash
# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Get from Stripe CLI: stripe listen --forward-to ...
STRIPE_WEBHOOK_SECRET=whsec_...

# Get from https://dashboard.stripe.com/test/products
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...
```

## 🧪 Test Cards

```
✅ Success:        4242 4242 4242 4242
🔐 3D Secure:      4000 0025 0000 3155
❌ Declined:       4000 0000 0000 9995
```

All test cards:
- Expiration: Any future date
- CVC: Any 3 digits  
- ZIP: Any 5 digits

Full list: https://stripe.com/docs/testing

## 🔗 Useful Links

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Test API Keys**: https://dashboard.stripe.com/test/apikeys
- **Products**: https://dashboard.stripe.com/test/products
- **Webhooks**: https://dashboard.stripe.com/test/webhooks
- **Documentation**: https://stripe.com/docs

## 🆘 Troubleshooting

### Webhook not receiving events?
1. Check webhook forwarding is running
2. Verify `STRIPE_WEBHOOK_SECRET` matches CLI output
3. Check backend logs for errors

### Payment fails?
1. Verify using test keys (`sk_test_...`)
2. Check price IDs match Stripe Dashboard
3. Try with test card `4242 4242 4242 4242`

### Plan not updating?
1. Check webhook terminal shows `[200]` response
2. Check backend logs for "User X upgraded to Y"
3. Verify webhook secret is correct

For more troubleshooting, see the full guides above.

---

**Ready to get started? Head to [STRIPE_QUICK_START.md](STRIPE_QUICK_START.md)!**
