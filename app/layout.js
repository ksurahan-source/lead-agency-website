import { Syne } from 'next/font/google';
import DeferredAnalytics from '@/components/DeferredAnalytics';
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
    default: '히옵 | 퍼포먼스 마케팅 — 메타·구글 광고 대행',
    template: '%s | 히옵',
  },
  description:
    '우리는 광고를 집행하지 않고 설계합니다. 메타 CAPI, GA4, GTM 기반 데이터 엔지니어링으로 ROAS를 극대화하는 퍼포먼스 마케팅 에이전시 히옵.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: '히옵 | 퍼포먼스 마케팅',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P74PV945';
  const pixelId = '1715625702927911';

  return (
    <html lang="ko" className={syne.variable}>
      <body>
        <DeferredAnalytics gtmId={gtmId} pixelId={pixelId} />
        <TrackingBridge />
        {children}
      </body>
    </html>
  );
}
