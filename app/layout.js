import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'HI-OP | High Impact Performance Agency',
  description: '우리는 광고를 집행하지 않고 설계합니다. 데이터 엔지니어링 기반 퍼포먼스 마케팅 에이전시 히옵.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P74PV945';
  // Server component이므로 NEXT_PUBLIC_ 없이도 접근 가능
  const pixelId = process.env.META_PIXEL_ID || '907001489050252';

  return (
    <html lang="en">
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
