import { Suspense } from 'react';
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
    default: 'hi-ob | Meta 광고용 숏폼 광고 제작',
    template: '%s | hi-ob',
  },
  description:
    'hi-ob은 제품 자료를 받아 Meta 광고에 쓸 숏폼 광고를 제작합니다. 기획, 대본, 보이스, 편집까지 한번에 진행합니다.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    siteName: 'hi-ob',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://hi-ob.com',
    title: 'hi-ob | Meta 광고용 숏폼 광고 제작',
    description: '제품 자료를 보내면 바로 테스트할 수 있는 숏폼 광고로 제작합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hi-ob | Meta 광고용 숏폼 광고 제작',
    description: '제품 자료를 보내면 바로 테스트할 수 있는 숏폼 광고로 제작합니다.',
  },
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P74PV945';
  const gtmServerUrl = process.env.NEXT_PUBLIC_GTM_SERVER_URL || '';
  const pixelId = '1715625702927911';

  return (
    <html lang="ko" className={syne.variable}>
      <body>
        <StructuredData />
        <DeferredAnalytics gtmId={gtmId} pixelId={pixelId} gtmServerUrl={gtmServerUrl} />
        <Suspense fallback={null}>
          <TrackingBridge />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
