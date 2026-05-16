export const metadata = {
  title: 'HI-OP Creative Studio',
  description: '쇼츠 제작 모듈이 lead-agency-website에 연결되었습니다.',
};

export default function StudioPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0f1117',
      color: '#f8fafc',
      display: 'grid',
      placeItems: 'center',
      padding: '48px 20px',
    }}
    >
      <section style={{
        width: 'min(720px, 100%)',
        border: '1px solid rgba(248, 250, 252, 0.14)',
        borderRadius: 18,
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.04)',
      }}
      >
        <p style={{
          margin: '0 0 14px',
          color: '#f97316',
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 0,
        }}
        >
          HI-OP
        </p>
        <h1 style={{
          margin: '0 0 18px',
          fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 1.05,
          letterSpacing: 0,
        }}
        >
          HI-OP Creative Studio
        </h1>
        <p style={{
          margin: '0 0 10px',
          color: '#dbe4ef',
          fontSize: 18,
          lineHeight: 1.7,
        }}
        >
          쇼츠 제작 모듈이 lead-agency-website에 연결되었습니다.
        </p>
        <p style={{
          margin: 0,
          color: '#98a2b3',
          fontSize: 16,
          lineHeight: 1.7,
        }}
        >
          다음 단계에서 인증, 생성 API, 렌더링 API를 연결합니다.
        </p>
      </section>
    </main>
  );
}
