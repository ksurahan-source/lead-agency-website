export default function HeroAnimated() {
  return (
    <section style={{ padding: 'clamp(4rem, 12vw, 8rem) 1.2rem', backgroundColor: '#121212', color: '#fcfaf7', borderBottom: '4px solid #121212' }}>
      <div className="wrap">
        <div>
          <h1 className="massive-text" style={{ color: '#fff' }}>
            광고를 돌리지 말고<br />
            <span style={{ color: 'var(--hiop-orange)' }}>엔지니어링</span> 하세요.
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
            퍼포먼스 마케팅 · 메타 CAPI · 데이터 트래킹 · 이커머스 광고 대행
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem' }}>
          <p style={{ maxWidth: '650px', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', fontWeight: 700, textAlign: 'right', lineHeight: 1.5, opacity: 0.9 }}>
            단순한 대행이 아닙니다. 계정 트러블슈팅부터 데이터 트래킹, 고전환 웹사이트 제작까지 — 비즈니스의 막힌 혈을 뚫고 진짜 성과를 증명합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
