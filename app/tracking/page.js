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
    t: '전환 0 원인 진단',
    d: '광고관리자, GA4, CRM 숫자가 서로 다르게 말하는 지점을 찾아 누락과 중복을 분리합니다.',
  },
  {
    t: 'CAPI + event_id 복구',
    d: '브라우저 이벤트와 서버 이벤트를 같은 기준으로 맞춰 광고 알고리즘이 배울 수 있는 신호를 보강합니다.',
  },
  {
    t: 'GA4/GTM 정합성 정리',
    d: '문의, 구매, 가입 이벤트 정의를 다시 잡고 채널마다 다른 기준을 하나의 운영 기준으로 정리합니다.',
  },
  {
    t: '매칭 품질 체크리스트',
    d: 'fbp/fbc, event_id, user_data, EMQ 상태를 확인해 광고가 좋은 손님을 찾을 재료를 채웁니다.',
  },
];

const whys = [
  { num: '0', label: '집행은 했는데 광고관리자 전환이 비어 있는 상태' },
  { num: '5.4→8.5', label: '목표로 삼는 Meta 이벤트 매칭 품질 개선 방향' },
  { num: '1장', label: '누락, 중복, 기준 불일치를 한 장으로 정리한 진단표' },
];

export default function TrackingPage() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <LeadFormTop
        eyebrow="데이터 누수 진단"
        title="전환 데이터 흐름을 먼저 점검해드립니다"
        description="광고관리자 숫자가 비었거나 GA4와 CRM이 서로 다른 값을 보여준다면, 추가 집행 전에 데이터 흐름을 확인하는 것이 좋습니다. Pixel, CAPI, GTM, GA4 연결 상태를 정리해드립니다."
        bullets={['Pixel/CAPI 점검', 'event_id 중복 확인', 'GA4 기준 정리']}
        source="tracking-top"
        accent="var(--hiob-orange)"
      />

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiob-orange)', wordBreak: 'keep-all' }}>전환 데이터</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text" style={{ wordBreak: 'keep-all' }}>흐름 점검</motion.h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            Pixel, CAPI, GTM, GA4가 서로 다른 말을 하는 순간<br />
            광고는 좋은 손님을 못 찾습니다. 히옵이 새는 곳부터 표시합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '4px solid #000', borderLeft: '4px solid #000', maxWidth: '100%' }}>
            {whys.map((w, i) => (
              <div key={i} style={{ padding: 'clamp(1.8rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem)', borderRight: '4px solid #000', borderBottom: '4px solid #000', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2.4rem, 8vw, 4rem)', fontWeight: 900, color: 'var(--hiob-orange)', lineHeight: 1 }}>{w.num}</div>
                <p style={{ fontSize: '1rem', fontWeight: 700, marginTop: '1rem', color: '#333', lineHeight: 1.5 }}>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '3rem', wordBreak: 'keep-all' }}>히옵이 빨간 표시하는 것들</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#aaa', marginBottom: '1rem' }}>서비스 금액</p>
        <h2 style={{ fontSize: 'clamp(2.1rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '3rem', wordBreak: 'keep-all' }}>무료 진단 후 50만원~</h2>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.5rem' }}>
          데이터 누수 진단 신청하기 →
        </a>
      </section>

      <section style={{ padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.1rem, 4vw, 2rem)', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="tracking" lang="ko" />
        </div>
      </section>

      <MobileStickyCTA label="트래킹 진단 신청하기" />
      <Footer />
    </main>
  );
}
