import { BarChart3, Check, Eye, ShieldCheck, Target } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import CreativeVelocityForm from '@/components/CreativeVelocityForm';
import EventCountdown from '@/components/EventCountdown';
import CtaButton from '@/components/home/CtaButton';
import ReelShowcase from '@/components/home/ReelShowcase';
import Reveal from '@/components/home/Reveal';
import HomeSchema from '@/components/home/HomeSchema';
import FloatCta from '@/components/home/FloatCta';
import LeadPageSignal from '@/components/LeadPageSignal';
import MobileStickyCTA from '@/components/MobileStickyCTA';

const navItems = [
  ['왜 필요한가', '#why'],
  ['측정 증거', '#measure'],
  ['예시 영상', '#proof'],
  ['오퍼', '#offer'],
];

// HOOK → the common fear, then the ①②③ self-qualifier (lead businesses)
const qualifiers = [
  ['01', '리드 단가가 계속 오릅니다', '클릭은 느는데, 정작 유효 문의는 줄어듭니다.'],
  ['02', '문의는 오는데, 계약이 안 됩니다', '폼만 채우는 가짜 리드에 영업팀이 지쳐갑니다.'],
  ['03', '좋은 서비스인데, 사람들은 모릅니다', '경쟁사보다 나은데, 문의는 그쪽으로 갑니다.'],
];

// AGITATE → problem at 3 depths (external / internal / philosophical)
const depths = [
  {
    k: '“더 받고 싶은데”',
    t: '계약 가능성 있는 잠재고객에게\n가는 길이 끊겨있다.',
    d: '광고는 아무나 클릭합니다. 그러나 ‘계약할 사람’을 골라 데려오는 구조가 없으면, 리드 단가는 계속 오릅니다.',
  },
  {
    k: '“이게 맞나 싶고”',
    t: '리드 단가가 왜 오르는지\n보이지 않는다.',
    d: '어떤 영상이, 어떤 랜딩이 ‘계약되는 리드’를 만들었는지 보이지 않으니, 다음 예산도 감으로 쓸 수밖에 없습니다.',
  },
  {
    k: '“그래서 억울하고”',
    t: '좋은 걸 만든 사람이, 안 보인다는 이유로 지는 건 억울하다',
    d: '문제는 광고를 모르는 게 아닙니다. 계약으로 가는 길이 보이지 않는다는 것입니다.',
  },
];

const guidePoints = [
  '한국 Meta 광고 월 65억+ · 100개+ 계정 운영 경험.',
  '광고비는 광고주가 직접 집행하고 통제합니다. 히옵은 가져가지 않습니다.',
  '영상 · EMQ9+ 웹사이트 · 집행까지 — 리드 단가를 만드는 전 과정을 직접 설계합니다.',
  '큰 대행료 없이 — 단가를 낮추는 자산(영상·웹사이트) 구축과 운영으로 진행합니다.',
];

const planSteps = [
  ['01', '무료 리드 진단', '지금 리드 단가가 왜 비싼지, 어디서 새는지부터 함께 봅니다.', false],
  ['02', 'EMQ9+ 웹사이트·측정 세팅', '메타가 “계약할 사람”을 학습하도록 신호 품질(EMQ)을 9+로 끌어올립니다.', true],
  ['03', '문제→해결 영상 테스트', '잠재고객만 데려오는 숏폼을 짧게 쪼개 빠르게 테스트합니다.', false],
  ['04', '유효리드 기준 운영', '폼이 아니라 ‘계약되는 리드’를 최저 단가로 — 주간 단가 리포트로 함께 봅니다.', false],
];

const measureStats = [
  ['9.4 / 10', '이벤트 매칭 품질(EMQ) — 메타가 “계약할 사람”을 학습합니다'],
  ['+91.8%', '픽셀만 쓸 때보다 더 잡아낸 실제 전환 (운영 계정 기준)'],
  ['0원', '측정 시작 비용 — 첫 6주 무료입니다.'],
];

