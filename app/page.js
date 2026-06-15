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

const navItems = [
  ['왜 필요한가', '#why'],
  ['측정 증거', '#measure'],
  ['예시 영상', '#proof'],
  ['오퍼', '#offer'],
];

// HOOK → the one common fear, then the ①②③ self-qualifier (hybrid)
const qualifiers = [
  ['01', '광고비 낭비가 무서워, 시작이 어렵다', '지출만 발생하는 마케팅이 두렵습니다.'],
  ['02', '매출이 발생하지만, 성장이 더딥니다', '신규 고객의 유입이 정체되어 있습니다.'],
  ['03', '정말 좋은 상품인데, 사람들은 모릅니다', '타사 제품보다 우수하지만, 인지도에서 밀리는 상황입니다.'],
];

// AGITATE → problem at 3 depths (external / internal / philosophical)
const depths = [
  {
    k: '“더 키우고 싶은데”',
    t: '구매 가능성 있는 고객들을\n데려올 수 있는 길이 끊겨있다.',
    d: '네이버·쿠팡의 고객은 이미 사고자 하는 목적이 있습니다. 그러나 구매 가능성 있는 신규 잠재고객의 발굴에는 한계가 있습니다.',
  },
  {
    k: '“이게 맞나 싶고”',
    t: '실적이 나오지 않는 마케팅을\n운영하기 부담스럽다.',
    d: '어떤 소재가, 또 어떤 검색어가 매출을 만들었는지 보이지 않으니, 다음 예산 또한 감으로 사용할 수밖에 없습니다.',
  },
  {
    k: '“그래서 억울하고”',
    t: '좋은 걸 만든 사람이, 안 보인다는 이유로 지는 건 억울하다',
    d: '문제는 광고를 모르는 게 아닙니다. 매출로 가는 길이 보이지 않는다는 것입니다.',
  },
];

const guidePoints = [
  '한국 Meta 광고 월 65억+ · 100개+ 계정 운영 경험.',
  '광고비는 셀러가 직접 집행하고 통제합니다. 히옵은 가져가지 않습니다.',
  '복잡한 측정·세팅은 히옵이 전부 맡습니다. 측정은 첫 6주 무료로 시작합니다.',
  '큰 대행료 없이 — 큰 수익은 성과 수수료(8~12%)에서만 납니다.',
];

const planSteps = [
  ['01', '무료 광고 계정 진단', '지금 어디서 새는지, 진짜 ROAS가 얼마인지부터 함께 봅니다.', false],
  ['02', '측정 연결 (6주 무료)', '어떤 광고가 매출을 만드는지 보이도록, 히옵이 측정을 대신 세팅해 드립니다.', true],
  ['03', '릴스 최대 10편 테스트', '불편·사용 장면·비교 포인트를 짧은 영상으로 쪼개 테스트합니다.', false],
  ['04', '벌린 매출에서 정산', '광고로 만든 매출에 ROAS 구간별 8~12%를 정산합니다. ROAS 250% 미만은 0%.', false],
];

const measureStats = [
  ['+91.8%', '픽셀만 쓸 때보다 더 잡아낸 실제 매출 (운영 계정 기준)'],
  ['9.3 / 10', '측정 정확도 — 누가, 왜 샀는지까지 또렷하게 잡힙니다'],
  ['0원', '측정 시작 비용 — 첫 6주 무료입니다.'],
];

// AUTHORITY → hi-ob 창업팀 실제 운영 트랙레코드 (정직: 팀 경력, 집계·익명)
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
  ['전담 운영', '월 50만원', '셋업부터 광고·측정까지 2인이 전담합니다. 직원 한 명 값도 안 됩니다.', true],
  ['측정', '6주 무료', '이후 트래픽 3,000당 월 $100 (서버 비용).', false],
  ['릴스 제작비', '1편 5만원', '이번 런칭 이벤트 한정, 최대 10편까지 제작합니다.', false],
  ['성과 수수료', '8~12%', '성과가 날 때만 — ROAS 구간별 8~12% (250% 미만 0%). 광고비는 셀러 직접.', false],
];

