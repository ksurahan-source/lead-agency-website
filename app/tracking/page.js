'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';

const points = [
  {
    t: '전환 API (CAPI) 구축',
    d: '브라우저 쿠키 차단을 우회하는 서버 간 전송 방식으로, 아이폰 사용자의 전환 데이터까지 99% 이상 복원합니다.',
  },
  {
    t: 'GA4 고도화 세팅',
    d: '단순 방문자 수가 아닌, 실제 구매 여정 전반을 추적하는 맞춤 이벤트와 전자상거래 추적 체계를 구축합니다.',
  },
  {
    t: 'GTM 통합 관리',
    d: '모든 추적 코드를 한 곳에서 체계적으로 관리해 사이트 속도 저하 없이 데이터를 수집합니다.',
  },
  {
    t: '데이터 정합성 감사',
    d: '광고 관리자 수치와 실제 매출이 일치하지 않는 원인을 찾아 완벽하게 교정합니다.',
  },
];

const whys = [
  { num: '68%', label: 'iOS 14.5 이후 국내 메타 광고 평균 데이터 누락률' },
  { num: '3배', label: '전환 API 적용 후 광고 알고리즘 학습 속도 향상' },
  { num: '100%', label: '히옵의 데이터 정합성 보장 목표' },
];

export default function TrackingPage() {
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
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-orange)' }}>추적</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">완벽화</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            전환 API, GA4, GTM을 통합 구축해 쿠키 차단 시대에도<br />
            데이터 공백 없는 광고 운영을 가능하게 합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '4px solid #000', borderLeft: '4px solid #000' }}>
            {whys.map((w, i) => (
              <div key={i} style={{ padding: '3rem 2rem', borderRight: '4px solid #000', borderBottom: '4px solid #000', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--hiop-orange)', lineHeight: 1 }}>{w.num}</div>
                <p style={{ fontSize: '1rem', fontWeight: 700, marginTop: '1rem', color: '#333', lineHeight: 1.5 }}>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>히옵이 세팅하는 것들</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '3rem' }}>50만원~</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem' }}>
          추적 무료 진단 신청하기 →
        </a>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="tracking" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
