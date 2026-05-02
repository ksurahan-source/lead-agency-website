'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function TikTokMolocoPage() {
  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.5rem' }}>HI-OP / SHORT-FORM</div>
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
            <h1 className="massive-text" style={{ color: '#00f2fe' }}>SHORT-FORM</h1>
            <h1 className="massive-text">ALGORITHM</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p className="font-syne" style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>
                강력한 알고리즘과<br />크리에이티브로<br />시장을 장악합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '400px' }}>
                틱톡 숏폼 기획부터 몰로코 머신러닝 최적화까지, 차세대 퍼포먼스 광고의 모든 것을 히옵이 설계합니다.
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
        <div className="split-left" style={{ background: '#00f2fe', color: '#111', padding: '4rem 2rem' }}>
          <h2 className="font-syne" style={{ fontSize: '4rem', marginBottom: '2rem' }}>WHY<br/>HI-OP?</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>숏폼 알고리즘을 꿰뚫는 네이티브 콘텐츠 중심의 퍼포먼스 전략.</p>
        </div>
        <div className="split-right" style={{ padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { t: 'HOOK-DRIVEN CREATIVE', d: '틱톡 유저의 시선을 3초 만에 사로잡는 Hook 중심의 소재 기획' },
              { t: 'MOLOCO MACHINE LEARNING', d: '글로벌 RTB 머신러닝 기반의 정밀한 오디언스 타겟팅' },
              { t: 'MMP DATA MAPPING', d: 'AppsFlyer, Airbridge 등 MMP 연동을 통한 진성 유저 추적' },
              { t: 'ALGORITHM TUNING', d: '매체별 추천 알고리즘을 학습시키는 퍼포먼스 운영 기법' }
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
              { title: '틱톡 크리에이티브 기획', items: ['숏폼 후크(Hook) 설계', 'UGC 스타일 소재 발굴', '고효율 스토리보드'] },
              { title: 'Moloco RTB 퍼포먼스', items: ['글로벌 프로그래매틱 세팅', 'CPA 목표 기반 입찰', '리타겟팅 오디언스'] },
              { title: 'MMP & 데이터 분석', items: ['MMP 포스트백 매핑', '어트리뷰션 윈도우 진단', '퍼널 분석'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 className="font-syne" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={18} color="#00f2fe" /> {item}
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
          <h2 className="massive-text" style={{ color: '#00FF66' }}>CATCH</h2>
          <h2 className="massive-text">TRENDS</h2>
          <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#aaa', maxWidth: '400px' }}>
            숏폼과 RTB 광고의 성공은 속도와 정확성입니다. 히옵의 전문가들이 여러분의 캠페인을 가속화해 드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="tiktok-moloco" />
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '3px solid var(--border-dark)', fontWeight: 800 }}>
        © 2025 HI-OP / SHORT-FORM SPECIALIST. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
