'use client';

import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import Footer from '../../components/Footer';
import LeadFormTop from '../../components/LeadFormTop';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import Logo from '@/components/Logo';

const content = {
  ko: {
    hero1: '광고 설명 말고',
    hero2: '문제 장면부터',
    heroDesc: '전환 0, 데이터 누락, 알고리즘 학습 실패 같은 문제를 밈형 숏폼 광고로 빠르게 이해시키고 실험합니다.',
    points: [
      { t: '첫 3초 멘붕 컷', d: '“분명 집행했는데 결과 0?”처럼 문제를 바로 알아보는 장면으로 시작합니다.' },
      { t: '밈형 진단 카피', d: '대시보드, 빨간 X, 포스트잇, 손그림 낙서로 어려운 기술 메시지를 쉽게 만듭니다.' },
      { t: '성과 기반 변주', d: '후킹, 자막, CTA, 썸네일을 바꿔가며 문의 품질과 전환 데이터를 같이 봅니다.' },
      { t: '렌더/집행 연결', d: '대본, 이미지 프롬프트, 보이스, 음악, 렌더까지 내부 제작 도구와 연결합니다.' }
    ],
    pricing: '3,000,000 KRW (10회분 기준) ~',
    cta: '밈형 광고 제작 문의하기',
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
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Logo height={28} />
        <a href="/" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>BACK TO HOME</a>
      </nav>
      <LeadFormTop
        eyebrow={lang === 'ko' ? '숏폼 광고 제작' : 'Short-form Production'}
        title={lang === 'ko' ? '브랜드에 맞는 숏폼 소재 방향을 제안드립니다' : 'We propose short-form creative built around your brand.'}
        description={
          lang === 'ko'
            ? '문제 인식형 후킹은 유지하되, 고객이 불편하지 않도록 브랜드 톤에 맞춰 소재를 설계합니다. 계속 올릴 릴스 자산의 첫 묶음부터 정리해드립니다.'
            : 'We keep the problem-aware hook, but shape it around your brand tone so the creative can be tested and reused.'
        }
        bullets={lang === 'ko' ? ['밈형 후킹', '릴스/쇼츠', '성과 변주'] : ['Meme hooks', 'Reels/Shorts', 'Performance variants']}
        source="short-form-top"
        lang={lang}
        accent="var(--hiob-green)"
      />
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiob-green)', wordBreak: 'keep-all' }}>{c.hero1}</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text" style={{ wordBreak: 'keep-all' }}>{c.hero2}</motion.h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, marginTop: '2rem', maxWidth: '800px' }}>{c.heroDesc}</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {c.points.map((p, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '1rem', wordBreak: 'keep-all' }}>{p.t}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', background: '#000', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6.5vw, 3rem)', marginBottom: '1rem', wordBreak: 'keep-all' }}>{c.pricing}</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.5rem)', background: 'var(--hiob-green)', color: '#111' }}>
          {c.cta}
        </a>
      </section>
      <MobileStickyCTA label="숏폼 제작 문의하기" />
      <Footer lang={lang} />
    </main>
  );
}
