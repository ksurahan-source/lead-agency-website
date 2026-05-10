'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';

const points = [
  {
    t: '구매 여정 전체 데이터 지도 작성',
    d: '상품 상세 페이지 조회부터 최종 결제 완료까지, 전환 퍼널의 모든 단계에서 데이터 누락을 없앱니다.',
  },
  {
    t: '매출 누락 제로 설계',
    d: '결제대행사(PG사) 완료 시점과 광고 매체의 전환 이벤트를 100% 일치시켜 ROAS를 정확하게 측정합니다.',
  },
  {
    t: '재구매 고객 기반 성장 분석',
    d: '신규 고객과 재구매 고객을 구분해 고객생애가치(LTV) 중심의 실질적인 비즈니스 성장을 측정합니다.',
  },
  {
    t: '직접 점검 가능한 체크리스트 제공',
    d: '광고주가 스스로 추적 상태를 진단하고 문제를 발견할 수 있는 고도화된 자가 진단 도구를 제공합니다.',
  },
];

export default function EcomGuidePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

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
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-green)' }}>이커머스</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">추적 가이드</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            매출 한 건도 놓치지 않는 완벽한 이커머스 데이터 추적 체계.<br />
            히옵이 구축 방법을 직접 안내합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>가이드에서 다루는 내용</h2>
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
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '3rem' }}>100만원~</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem', background: 'var(--hiop-green)' }}>
          가이드 신청하기 →
        </a>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="ecom-guide" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