// AUTHORITY → hi-ob 창업팀 실제 운영 트랙레코드 (집계·익명)
const authorityStats = [
  ['$5M+', '월 Meta 광고 운영 규모 (한국 마켓 기준 약 65억원)'],
  ['100+', '관리한 광고 계정'],
  ['$23,000+', '단일 계정 기준 일일 최대 지출 금액'],
];

const reels = [
  {
    src: '/showcase/hiob-marketing-ad-ko-final.mp4',
    poster: '/showcase/poster-ad.jpg',
    tag: '문제 → 해결',
    title: '히옵 서비스 광고',
    caption: '막막한 문제를 먼저 짚고, 측정과 소재 구조로 길을 보여주는 예시',
  },
  {
    src: '/showcase/viewok-goggles.mp4',
    poster: '/showcase/poster-viewok-goggles.jpg',
    tag: '실제 클라이언트',
    title: '뷰오케이 · 물안경 김서림방지',
    caption: '히옵이 제작한 실제 클라이언트(뷰오케이) 제품 광고 영상',
  },
  {
    src: '/showcase/viewok-antifog.mp4',
    poster: '/showcase/poster-viewok-antifog.jpg',
    tag: '실제 클라이언트',
    title: '뷰오케이 · 안티포그 스프레이',
    caption: '제품의 핵심을 짧은 세로 영상으로 — 히옵 제작',
  },
];

const offerItems = [
  ['영상 제작', '1편 5만원', '잠재고객만 데려오는 문제→해결 숏폼. 런칭 이벤트 한정, 최대 10편까지 제작합니다.', false],
  ['EMQ9+ 랜딩 구축', '150만원~', '전환 설계 + 픽셀·CAPI 매칭 세팅. 1회 구축으로 끝나도 남는 ‘단가를 낮추는 자산’입니다.', true],
  ['전담 운영 · 측정', '월 50만원', '셋업·광고·측정까지 2인 전담. 측정은 첫 6주 무료, 이후 트래픽 3,000당 월 $100(서버 실비). 광고비는 광고주 직접.', false],
  ['성과 인센티브', '옵션', 'CPL 목표를 하회할 때만 더하는 옵션 — 모호한 광고비 %가 아니라 ‘단가’로 정산합니다.', false],
];

const reviews = [
  ['클릭은 많은데 상담 전화가 안 왔어요. 랜딩과 영상을 같이 고치고 나서야 ‘진짜 문의’가 들어오기 시작했습니다.', '교육·학원 원장'],
  ['대행사는 매달 고정비가 부담이었는데, 여긴 영상·웹사이트라는 자산이 남아서 시작 문턱이 낮았어요.', '병원 마케팅 담당'],
  ['리드 단가가 왜 오르는지 늘 깜깜이였는데, 어떤 영상이 계약을 만드는지 숫자로 보이니 예산 쓰는 게 안 무서워졌어요.', 'B2B 솔루션 대표'],
  ['폼만 채우는 가짜 문의에 영업팀이 지쳤었는데, 측정을 붙이고 나서 계약되는 리드 비중이 분명히 올랐습니다.', '부동산 분양 마케터'],
  ['광고비를 제 계정에서 직접 집행하니 통제권이 저한테 있어 믿음이 갔어요. 같은 숫자를 함께 보는 것도 좋았고요.', '법률·세무 사무소'],
  ['영상 한 편 5만원이라 여러 개 테스트하고 반응 좋은 것만 키웠습니다. 작게 실험하고 이긴 것에 베팅하는 구조가 합리적이에요.', '뷰티·성형 마케터'],
];

