'use client';

import { motion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import Footer from '../../components/Footer';
import LeadFormTop from '../../components/LeadFormTop';

const content = {
  ko: {
    hero1: '광고 전략',
    hero2: '심층 상담',
    heroDesc: '현재 비즈니스의 광고 성과를 데이터 기반으로 정밀 진단하고 즉각적인 성과 개선을 위한 전략 로드맵을 제공합니다.',
    points: [
      { t: '광고 계정 정밀 진단', d: '현재 운영 중인 캠페인 구조, 타겟팅, 소재 효율의 문제점 파악' },
      { t: '데이터 트래킹 점검', d: '픽셀, CAPI, GA4 데이터 수집 상태 확인 및 누락 지점 발견' },
      { t: '맞춤형 미디어 믹스', d: '비즈니스 목표와 예산에 최적화된 매체 배분 전략 제안' },
      { t: '액션 플랜 수립', d: '상담 후 즉시 적용 가능한 실무적인 성과 개선 가이드라인 제공' }
    ],
    pricing: '500,000 KRW (1시간 기준)',
    cta: '상담 예약하기',
  },
  en: {
    hero1: 'Ad Strategy',
    hero2: 'Consulting',
    heroDesc: 'Deep-dive data diagnosis and immediate strategic roadmaps to improve your ad performance.',
    points: [
      { t: 'Account Audit', d: 'Identifying issues in current campaign structures, targeting, and creative efficiency.' },
      { t: 'Tracking Health Check', d: 'Verifying Pixel, CAPI, and GA4 data integrity.' },
      { t: 'Custom Media Mix', d: 'Media allocation strategy optimized for your goals and budget.' },
      { t: 'Actionable Roadmap', d: 'Practical guidelines that can be applied immediately after the session.' }
    ],
    pricing: '500,000 KRW (per hour)',
    cta: 'Book a Session',
  }
};

export default function ConsultingPage() {
  const [lang] = useLang();
  const c = content[lang] || content.ko;

  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem' }}>HI-OP / CONSULTING</div>
        <a href="/" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>BACK TO HOME</a>
      </nav>
      <LeadFormTop
        eyebrow={lang === 'ko' ? '광고 전략 상담' : 'Strategy Consulting'}
        title={lang === 'ko' ? '현재 광고 구조를 차분히 진단해드립니다' : 'A calm, structured diagnosis of your ad system.'}
        description={
          lang === 'ko'
            ? '계정 구조, 트래킹, 소재, 랜딩을 함께 확인하고 지금 가장 먼저 개선해야 할 순서를 정리합니다. 상담 후 바로 실행 가능한 액션 플랜을 드립니다.'
            : 'We review account structure, tracking, creative, and landing flow together, then provide an action plan you can execute immediately.'
        }
        bullets={lang === 'ko' ? ['계정 진단', '데이터 점검', '액션 플랜'] : ['Account audit', 'Data check', 'Action plan']}
        source="consulting-top"
        lang={lang}
        accent="var(--hiop-orange)"
      />
      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-orange)' }}>{c.hero1}</motion.h1>
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
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem' }}>
          {c.cta}
        </a>
      </section>
      <Footer lang={lang} />
    </main>
  );
}
