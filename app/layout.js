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
    default: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
    template: '%s | HI-OP',
  },
  description:
    'HI-OP은 브랜드 내부의 raw material을 성과형 광고 소재로 변환해 DTC 브랜드의 소재 병목과 광고비 확장 문제를 해결하는 Creative Performance Infrastructure입니다.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'HI-OP',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://hi-ob.com',
    title: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
    description: '브랜드 내부의 raw material을 성과형 광고 소재로 변환하는 Creative Performance Infrastructure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
    description: '브랜드 내부의 raw material을 성과형 광고 소재로 변환하는 Creative Performance Infrastructure.',
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
