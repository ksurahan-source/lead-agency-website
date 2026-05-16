export default function CaseStudyBlock() {
  return (
    <section className="category-section category-case">
      <div className="category-section-head compact">
        <span>Case Pattern</span>
        <h2>월 5,400만 원 광고비에서 막힌 브랜드의 공통점</h2>
        <p>
          제품 메시지도 많고, 내부 원재료도 충분했습니다. 병목은 아이디어 부족이 아니라
          그 메시지를 빠르게 소재화하고 테스트하는 throughput이었습니다.
        </p>
      </div>
      <div className="category-case-board">
        {[
          ['현재 월 광고비', '₩54M'],
          ['막힌 지점', '소재 테스트 병목'],
          ['보유 원재료', '공장 촬영본, 제품 스토리, 제품 데모, 고객 반박 포인트'],
          ['해결 구조', 'Raw Material Engine + Creative Performance OS'],
        ].map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
