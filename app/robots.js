export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/agent', '/api/'],
    },
    sitemap: 'https://hi-ob.com/sitemap.xml',
    host: 'https://hi-ob.com',
  };
}
