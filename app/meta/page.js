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
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / META</div>
        <a href="#contact" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none', fontSize: '1.1rem' }}>무료 진단 신청 →</a>
      </nav>

      {/* Hero */}
      <section style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ padding: '6rem 2rem' }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: 'var(--hiop-blue)' }}>메타 광고</h1>
            <h1 className="massive-text">퍼포먼스</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                트래킹 인프라부터<br />다시 설계하여<br /><span style={{ color: 'var(--hiop-blue)' }}>ROAS</span>를 증명합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                픽셀 · CAPI · 계정 구조 · 소재 전략까지<br />
                데이터 기반의 완벽한 Meta 광고 솔루션을 제공합니다.
              </p>
              <div style={{ marginTop: '2.5rem' }}>
                <ArrowDown size={56} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: 'var(--hiop-blue)', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>일반 대행사와는 차원이 다른 데이터 인프라를 구축합니다.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: 'CAPI 서버사이드 트래킹', d: 'iOS 14+ 대응을 위한 서버 사이드 트래킹 완벽 구축 및 누락 데이터 복구' },
              { t: '고급 매칭 솔루션', d: '고객 데이터를 활용한 매칭률 극대화로 머신러닝 최적화 가속' },
              { t: '계정 구조 최적화', d: '광고 세트 중복 제거 및 머신러닝 학습에 최적화된 캠페인 설계' },
              { t: '릴스 소재 전략', d: '고효율 숏폼 소재 기획 및 데이터 기반의 소재 방향성 제안' }
            ].map((item, idx) => (
              <div key={idx} style={{ borderBottom: '3px solid #ddd', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.t}</h3>
                <p style={{ color: '#444', fontSize: '1.1rem', fontWeight: 600 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '7rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', marginBottom: '5rem' }}>핵심 서비스</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: '트래킹 인프라 설계', items: ['픽셀 이벤트 정합성 진단', 'CAPI 연동 및 검증', 'AEM(합산 이벤트 측정) 설정'] },
              { title: '광고 계정 구조 최적화', items: ['캠페인 구조 전면 개편', '예산 배분 및 입찰 전략', '리타겟팅 오디언스 설계'] },
              { title: '성과 분석 & 개선', items: ['데이터 기반 의사결정', '월간 상세 액션 플랜', '실질적인 ROAS 개선'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="var(--hiop-blue)" /> {item}
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
        <div className="split-left" style={{ padding: '7rem 2rem' }}>
          <h2 className="massive-text" style={{ color: 'var(--hiop-orange)' }}>지금</h2>
          <h2 className="massive-text">시작하세요</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            현재 광고 계정의 문제점을 데이터 기반으로 무료 진단해 드립니다. 24시간 내로 담당자가 분석 리포트와 함께 연락드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="meta" />
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)', fontWeight: 800, fontSize: '1.2rem' }}>
        © 2025 HI-OP / META SPECIALIST. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
