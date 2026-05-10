// Shared SEO helper — import in per-route layout.js files
export function buildMetadata({ title, description, path, image }) {
  const base = 'https://hi-ob.com';
  const url = `${base}${path}`;
  const ogImage = image || `${base}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: '히옵 | 퍼포먼스 마케팅',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
