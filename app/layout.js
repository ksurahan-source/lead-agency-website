import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

const PRETENDARD_HREF =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css';
const SYNE_HREF =
  'https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap';

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
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 비차단 폰트 로드: media=print 로 첫 paint 차단 회피 → load 후 media=all 로 적용 */}
        <link rel="stylesheet" href={PRETENDARD_HREF} media="print" data-font="pretendard" />
        <link rel="stylesheet" href={SYNE_HREF} media="print" data-font="syne" />
        <Script id="font-media-swap" strategy="beforeInteractive">{`
          (function(){function s(){document.querySelectorAll('link[data-font][media="print"]').forEach(function(l){l.media='all'})}if(document.readyState!=='loading'){requestAnimationFrame(s)}else{document.addEventListener('DOMContentLoaded',s)}})();
        `}</Script>
        <noscript>
          <link rel="stylesheet" href={PRETENDARD_HREF} />
          <link rel="stylesheet" href={SYNE_HREF} />
        </noscript>

        <GoogleTagManager gtmId={gtmId} />
      </head>
      <body>
        {children}

        {/* Meta Pixel — 폼 제출에서 fbq 호출하므로 afterInteractive 유지 */}
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
                height="1"
                width="1"
                style={{ display: 'none' }}
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
