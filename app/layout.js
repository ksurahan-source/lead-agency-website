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
    default: '히옵 | 광고비 새는 곳을 잡는 퍼포먼스 마케팅',
    template: '%s | 히옵',
  },
  description:
    '전환 0, ROAS 실종, GA4 숫자 불일치. 히옵은 Meta CAPI, Google Ads, GA4, GTM, 리드 랜딩을 진단해 광고비가 새는 지점을 바로 잡습니다.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: '히옵 | 퍼포먼스 마케팅',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://hi-ob.com',
    title: '히옵 | 광고비 새는 곳을 잡는 퍼포먼스 마케팅',
    description:
      '결과가 안 잡히면 광고가 좋은 손님을 못 찾아요. Pixel, CAPI, GA4, GTM, 랜딩부터 진단합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '히옵 | 광고비 새는 곳을 잡는 퍼포먼스 마케팅',
    description: '전환 0? 데이터 어디감? 히옵이 광고비 새는 곳부터 표시합니다.',
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
