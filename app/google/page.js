'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import LeadFormTop from '@/components/LeadFormTop';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLang } from '../../hooks/useLang';

const content = {
  ko: {
    navCta: '무료 진단 신청 →',
    heroLine1: '구글 광고',
    heroLine2: '전략 설계',
    heroDesc1: '검색 의도 분석부터',
    heroDesc2: '머신러닝 최적화까지',
    heroDescAccent: '완벽히',
    heroDescEnd: ' 설계합니다.',
    heroSub: 'GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.',
    statsTitle1: '문의가',
    statsTitle2: '증명하는 성과',
    stats: [
      { b: 'OO 법률사무소', m: 'DB 단가 40% 절감' },
      { b: 'XX IT 솔루션', m: '검색 노출량 5배 증가' },
      { b: 'YY 가전 브랜드', m: 'PMax ROAS 420%' },
      { b: 'ZZ 스타트업', m: '가입 유저 1만명 돌파' },
      { b: 'AA 어학원', m: '상담 전환율 2.5배 상승' },
      { b: 'BB 코스메틱', m: '유튜브 광고 효율 200%' },
    ],
    engLabel: 'INTENT ENGINEERING',
    engTitle: '구글 광고는\n키워드가 아니라\n\'데이터\' 싸움입니다.',
    engDesc: '단순히 높은 입찰가를 쓰는 것이 정답이 아닙니다.\n사용자의 검색 의도를 데이터화하고 머신러닝이 이를 학습하게 만드는 것이 핵심입니다.',
    engPoints: [
      { t: '01. 향상된 전환(EC) 구축', d: '고객 정보를 해싱하여 매체에 직접 전달함으로써 누락된 전환 신호를 완벽하게 복구합니다.' },
      { t: '02. PMax 자산 최적화', d: '실적 최대화 캠페인의 시그널 데이터를 정교하게 설계하여 저효율 예산 낭비를 차단합니다.' },
      { t: '03. GA4 오디언스 연동', d: 'GA4의 고급 사용자 행동 데이터를 구글 광고 오디언스로 직접 연동하여 고가치 타겟팅을 수행합니다.' },
    ],
    whyTitle: '왜\n히옵인가?',
    whyDesc: '단순 입찰 조정을 넘어선 테크니컬 구글 광고 컨설팅.',
    whyPoints: [
      { t: 'GTM 인프라 설계', d: 'Google Tag Manager를 활용한 정밀한 사용자 행동 추적 및 데이터 정합성 확보' },
      { t: '검색 의도 분석', d: '사용자의 검색 의도 기반 키워드 포트폴리오 및 맞춤 소재 전략 수립' },
      { t: 'PMax 효율 극대화', d: '실적 최대화 캠페인의 자산 그룹 최적화 및 머신러닝 학습 촉진' },
      { t: '유튜브 풀퍼널 전략', d: '브랜드 인지부터 최종 전환까지 아우르는 비디오 광고 캠페인 설계' },
    ],
    servicesTitle: '핵심 서비스',
    services: [
      { title: 'GTM 기반 트래킹 설계', items: ['향상된 전환(EC) 연동', '서버사이드 GTM 구축', 'GA4 연동 및 진단'] },
      { title: '검색 & 디스플레이 최적화', items: ['키워드 포트폴리오 구축', '스마트 입찰 최적화', '광고 문안 및 에셋 개선'] },
      { title: '실적 최대화(PMax) 극대화', items: ['자산 그룹 시그널 최적화', '알고리즘 학습 촉진', '크로스 채널 예산 배분'] },
    ],
    ctaTitle1: '최고의',
    ctaTitle2: '성과를',
    ctaDesc: '구글 광고의 핵심은 데이터와 머신러닝의 조화입니다. 지금 바로 전문가의 무료 진단을 신청하세요.',
    case1Tag: 'B2B SaaS / IT',
    case1Title: 'OO 협업툴: 서버사이드 GTM 구축 및 리드 품질 3배 상승',
    case1Body: '상황: 단순히 유입은 많으나 실제 구매로 이어지는 유료 결제 전환율이 0.1%로 매우 낮았던 상황.\n\n솔루션: GA4와 GTM 서버사이드를 연동하여 \'진성 유저\'의 행동 데이터를 정밀 추적. 구글 머신러닝에 단순 유입이 아닌 \'결제 페이지 도달 유저\' 시그널을 주입.\n\n결과: 광고 유입 유저의 질이 획기적으로 개선되어, 한 달 만에 유료 결제 전환율이 0.35%로 상승하며 성과를 증명함.',
    case2Tag: 'LEGAL & PROF.',
    case2Title: 'XX 법률사무소: 의도 기반 키워드 최적화로 DB 단가 40% 절감',
    case2Body: '상황: 메인 키워드(이혼, 상속 등)의 높은 입찰 경쟁으로 인해 DB 한 건당 획득 비용이 15만 원을 상회하던 상황.\n\n솔루션: 사용자의 구체적인 고충이 담긴 \'롱테일 키워드\'와 \'질문형 키워드\'를 대량 발굴. 검색 의도에 최적화된 랜딩 페이지를 각각 매칭.\n\n결과: DB 단가를 8만 원대까지 낮추는 데 성공하였으며, 검색 노출 점유율을 80% 이상 확보하여 안정적인 수임 채널 구축.',
    masterTitle: 'THE GOOGLE ADS MASTERCLASS 2025',
    ch1Title: 'CHAPTER 01: 검색의 본질 - 사용자의 고통(Pain Point)을 해결하는 기술',
    ch1p1: '구글 검색창은 세상에서 가장 솔직한 \'욕망의 집합체\'입니다. 사용자는 고민이 있을 때 구글을 찾습니다. 따라서 구글 검색 광고의 핵심은 단순히 상위에 노출되는 것이 아니라, 사용자가 가진 문제에 대한 \'가장 완벽한 해답\'임을 증명하는 것입니다.',
    ch1p2: '히옵(HI-OP)은 키워드 분석 단계부터 다르게 접근합니다. 우리는 단순히 조회수가 높은 키워드를 나열하지 않습니다. 사용자가 검색을 수행하는 시점의 심리 상태를 분석하여 \'인지-비교-결정\'의 단계를 나눕니다. 각 단계에 맞는 광고 문구(Headline)와 설명(Description)을 설계하고, 사용자가 클릭 후 마주할 랜딩 페이지의 콘텐츠까지 일관성 있게 정렬(Alignment)합니다. 이러한 정교한 설계만이 높은 품질지수(Quality Score)와 낮은 CPC를 보장합니다.',
    ch2Title: 'CHAPTER 02: 실적 최대화(PMax) 캠페인의 통제권을 되찾는 전략',
    ch2p1: '구글이 야심 차게 내놓은 PMax 캠페인은 강력하지만 위험합니다. AI에게 모든 것을 맡기면 브랜드의 가치를 훼손하거나, 이미 우리 브랜드를 알고 있는 유저에게 예산을 낭비할 가능성이 크기 때문입니다. 히옵은 PMax를 단순히 \'운영\'하지 않고 \'통제\'합니다.',
    ch2p2: '우리는 \'브랜드 제외\' 설정과 \'맞춤형 오디언스 시그널\' 주입을 통해 PMax가 순수 신규 고객을 찾는 데 집중하게 만듭니다. 또한, 자산 그룹별로 검색 테마를 세분화하여 어떤 메시지가 어떤 지면에서 가장 잘 통하는지 데이터로 증명합니다. PMax는 블랙박스가 아닙니다. 히옵의 엔지니어링을 통하면 투명한 성과 측정 도구가 됩니다.',
    ch3Title: 'CHAPTER 03: 유튜브 VAC를 활용한 비디오 퍼포먼스의 극대화',
    ch3p1: '유튜브는 이제 인지도를 높이는 브랜딩 채널을 넘어, 즉각적인 구매를 일으키는 퍼포먼스 채널입니다. 비디오 액션 캠페인(VAC)은 구글의 강력한 의도 시그널을 유튜브 영상에 결합합니다.',
    ch3p2: '히옵은 \'시청 완료\'가 아닌 \'전환\'을 목표로 영상을 기획합니다. 영상 하단에 제품 피드를 연동하고, 시청자의 클릭을 유도하는 강력한 오버레이 버튼을 배치합니다. 무엇보다 구글 검색 데이터를 기반으로 \'우리 제품을 검색했던 유저\'가 유튜브를 볼 때 광고를 노출하는 \'커스텀 세그먼트\' 전략을 통해 전환 가능성을 극대화합니다. 영상은 감상이 아닌 구매의 도구입니다.',
    ch4Title: 'CHAPTER 04: 구글 애널리틱스 4(GA4)와 데이터 거버넌스의 완성',
    ch4p1: 'GA4는 구글 광고의 \'두뇌\'입니다. GA4가 데이터를 잘못 읽으면 광고 캠페인 전체가 흔들립니다. 히옵은 GA4의 기본 세팅을 넘어선 \'맞춤형 데이터 거버넌스\'를 구축합니다.',
    ch4p2: '교차 도메인 추적, 향상된 측정 이벤트 최적화, 그리고 가장 중요한 \'향상된 전환(Enhanced Conversions)\' 기능을 통해 데이터 누락을 최소화합니다. 특히 1st Party 데이터를 구글 시스템에 안전하게 전송하여 머신러닝이 고객을 더 정확히 매칭할 수 있도록 돕습니다. 깨끗한 데이터만이 명확한 ROAS를 산출합니다.',
    ch5Title: 'CHAPTER 05: 스마트 입찰 알고리즘의 튜닝과 수익률 극대화',
    ch5p1: 'tCPA, tROAS 입찰 전략은 구글 광고의 정점입니다. 하지만 매체의 추천만 따르다 보면 예산이 과도하게 집행되거나 오히려 성과가 정체될 수 있습니다. 히옵은 알고리즘의 학습 상태를 실시간으로 모니터링하며 \'입찰 목표치\'를 미세 조정합니다.',
    ch5p2: '계절성(Seasonality) 데이터를 미리 주입하여 대규모 프로모션 기간에 머신러닝이 당황하지 않게 만들고, 가치 기반 입찰(Value-based Bidding)을 통해 단순히 구매 수가 아닌 \'높은 객단가를 가진 유저\'를 우선적으로 획득하도록 설계합니다. 히옵은 구글의 AI를 가장 효율적으로 부리는 데이터 엔지니어입니다.',
    kakao: '카카오톡 1:1 채팅 문의하기',
    footer: '© 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.',
  },
  en: {
    navCta: 'Free Diagnosis →',
    heroLine1: 'Google Ads',
    heroLine2: 'Strategy Design',
    heroDesc1: 'From search intent analysis',
    heroDesc2: 'to machine learning optimization —',
    heroDescAccent: 'perfectly',
    heroDescEnd: ' engineered.',
    heroSub: 'GTM setup · Search/Display · YouTube Ads · PMax — a data-driven, integrated Google Ads solution.',
    statsTitle1: 'Results',
    statsTitle2: 'speak louder',
    stats: [
      { b: 'OO Law Firm', m: 'DB CPA -40%' },
      { b: 'XX IT Solutions', m: 'Search impressions ×5' },
      { b: 'YY Appliance Brand', m: 'PMax ROAS 420%' },
      { b: 'ZZ Startup', m: '10K new signups' },
      { b: 'AA Language School', m: 'Consult CVR ×2.5' },
      { b: 'BB Cosmetics', m: 'YouTube efficiency ×2' },
    ],
    engLabel: 'INTENT ENGINEERING',
    engTitle: 'Google Ads is not\na keyword game —\nit\'s a \'data\' war.',
    engDesc: 'Bidding higher is not the answer.\nThe real edge is turning search intent into data signals that machine learning can act on.',
    engPoints: [
      { t: '01. Enhanced Conversions (EC)', d: 'Hash and transmit first-party customer data directly to the platform, fully recovering lost conversion signals.' },
      { t: '02. PMax Asset Optimization', d: 'Engineer signal data for Performance Max campaigns to eliminate low-efficiency budget waste.' },
      { t: '03. GA4 Audience Integration', d: 'Feed advanced GA4 behavioral data directly into Google Ads audiences for high-value targeting.' },
    ],
    whyTitle: 'Why\nHI-OP?',
    whyDesc: 'Technical Google Ads consulting — beyond simple bid adjustments.',
    whyPoints: [
      { t: 'GTM Infrastructure', d: 'Precise user behavior tracking and data integrity using Google Tag Manager' },
      { t: 'Search Intent Analysis', d: 'Keyword portfolio and creative strategy based on real user search intent' },
      { t: 'PMax Efficiency', d: 'Asset group optimization and machine learning acceleration for Performance Max' },
      { t: 'YouTube Full-Funnel', d: 'Video campaign design from brand awareness to final conversion' },
    ],
    servicesTitle: 'Core Services',
    services: [
      { title: 'GTM Tracking Setup', items: ['Enhanced Conversion (EC) integration', 'Server-side GTM build', 'GA4 integration & audit'] },
      { title: 'Search & Display Optimization', items: ['Keyword portfolio construction', 'Smart bidding optimization', 'Ad copy & asset improvement'] },
      { title: 'PMax Maximization', items: ['Asset group signal optimization', 'Algorithm learning acceleration', 'Cross-channel budget allocation'] },
    ],
    ctaTitle1: 'Peak',
    ctaTitle2: 'Performance',
    ctaDesc: 'Google Ads success is built on data and machine learning in harmony. Apply for a free expert diagnosis today.',
    case1Tag: 'B2B SaaS / IT',
    case1Title: 'OO Collaboration Tool: Server-side GTM build — lead quality tripled',
    case1Body: 'Situation: High traffic volume but paid conversion rate stuck at 0.1%.\n\nSolution: Integrated GA4 with server-side GTM to precisely track \'high-intent user\' behavior. Injected \'payment page reached\' signals — not raw visits — into Google machine learning.\n\nResult: Ad traffic quality improved dramatically. Paid conversion rate rose to 0.35% within one month.',
    case2Tag: 'LEGAL & PROF.',
    case2Title: 'XX Law Firm: Intent-based keyword optimization — DB CPA cut 40%',
    case2Body: 'Situation: Fierce bidding competition on head keywords (divorce, inheritance) pushed DB CPA above ₩150,000 per lead.\n\nSolution: Mined high-volume \'long-tail\' and \'question-type\' keywords capturing specific user pain points. Matched each keyword cluster to a dedicated landing page.\n\nResult: DB CPA reduced to ₩80,000 range. Search impression share secured above 80%, creating a stable acquisition channel.',
    masterTitle: 'THE GOOGLE ADS MASTERCLASS 2025',
    ch1Title: 'CHAPTER 01: The Nature of Search — Solving the User\'s Pain Point',
    ch1p1: 'The Google search bar is the world\'s most honest aggregator of human desire. When people have a problem, they turn to Google. The core of search advertising, therefore, is not simply ranking at the top — it\'s proving that you are the most complete answer to the user\'s problem.',
    ch1p2: 'HI-OP approaches keyword analysis differently. We don\'t just list high-volume keywords. We analyze the psychological state of users at the moment of search and map the \'Awareness → Comparison → Decision\' funnel. We engineer headlines and descriptions for each stage, and align the landing page content the user sees after clicking. Only this level of precision guarantees a high Quality Score and low CPC.',
    ch2Title: 'CHAPTER 02: Reclaiming Control of Performance Max (PMax) Campaigns',
    ch2p1: 'Google\'s PMax campaign is powerful but risky. Handing full control to AI risks diluting brand value or wasting budget on users who already know your brand. HI-OP doesn\'t just \'run\' PMax — we \'control\' it.',
    ch2p2: 'We use brand exclusion settings and custom audience signal injection to keep PMax focused on finding genuinely new customers. We also segment search themes by asset group to prove, with data, which messages perform best on which placements. PMax is not a black box — with HI-OP\'s engineering, it becomes a transparent performance measurement tool.',
    ch3Title: 'CHAPTER 03: Maximizing Video Performance with YouTube VAC',
    ch3p1: 'YouTube has evolved beyond a branding channel into a direct-response performance channel. The Video Action Campaign (VAC) combines Google\'s powerful intent signals with YouTube video inventory.',
    ch3p2: 'HI-OP plans videos with conversion — not views — as the goal. We integrate product feeds below the video and place strong overlay CTAs to drive clicks. Most importantly, we use \'custom segment\' targeting to show ads to users who have already searched for your product on Google — maximizing the probability of conversion. Video is not for entertainment; it is a sales instrument.',
    ch4Title: 'CHAPTER 04: GA4 and Completing Your Data Governance Framework',
    ch4p1: 'GA4 is the brain of Google Ads. If GA4 misreads data, your entire ad campaign is built on a faulty foundation. HI-OP builds custom data governance beyond GA4\'s default settings.',
    ch4p2: 'We minimize data loss through cross-domain tracking, enhanced measurement event optimization, and the critical Enhanced Conversions feature. We safely transmit first-party data to Google\'s systems so machine learning can match customers more accurately. Clean data produces clear ROAS.',
    ch5Title: 'CHAPTER 05: Tuning Smart Bidding Algorithms for Maximum Profitability',
    ch5p1: 'tCPA and tROAS bidding strategies represent the pinnacle of Google Ads. But blindly following platform recommendations can lead to overspending or stagnant performance. HI-OP monitors algorithm learning states in real time and fine-tunes bid targets continuously.',
    ch5p2: 'We pre-inject seasonality data so machine learning doesn\'t get caught off guard during major promotions, and we implement value-based bidding to prioritize acquiring users with high average order value — not just more purchases. HI-OP is the data engineer that makes Google\'s AI work hardest for you.',
    kakao: 'KakaoTalk Live Chat',
    footer: '© 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.',
  },
};

