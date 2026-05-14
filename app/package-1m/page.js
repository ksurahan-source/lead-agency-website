'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import LeadFormTop from '../../components/LeadFormTop';

const problems = [
  '비싼 돈 들여 만든 웹사이트인데 문의가 한 건도 없으시죠?',
  '광고를 돌리고 있는데 데이터가 안 잡혀서 성과를 알 수가 없으시죠?',
  '소재가 하나뿐인데 며칠 만에 효율이 반 토막 나시죠?',
  '예산이 적다는 이유로 대행사가 제대로 신경도 안 써주시죠?',
];

const packageItems = [
  {
    num: '01',
    t: '고전환 원페이지 웹사이트',
    sub: '(50만원 상당)',
    d: '전환 추적 인프라(전환 API, GA4, GTM)가 완벽하게 세팅된 고효율 랜딩페이지. 방문자가 행동할 수밖에 없는 심리 기반 구조로 설계합니다.',
  },
  {
    num: '02',
    t: '숏폼 영상 소재 1편',
    sub: '(기획·촬영·편집 포함)',
    d: '알고리즘이 선호하는 후킹 구조로 기획된 릴스/쇼츠 영상. 처음 3초가 스크롤을 멈추게 만드는 소재입니다.',
  },
  {
    num: '03',
    t: '6일 실전 광고 집행',
    sub: '(30만원 광고비 포함)',
    d: '메타(하루 4만원) + 구글(하루 1만원) 믹스 운영. 첫 데이터 수집과 잠재 고객 반응 테스트를 동시에 진행합니다.',
  },
  {
    num: '04',
    t: '성과 분석 및 스케일업 가이드',
    sub: '',
    d: '6일치 실전 데이터를 기반으로 한 정직한 성과 분석. 어떤 방향으로 예산을 늘려야 하는지 명확한 다음 단계를 제시합니다.',
  },
];

export default function Package1MPage() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="font-display" style={{ fontSize: '2.5rem' }}>히옵</div>
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <LeadFormTop
        eyebrow="100만원 패키지"
        title="첫 광고 인프라를 빠르게 갖춰드립니다"
        description="랜딩, 릴스, 6일 테스트 집행까지 묶어 첫 데이터를 확인합니다. 현재 상황에서 어떤 메시지와 매체가 반응하는지 짧은 기간 안에 정리해드립니다."
        bullets={['랜딩 1개', '숏폼 1편', '6일 테스트 집행']}
        source="package-1m-top"
        accent="var(--hiop-orange)"
      />

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ color: 'var(--hiop-orange)' }}>100만원</motion.h1>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="massive-text">올인원 패키지</motion.h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2rem', maxWidth: '800px', lineHeight: 1.5 }}>
            웹사이트 제작 + 릴스 영상 + 6일 광고 집행.<br />일주일 만에 광고 인프라를 통째로 갖춥니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)', background: '#fff' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>이런 상황에 처해 계신가요?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {problems.map((p, i) => (
              <div key={i} className="brutalist-card" style={{ background: '#f0f0f0' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>히옵의 원스톱 솔루션</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '4rem', color: '#444', lineHeight: 1.6 }}>
            단순히 광고를 &lsquo;돌리는&rsquo; 것이 아니라, 성과가 날 수밖에 없는 &lsquo;인프라&rsquo;를 일주일 안에 통째로 구축합니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {packageItems.map((item, i) => (
              <div key={i} className="brutalist-card">
                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--hiop-orange)', lineHeight: 1, marginBottom: '1rem' }}>{item.num}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.3rem', color: 'var(--hiop-blue)' }}>{item.t}</h3>
                {item.sub && <p style={{ fontSize: '1rem', fontWeight: 700, color: '#888', marginBottom: '1rem' }}>{item.sub}</p>}
                <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.6, color: '#333', marginTop: '0.8rem' }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#000', color: '#fff', textAlign: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#aaa', marginBottom: '1rem' }}>총 비용</p>
        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '0.5rem' }}>1,000,000원</h2>
        <p style={{ fontSize: '1rem', color: '#777', marginBottom: '1rem' }}>부가세 별도</p>
        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--hiop-orange)', marginBottom: '3rem' }}>소요 기간: 단 7일</p>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
          지금 바로 시작하기 →
        </a>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fff', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="package-1m" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
