import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';

export const metadata = {
  title: '히옵(HI-OP) | TikTok & Moloco 퍼포먼스 광고',
  description: '가장 핫한 숏폼 플랫폼 틱톡과 글로벌 머신러닝 기반 RTB 몰로코 광고 최적화. 히옵만의 크리에이티브 기획과 알고리즘 튜닝으로 최대 ROAS를 달성하세요.',
};

export default function TikTokMolocoPage() {
  return (
    <>
      <PixelScrollTracker />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob blob-tl" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.3) 0%, transparent 70%)' }} />
        <div className="hero-blob blob-br" style={{ background: 'radial-gradient(circle, rgba(254,44,85,0.2) 0%, transparent 70%)' }} />

        <nav className="hero-nav">
          <div className="hero-nav-inner">
            <span className="nav-logo" style={{ background: '#00f2fe', color: '#000' }}>HI-OP</span>
            <span className="nav-dot">·</span>
            <span className="nav-brand">히옵 · TikTok & Moloco 전문가</span>
          </div>
        </nav>

        <div className="wrap hero-body">
          <div className="hero-inner">
            <div className="badge fade-up" style={{ color: '#00f2fe', borderColor: 'rgba(0,242,254,0.4)', background: 'rgba(0,242,254,0.1)' }}>
              <span className="dot" style={{ background: '#00f2fe' }} />
              SHORT-FORM & RTB SPECIALIST
            </div>
            <h1 className="hero-h1 fade-up delay-1">
              강력한 알고리즘과 만나는<br />
              <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #00f2fe, #fe2c55)', WebkitBackgroundClip: 'text', color: 'transparent' }}>숏폼 & RTB 퍼포먼스</span>
            </h1>
            <p className="hero-sub fade-up delay-2">
              트렌디한 틱톡 크리에이티브 기획부터 몰로코 머신러닝 최적화까지
            </p>
            <div className="hero-cta fade-up delay-2">
              <a href="#contact" className="btn-hero-primary" style={{ background: '#00f2fe', color: '#000' }}>무료 상담 신청하기 →</a>
              <a href="#why" className="btn-hero-ghost" style={{ color: '#00f2fe', borderColor: 'rgba(0,242,254,0.4)' }}>서비스 살펴보기</a>
            </div>
            <div className="hero-tags fade-up delay-3">
              {['틱톡 숏폼 기획', '크리에이티브 최적화', 'Moloco RTB', '머신러닝 타겟팅', '글로벌 캠페인'].map(t => (
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
            일반 대행사와 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #00f2fe, #fe2c55)', WebkitBackgroundClip: 'text', color: 'transparent' }}>히옵의 차이</span>
          </h2>
          <div className="compare-grid">
            <div className="compare-card">
              <span className="compare-label normal">일반 대행사</span>
              <h3 className="compare-title">단순 영상 업로드 위주 운영</h3>
              <ul className="compare-list">
                <li>기존 영상을 그대로 틱톡에 재활용</li>
                <li>알고리즘 고려 없는 일방적 송출</li>
                <li>머신러닝 학습 지연 및 예산 낭비</li>
                <li>단발성 트래픽 유입에 그침</li>
              </ul>
            </div>
            <div className="compare-card highlight" style={{ borderColor: 'rgba(0,242,254,0.4)', background: 'rgba(0,242,254,0.05)' }}>
              <span className="compare-label hiop" style={{ color: '#00f2fe', borderColor: 'rgba(0,242,254,0.4)', background: 'rgba(0,242,254,0.1)' }}>히옵 컨설팅</span>
              <h3 className="compare-title">알고리즘 튜닝 & 네이티브 소재 기획</h3>
              <ul className="compare-list check">
                <li style={{ '--primary-light': '#00f2fe' } }>틱톡 감성에 맞는 Hook-driven 숏폼 기획</li>
                <li style={{ '--primary-light': '#00f2fe' } }>초기 3초 체류시간(Retention) 극대화 전략</li>
                <li style={{ '--primary-light': '#00f2fe' } }>몰로코(Moloco) RTB 머신러닝 최적화 설계</li>
                <li style={{ '--primary-light': '#00f2fe' } }>ROAS 중심의 앱스플라이어/에어브릿지 연동 진단</li>
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
            제공 서비스 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #00f2fe, #fe2c55)', WebkitBackgroundClip: 'text', color: 'transparent' }}>핵심 4가지</span>
          </h2>
          <div className="service-grid">
            {[
              {
                num: '01',
                name: '틱톡 크리에이티브 기획',
                items: [
                  '트렌드 사운드 및 챌린지 활용 전략',
                  'UGC(User Generated Content) 스타일 기획',
                  '초반 3초 Hook 설계 및 스토리보드',
                  'A/B 테스트를 통한 고효율 소재 발굴',
                ],
              },
              {
                num: '02',
                name: '알고리즘 최적화',
                items: [
                  '틱톡 For You Page(추천 탭) 노출 극대화',
                  'Engagement(좋아요, 공유) 유도 장치',
                  '입찰 전략 및 타겟팅 고도화',
                  '스파크 애즈(Spark Ads) 활용',
                ],
              },
              {
                num: '03',
                name: 'Moloco RTB 퍼포먼스',
                items: [
                  '글로벌 프로그래매틱 광고 세팅',
                  '머신러닝 알고리즘 학습 최적화',
                  'CPA/ROAS 목표 기반 입찰 전략',
                  '고가치 유저(LTV) 리타겟팅',
                ],
              },
              {
                num: '04',
                name: 'MMP 연동 & 데이터 분석',
                items: [
                  'AppsFlyer, Airbridge 등 MMP 연동',
                  'Post-back 데이터 정합성 검증',
                  '어트리뷰션 윈도우 기반 성과 측정',
                  '인앱 이벤트 퍼널 분석',
                ],
              },
            ].map(s => (
              <div key={s.num} className="service-card">
                <div className="service-num" style={{ color: '#00f2fe', background: 'rgba(0,242,254,0.1)' }}>{s.num}</div>
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

      {/* ── MMP & TRACKING ── */}
      <section id="capi">
        <div className="wrap">
          <p className="eyebrow">APP PERFORMANCE</p>
          <h2 className="section-title">
            정확한 데이터 어트리뷰션이 <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #00f2fe, #fe2c55)', WebkitBackgroundClip: 'text', color: 'transparent' }}>필요한 이유</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: 600 }}>
            앱 캠페인과 숏폼 트래픽의 성공은 빠르고 정확한 데이터 피드백 루프에 달려 있습니다.
          </p>

          <div className="capi-cards">
            <div className="card-red">
              <h4 className="capi-card-title" style={{ color: '#fca5a5' }}>
                기본 세팅만 사용할 경우
              </h4>
              <p className="capi-card-body">
                앱 설치 이후의 유저 행동(구매, 장바구니 등)이 제대로 매체에 전달되지 않아, 
                알고리즘이 '설치만 하고 이탈하는 유저'에게 광고를 낭비하게 됩니다.
              </p>
            </div>
            <div className="card-purple" style={{ borderColor: 'rgba(0,242,254,0.4)' }}>
              <h4 className="capi-card-title" style={{ color: '#00f2fe', marginBottom: '1rem' }}>
                히옵의 MMP & 머신러닝 최적화 적용 시
              </h4>
              <div className="flow-arrow" style={{ '--primary-light': '#00f2fe', '--border-purple': 'rgba(0,242,254,0.4)' }}>
                <span className="step" style={{ color: '#00f2fe', background: 'rgba(0,242,254,0.1)', borderColor: 'rgba(0,242,254,0.4)' }}>정확한 Post-back 매핑</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#00f2fe', background: 'rgba(0,242,254,0.1)', borderColor: 'rgba(0,242,254,0.4)' }}>핵심 인앱 이벤트 학습</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#00f2fe', background: 'rgba(0,242,254,0.1)', borderColor: 'rgba(0,242,254,0.4)' }}>알고리즘 예측도 상승</span>
                <span className="arrow">→</span>
                <span className="step" style={{ color: '#00f2fe', background: 'rgba(0,242,254,0.1)', borderColor: 'rgba(0,242,254,0.4)' }}>LTV 높은 진성 유저 획득</span>
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
                <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #00f2fe, #fe2c55)', WebkitBackgroundClip: 'text', color: 'transparent' }}>무료 진단</span>을 받아보세요
              </h2>
              <p>
                숏폼 소재 방향성, MMP 연동 상태, RTB 캠페인 효율까지
                데이터 기반으로 점검해 드립니다.
              </p>
              <ul className="form-benefits">
                <li><span className="ico">✓</span> 24시간 내 담당자 연락</li>
                <li><span className="ico">📊</span> 소재 기획 & 데이터 인프라 진단</li>
                <li><span className="ico">🎯</span> 맞춤형 패키지 제안</li>
              </ul>
            </div>
            <div>
              <LeadForm source="tiktok-moloco" />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>© 2025 HI-OP 히옵 · TikTok & Moloco 광고 전문. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
