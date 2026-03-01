import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

export default stripe;

// Price IDs from environment
export const PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
  PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY || '',
  ENTERPRISE_MONTHLY: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
  ENTERPRISE_YEARLY: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY || '',
};

// Plan mappings
export const PLAN_DETAILS = {
  free: {
    name: 'Free',
    features: ['Random URLs', 'Unlimited tunnels', 'Dashboard access'],
    price: 0,
  },
  pro: {
    name: 'Pro',
    features: [
      'Static tunnel URLs',
      'Custom subdomains',
      'Unlimited tunnels',
      'Priority support',
    ],
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  enterprise: {
    name: 'Enterprise',
    features: [
      'Everything in Pro',
      'Custom domains',
      'SSO support',
      'Dedicated support',
      'SLA guarantee',
    ],
    monthlyPrice: 49,
    yearlyPrice: 490,
  },
};

export function getPriceId(plan: 'pro' | 'enterprise', interval: 'month' | 'year'): string {
  if (plan === 'pro') {
    return interval === 'month' ? PRICES.PRO_MONTHLY : PRICES.PRO_YEARLY;
  }
  return interval === 'month' ? PRICES.ENTERPRISE_MONTHLY : PRICES.ENTERPRISE_YEARLY;
}
