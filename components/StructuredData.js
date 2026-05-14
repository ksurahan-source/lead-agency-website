const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hi-ob.com/#organization',
      name: 'HI-OP',
      alternateName: '히옵',
      url: 'https://hi-ob.com',
      logo: 'https://hi-ob.com/favicon.svg',
      sameAs: ['https://hi-ob.com'],
      description:
        'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 Creative Velocity OS를 구축합니다.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hi-ob.com/#website',
      url: 'https://hi-ob.com',
      name: 'HI-OP | 히옵',
      inLanguage: 'ko-KR',
      publisher: { '@id': 'https://hi-ob.com/#organization' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://hi-ob.com/#service',
      name: 'HI-OP 소재 병목 진단',
      url: 'https://hi-ob.com',
      areaServed: 'KR',
      provider: { '@id': 'https://hi-ob.com/#organization' },
      serviceType: [
        'Meta CAPI 전환 추적',
        'Google 향상된 전환',
        'DTC 퍼포먼스 마케팅',
        '숏폼 광고 소재 제작',
        '소재 생산·테스트 파이프라인',
      ],
      slogan: '소재 병목을 풀고 광고비 확장을 돕습니다.',
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
