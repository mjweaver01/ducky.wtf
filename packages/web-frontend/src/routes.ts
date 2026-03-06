/**
 * Canonical route paths for the app.
 * Imported by both App.tsx (routing) and vite.config.ts (sitemap generation).
 */

export const routes = {
  home: '/',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  terms: '/terms',
  docs: '/docs',
  docsCli: '/docs/cli',
  docsApi: '/docs/api',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
} as const;

/** Routes included in the sitemap (public, indexable pages only). */
export const sitemapRoutes: string[] = [
  routes.home,
  routes.pricing,
  routes.about,
  routes.contact,
  routes.terms,
  routes.docs,
  routes.docsCli,
  routes.docsApi,
];
