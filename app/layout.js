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
    default: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
    template: '%s | HI-OP',
  },
  description:
    'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
  metadataBase: new URL('https://hi-ob.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'HI-OP',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://hi-ob.com',
    title: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
    description: 'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
    description: 'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
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
