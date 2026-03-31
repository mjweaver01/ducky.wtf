/**
 * Metadata helper to update document title and meta description
 */

interface MetadataOptions {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateOgTag(property: string, content: string): void {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateJsonLd(data: Record<string, any> | Record<string, any>[] | null): void {
  // Remove existing JSON-LD script
  const existing = document.querySelector('script[data-json-ld="true"]');
  if (existing) {
    existing.remove();
  }

  // Add new JSON-LD if provided
  if (data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-json-ld', 'true');
    // Handle both single object and array of objects
    script.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
    document.head.appendChild(script);
  }
}

export function updateMetadata({ title, description, url, image, jsonLd }: MetadataOptions): void {
  document.title = title;

  if (description) {
    updateMetaTag('description', description);
    updateOgTag('og:description', description);
    updateMetaTag('twitter:description', description);
  }

  updateOgTag('og:title', title);
  updateMetaTag('twitter:title', title);

  if (url) {
    updateOgTag('og:url', url);
  } else {
    updateOgTag('og:url', window.location.href);
  }

  if (image) {
    updateOgTag('og:image', image);
    updateMetaTag('twitter:image', image);
  }

  updateJsonLd(jsonLd || null);
}

export const pageMetadata = {
  home: {
    title: 'Secure Tunnels to Localhost • ducky.wtf',
    description:
      'Expose your local server to the internet with secure tunnels. Perfect for webhooks, demos, and development.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Ducky',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows, macOS, Linux',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Secure tunnels to localhost. Perfect for webhooks, demos, and development. Share your local server with a public URL in seconds.',
        url: 'https://ducky.wtf',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is ducky a free alternative to ngrok?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, ducky offers unlimited bandwidth on the free tier with no interstitial warnings, unlike ngrok\'s 1GB monthly limit and warning pages. You can start tunneling immediately without creating an account.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I test webhooks locally with ducky?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Install the CLI with "npm install -g @ducky.wtf/cli", then run "ducky http 3000" to expose localhost:3000. Copy your public URL and paste it into your webhook provider (Stripe, GitHub, Shopify, etc.). Webhooks are forwarded to your local server in real-time.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need an account to use ducky?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No account required to start. The CLI automatically creates an anonymous token when you first run it. You can optionally login with a magic link to access the dashboard, tunnel history, and static URLs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does ducky show interstitial warnings like ngrok?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. ducky never displays warning pages to your visitors. All traffic passes through cleanly without interruption, making it ideal for webhook testing and demos.',
            },
          },
        ],
      },
    ],
  },
  pricing: {
    title: 'Pricing • ducky.wtf',
    description: 'Simple, transparent pricing for developers. Choose the plan that works for you.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Ducky Tunneling Service',
      description: 'Secure localhost tunneling service with static URLs and custom domains',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free',
          price: '0',
          priceCurrency: 'USD',
          description: 'Perfect for trying out ducky',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '7',
          priceCurrency: 'USD',
          billingIncrement: 'Month',
          description: 'For developers and small teams with static tunnel URLs',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: '19',
          priceCurrency: 'USD',
          billingIncrement: 'Month',
          description: 'For teams and organizations with custom domains',
        },
      ],
    },
  },
  about: {
    title: 'About • ducky.wtf',
    description: 'Learn about ducky and our mission to make localhost accessible to the internet.',
  },
  contact: {
    title: 'Contact • ducky.wtf',
    description: "Get in touch with the ducky.wtf team. We'd love to hear from you.",
  },
  terms: {
    title: 'Terms of Service • ducky.wtf',
    description: 'Terms of service and usage policy for ducky tunnels.',
  },
  docs: {
    title: 'Documentation • ducky.wtf',
    description: 'Complete documentation for the ducky CLI, API, and tunnel features.',
  },
  docsIntro: {
    title: 'Introduction • ducky.wtf Docs',
    description:
      'Get started with ducky tunnels. Learn how to expose your local server to the internet.',
  },
  docsCli: {
    title: 'CLI Reference • ducky.wtf Docs',
    description:
      'Complete CLI reference for ducky. All commands, flags, and configuration options.',
  },
  docsApi: {
    title: 'API Reference • ducky.wtf Docs',
    description:
      'REST API documentation for ducky. Manage tunnels, tokens, and domains programmatically.',
  },
  login: {
    title: 'Log In • ducky.wtf',
    description: 'Log in to your ducky account to manage tunnels and settings.',
  },
  signup: {
    title: 'Sign Up • ducky.wtf',
    description: 'Create your free ducky account and start tunneling in minutes.',
  },
  dashboard: {
    title: 'Dashboard • ducky.wtf',
    description: 'Manage your tunnels, tokens, and settings from the ducky dashboard.',
  },
  forgotPassword: {
    title: 'Forgot Password • Ducky.wtf',
    description: 'Reset your Ducky.wtf account password',
  },
  resetPassword: {
    title: 'Reset Password • Ducky.wtf',
    description: 'Create a new password for your Ducky.wtf account',
  },
  whyDucky: {
    title: 'Why ducky? | Compare Localhost Tunneling Solutions - ducky.wtf',
    description:
      'See why developers choose ducky for localhost tunneling. Compare features, pricing, and ease of use across popular tunneling solutions.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Why Choose ducky for Localhost Tunneling',
      description:
        'Compare ducky with other localhost tunneling solutions. Unlimited bandwidth, no interstitial warnings, and true anonymous usage on the free tier.',
      url: 'https://ducky.wtf/why-ducky',
    },
  },
  webhookTestingGuide: {
    title: 'How to Test Webhooks Locally in 2026 | Complete Guide - ducky.wtf',
    description:
      'Learn how to test Stripe, GitHub, Shopify, and Discord webhooks locally using secure tunnels. Complete guide to localhost webhook testing in 2026.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Test Webhooks Locally',
      description:
        'Step-by-step guide to testing webhooks from Stripe, GitHub, Shopify, and other services on your local development server.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Install ducky CLI',
          text: 'Install the ducky CLI globally using npm: npm install -g @ducky.wtf/cli',
        },
        {
          '@type': 'HowToStep',
          name: 'Start your local server',
          text: 'Run your local development server on any port (e.g., localhost:3000)',
        },
        {
          '@type': 'HowToStep',
          name: 'Create public tunnel',
          text: 'Run ducky http 3000 to create a secure tunnel to your localhost',
        },
        {
          '@type': 'HowToStep',
          name: 'Configure webhook provider',
          text: 'Copy your public URL and paste it into your webhook provider configuration',
        },
      ],
      url: 'https://ducky.wtf/guides/webhook-testing',
    },
  },
  exposeLocalhostGuide: {
    title: 'How to Expose Localhost to the Internet in 2026 - ducky.wtf',
    description:
      'Learn how to expose localhost to the internet with secure HTTPS tunnels. Perfect for webhooks, demos, mobile testing, and remote collaboration.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Expose Localhost to the Internet',
      description:
        'Make your local development server publicly accessible from anywhere with a secure HTTPS URL.',
      url: 'https://ducky.wtf/guides/expose-localhost',
    },
  },
  demoSharingGuide: {
    title: 'Share Your Local Website for Demos | Guide - ducky.wtf',
    description:
      'Share your local development server with clients and teammates instantly. Get feedback on work-in-progress without deploying to staging.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Share Local Website for Demos',
      description:
        'Show clients your work-in-progress by sharing a public URL to your localhost. Get instant feedback without deploying.',
      url: 'https://ducky.wtf/guides/demo-sharing',
    },
  },
  mobileTestingGuide: {
    title: 'Test Localhost on Mobile Devices | Guide - ducky.wtf',
    description:
      'Access your local development server from real iPhones, iPads, and Android devices. Test responsive design and mobile-specific features on real hardware.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Test Localhost on Mobile Devices',
      description:
        'Access your local website from real mobile devices for testing responsive design, touch interactions, and mobile browser behavior.',
      url: 'https://ducky.wtf/guides/mobile-testing',
    },
  },
} as const;
