'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import LeadFormTop from '../../components/LeadFormTop';
import MobileStickyCTA from '@/components/MobileStickyCTA';

const points = [
  {
    t: '알고리즘 최적화 계정 구조',
    d: '매체 머신러닝이 가장 빠르게 학습하는 캠페인 구조를 설계합니다. 세팅 하나가 광고비 효율을 두 배로 만듭니다.',
  },
  {
    t: '정교한 재타겟팅 설계',
    d: '방문자 행동 데이터 기반의 오디언스 세분화. 장바구니 이탈자, 상세 페이지 열람자를 각각 다른 메시지로 공략합니다.',
  },
  {
    t: '실시간 성과 대시보드',
    d: '매체 리포트 너머, 실제 사업 단위의 광고비 대비 매출(ROAS)을 실시간으로 파악할 수 있는 대시보드를 구축합니다.',
  },
  {
    t: '소재 데이터 엔지니어링',
    d: '클릭률, 전환율, 구매 단가까지 데이터가 증명한 소재의 패턴을 추출하고, 계속해서 변주해 광고 피로도를 방지합니다.',
  },
];

export default function EcomAgencyPage() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <LeadFormTop
        eyebrow="이커머스 진단"
        title="이커머스 성장 흐름을 정밀하게 점검합니다"
        description="상품 조회, 장바구니, 결제, 재구매 데이터가 광고 학습에 제대로 연결되는지 확인하고, 매출 기준으로 먼저 개선할 순서를 정리해드립니다."
        bullets={['상품별 누수 확인', 'ASC/PMax 구조 점검', '매출 기준 리포트']}
        source="ecom-agency-top"
        formVariant="ecom"
        accent="var(--hiob-blue)"
      />

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiob-blue)', wordBreak: 'keep-all' }}>매출은 있는데</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text" style={{ wordBreak: 'keep-all' }}>광고가 억울함</motion.h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            구매 데이터가 제대로 들어가지 않으면 알고리즘도 감으로 움직입니다.<br />
            히옵은 이커머스 광고가 배울 수 있는 데이터를 다시 정리합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '3rem', wordBreak: 'keep-all' }}>히옵이 다른 이유</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {points.map((p, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '1rem', wordBreak: 'keep-all' }}>{p.t}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444', lineHeight: 1.7 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', background: '#000', color: '#fff', textAlign: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#aaa', marginBottom: '1rem' }}>대행 수수료</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '0.5rem' }}>월 집행 예산의 20%</h2>
        <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '3rem' }}>최소 월 300만원부터</p>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.5rem)', background: 'var(--hiob-blue)', color: '#fff' }}>
          대행 상담 신청하기 →
        </a>
      </section>

      <section style={{ padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.1rem, 4vw, 2rem)', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="ecom-agency" lang="ko" variant="ecom" />
        </div>
      </section>

      <MobileStickyCTA label="이커머스 진단 신청하기" />
      <Footer />
    </main>
  );
}