const faqs = [
  ['히옵은 어떻게 리드 단가를 낮추나요?', '리드 단가는 광고 입찰만으로 정해지지 않습니다. ① 영상(클릭 단가) ② EMQ9+ 웹사이트(전환 단가) ③ 집행(유효 단가) — 단가를 만드는 세 가지를 전부 설계합니다. 특히 일반 대행사가 못 건드리는 웹사이트의 신호 품질(EMQ)까지 우리가 만들어, 메타가 ‘계약할 사람’을 찾도록 학습시킵니다.'],
  ['EMQ9+가 뭔가요? 왜 중요한가요?', 'EMQ(Event Match Quality)는 메타가 “이 문의가 누구의 행동인지” 매칭하는 정확도(10점)입니다. 리드 이벤트는 구매보다 훨씬 드물어, 매칭이 새면 알고리즘이 ‘좋은 리드’를 학습하지 못하고 단가가 오릅니다. 히옵은 CAPI로 해시 식별자를 정확히 실어 EMQ를 9+로 만듭니다.'],
  ['광고비도 히옵에 내나요?', '아닙니다. 광고비는 광고주 계정에서 직접 집행하고 통제합니다. 히옵은 광고비를 받거나 대납하지 않습니다.'],
  ['‘성공하면 광고비 몇 %’로 진행하나요?', '리드는 매출이 아니라서 그 방식은 분쟁이 생기기 쉽습니다. 그래서 히옵은 비용을 모호한 성과 %가 아니라 자산(영상·웹사이트)+운영에 붙입니다. 원하시면 CPL 목표 하회 시 인센티브를 더합니다.'],
  ['비용은 정확히 어떻게 되나요?', '① 영상 1편 5만원 (런칭 한정, 최대 10편) ② EMQ9+ 랜딩 구축 150만원~ (1회, 자산으로 남음) ③ 전담 운영 월 50만원 (측정 첫 6주 무료, 이후 트래픽 3,000당 월 $100 서버 실비) ④ (옵션) CPL 목표 하회 시 인센티브. 광고비는 광고주가 직접 집행·통제하며, 히옵은 광고비를 가져가지 않습니다.'],
  ['랜딩페이지(웹사이트)가 없어도 되나요?', '없어도 됩니다. EMQ9+ 랜딩을 새로 구축해 드리며, 그 자체가 단가를 낮추는 자산으로 남습니다. 기존 사이트가 있으면 측정·전환 구조만 보강합니다.'],
  ['측정 결과는 믿을 수 있나요?', '메타 광고 성과를 광고주도 같은 측정 화면으로 함께 봅니다. 정산 요율과 기준은 시작 전에 함께 정합니다.'],
  ['성과를 보장하나요?', '보장하지 않습니다. 대신 계약을 추적할 수 있는 구조, 빠르게 테스트하는 영상, EMQ9+ 신호로 리드 단가를 구조적으로 낮추는 길을 함께 만듭니다.'],
];

export const metadata = {
  title: '리드 단가, 계속 오르시나요? | 히옵 마케팅',
  description:
    '리드 단가가 계속 오르는 광고주를 위한 구조. 영상 제작 + EMQ9+ 웹사이트 + 광고 집행으로 ‘계약되는 리드’를 최저 단가로. 월 65억 계정을 운영해온 팀이 무료로 리드 계정을 진단합니다. 측정 6주 무료, 광고비는 직접 집행.',
  alternates: { canonical: '/lead' },
  openGraph: {
    title: '리드 단가, 계속 오르시나요? | 히옵 마케팅',
    description: '영상 + EMQ9+ 웹사이트 + 집행 = 리드 최저단가. 월 65억 계정을 운영해온 팀이 무료로 진단합니다.',
    url: 'https://hi-ob.com/lead',
    siteName: '히옵 마케팅',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '리드 단가, 계속 오르시나요?',
    description: '영상 + EMQ9+ 웹사이트 + 집행 = 리드 최저단가. 월 65억 계정을 운영해온 팀의 무료 진단.',
  },
};

