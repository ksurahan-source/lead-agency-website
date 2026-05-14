import { ImageResponse } from 'next/og';

export const alt = 'HI-OP 소재 병목 진단';
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
          background: '#f7f8fa',
          color: '#15171f',
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
            border: '2px solid rgba(21,23,31,0.16)',
            borderRadius: 28,
            background: '#fff',
            padding: 48,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: 2, color: '#111827' }}>HI-OP</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#E65828', marginTop: 8 }}>
                소재 생산·테스트 운영 시스템
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                border: '2px solid rgba(29,78,216,0.2)',
                borderRadius: 999,
                color: '#1D4ED8',
                fontSize: 42,
                fontWeight: 900,
                padding: '14px 30px',
              }}
            >
              CAPI · GA4
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28 }}>
            <div style={{ fontSize: 92, fontWeight: 1000, lineHeight: 1.04 }}>소재 병목을 풀고</div>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: '#111827',
                color: '#fff',
                fontSize: 92,
                fontWeight: 1000,
                lineHeight: 1,
                padding: '12px 28px 20px',
                marginTop: 10,
                borderRadius: 18,
              }}
            >
              광고비 확장까지
            </div>
            <div style={{ fontSize: 92, fontWeight: 1000, lineHeight: 1.04, marginTop: 8 }}>
              연결합니다
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                background: '#fff7ed',
                border: '2px solid rgba(230,88,40,0.22)',
                borderRadius: 999,
                color: '#9a3412',
                fontSize: 28,
                fontWeight: 900,
                padding: '16px 24px',
              }}
            >
              원재료 추출 · 소재 테스트 · 승자 확장
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#374151' }}>Pixel · CAPI · GA4 · GTM</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
