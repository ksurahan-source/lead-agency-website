import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: {
    default: '히옵 | 퍼포먼스 마케팅 — 메타·구글 광고 대행',
    template: '%s | 히옵',
  },
  description: '우리는 광고를 집행하지 않고 설계합니다. 메타 CAPI, GA4, GTM 기반 데이터 엔지니어링으로 ROAS를 극대화하는 퍼포먼스 마케팅 에이전시 히옵.',
  metadataBase: new URL('https://hi-ob.com'),
  icons: {
    icon: '/favicon.svg',
  },
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
    <html lang="ko">
      <head>
        {/* 폰트 서버 preconnect — DNS/TLS 병렬 처리 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* 비차단 폰트 로드 (<link>는 병렬, CSS @import는 직렬) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <GoogleTagManager gtmId={gtmId} />
      <body>
        {children}

        {/* Meta Pixel 베이스코드 — CAPI와 event_id로 중복 제거 */}
        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}</Script>
            <noscript>
              <img
                height="1" width="1" style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
