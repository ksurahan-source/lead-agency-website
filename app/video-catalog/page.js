'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';

const points = [
  {
    t: '제품 피드 기반 영상 자동 생성',
    d: '상품 데이터를 연결하면 수백 개의 개인화된 영상 소재가 자동으로 생성됩니다. 소재 제작 비용과 시간을 동시에 줄입니다.',
  },
  {
    t: '다이내믹 제품 광고 최적화',
    d: '열람한 상품을 맞춤 영상으로 다시 보여주는 동적 광고의 효율을 극대화하는 템플릿 설계를 제공합니다.',
  },
  {
    t: '클릭을 부르는 후킹 설계',
    d: '데이터로 검증된 후킹 요소와 브랜드 정체성을 결합해, 스크롤을 멈추게 하는 첫 프레임을 설계합니다.',
  },
  {
    t: '성과 기반 예산 집중',
    d: '잘 팔리는 제품군에 예산이 자동으로 몰리는 지능형 광고 피드 관리로 ROAS를 극대화합니다.',
  },
];

export default function VideoCatalogPage() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="font-display" style={{ fontSize: '2.5rem' }}>히옵</div>
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-orange)' }}>영상</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">카탈로그 광고</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            동적 소재 최적화로 평균 ROAS 68%, 최대 250% 향상.<br />
            히옵이 설계하는 자동화된 영상 광고 시스템입니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>히옵 영상 카탈로그의 핵심</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {points.map((p, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.t}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444', lineHeight: 1.7 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#000', color: '#fff', textAlign: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#aaa', marginBottom: '1rem' }}>서비스 금액</p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '3rem' }}>200만원~</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem' }}>
          영상 카탈로그 구축 문의하기 →
        </a>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="video-catalog" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
