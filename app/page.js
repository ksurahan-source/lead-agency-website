import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';

export const metadata = {
  title: '히옵(HI-OP) | Meta 광고 전문 컨설팅',
  description: '픽셀 · CAPI · 계정 구조 · 소재 전략까지 데이터 기반 Meta 광고 컨설팅. 트래킹 인프라부터 다시 설계합니다.',
};

export default function Home() {
  return (
    <>
      <PixelScrollTracker />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob blob-tl" />
        <div className="hero-blob blob-br" />

        <nav className="hero-nav">
          <div className="hero-nav-inner">
            <span className="nav-logo">HI-OP</span>
            <span className="nav-dot">·</span>
            <span className="nav-brand">히옵 · Meta 광고 전문 컨설팅</span>
          </div>
        </nav>

        <div className="wrap hero-body">
          <div className="hero-inner">
            <div className="badge fade-up">
              <span className="dot" />
              META ADS SPECIALIST
            </div>
            <h1 className="hero-h1 fade-up delay-1">
              트래킹 인프라부터<br />
              <span className="gradient-text">Meta 광고를</span><br />
              다시 설계합니다
            </h1>
            <p className="hero-sub fade-up delay-2">
              픽셀 · CAPI · 계정 구조 · 소재 전략까지 데이터 기반 컨설팅
            </p>
            <div className="hero-cta fade-up delay-2">
              <a href="#contact" className="btn-hero-primary">무료 상담 신청하기 →</a>
              <a href="#why" className="btn-hero-ghost">서비스 살펴보기</a>
            </div>
            <div className="hero-tags fade-up delay-3">
              {['픽셀 진단', 'CAPI 연동', '릴스 광고', 'Advantage+', '동남아 · APAC'].map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY HI-OP ── */}
      <section id="why">
        <div className="wrap">
          <p className="eyebrow">WHY HI-OP</p>
          <h2 className="section-title">
            일반 대행사와 <span className="gradient-text">히옵의 차이</span>
          </h2>
          <div className="compare-grid">
            <div className="compare-card">
              <span className="compare-label normal">일반 대행사</span>
              <h3 className="compare-title">광고 집행 후 리포트</h3>
              <ul className="compare-list">
                <li>광고 세팅 후 성과 대기</li>
                <li>픽셀 설치 여부만 확인</li>
                <li>소재 교체 위주 대응</li>
                <li>월간 리포트 전달로 종료</li>
              </ul>
            </div>
            <div className="compare-card highlight">
              <span className="compare-label hiop">히옵 컨설팅</span>
              <h3 className="compare-title">트래킹 인프라부터 재설계</h3>
              <ul className="compare-list check">
                <li>CAPI 서버사이드 트래킹 구축</li>
                <li>픽셀 이벤트 정합성 정밀 진단</li>
                <li>캠페인 구조 · 예산 전략 설계</li>
                <li>데이터 기반 소재 방향성 제안</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="divider" /></div>

      {/* ── CORE SERVICE ── */}
      <section id="service">
        <div className="wrap">
          <p className="eyebrow">CORE SERVICE</p>
          <h2 className="section-title">
            제공 서비스 <span className="gradient-text">핵심 4가지</span>
          </h2>
          <div className="service-grid">
            {[
              {
                num: '01',
                name: '트래킹 인프라 설계',
                items: [
                  '픽셀 이벤트 정합성 진단',
                  'CAPI 서버사이드 트래킹',
                  'Advanced Event Matching',
                  'GA4 연동 크로스체크',
                ],
              },
              {
                num: '02',
                name: '광고 계정 구조 최적화',
                items: [
                  '캠페인/광고세트/소재 진단',
                  '리타겟팅 · LAL · 광범위 전략',
                  '예산 배분 및 입찰 설계',
                  'Advantage+ 적용 판단',
                ],
              },
              {
                num: '03',
                name: '성과 분석 & 개선',
                items: [
                  'CPM/CPC/CTR/ROAS 해석',
                  'Hook Rate · 3초 재생률 분석',
                  '월간 성과 리포트',
                  '매달 액션 플랜 제공',
                ],
              },
              {
                num: '04',
                name: '릴스 광고 전략',
                items: [
                  'PLV 기반 소재 분석',
                  '릴스 구조 설계',
                  '소재 방향성 제안',
                  '카탈로그 연계 전략',
                ],
              },
            ].map(s => (
              <div key={s.num} className="service-card">
                <div className="service-num">{s.num}</div>
                <h3 className="service-name">{s.name}</h3>
                <ul className="service-items">
                  {s.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap"><div className="divider" /></div>

      {/* ── CAPI & PIXEL ── */}
      <section id="capi">
        <div className="wrap">
          <p className="eyebrow">CAPI &amp; PIXEL</p>
          <h2 className="section-title">
            전환 API(CAPI)가 <span className="gradient-text">필요한 이유</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: 600 }}>
            iOS 14 이후 브라우저 픽셀만으로는 전환 데이터의 상당 부분이 누락됩니다.
          </p>

          <div className="capi-cards">
            <div className="card-red">
              <h4 className="capi-card-title" style={{ color: '#fca5a5' }}>
                브라우저 픽셀만 사용할 경우
              </h4>
              <p className="capi-card-body">
                iOS 정책 변화로 전환 데이터의 40~60%가 누락. ROAS가 실제보다 낮게 측정되어 
                Meta 알고리즘이 잘못된 방향으로 최적화됩니다.
              </p>
            </div>
            <div className="card-purple">
              <h4 className="capi-card-title" style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>
                CAPI 서버사이드 트래킹 적용 시
              </h4>
              <div className="flow-arrow">
                <span className="step">서버에서 직접 Meta로 데이터 전송</span>
                <span className="arrow">→</span>
                <span className="step">누락된 전환 신호 복구</span>
                <span className="arrow">→</span>
                <span className="step">알고리즘 속도 향상</span>
                <span className="arrow">→</span>
                <span className="step">실질적 ROAS 개선</span>
              </div>
            </div>
          </div>

          <div className="platform-grid">
            {[
              { name: 'Shopify', sub: 'CAPI 연동 가능' },
              { name: '카페24', sub: 'CAPI 연동 가능' },
              { name: 'WooCommerce', sub: 'CAPI 연동 가능' },
            ].map(p => (
              <div key={p.name} className="platform-card">
                <p className="platform-name">{p.name}</p>
                <p className="platform-sub">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap"><div className="divider" /></div>

      {/* ── PRICING ── */}
      <section id="pricing">
        <div className="wrap">
          <p className="eyebrow">PRICING PLAN</p>
          <h2 className="section-title">
            서비스 패키지 <span className="gradient-text">비교</span>
          </h2>
          <div className="pricing-grid">
            {/* STANDARD */}
            <div className="pricing-card">
              <p className="pricing-tier">STANDARD</p>
              <p className="pricing-name">진단 + 픽셀/CAPI 점검</p>
              <p className="pricing-price">200,000원</p>
              <ul className="pricing-list">
                {['계정 전체 구조 진단', '픽셀 이벤트 정합성 체크', 'CAPI 연동 상태 확인', '개선 액션 플랜 제공'].map(i => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <p className="pricing-meta">작업기간 5일 · 수정 1회</p>
              <a href="#contact" className="btn-pricing">상담 신청</a>
            </div>

            {/* DELUXE */}
            <div className="pricing-card featured">
              <div className="featured-badge">추천</div>
              <p className="pricing-tier">DELUXE</p>
              <p className="pricing-name">세팅 구현 + 월간 컨설팅</p>
              <p className="pricing-price">550,000원</p>
              <ul className="pricing-list">
                {['CAPI 직접 연동', '픽셀 재세팅 구현', '캠페인 구조 개편', '소재 방향성 제안'].map(i => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <p className="pricing-meta">작업기간 14일 · 수정 2회</p>
              <a href="#contact" className="btn-pricing featured">상담 신청 →</a>
            </div>

            {/* PREMIUM */}
            <div className="pricing-card">
              <p className="pricing-tier">PREMIUM</p>
              <p className="pricing-name">풀 컨설팅 + 2개월 관리</p>
              <p className="pricing-price">1,200,000원</p>
              <ul className="pricing-list">
                {['릴스 광고 전략 수립', '타겟 오디언스 구조 설계', '격주 성과 점검 + 리포트', '무제한 수정 지원'].map(i => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <p className="pricing-meta">작업기간 30일 · 무제한 수정</p>
              <a href="#contact" className="btn-pricing">상담 신청</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section id="contact" className="form-section">
        <div className="wrap">
          <div className="form-inner">
            <div className="form-left">
              <p className="eyebrow">상담 신청</p>
              <h2>
                지금 바로<br />
                <span className="gradient-text">무료 진단</span>을 받아보세요
              </h2>
              <p>
                현재 픽셀 상태, CAPI 연동 여부, 광고 계정 구조까지
                데이터 기반으로 점검해 드립니다.
              </p>
              <ul className="form-benefits">
                <li><span className="ico">✓</span> 24시간 내 담당자 연락</li>
                <li><span className="ico">📊</span> 무료 픽셀 & CAPI 사전 진단</li>
                <li><span className="ico">🎯</span> 맞춤형 패키지 제안</li>
              </ul>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>© 2025 HI-OP 히옵 · Meta 광고 전문 컨설팅. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