export default function LeadPage() {
  return (
    <main className="hp">
      <HomeSchema faqs={faqs} />
      <FloatCta />
      <LeadPageSignal />
      <noscript>
        <style>{'.hp-reveal{opacity:1!important;transform:none!important}'}</style>
      </noscript>

      {/* ── launch slot ── */}
      <div className="hp-topslot">
        <div className="hp-wrap">
          <div>
            <b>런칭 이벤트 진행 중</b>
            <span>6주 무료 측정 · 영상 1편 5만원 · 광고비는 직접 집행</span>
          </div>
          <EventCountdown variant="bar" />
        </div>
      </div>

      {/* ── nav ── */}
      <nav className="hp-nav" style={{ padding: "1.05rem clamp(1rem, 4vw, 2rem)" }}>
        <div className="hp-wrap">
          <Link href="/" className="hp-brand" aria-label="hiob 홈">
            <Logo height={28} />
          </Link>
          <div className="hp-nav-links" aria-label="페이지 섹션 이동">
            {navItems.map(([label, href]) => (
              <a key={href + label} href={href}>{label}</a>
            ))}
          </div>
          <div className="hp-nav-cta">
            <Link href="/" className="hp-track-link">이커머스 마케팅 →</Link>
            <CtaButton location="nav" variant="ink">무료 리드 진단</CtaButton>
          </div>
        </div>
      </nav>

      {/* ── HERO : the common fear + ①②③ qualifier ── */}
      <header className="hp-hero">
        <div className="hp-wrap hp-hero-grid">
          <div className="hp-hero-copy">
            <span className="hp-eyebrow">병원 · 교육 · 부동산 · B2B — 리드가 필요한 브랜드에게</span>
            <h1 className="hp-display" style={{ fontSize: "clamp(2.1rem, 8vw, 4rem)", wordBreak: "keep-all" }}>
              <span className="hp-line soft">광고만 돌려선</span>
              <span className="hp-line"><span className="hp-underline">리드 단가</span> 안 내려갑니다</span>
            </h1>
            <p className="hp-lead hp-hero-sub">
              리드 단가의 80%는 영상·웹사이트·신호 품질에서 갈립니다. 영상 제작 + EMQ9+ 웹사이트 + 광고 집행 —
              단가를 만드는 셋을 전부 설계해 ‘계약되는 리드’를 최저 단가로 만듭니다. 먼저 무료로 진단해 드립니다.
            </p>
            <div className="hp-hero-actions">
              <CtaButton location="hero_primary">무료 리드 진단</CtaButton>
              <CtaButton href="#measure" location="hero_secondary" variant="ghost">어떻게 단가를 낮추는지 보기</CtaButton>
            </div>
          </div>

          <div className="hp-qual">
            <div className="hp-qual-top">이 중 <span>하나라도</span> 해당되면, 히옵이 정답입니다</div>
            <div className="hp-qual-note">하나의 이유만으로도 충분합니다.</div>
            <div className="hp-qual-list">
              {qualifiers.map(([num, title, body]) => (
                <div className="hp-qual-item" key={num}>
                  <span className="hp-qual-num">{num}</span>
                  <div>
                    <b>{title}</b>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── AUTHORITY : 창업팀 운영 트랙레코드 ── */}
      <section className="hp-authority" aria-label="hi-ob 팀 운영 실적">
        <div className="hp-wrap">
          <span className="hp-eyebrow"><span style={{ textTransform: 'none' }}>hi-ob</span>을 만든 팀이 운영해온 마케팅 규모</span>
          <div className="hp-auth-grid">
            {authorityStats.map(([big, label]) => (
              <div className="hp-auth-stat" key={big}>
                <b>{big}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="hp-auth-note">
            위의 지표들은 한국 시장을 대상으로 직접 집행했던 경력입니다. 규모 있는 비즈니스의 마케팅을 운영한 경험으로, 리드 단가를 낮추는 길을 데이터로 파악합니다.
          </p>
        </div>
      </section>

      {/* ── AGITATE : 3 depths ── */}
      <section className="hp-section" id="why">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">왜 리드 단가가 안 내려갈까</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>서비스는 이미 좋습니다.<br />끊긴 건 ‘계약할 사람’에게 가는 길입니다.</h2>
            <p className="hp-lead">
              우리가 두려운 건 하나입니다. <strong>계약 안 될 클릭에 돈을 소비하는 것.</strong>
            </p>
          </Reveal>
          <div className="hp-depths">
            {depths.map(({ k, t, d }, i) => (
              <Reveal as="article" className="hp-depth" key={k} delay={i * 90}>
                <span className="hp-depth-k">{k}</span>
                <h3 className="hp-h3">{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDE : the founders ── */}
      <section className="hp-section" id="guide">
        <div className="hp-wrap hp-guide-grid">
          <Reveal as="figure" className="hp-guide-photo">
            <img
              src="/team/founders.jpg"
              alt="히옵 마케팅 공동창업팀"
              width={1400}
              height={1050}
              loading="lazy"
            />
            <figcaption>가장 하이테크한 마케팅은, 가장 아날로그합니다 — 히옵 마케팅</figcaption>
          </Reveal>
          <Reveal className="hp-guide-copy" delay={100}>
            <span className="hp-eyebrow">큰돈을 굴려본 팀이 만듭니다</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>월 65억을 굴리던 팀이, 당신의 리드 단가를 진단합니다.</h2>
            <p className="hp-lead">
              hi-ob을 만든 팀은 한국에서 월 65억 규모의 Meta 광고를 100개 넘는 계정으로 운영했습니다.
              우리는 광고만 대행하지 않습니다 — 영상, EMQ9+ 웹사이트, 집행까지 단가를 만드는 전 과정을
              직접 만들어, 리드 단가를 구조적으로 낮춥니다.
            </p>
            <ul className="hp-guide-points">
              {guidePoints.map((point) => (
                <li key={point}><Check size={18} aria-hidden="true" />{point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── PLAN : the path ── */}
      <section className="hp-section" id="plan">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">길은 단순합니다</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>무료 진단으로 시작해, EMQ9+ 신호와 영상으로 ‘계약되는 리드’를 최저 단가로 만듭니다.</h2>
          </Reveal>
          <div className="hp-plan">
            {planSteps.map(([num, title, body, key]) => (
              <div className={`hp-step${key ? ' is-key' : ''}`} key={num}>
                <span className="hp-step-n">STEP {num}</span>
                <h3 className="hp-h3">{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF : measurement / EMQ9+ ── */}
      <section className="hp-section hp-dark" id="measure">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow is-light"><Eye size={14} aria-hidden="true" /> 이제, 보입니다</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>감이 아니라 측정. 어떤 영상·랜딩이 ‘계약되는 리드’를 만들었는지, 숫자로 보입니다.</h2>
            <p className="hp-lead">
              조회수·클릭이 아니라 ‘계약되는 리드’를 봅니다. EMQ가 9+로 올라갈수록 메타는 계약할 사람을 더
              정확히 찾고, 리드 단가는 내려갑니다. 아래는 실제 운영 대시보드입니다(고객 정보는 가렸습니다).
            </p>
          </Reveal>
          <div className="hp-measure-grid">
            <Reveal as="figure" className="hp-measure-figure">
              <div className="bar" aria-hidden="true"><i /><i /><i /></div>
              <img
                src="/proof/measurement-lift.jpg"
                alt="실제 메타 이벤트 관리자 대시보드 — 서버 전환으로 회수한 추가 전환 +91.8%, 이벤트 매칭 품질 9.4/10"
                width={1100}
                height={840}
                loading="lazy"
              />
            </Reveal>
            <div className="hp-stats">
              {measureStats.map(([big, small], i) => (
                <Reveal className="hp-stat" key={big} delay={i * 90}>
                  <b>{big}</b>
                  <span>{small}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF : reels ── */}
      <section className="hp-section" id="proof">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">히옵이 직접 만드는 광고</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>예쁜 영상이 아니라, 문제를 건드려 ‘진짜 잠재고객’만 데려오는 영상.</h2>
            <p className="hp-lead">
              업종마다 다른 시작, 문제 제기, 후기, 비교 영상을 빠르게 만들어 테스트합니다.
              아래는 히옵이 직접 만든 예시입니다.
            </p>
          </Reveal>
          <ReelShowcase reels={reels} />
        </div>
      </section>

      {/* ── OFFER ── */}
      <section className="hp-section" id="offer">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">이번 런칭 이벤트 오퍼</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>’광고비 몇 %’가 아니라, 단가를 낮추는 자산을 드립니다.</h2>
            <p className="hp-lead">
              리드는 매출이 아니라서 성과 %는 분쟁이 생기기 쉽습니다. 그래서 비용을 자산(영상·웹사이트)+운영에
              붙입니다 — 광고비 직접 통제, 영상 고정 단가, 끝나도 남는 EMQ9+ 웹사이트.
            </p>
          </Reveal>
          <div className="hp-offer-grid">
            {offerItems.map(([label, value, body, key]) => (
              <Reveal as="article" className={`hp-offer-card${key ? ' is-key' : ''}`} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="hp-section" id="voices">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">광고주의 말</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>먼저 시작해 본 광고주들의 이야기.</h2>
          </Reveal>
          <div className="hp-quotes">
            {reviews.map(([quote, who]) => (
              <figure className="hp-quote" key={quote}>
                <div className="stars" aria-hidden="true">★★★★★</div>
                <p>“{quote}”</p>
                <footer>{who}</footer>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT (the close) ── */}
      <section className="hp-section" id="contact">
        <div className="hp-wrap hp-contact-grid">
          <Reveal className="hp-contact-copy">
            <span className="hp-eyebrow">런칭 이벤트 신청</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>먼저 리드 단가를 진단해 드리고, 단가를 낮추는 자산부터 만듭니다.</h2>
            <p className="hp-lead">
              업종과 월 광고 예산만 남겨주세요. 히옵은 광고비를 가져가지 않습니다.
              진단과 측정은 무료로 시작합니다. 영상은 1편 5만원, EMQ9+ 웹사이트는 끝나도 남는 자산입니다.
            </p>
            <div className="hp-contact-bullets">
              <span><ShieldCheck size={18} aria-hidden="true" /> 신청해도 상담을 강요하지 않습니다</span>
              <span><BarChart3 size={18} aria-hidden="true" /> 먼저 리드 단가를 낮출 여지부터 확인해 드립니다</span>
              <span><Target size={18} aria-hidden="true" /> 광고비는 늘 광고주가 직접 집행</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <CreativeVelocityForm
              source="lead_landing"
              eyebrow="런칭 이벤트 신청"
              title="무료 리드 진단 신청"
              description="업종과 월 광고 예산을 남겨주시면, 리드 단가를 더 낮출 여지부터 확인해 연락드립니다."
              submitLabel="무료로 리드 진단받기"
              successTitle="리드 진단 신청이 접수되었습니다."
              formMode="lead"
            />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hp-section" id="faq">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">걱정되는 부분</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>광고를 몰라도 시작할 수 있습니다.</h2>
          </Reveal>
          <div className="hp-faq-list">
            {faqs.map(([q, a]) => (
              <div className="hp-faq-item" key={q}>
                <h3 className="hp-h3">{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="hp-final">
        <div className="hp-wrap">
          <div>
            <span className="hp-eyebrow is-light">마감 전 신청</span>
            <h2 className="hp-h2" style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)", wordBreak: "keep-all" }}>지금 무료로 리드 단가를 진단받고, 계약되는 리드를 최저 단가로 시작하세요.</h2>
            <p>업종과 월 예산만 있어도 진단을 시작할 수 있습니다. 먼저 크게 쓰지 말고, 진짜 리드 단가부터 확인하세요.</p>
          </div>
          <div className="hp-final-side">
            <EventCountdown />
            <CtaButton location="final" variant="ondark">무료 리드 진단</CtaButton>
          </div>
        </div>
      </section>

      <MobileStickyCTA label="상담 신청하기" />

      {/* ── footer ── */}
      <footer className="hp-footer">
        <div className="hp-wrap">
          <span>© {new Date().getFullYear()} 히옵 마케팅 (hi-ob)</span>
          <span>
            <Link href="/" className="hp-footer-track">이커머스 마케팅</Link> · <Link href="/privacy">개인정보처리방침</Link> · <Link href="/terms">이용약관</Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
