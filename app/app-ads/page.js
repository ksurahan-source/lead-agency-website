'use client';

import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import Footer from '../../components/Footer';
import LeadFormTop from '../../components/LeadFormTop';

const content = {
  ko: {
    hero1: '앱 광고',
    hero2: '엔지니어링',
    heroDesc: 'SKAN 4.0 및 MMP 연동 최적화를 통해 앱 설치 및 인앱 액션 성과를 극대화합니다.',
    points: [
      { t: 'MMP 연동 및 최적화', d: 'AppsFlyer, Airbridge, Adjust 등 주요 MMP의 완벽한 연동 및 포스트백 설계' },
      { t: 'SKAN 4.0 대응 전략', d: '개인정보 보호 강화 환경(iOS)에서도 성과를 측정할 수 있는 데이터 구조 구축' },
      { t: '유저 행동 분석', d: '설치 후 구매, 레벨업, 구독 등 핵심 앱 내 이벤트 데이터 정합성 확보' },
      { t: '크로스 디바이스 트래킹', d: '웹과 앱을 넘나드는 유저 여정 분석 및 기여도 최적화' }
    ],
    pricing: '2,000,000 KRW ~',
    cta: '앱 광고 상담하기',
  },
  en: {
    hero1: 'App Ad',
    hero2: 'Engineering',
    heroDesc: 'Maximize app installs and in-app actions through SKAN 4.0 and MMP optimization.',
    points: [
      { t: 'MMP Integration', d: 'Perfect integration and postback design for AppsFlyer, Airbridge, Adjust, etc.' },
      { t: 'SKAN 4.0 Strategy', d: 'Building data structures to measure performance in privacy-first (iOS) environments.' },
      { t: 'In-app Event Analysis', d: 'Ensuring integrity for core events like purchases, level-ups, or subscriptions.' },
      { t: 'Cross-device Tracking', d: 'Web-to-app journey analysis and attribution optimization.' }
    ],
    pricing: 'Starting from 2M KRW',
    cta: 'Request App Consulting',
  }
};

export default function AppAdsPage() {
  const [lang] = useLang();
  const c = content[lang] || content.ko;

  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem' }}>HI-OP / APP ADS</div>
        <a href="/" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>BACK TO HOME</a>
      </nav>
      <LeadFormTop
        eyebrow={lang === 'ko' ? '앱 광고 진단' : 'App Ads Diagnosis'}
        title={lang === 'ko' ? '앱 설치 이후의 유저 품질까지 점검합니다' : 'We review user quality beyond app installs.'}
        description={
          lang === 'ko'
            ? 'MMP, SKAN, 인앱 이벤트가 광고 알고리즘에 제대로 전달되는지 확인합니다. 설치 수뿐 아니라 구매, 구독, 핵심 행동까지 함께 보겠습니다.'
            : 'We check whether MMP, SKAN, and in-app events are passed clearly to ad algorithms, with a focus on quality actions.'
        }
        bullets={lang === 'ko' ? ['MMP 포스트백', 'SKAN 4.0', '인앱 이벤트'] : ['MMP postbacks', 'SKAN 4.0', 'In-app events']}
        source="app-ads-top"
        lang={lang}
        accent="var(--hiop-blue)"
      />
      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-blue)' }}>{c.hero1}</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">{c.hero2}</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px' }}>{c.heroDesc}</p>
        </div>
      </section>
      <section style={{ padding: '5rem 2rem' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {c.points.map((p, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.t}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '5rem 2rem', background: '#000', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{c.pricing}</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem', background: 'var(--hiop-blue)', color: '#fff' }}>
          {c.cta}
        </a>
      </section>
      <Footer lang={lang} />
    </main>
  );
}