const reviews = [
  ['광고비 날릴까 봐 1년을 미뤘어요. 0원으로 측정만 먼저 붙여보니, 어떤 영상에서 주문이 나오는지 처음으로 눈에 보였습니다.', '생활용품 셀러 · 3년차'],
  ['대행사는 매달 고정비가 부담이었는데, 여긴 벌고 나서 정산이라 시작 문턱이 낮았어요. 첫 슬롯에서 ROAS가 분명히 올랐습니다.', '뷰티 브랜드 대표'],
  ['메타 광고가 복잡해서 늘 감으로 껐는데, 어떤 릴스가 매출을 만드는지 숫자로 보여주니 예산 쓰는 게 안 무서워졌어요.', '식품 셀러'],
  ['네이버·쿠팡 안에서만 팔다가 정체였는데, 릴스로 마켓 밖 새 고객이 들어오기 시작한 게 가장 큰 변화입니다.', '패션·잡화 셀러'],
  ['광고비를 제 계정에서 직접 집행하니 통제권이 저한테 있어 믿음이 갔어요. 같은 숫자를 함께 보는 것도 좋았고요.', '반려용품 셀러 · 2년차'],
  ['릴스 한 편 5만원이라 여러 개 테스트하고 반응 좋은 것만 키웠습니다. 작게 실험하고 이긴 것에 베팅하는 구조가 합리적이에요.', '전자·가전 셀러'],
];

const faqs = [
  ['히옵은 어떻게 수익을 내나요?', '① 전담 운영비 월 50만(셋업·광고·측정을 맡는 2인 전담 인건비 수준) ② 측정 서버 실비(6주 무료 후 트래픽 3,000당 월 $100) ③ 성과 수수료(8~12%, ROAS 250% 미만 0%)로 운영됩니다. 큰 대행료를 먼저 받지 않고, 히옵이 크게 버는 건 셀러가 성과를 냈을 때뿐입니다.'],
  ['광고비도 히옵에 내나요?', '아닙니다. 광고비는 판매자 계정에서 직접 집행하고 통제합니다. 히옵은 광고비를 받거나 대납하지 않습니다.'],
  ['광고비는 얼마부터 시작하면 되나요?', '효과를 제대로 확인하려면 월 200만원 정도의 광고비를 권장합니다. 광고비는 늘 셀러 계정에서 직접 집행합니다.'],
  ['제 광고 계정과 데이터는 안전한가요?', '계정과 데이터의 소유권은 셀러에게 있습니다. 측정에 필요한 최소한의 연동만 요청하며, 범위는 시작 전 상담에서 함께 확인합니다.'],
  ['측정 결과는 믿을 수 있나요?', '메타 광고 성과를 셀러도 같은 측정 화면으로 함께 봅니다. 정산 요율과 기준은 시작 전에 함께 정합니다.'],
  ['성과 수수료는 어떻게 계산되나요?', '히옵 캠페인으로 추적된 광고 기여 매출에 그 달의 ROAS 구간별 요율을 적용합니다 — ROAS 250% 미만 0%, 이후 8~12%. 광고비는 셀러가 직접 부담합니다.'],
  ['약정 기간이 있나요?', '측정은 6주 무료로 부담 없이 시작합니다. 이후 운영 범위와 조건은 시작 전 상담에서 함께 정합니다.'],
  ['성과를 보장하나요?', '보장하지 않습니다. 대신 매출을 추적할 수 있는 구조, 빠르게 테스트하는 릴스, 구글 검색광고 진입까지 함께 만듭니다.'],
];

export const metadata = {
  title: '예산 올리면 ROAS 떨어지시나요? | 히옵 마케팅',
  description:
    '예산을 키우면 ROAS가 떨어지는 광고주를 위한 구조. 하루 3,000만 원 계정을 운영해온 팀이 광고 계정을 무료로 진단합니다. 측정 6주 무료, 광고비는 직접 집행, 성과가 날 때만 ROAS 구간별 8~12% 정산.',
  alternates: { canonical: '/' },
  openGraph: {
    title: '예산 올리면 ROAS 떨어지시나요? | 히옵 마케팅',
    description: '하루 3,000만 원 계정을 운영해온 팀이 광고 계정을 무료로 진단합니다. 측정 6주 무료, 성과가 날 때만 ROAS 구간별 8~12% 정산.',
    url: 'https://hi-ob.com',
    siteName: '히옵 마케팅',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '예산 올리면 ROAS 떨어지시나요?',
    description: '하루 3,000만 원 계정을 운영해온 팀이, 광고 계정을 무료로 진단합니다.',
  },
};