export default function GooglePage() {
  const [lang, toggle] = useLang();
  const c = content[lang] || content.ko;

  useEffect(() => {
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m/google';
    }
  }, []);

  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / GOOGLE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => toggle('ko')} style={{ fontWeight: lang === 'ko' ? 900 : 400, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>KO</button>
            <span>|</span>
            <button onClick={() => toggle('en')} style={{ fontWeight: lang === 'en' ? 900 : 400, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>EN</button>
          </div>
          <a href="#contact" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none', fontSize: '1.1rem' }}>{c.navCta}</a>
        </div>
      </nav>

      <LeadFormTop
        eyebrow={lang === 'ko' ? '구글 광고 진단' : 'Google Ads Diagnosis'}
        title={lang === 'ko' ? '구글 광고 성과 흐름을 정밀하게 진단합니다' : 'A precise diagnosis for your Google Ads growth path.'}
        description={
          lang === 'ko'
            ? '검색어, GA4, 향상된 전환, PMax 시그널이 한 방향으로 연결되는지 확인하고, 현재 계정에서 머신러닝이 배울 수 있는 데이터가 충분한지 점검합니다.'
            : 'We check whether search intent, GA4, enhanced conversions, and PMax signals are aligned well enough for the algorithm to learn.'
        }
        bullets={lang === 'ko' ? ['향상된 전환', 'PMax 시그널', 'GA4 오디언스'] : ['Enhanced conversions', 'PMax signals', 'GA4 audiences']}
        source="google-top"
        lang={lang}
        formVariant="lead"
        accent="#EA4335"
      />

      {/* Hero */}
      <section style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.2rem' }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: '#EA4335' }}>{c.heroLine1}</h1>
            <h1 className="massive-text">{c.heroLine2}</h1>
          </motion.div>

          <div className="grid-half" style={{ border: 'none', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
            <div style={{ padding: '2rem 0' }}>
              <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>
                {c.heroDesc1}<br />{c.heroDesc2}<br /><span style={{ color: '#EA4335' }}>{c.heroDescAccent}</span>{c.heroDescEnd}
              </p>
            </div>
            <div style={{ padding: '0 0 2rem' }}>
              <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                {c.heroSub}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.2rem', background: '#EA4335', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ color: '#fff' }}>{c.statsTitle1}</h2>
          <h2 className="massive-text" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.statsTitle2}</h2>

          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {c.stats.map((stat, i) => (
              <div key={i} style={{ border: '3px solid #fff', padding: '1.5rem', background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{stat.b}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif' }}>{stat.m}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'right' }}>
            <p className="font-syne" style={{ fontSize: '2rem', fontWeight: 800 }}>AND 1,200+ MORE INQUIRIES</p>
          </div>
        </div>
      </section>

      {/* Engineering Focus Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ padding: '6rem 2rem' }}>
          <p style={{ fontWeight: 800, color: '#EA4335', marginBottom: '1rem' }}>{c.engLabel}</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', whiteSpace: 'pre-line' }}>{c.engTitle}</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444', whiteSpace: 'pre-line' }}>{c.engDesc}</p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#eee' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {c.engPoints.map((pt, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{pt.t}</h3>
                <p style={{ color: '#555', fontWeight: 600 }}>{pt.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: '#EA4335', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem', whiteSpace: 'pre-line' }}>{c.whyTitle}</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>{c.whyDesc}</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {c.whyPoints.map((item, idx) => (
              <div key={idx} style={{ borderBottom: '3px solid #ddd', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.t}</h3>
                <p style={{ color: '#444', fontSize: '1.1rem', fontWeight: 600 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '7rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', marginBottom: '5rem' }}>{c.servicesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {c.services.map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#EA4335" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="split-section" style={{ background: 'var(--bg-dark)', color: 'var(--text-light)' }}>
        <div className="split-left" style={{ padding: '7rem 2rem' }}>
          <h2 className="massive-text" style={{ color: '#FBBC05' }}>{c.ctaTitle1}</h2>
          <h2 className="massive-text">{c.ctaTitle2}</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            {c.ctaDesc}
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="google" lang={lang} />
        </div>
      </section>

      {/* SUCCESS CASES SECTION */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>SUCCESS CASES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>

            <div className="brutalist-card" style={{ borderLeft: '15px solid #EA4335' }}>
              <div style={{ background: '#EA4335', color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>{c.case1Tag}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{c.case1Title}</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600, whiteSpace: 'pre-line' }}>{c.case1Body}</p>
            </div>

            <div className="brutalist-card" style={{ borderLeft: '15px solid #FBBC05' }}>
              <div style={{ background: '#FBBC05', color: '#000', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>{c.case2Tag}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{c.case2Title}</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600, whiteSpace: 'pre-line' }}>{c.case2Body}</p>
            </div>

          </div>
        </div>
      </section>

      {/* MASTERCLASS */}
      <section style={{ padding: '10rem 2rem', background: '#121212', color: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid #EA4335', display: 'inline-block' }}>
            {c.masterTitle}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.2rem', lineHeight: '2.4', textAlign: 'justify', color: '#ccc' }}>
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', color: '#fff' }}>{c.ch1Title}</h3>
              <p>{c.ch1p1}</p>
              <p>{c.ch1p2}</p>
            </article>
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', color: '#fff' }}>{c.ch2Title}</h3>
              <p>{c.ch2p1}</p>
              <p>{c.ch2p2}</p>
            </article>
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', color: '#fff' }}>{c.ch3Title}</h3>
              <p>{c.ch3p1}</p>
              <p>{c.ch3p2}</p>
            </article>
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', color: '#fff' }}>{c.ch4Title}</h3>
              <p>{c.ch4p1}</p>
              <p>{c.ch4p2}</p>
            </article>
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', color: '#fff' }}>{c.ch5Title}</h3>
              <p>{c.ch5p1}</p>
              <p>{c.ch5p2}</p>
            </article>
          </div>
        </div>
      </section>

      <footer style={{ padding: '5rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <a
            href="https://open.kakao.com/o/srdaF2si"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal"
            style={{ background: '#FEE500', color: '#000', fontSize: '1.2rem' }}
          >
            {c.kakao}
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>{c.footer}</p>
      </footer>
    </main>
  );
}
