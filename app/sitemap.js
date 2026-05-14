export default function sitemap() {
  const base = 'https://hi-ob.com';
  const lastModified = new Date('2026-05-13');

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/tracking', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/lead-gen', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ecom-agency', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/google', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/meta', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/video-catalog', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/short-form', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/tiktok-moloco', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/package-1m', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ecom-guide', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/app-ads', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/consulting', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/hi-ob', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/en', priority: 0.55, changeFrequency: 'monthly' },
    { path: '/m', priority: 0.45, changeFrequency: 'monthly' },
    { path: '/m/google', priority: 0.45, changeFrequency: 'monthly' },
    { path: '/m/meta', priority: 0.45, changeFrequency: 'monthly' },
    { path: '/m/tiktok-moloco', priority: 0.45, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/blog/ad-data-loss-recovery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/data-driven-marketing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/facebook-pixel-error-fix', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/ga4-ecommerce-tracking', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/global-google-ads-agency', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/google-ads-conversion-setup', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/google-ads-revenue-strategy', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/google-ads-trap', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/google-analytics-setup-agency', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/gtm-server-side-tracking', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/hiob-agency-marketing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/meta-capi-installation', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/performance-marketing-agency', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/roas-optimization-strategy', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/shopping-mall-google-search-ads', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/startup-performance-consulting', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/why-meta-ads-fail-korea', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.25, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.25, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, ...route }) => ({
    url: `${base}${path}`,
    lastModified,
    ...route,
  }));
}
