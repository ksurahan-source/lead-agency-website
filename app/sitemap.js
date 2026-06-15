export default function sitemap() {
  const base = 'https://hi-ob.com';
  const lastModified = new Date('2026-05-16');

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/lead', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/growth', priority: 0.92, changeFrequency: 'monthly' },
    { path: '/creative', priority: 0.92, changeFrequency: 'monthly' },
    { path: '/system', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.25, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.25, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, ...route }) => ({
    url: `${base}${path}`,
    lastModified,
    ...route,
  }));
}
