const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hi-ob.com/#organization',
      name: 'hi-ob',
      alternateName: '히옵 마케팅',
      url: 'https://hi-ob.com',
      logo: 'https://hi-ob.com/favicon.svg',
      sameAs: ['https://hi-ob.com'],
      description:
        '네이버·쿠팡 셀러를 위한 성과 마케팅 + 서버사이드 측정(sGTM·Meta CAPI) 대행. 광고 기여 매출을 측정으로 보이게 만들고, 성과가 날 때만 정산합니다.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hi-ob.com/#website',
      url: 'https://hi-ob.com',
      name: 'hi-ob | 히옵 마케팅',
      inLanguage: 'ko-KR',
      publisher: { '@id': 'https://hi-ob.com/#organization' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://hi-ob.com/#service',
      name: '히옵 마케팅 — 네이버·쿠팡 셀러 성과 마케팅 + 측정',
      url: 'https://hi-ob.com',
      areaServed: 'KR',
      provider: { '@id': 'https://hi-ob.com/#organization' },
      serviceType: [
        '서버사이드 전환 측정 (sGTM·Meta CAPI)',
        '메타(인스타그램·페이스북) 퍼포먼스 광고 대행',
        '구글 검색광고',
        '숏폼(릴스) 광고 제작',
        '네이버·쿠팡 셀러 마케팅',
      ],
      slogan: '광고비가 어디서 버는지, 측정으로 보이게 만듭니다.',
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
