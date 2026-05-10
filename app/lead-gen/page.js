'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';

const points = [
  {
    t: '전환 최적화 구조 설계',
    d: '방문자가 행동할 수밖에 없는 심리 기반 레이아웃. 헤드라인, 신뢰 요소, 행동 유도 버튼의 위치를 데이터로 검증합니다.',
  },
  {
    t: '완벽한 추적 세팅 기본 포함',
    d: '스크롤 깊이, 버튼 클릭, 양식 제출까지 모든 행동 데이터를 자동 수집. 광고 알고리즘이 즉시 학습할 수 있는 환경입니다.',
  },
  {
    t: '초고속 로딩 최적화',
    d: '페이지 로딩 속도 1초 지연마다 전환율이 7% 떨어집니다. 히옵은 모바일 기준 2초 내 완전 로딩을 목표로 최적화합니다.',
  },
  {
    t: '자동 연동 세팅',
    d: '접수된 문의를 이메일, 카카오 채널, 구글 시트 등 원하는 곳으로 실시간 전달. 놓치는 리드가 없습니다.',
  },
];

export default function LeadGenPage() {
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
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-orange)' }}>문의 받는</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">웹사이트 제작</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            예쁜 웹사이트가 아닌, 실제로 문의가 들어오는 웹사이트.<br />
            추적 세팅까지 완벽하게 포함된 원페이지를 제작합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>히옵 웹사이트에 포함되는 것들</h2>
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
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '3rem' }}>150만원~</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem' }}>
          웹사이트 제작 문의하기 →
        </a>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="lead-gen" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
