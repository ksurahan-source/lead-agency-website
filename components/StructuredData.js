const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hi-ob.com/#organization',
      name: 'HI-OB',
      alternateName: '히옵',
      url: 'https://hi-ob.com',
      logo: 'https://hi-ob.com/favicon.svg',
      sameAs: ['https://hi-ob.com'],
      description:
        '광고 계정, 랜딩, Pixel, CAPI, GA4, GTM 데이터를 진단하고 리드/전환 성과를 설계하는 퍼포먼스 마케팅 팀입니다.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hi-ob.com/#website',
      url: 'https://hi-ob.com',
      name: 'HI-OB | 히옵',
      inLanguage: 'ko-KR',
      publisher: { '@id': 'https://hi-ob.com/#organization' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://hi-ob.com/#service',
      name: 'HI-OB 퍼포먼스 마케팅 진단',
      url: 'https://hi-ob.com',
      areaServed: 'KR',
      provider: { '@id': 'https://hi-ob.com/#organization' },
      serviceType: [
        'Meta Ads CAPI Tracking',
        'Google Ads Enhanced Conversions',
        'Lead Generation Landing Page',
        'Ecommerce Performance Marketing',
        'Short-form Creative Performance',
      ],
      slogan: '광고 성과를 데이터 인프라부터 다시 설계합니다.',
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  );
}
