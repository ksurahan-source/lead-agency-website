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
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / GOOGLE</div>
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
            <h1 className="massive-text" style={{ color: '#EA4335' }}>구글 광고</h1>
            <h1 className="massive-text">전략 설계</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                검색 의도 분석부터<br />머신러닝 최적화까지<br /><span style={{ color: '#EA4335' }}>완벽히</span> 설계합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.
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
        <div className="split-left" style={{ background: '#EA4335', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>단순 입찰 조정을 넘어선 테크니컬 구글 광고 컨설팅.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: 'GTM 인프라 설계', d: 'Google Tag Manager를 활용한 정밀한 사용자 행동 추적 및 데이터 정합성 확보' },
              { t: '검색 의도 분석', d: '사용자의 검색 의도 기반 키워드 포트폴리오 및 맞춤 소재 전략 수립' },
              { t: 'PMax 효율 극대화', d: '실적 최대화 캠페인의 자산 그룹 최적화 및 머신러닝 학습 촉진' },
              { t: '유튜브 풀퍼널 전략', d: '브랜드 인지부터 최종 전환까지 아우르는 비디오 광고 캠페인 설계' }
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
              { title: 'GTM 기반 트래킹 설계', items: ['향상된 전환(EC) 연동', '서버사이드 GTM 구축', 'GA4 연동 및 진단'] },
              { title: '검색 & 디스플레이 최적화', items: ['키워드 포트폴리오 구축', '스마트 입찰 최적화', '광고 문안 및 에셋 개선'] },
              { title: '실적 최대화(PMax) 극대화', items: ['자산 그룹 시그널 최적화', '알고리즘 학습 촉진', '크로스 채널 예산 배분'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#EA4335" /> {item}
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
          <h2 className="massive-text" style={{ color: '#FBBC05' }}>최고의</h2>
          <h2 className="massive-text">성과를</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            구글 광고의 핵심은 데이터와 머신러닝의 조화입니다. 지금 바로 전문가의 무료 진단을 신청하세요.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="google" />
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)', fontWeight: 800, fontSize: '1.2rem' }}>
        © 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