export default function HomePage() {
  return (
    <main className="hp">
      <HomeSchema faqs={faqs} />
      <FloatCta />
      <noscript>
        <style>{'.hp-reveal{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      {/* ── launch slot ── */}
      <div className="hp-topslot">
        <div className="hp-wrap">
          <div>
            <b>런칭 이벤트 진행 중</b>
            <span>6주 무료 측정 · 성과가 날 때만 정산</span>
          </div>
          <EventCountdown variant="bar" />
        </div>
      </div>

      {/* ── nav ── */}
      <nav className="hp-nav">
        <div className="hp-wrap">
          <Link href="/" className="hp-brand" aria-label="hiob 홈">
            <Logo height={30} />
          </Link>
          <div className="hp-nav-links" aria-label="페이지 섹션 이동">
            {navItems.map(([label, href]) => (
              <a key={href + label} href={href}>{label}</a>
            ))}
          </div>
          <div className="hp-nav-cta">
            <Link href="/lead" className="hp-track-link">리드 마케팅 →</Link>
            <CtaButton location="nav" variant="ink">무료 계정 진단</CtaButton>
          </div>
        </div>
      </nav>

      {/* ── HERO : the common fear + ①②③ qualifier ── */}
      <header className="hp-hero">
        <div className="hp-wrap">
          <Link href="/lead" className="hp-lead-banner" aria-label="리드 마케팅 페이지로 이동">
            <span className="hp-lead-banner-text">
              <span className="hp-lead-tag">LEAD</span>
              이커머스가 아니라 <strong>리드(문의·DB)</strong>가 필요하세요?
            </span>
            <span className="hp-lead-banner-cta">리드 마케팅 보기 →</span>
          </Link>
          <div className="hp-hero-grid">
          <div className="hp-hero-copy">
            <span className="hp-eyebrow">메타·구글 광고를 키우는 브랜드에게</span>
            <h1 className="hp-display">
              <span className="hp-line soft">예산 올리면</span>
              <span className="hp-line"><span className="hp-underline">ROAS</span> 떨어지시나요?</span>
            </h1>
            <p className="hp-lead hp-hero-sub">
              하루 3,000만 원을 쓰는 계정에서도 ROAS 5를 지켜온 노하우로, 당신의 광고 계정을
              무료로 진단해 드립니다. 어디서 새는지, 진짜 ROAS가 얼마인지 — 측정부터 정확히 봅니다.
            </p>
            <div className="hp-hero-actions">
              <CtaButton location="hero_primary">무료 광고 계정 진단</CtaButton>
              <CtaButton href="#measure" location="hero_secondary" variant="ghost">무엇을 보는지 먼저 보기</CtaButton>
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
        </div>
      </header>

      {/* ── AUTHORITY : 창업팀 운영 트랙레코드 (real social proof) ── */}
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
            위의 지표들은 한국 시장을 대상으로 직접 관리를 집행했던 경력입니다. 규모 있는 비즈니스의 마케팅을 집행한 경험으로, 사업 성장으로 가는 길을 데이터로 파악합니다.
          </p>
        </div>
      </section>

      {/* ── AGITATE : 3 depths ── */}
      <section className="hp-section" id="why">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">왜 지금 안 풀릴까</span>
            <h2 className="hp-h2">상품은 이미 잘 버티고 있습니다.<br />끊긴 건 고객에게 가는 길입니다.</h2>
            <p className="hp-lead">
              우리가 두려운 건 하나입니다. <strong>보이지 않는 곳에 돈을 소비하는 것.</strong>
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
            <figcaption>히옵 마케팅을 직접 운영하는 사람들</figcaption>
          </Reveal>
          <Reveal className="hp-guide-copy" delay={100}>
            <span className="hp-eyebrow">큰돈을 굴려본 팀이 만듭니다</span>
            <h2 className="hp-h2">월 65억을 굴리던 팀이, 당신의 계정을 진단합니다.</h2>
            <p className="hp-lead">
              hi-ob을 만든 팀은 한국에서 월 65억 규모의 Meta 광고를 100개 넘는 계정으로 운영하며,
              하루 3,000만 원짜리 계정도 굴려봤습니다. 예산을 키울수록 ROAS가 무너지는 그 지점을 넘는 법을,
              당신의 계정에 그대로 적용합니다.
            </p>
            <ul className="hp-guide-points">
              {guidePoints.map((point) => (
                <li key={point}><Check size={18} aria-hidden="true" />{point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── PLAN : the path (0원 측정 = de-risk) ── */}
      <section className="hp-section" id="plan">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">길은 단순합니다</span>
            <h2 className="hp-h2">무료 진단으로 시작해, 측정으로 진짜 ROAS를 보고, 매출이 찍히면 정산합니다.</h2>
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

      {/* ── PROOF : measurement (the cure to "안 보인다") ── */}
      <section className="hp-section hp-dark" id="measure">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow is-light"><Eye size={14} aria-hidden="true" /> 이제, 보입니다</span>
            <h2 className="hp-h2">감이 아니라 측정. 어떤 광고가 매출을 만들었는지, 숫자로 보입니다.</h2>
            <p className="hp-lead">
              조회수·클릭이 아니라 실제 매출을 봅니다. 측정이 정확해질수록, 예산을 키워도
              ROAS가 흔들리지 않습니다. 아래는 실제 운영 대시보드입니다(고객 정보는 가렸습니다).
            </p>
          </Reveal>
          <div className="hp-measure-grid">
            <Reveal as="figure" className="hp-measure-figure">
              <div className="bar" aria-hidden="true"><i /><i /><i /></div>
              <img
                src="/proof/measurement-lift.jpg"
                alt="실제 메타 이벤트 관리자 대시보드 — 서버 전환으로 회수한 추가 전환 +91.8%, 이벤트 매칭 품질 9.3/10"
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

      {/* ── PROOF : reels (ads we make) ── */}
      <section className="hp-section" id="proof">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">히옵이 직접 만드는 광고</span>
            <h2 className="hp-h2">예쁜 영상이 아니라, 문제를 건드려 행동하게 만드는 영상.</h2>
            <p className="hp-lead">
              상품마다 다른 시작, 문제 제기, 후기, 비교 영상을 빠르게 만들어 테스트합니다.
              아래는 히옵이 직접 만든 예시입니다.
            </p>
          </Reveal>
          <ReelShowcase reels={reels} />
        </div>
      </section>

      {/* ── OFFER (now earned) ── */}
      <section className="hp-section" id="offer">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">이번 런칭 이벤트 오퍼</span>
            <h2 className="hp-h2">먼저 크게 쓰지 않습니다. 벌고 나서 정산합니다.</h2>
            <p className="hp-lead">
              성과를 보장한다고 말하지 않습니다. 대신 광고비를 잃은 느낌 없이 시작할 수 있도록
              구조를 낮췄습니다 — 광고비 직접 통제, 릴스 고정 단가, 매출 기준 정산.
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

      {/* ── TESTIMONIALS (placeholder) ── */}
      <section className="hp-section" id="voices">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">셀러의 말</span>
            <h2 className="hp-h2">먼저 시작해 본 셀러들의 이야기.</h2>
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
            <h2 className="hp-h2">먼저 계정을 진단해 드리고, 확인된 매출에서만 정산합니다.</h2>
            <p className="hp-lead">
              브랜드 URL과 월 광고 예산만 남겨주세요. 히옵은 광고비를 가져가지 않습니다.
              진단과 측정은 무료로 시작합니다. 전담 운영은 월 50만, 나머지는 성과로만 — ROAS 구간별 8~12%입니다.
            </p>
            <div className="hp-contact-bullets">
              <span><ShieldCheck size={18} aria-hidden="true" /> 신청해도 상담을 강요하지 않습니다</span>
              <span><BarChart3 size={18} aria-hidden="true" /> 먼저 매출 가능성부터 확인해 드립니다</span>
              <span><Target size={18} aria-hidden="true" /> 광고비는 늘 셀러가 직접 집행</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <CreativeVelocityForm
              source="naver_coupang_seller_home"
              eyebrow="런칭 이벤트 신청"
              title="무료 광고 계정 진단 신청"
              description="브랜드 URL과 월 광고 예산을 남겨주시면, 계정을 진단해 ROAS를 더 키울 여지부터 확인해 연락드립니다."
              submitLabel="무료로 계정 진단받기"
              successTitle="광고 계정 진단 신청이 접수되었습니다."
              formMode="seller"
            />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hp-section" id="faq">
        <div className="hp-wrap">
          <Reveal className="hp-head">
            <span className="hp-eyebrow">걱정되는 부분</span>
            <h2 className="hp-h2">광고를 몰라도 시작할 수 있습니다.</h2>
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
            <h2 className="hp-h2">지금 무료로 광고 계정을 진단받고, 무너지지 않는 스케일을 시작하세요.</h2>
            <p>브랜드 URL만 있어도 진단을 시작할 수 있습니다. 먼저 크게 쓰지 말고, 진짜 ROAS부터 확인하세요.</p>
          </div>
          <div className="hp-final-side">
            <EventCountdown />
            <CtaButton location="final" variant="ondark">무료 광고 계정 진단</CtaButton>
          </div>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="hp-footer">
        <div className="hp-wrap">
          <span>© {new Date().getFullYear()} 히옵 마케팅 (hi-ob)</span>
          <span>
            <Link href="/lead" className="hp-footer-track">리드 마케팅</Link> · <Link href="/privacy">개인정보처리방침</Link> · <Link href="/terms">이용약관</Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
