import Stripe from 'stripe';

// Use dummy key if not configured (prevents startup errors in dev)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_development';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-02-25.clover',
});

export default stripe;

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;

// Product and Price IDs (set these in Stripe Dashboard or create programmatically)
export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRO_PRICE_ID || '',
  ENTERPRISE_MONTHLY: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
};

// Plan mapping
export const PLAN_TO_PRICE: Record<string, string> = {
  pro: STRIPE_PRICES.PRO_MONTHLY,
  enterprise: STRIPE_PRICES.ENTERPRISE_MONTHLY,
};

export const PRICE_TO_PLAN: Record<string, string> = {
  [STRIPE_PRICES.PRO_MONTHLY]: 'pro',
  [STRIPE_PRICES.ENTERPRISE_MONTHLY]: 'enterprise',
};
