export default function HeroAnimated() {
  return (
    <section className="hiob-hero">
      <div className="wrap hiob-hero-grid">
        <div className="hiob-hero-copy">
          <div className="panic-label">광고비 증발 방지위원회</div>
          <h1 className="massive-text hiob-hero-title">
            광고비 새는 이유<br />
            <span>있었음</span>
          </h1>
          <p className="hiob-hero-sub">
            결과가 안 잡히면 광고가 좋은 손님을 못 찾아요. 히옵은 Pixel, CAPI,
            GA4, GTM을 뜯어보고 전환 데이터가 어디서 길을 잃는지 찾아냅니다.
          </p>
          <div className="hiob-hero-actions">
            <a className="btn-brutal primary" href="#contact">무료 진단 받기</a>
            <a className="btn-brutal" href="/tracking">데이터 누락 보기</a>
          </div>
        </div>

        <div className="panic-board" aria-label="광고 성과 진단 배너">
          <div className="board-top">
            <span>이번 광고 성과</span>
            <strong>전환 0</strong>
          </div>
          <div className="dashboard-card">
            <div className="dash-title">성과 요약</div>
            <div className="dash-grid">
              <b>클릭 842</b>
              <b>전환 0</b>
              <b>문의 0</b>
            </div>
            <div className="chart-fail" />
          </div>
          <div className="red-x">×</div>
          <div className="scribble">데이터 어디감?</div>
          <div className="sticky-note">
            데이터가 없으면<br />
            광고는 길을 잃어요!
          </div>
        </div>
      </div>
    </section>
  );
}
