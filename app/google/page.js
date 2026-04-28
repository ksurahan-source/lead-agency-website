import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';

export const metadata = {
  title: '히옵(HI-OP) | Google 광고 전문 컨설팅',
  description: '검색 의도 분석부터 유튜브 풀퍼널 전략까지 데이터 기반 Google 광고 컨설팅. GTM 인프라부터 다시 설계합니다.',
};

export default function GooglePage() {
  return (
    <>
      <PixelScrollTracker />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob blob-tl" style={{ background: 'radial-gradient(circle, rgba(234,67,53,0.3) 0%, transparent 70%)' }} />
        <div className="hero-blob blob-br" style={{ background: 'radial-gradient(circle, rgba(66,133,244,0.2) 0%, transparent 70%)' }} />

        <nav className="hero-nav">
          <div className="hero-nav-inner">
            <span className="nav-logo" style={{ background: '#EA4335' }}>HI-OP</span>
            <span className="nav-dot">·</span>
            <span className="nav-brand">히옵 · Google 광고 전문 컨설팅</span>
          </div>
        </nav>

        <div className="wrap hero-body">
          <div className="hero-inner">
            <div className="badge fade-up" style={{ color: '#EA4335', borderColor: 'rgba(234,67,53,0.4)', background: 'rgba(234,67,53,0.1)' }}>
              <span className="dot" style={{ background: '#EA4335' }} />
              GOOGLE ADS SPECIALIST
            </div>
            <h1 className="hero-h1 fade-up delay-1">
              검색 의도 분석부터<br />
              <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #EA4335, #FBBC05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Google 광고를</span><br />
              다시 설계합니다
            </h1>
            <p className="hero-sub fade-up delay-2">
              GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반 컨설팅
            </p>
            <div className="hero-cta fade-up delay-2">
              <a href="#contact" className="btn-hero-primary" style={{ background: '#EA4335' }}>무료 상담 신청하기 →</a>
              <a href="#why" className="btn-hero-ghost" style={{ color: '#EA4335', borderColor: 'rgba(234,67,53,0.4)' }}>서비스 살펴보기</a>
            </div>
            <div className="hero-tags fade-up delay-3">
              {['GTM 트래킹 설계', '검색 의도 분석', '유튜브 광고', '실적 최대화(PMax)', 'GA4 연동'].map(t => (
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
            일반 대행사와 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #EA4335, #FBBC05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>히옵의 차이</span>
          </h2>
          <div className="compare-grid">
            <div className="compare-card">
              <span className="compare-label normal">일반 대행사</span>
              <h3 className="compare-title">단순 키워드 입찰 위주 대응</h3>
              <ul className="compare-list">
                <li>표면적인 검색어만 세팅 후 성과 대기</li>
                <li>단순 태그 부착 여부만 확인</li>
                <li>키워드 입찰가 조정 위주 대응</li>
                <li>월간 리포트 전달로 종료</li>
              </ul>
            </div>
            <div className="compare-card highlight" style={{ borderColor: 'rgba(234,67,53,0.4)', background: 'rgba(234,67,53,0.05)' }}>
              <span className="compare-label hiop" style={{ color: '#EA4335', borderColor: 'rgba(234,67,53,0.4)', background: 'rgba(234,67,53,0.1)' }}>히옵 컨설팅</span>
              <h3 className="compare-title">데이터 기반 입찰 & 머신러닝 최적화</h3>
              <ul className="compare-list check">
                <li style={{ '--primary-light': '#EA4335' } }>GTM(Google Tag Manager) 정밀 추적 구축</li>
                <li style={{ '--primary-light': '#EA4335' } }>GA4 연동을 통한 고객 행동 여정 분석</li>
                <li style={{ '--primary-light': '#EA4335' } }>유튜브/검색/PMax 등 풀퍼널 캠페인 설계</li>
                <li style={{ '--primary-light': '#EA4335' } }>검색 의도 기반 키워드 및 소재 방향성 제안</li>
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
            제공 서비스 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #EA4335, #FBBC05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>핵심 4가지</span>
          </h2>
          <div className="service-grid">
            {[
              {
                num: '01',
                name: 'GTM 기반 트래킹 설계',
                items: [
                  'Google Tag Manager 서버사이드 구축',
                  '향상된 전환(Enhanced Conversions) 연동',
                  '맞춤 이벤트 정합성 진단',
                  'GA4 연동 크로스체크',
                ],
              },
              {
                num: '02',
                name: '검색 & 디스플레이 최적화',
                items: [
                  '검색 의도 기반 키워드 포트폴리오 구축',
                  '스마트 입찰(Smart Bidding) 최적화',
                  '리타겟팅 · 동적 타겟팅 전략',
                  '광고 문안(Copy) 및 확장 에셋 개선',
                ],
              },
              {
                num: '03',
                name: '실적 최대화(PMax) 극대화',
                items: [
                  '자산 그룹 세분화 및 시그널 최적화',
                  'PMax 알고리즘 학습 촉진 전략',
                  '저효율 자산 진단 및 교체 가이드',
                  '크로스 채널 예산 배분',
                ],
              },
              {
                num: '04',
                name: '유튜브 비디오 캠페인',
                items: [
                  '인지-고려-전환 풀퍼널 영상 기획',
                  'VRC(Video Reach Campaign) 설계',
                  '타겟 오디언스 구조 설계',
                  '조회율(VTR) 기반 성과 분석',
                ],
              },
            ].map(s => (
              <div key={s.num} className="service-card">
                <div className="service-num" style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)' }}>{s.num}</div>
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

      {/* ── GTM & GA4 ── */}
      <section id="capi">
        <div className="wrap">
          <p className="eyebrow">GTM &amp; GA4</p>
          <h2 className="section-title">
            향상된 전환과 GTM이 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #EA4335, #FBBC05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>필요한 이유</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: 600 }}>
            단순 스크립트 삽입만으로는 고객의 복잡한 전환 여정을 온전히 추적할 수 없습니다.
          </p>

          <div className="capi-cards">
            <div className="card-red">
              <h4 className="capi-card-title" style={{ color: '#fca5a5' }}>
                기본 태그만 사용할 경우
              </h4>
              <p className="capi-card-body">
                쿠키 제한 및 서드파티 데이터 차단으로 인해 전환 누락 발생. ROAS가 실제보다 낮게 측정되어 구글 머신러닝이 잘못된 타겟에게 최적화됩니다.
              </p>
            </div>
            <div className="card-purple" style={{ borderColor: 'rgba(234,67,53,0.4)' }}>
              <h4 className="capi-card-title" style={{ color: '#EA4335', marginBottom: '1rem' }}>
                향상된 전환(Enhanced Conversions) 적용 시
              </h4>
              <div className="flow-arrow" style={{ '--primary-light': '#EA4335', '--border-purple': 'rgba(234,67,53,0.4)' }}>
                <span className="step" style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)', borderColor: 'rgba(234,67,53,0.4)' }}>고객 해시 데이터 전송</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)', borderColor: 'rgba(234,67,53,0.4)' }}>누락된 전환 신호 복구</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)', borderColor: 'rgba(234,67,53,0.4)' }}>스마트 입찰 고도화</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)', borderColor: 'rgba(234,67,53,0.4)' }}>실질적 ROAS 개선</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="divider" /></div>

      {/* ── LEAD FORM ── */}
      <section id="contact" className="form-section">
        <div className="wrap">
          <div className="form-inner">
            <div className="form-left">
              <p className="eyebrow">상담 신청</p>
              <h2>
                지금 바로<br />
                <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #EA4335, #FBBC05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>무료 진단</span>을 받아보세요
              </h2>
              <p>
                현재 GTM 상태, 구글 광고 캠페인 구조, 타겟팅 여부까지
                데이터 기반으로 점검해 드립니다.
              </p>
              <ul className="form-benefits">
                <li><span className="ico">✓</span> 24시간 내 담당자 연락</li>
                <li><span className="ico">📊</span> 무료 GTM & 캠페인 사전 진단</li>
                <li><span className="ico">🎯</span> 맞춤형 패키지 제안</li>
              </ul>
            </div>
            <div>
              <LeadForm source="google" />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>© 2025 HI-OP 히옵 · Google 광고 전문 컨설팅. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
