'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function GooglePage() {
  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.5rem' }}>HI-OP / GOOGLE</div>
        <a href="#contact" className="font-syne" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>무료 진단 신청 →</a>
      </nav>

      {/* Hero */}
      <section style={{ borderBottom: '3px solid var(--border-dark)' }}>
        <div className="wrap" style={{ padding: '6rem 2rem' }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: '#EA4335' }}>GOOGLE</h1>
            <h1 className="massive-text">INTENT</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p className="font-syne" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>
                검색 의도부터<br />머신러닝 최적화까지<br />완벽히 설계합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '400px' }}>
                GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowDown size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '3px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: '#EA4335', color: '#fff', padding: '4rem 2rem' }}>
          <h2 className="font-syne" style={{ fontSize: '4rem', marginBottom: '2rem' }}>WHY<br/>HI-OP?</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>단순 입찰 조정을 넘어선 테크니컬 구글 광고 컨설팅.</p>
        </div>
        <div className="split-right" style={{ padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { t: 'GTM INFRA', d: 'Google Tag Manager를 활용한 정밀한 사용자 행동 추적' },
              { t: 'INTENT ANALYSIS', d: '검색 의도 기반 키워드 및 소재 전략 수립' },
              { t: 'PMAX MAXIMIZATION', d: '머신러닝 알고리즘을 활용한 실적 최대화 캠페인 최적화' },
              { t: 'YOUTUBE FUNNEL', d: '인지부터 전환까지 아우르는 비디오 광고 설계' }
            ].map((item, idx) => (
              <div key={idx} style={{ borderBottom: '2px solid #ddd', paddingBottom: '1.5rem' }}>
                <h3 className="font-syne" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.t}</h3>
                <p style={{ color: '#666' }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '6rem 2rem', borderBottom: '3px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '6vw', marginBottom: '4rem' }}>CORE SERVICES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'GTM 기반 트래킹 설계', items: ['향상된 전환(EC) 연동', '서버사이드 GTM 구축', 'GA4 연동 진단'] },
              { title: '검색 & 디스플레이 최적화', items: ['키워드 포트폴리오 구축', '스마트 입찰 최적화', '문안 및 에셋 개선'] },
              { title: '실적 최대화(PMax) 극대화', items: ['자산 그룹 시그널 최적화', '알고리즘 학습 촉진', '크로스 채널 배분'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 className="font-syne" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={18} color="#EA4335" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="split-section" style={{ background: 'var(--bg-dark)', color: 'var(--text-light)' }}>
        <div className="split-left" style={{ padding: '6rem 2rem' }}>
          <h2 className="massive-text" style={{ color: '#FBBC05' }}>DRIVE</h2>
          <h2 className="massive-text">RESULTS</h2>
          <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#aaa', maxWidth: '400px' }}>
            구글 광고의 핵심은 데이터와 머신러닝의 조화입니다. 지금 바로 전문가의 무료 진단을 신청하세요.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="google" />
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '3px solid var(--border-dark)', fontWeight: 800 }}>
        © 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
