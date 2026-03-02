/**
 * Metadata helper to update document title and meta description
 */

interface MetadataOptions {
  title: string;
  description?: string;
}

export function updateMetadata({ title, description }: MetadataOptions): void {
  document.title = title;

  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute('content', description);
  }
}

export const pageMetadata = {
  home: {
    title: 'Secure Tunnels to Localhost • ducky',
    description:
      'Expose your local server to the internet with secure tunnels. Perfect for webhooks, demos, and development.',
  },
  pricing: {
    title: 'Pricing • ducky',
    description: 'Simple, transparent pricing for developers. Choose the plan that works for you.',
  },
  about: {
    title: 'About • ducky',
    description: 'Learn about ducky and our mission to make localhost accessible to the internet.',
  },
  contact: {
    title: 'Contact • ducky',
    description: "Get in touch with the ducky team. We'd love to hear from you.",
  },
  terms: {
    title: 'Terms of Service • ducky',
    description: 'Terms of service and usage policy for ducky tunnels.',
  },
  docs: {
    title: 'Documentation • ducky',
    description: 'Complete documentation for the ducky CLI, API, and tunnel features.',
  },
  docsIntro: {
    title: 'Introduction • ducky Docs',
    description:
      'Get started with ducky tunnels. Learn how to expose your local server to the internet.',
  },
  docsCli: {
    title: 'CLI Reference • ducky Docs',
    description:
      'Complete CLI reference for ducky. All commands, flags, and configuration options.',
  },
  docsApi: {
    title: 'API Reference • ducky Docs',
    description:
      'REST API documentation for ducky. Manage tunnels, tokens, and domains programmatically.',
  },
  login: {
    title: 'Log In • ducky',
    description: 'Log in to your ducky account to manage tunnels and settings.',
  },
  signup: {
    title: 'Sign Up • ducky',
    description: 'Create your free ducky account and start tunneling in minutes.',
  },
  dashboard: {
    title: 'Dashboard • ducky',
    description: 'Manage your tunnels, tokens, and settings from the ducky dashboard.',
  },
} as const;
