'use client';

import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import Footer from '../../components/Footer';

const content = {
  ko: {
    hero1: '숏폼 영상',
    hero2: '제작 대행',
    heroDesc: '리드 수집용 및 고품질 이커머스용 릴스, 틱톡, 쇼츠를 전략적으로 기획하고 제작합니다.',
    points: [
      { t: '후킹 포인트 분석', d: '초반 3초 이탈률을 최소화하는 강력한 시각적/청각적 후크 설계' },
      { t: '네이티브 콘텐츠', d: '광고처럼 보이지 않는 유저 친화적 스토리텔링으로 거부감 최소화' },
      { t: '성과 기반 반복 제작', d: '데이터로 증명된 효율적인 소재를 바탕으로 다양한 변주 대량 제작' },
      { t: '올인원 프로세스', d: '기획부터 촬영, 편집, 광고 집행 최적화까지 한 번에 해결' }
    ],
    pricing: '3,000,000 KRW (10회분 기준) ~',
    cta: '숏폼 제작 문의하기',
  },
  en: {
    hero1: 'Short-form',
    hero2: 'Production',
    heroDesc: 'Strategically plan and produce high-quality Reels, TikTok, and Shorts for lead gen and e-commerce.',
    points: [
      { t: 'Hook Point Analysis', d: 'Powerful visual/auditory hooks to minimize early drop-off.' },
      { t: 'Native Content', d: 'User-friendly storytelling that doesn\'t feel like an ad.' },
      { t: 'Data-Driven Iteration', d: 'Mass production of variants based on proven performance.' },
      { t: 'All-in-one Process', d: 'From planning and shooting to editing and ad optimization.' }
    ],
    pricing: 'Starting from 3M KRW (for 10 clips)',
    cta: 'Request Production',
  }
};

export default function ShortFormPage() {
  const [lang] = useLang();
  const c = content[lang] || content.ko;

  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem' }}>HI-OP / SHORT-FORM</div>
        <a href="/" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>BACK TO HOME</a>
      </nav>
      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-green)' }}>{c.hero1}</motion.h1>
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
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem', background: 'var(--hiop-green)', color: '#111' }}>
          {c.cta}
        </a>
      </section>
      <Footer lang={lang} />
    </main>
  );
}
