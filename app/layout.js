import { Syne } from 'next/font/google';
import DeferredAnalytics from '@/components/DeferredAnalytics';
import StructuredData from '@/components/StructuredData';
import TrackingBridge from '@/components/TrackingBridge';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-syne',
  display: 'optional',
  preload: false,
});

export const metadata = {
  title: {
    default: '히옵 | 데이터 기반 퍼포먼스 마케팅 파트너',
    template: '%s | 히옵',
  },
  description:
    '히옵은 Meta CAPI, Pixel, GA4, GTM, 랜딩 전환 흐름을 정리해 광고 성과를 안정적으로 측정하고 개선하는 퍼포먼스 마케팅 파트너입니다.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: '히옵 | 퍼포먼스 마케팅',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://hi-ob.com',
    title: '히옵 | 데이터 기반 퍼포먼스 마케팅 파트너',
    description:
      'Meta CAPI, Pixel, GA4, GTM, 랜딩 전환 흐름을 하나의 기준으로 정리해 광고 성과 개선 기반을 구축합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '히옵 | 데이터 기반 퍼포먼스 마케팅 파트너',
    description: '전환 데이터, 광고 계정, 랜딩, 소재 흐름을 함께 점검하고 실행 우선순위를 제안합니다.',
  },
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P74PV945';
  const pixelId = '1715625702927911';

  return (
    <html lang="ko" className={syne.variable}>
      <body>
        <StructuredData />
        <DeferredAnalytics gtmId={gtmId} pixelId={pixelId} />
        <TrackingBridge />
        {children}
      </body>
    </html>
  );
}
