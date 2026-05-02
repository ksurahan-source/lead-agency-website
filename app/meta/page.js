'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function MetaPage() {
  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.5rem' }}>HI-OP / META</div>
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
            <h1 className="massive-text" style={{ color: 'var(--hiop-blue)' }}>META</h1>
            <h1 className="massive-text">PERFORMANCE</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p className="font-syne" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>
                트래킹 인프라부터<br />다시 설계하여<br />ROAS를 증명합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '400px' }}>
                픽셀 · CAPI · 계정 구조 · 소재 전략까지<br />
                데이터 기반의 완벽한 Meta 광고 솔루션을 제공합니다.
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
        <div className="split-left" style={{ background: 'var(--hiop-blue)', color: '#fff', padding: '4rem 2rem' }}>
          <h2 className="font-syne" style={{ fontSize: '4rem', marginBottom: '2rem' }}>WHY<br/>HI-OP?</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>일반 대행사와는 차원이 다른 데이터 인프라를 구축합니다.</p>
        </div>
        <div className="split-right" style={{ padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { t: 'CAPI SERVER-SIDE', d: 'iOS 14+ 대응을 위한 서버 사이드 트래킹 완벽 구축' },
              { t: 'ADVANCED MATCHING', d: '고객 데이터를 활용한 매칭률 극대화' },
              { t: 'STRUCTURE OPTIMIZATION', d: '머신러닝 학습에 최적화된 계정 구조 설계' },
              { t: 'REELS STRATEGY', d: '고효율 숏폼 소재 기획 및 집행' }
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
              { title: '트래킹 인프라 설계', items: ['픽셀 이벤트 정합성 진단', 'CAPI 연동', 'AEM 설정'] },
              { title: '광고 계정 구조 최적화', items: ['캠페인 구조 개편', '예산 배분 전략', '리타겟팅 설계'] },
              { title: '성과 분석 & 개선', items: ['데이터 해석', '액션 플랜 제공', 'ROAS 실질 개선'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 className="font-syne" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={18} color="var(--hiop-blue)" /> {item}
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
          <h2 className="massive-text" style={{ color: 'var(--hiop-orange)' }}>START</h2>
          <h2 className="massive-text">SCALING</h2>
          <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#aaa', maxWidth: '400px' }}>
            지금 바로 무료 진단을 신청하고 데이터 기반의 성장을 경험하세요. 24시간 내로 담당자가 분석 리포트와 함께 연락드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="meta" />
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '3px solid var(--border-dark)', fontWeight: 800 }}>
        © 2025 HI-OP / META SPECIALIST. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
