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
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / SHORT-FORM</div>
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
            <h1 className="massive-text" style={{ color: '#00f2fe' }}>숏폼 &</h1>
            <h1 className="massive-text">알고리즘</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                강력한 알고리즘과<br />크리에이티브로<br /><span style={{ color: '#00f2fe' }}>시장</span>을 장악합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                틱톡 숏폼 기획부터 몰로코 머신러닝 최적화까지, 차세대 퍼포먼스 광고의 모든 것을 히옵이 설계합니다.
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
        <div className="split-left" style={{ background: '#00f2fe', color: '#111', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>숏폼 알고리즘을 꿰뚫는 네이티브 콘텐츠 중심의 퍼포먼스 전략.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: '후킹 크리에이티브', d: '틱톡 유저의 시선을 3초 만에 사로잡는 Hook 중심의 네이티브 소재 기획' },
              { t: '몰로코 머신러닝 최적화', d: '글로벌 RTB 머신러닝 기반의 정밀한 오디언스 타겟팅 및 자동 입찰 설계' },
              { t: 'MMP 데이터 매핑', d: 'AppsFlyer, Airbridge 등 MMP 연동을 통한 진성 유저 행동 추적 및 성과 측정' },
              { t: '알고리즘 튜닝', d: '매체별 추천 알고리즘을 학습시키는 퍼포먼스 운영 기법으로 노출 극대화' }
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
              { title: '틱톡 크리에이티브 기획', items: ['숏폼 후크(Hook) 설계', 'UGC 스타일 소재 발굴', '고효율 스토리보드 기획'] },
              { title: 'Moloco RTB 퍼포먼스', items: ['글로벌 프로그래매틱 세팅', 'CPA 목표 기반 자동 입찰', '리타겟팅 오디언스 설계'] },
              { title: 'MMP & 데이터 분석', items: ['MMP 포스트백 매핑', '어트리뷰션 윈도우 진단', '인앱 이벤트 퍼널 분석'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#00f2fe" /> {item}
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
          <h2 className="massive-text" style={{ color: '#00FF66' }}>트렌드를</h2>
          <h2 className="massive-text">선도하라</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            숏폼과 RTB 광고의 성공은 속도와 정확성입니다. 히옵의 전문가들이 여러분의 캠페인을 가속화해 드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="tiktok-moloco" />
        </div>
      </section>

      <footer style={{ padding: '5rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <a
            href="https://open.kakao.com/o/srdaF2si"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal"
            style={{ background: '#FEE500', color: '#000', fontSize: '1.2rem' }}
          >
            카카오톡 1:1 채팅 문의하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP / SHORT-FORM SPECIALIST. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
