export default function sitemap() {
  const base = 'https://hi-ob.com';
  const now = new Date().toISOString();

  const routes = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/package-1m`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/tracking`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/lead-gen`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/ecom-agency`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/ecom-guide`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/video-catalog`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/meta`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/google`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${base}/blog/why-meta-ads-fail-korea`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/blog/google-ads-trap`, priority: 0.7, changeFrequency: 'monthly' },
  ];

  return routes.map((r) => ({ ...r, lastModified: now }));
}
