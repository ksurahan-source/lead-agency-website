import { ImageResponse } from 'next/og';

export const alt = 'HI-OB 광고 데이터 진단';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f7f5ef',
          color: '#080808',
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
            border: '8px solid #080808',
            background: '#fff',
            padding: 48,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: 2 }}>HI-OB</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#ff7a1a', marginTop: 8 }}>
                PERFORMANCE DIAGNOSIS
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                border: '6px solid #ff2d20',
                color: '#ff2d20',
                fontSize: 64,
                fontWeight: 900,
                padding: '8px 34px',
                transform: 'rotate(-8deg)',
              }}
            >
              X
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28 }}>
            <div style={{ fontSize: 104, fontWeight: 1000, lineHeight: 1.02 }}>광고비 새는 이유</div>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: '#080808',
                color: '#fff',
                fontSize: 108,
                fontWeight: 1000,
                lineHeight: 1,
                padding: '10px 28px 18px',
                marginTop: 10,
              }}
            >
              있었음
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                background: '#ffe15a',
                border: '4px solid #080808',
                fontSize: 32,
                fontWeight: 900,
                padding: '18px 24px',
                transform: 'rotate(-2deg)',
              }}
            >
              전환 0? 데이터 어디감?
            </div>
            <div style={{ fontSize: 30, fontWeight: 900 }}>Pixel · CAPI · GA4 · GTM</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
