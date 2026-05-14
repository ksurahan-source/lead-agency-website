export default function HeroAnimated() {
  return (
    <section className="hiob-hero b2b-hero">
      <div className="wrap hiob-hero-grid">
        <div className="hiob-hero-copy">
          <div className="panic-label">PERFORMANCE DATA ENGINEERING</div>
          <h1 className="hiob-hero-title">
            광고 성과를<br />
            데이터 인프라부터<br />
            다시 설계합니다
          </h1>
          <p className="hiob-hero-sub">
            히옵은 Meta CAPI, Pixel, GA4, GTM, 랜딩 전환 흐름을 하나의 기준으로
            정리해 광고 알고리즘이 학습할 수 있는 신호를 안정적으로 구축합니다.
          </p>
          <div className="hero-trust-row" aria-label="핵심 진단 항목">
            <span>Event Match Quality</span>
            <span>Server-side CAPI</span>
            <span>GA4/GTM QA</span>
          </div>
          <div className="hiob-hero-actions">
            <a className="btn-brutal primary" href="#contact">전환 데이터 진단 신청</a>
            <a className="btn-brutal" href="/tracking">트래킹 인프라 보기</a>
          </div>
        </div>

        <div className="panic-board b2b-dashboard" aria-label="전환 데이터 진단 대시보드">
          <div className="board-top">
            <span>Tracking Health</span>
            <strong>8.5</strong>
          </div>
          <div className="dashboard-card">
            <div className="dash-title">Signal Coverage Review</div>
            <div className="dash-grid">
              <b><small>Pixel</small>Lead</b>
              <b><small>CAPI</small>Matched</b>
              <b><small>Dedup</small>event_id</b>
            </div>
            <div className="signal-chart">
              <span style={{ height: '38%' }} />
              <span style={{ height: '52%' }} />
              <span style={{ height: '64%' }} />
              <span style={{ height: '78%' }} />
              <span style={{ height: '86%' }} />
            </div>
          </div>
          <div className="signal-panel primary">
            <span>Event Coverage</span>
            <strong>75%+</strong>
          </div>
          <div className="signal-panel secondary">
            <span>Deduplication</span>
            <strong>Pixel + CAPI</strong>
          </div>
          <div className="sticky-note">
            정확한 신호가<br />
            광고 학습을 만듭니다
          </div>
        </div>
      </div>
    </section>
  );
}
