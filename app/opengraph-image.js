import { ImageResponse } from 'next/og';

export const alt = '히옵 마케팅 — 네이버·쿠팡 셀러 측정·성과 마케팅';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const LOGO_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 290 110'><g fill='none' stroke='#1c1917' stroke-width='13' stroke-linecap='butt' stroke-linejoin='round'><path d='M30 10V100'/><path d='M30 65a22 22 0 0 1 44 0V100'/><path d='M105 43V100'/><circle cx='158' cy='71.5' r='22'/><path d='M211 10V100'/><circle cx='233' cy='71.5' r='22'/></g><circle cx='105' cy='24' r='7' fill='#1c1917'/></svg>";
const LOGO_DATA = `data:image/svg+xml;base64,${btoa(LOGO_SVG)}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f4f1ea',
          color: '#1c1917',
          padding: 56,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '2px solid rgba(28,25,23,0.14)',
            borderRadius: 28,
            background: '#fbfaf6',
            padding: 48,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={LOGO_DATA} width={150} height={57} alt="hiob" style={{ display: 'flex' }} />
              <div style={{ fontSize: 24, fontWeight: 800, color: '#c2410c', marginTop: 8 }}>
                이커머스 성장 파트너
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                border: '2px solid rgba(230,88,40,0.30)',
                borderRadius: 999,
                color: '#c2410c',
                fontSize: 40,
                fontWeight: 900,
                padding: '14px 30px',
              }}
            >
              측정 · 성과
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
            <div style={{ fontSize: 84, fontWeight: 1000, lineHeight: 1.06 }}>광고비는 나가는데,</div>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: '#1c1917',
                color: '#fff',
                fontSize: 84,
                fontWeight: 1000,
                lineHeight: 1,
                padding: '12px 26px 18px',
                marginTop: 12,
                borderRadius: 18,
              }}
            >
              어디서 버는지
            </div>
            <div style={{ fontSize: 84, fontWeight: 1000, lineHeight: 1.06, marginTop: 10 }}>
              안 보입니다.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                background: '#fff1ea',
                border: '2px solid rgba(230,88,40,0.22)',
                borderRadius: 999,
                color: '#9a3412',
                fontSize: 28,
                fontWeight: 900,
                padding: '16px 24px',
              }}
            >
              측정 6주 무료 · 성과 ROAS 8~12%
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#3b3530' }}>sGTM · Meta CAPI · GA4</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
