'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone, Cpu, Zap } from 'lucide-react';
import Link from 'next/link';

export default function MobileTikTokPage() {
  return (
    <main className="bg-light min-h-screen pb-20">
      <PixelScrollTracker />

      {/* Mobile Nav */}
      <nav style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '3px solid var(--border-dark)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/m" style={{ marginRight: '1rem', color: 'inherit' }}><ArrowLeft size={24} /></Link>
        <div className="font-display" style={{ fontSize: '1.2rem' }}>HI-OP / SHORT-FORM</div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '3rem 1.2rem', background: '#fff' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <p style={{ fontWeight: 900, color: '#00f2fe', marginBottom: '1rem', fontSize: '0.9rem' }}>ALGORITHM HACKING</p>
          <h1 className="font-display" style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '2rem', wordBreak: 'keep-all' }}>
            숏폼 성공은<br />
            기획이 아니라<br />
            <span style={{ background: '#00f2fe', color: '#111', padding: '0 0.4rem' }}>'알고리즘'</span> 입니다.
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.6, color: '#333' }}>
            알고리즘이 반응할 수밖에 없는 장치들을 소재 곳곳에 심는 것이 히옵의 전략입니다.
          </p>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '2rem 1.2rem', background: '#00f2fe', color: '#111' }}>
        <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>문의가 증명하는 성과</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { b: 'OO 모바일 게임', m: 'CPI 60% 절감', icon: <Smartphone size={20} /> },
            { b: 'ZZ 글로벌 앱', m: '몰로코 ROAS 350%', icon: <Cpu size={20} /> },
            { b: 'BB 웹툰 플랫폼', m: '전환 4.5배 상승', icon: <Zap size={20} /> }
          ].map((stat, i) => (
            <div key={i} style={{ border: '2px solid #111', padding: '1.2rem', background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#111', color: '#00f2fe', padding: '0.5rem', borderRadius: '50%' }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.8 }}>{stat.b}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{stat.m}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '3rem 1.2rem' }}>
        <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '2rem' }}>핵심 서비스</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { t: '후킹 크리에이티브', d: '틱톡 유저의 시선을 3초 만에 사로잡는 기획' },
            { t: '몰로코 RTB 최적화', d: '머신러닝 기반의 정밀한 진성 유저 획득' },
            { t: 'MMP 데이터 매핑', d: '진성 유저 행동 추적 및 알고리즘 실시간 피드백' }
          ].map((item, idx) => (
            <div key={idx} className="brutalist-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Check size={24} color="#00f2fe" strokeWidth={4} style={{ marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.t}</h3>
                  <p style={{ color: '#555', fontSize: '0.95rem', fontWeight: 600 }}>{item.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" style={{ padding: '3rem 1.2rem', background: 'var(--bg-dark)' }}>
        <h2 className="font-display" style={{ color: '#00FF66', fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>무료 진단 신청</h2>
        <LeadForm source="tiktok-mobile" />
      </section>

      <footer style={{ padding: '3rem 1.2rem', textAlign: 'center', background: '#fff', borderTop: '2px solid #ddd' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a href="https://open.kakao.com/o/srdaF2si" className="btn-brutal" style={{ width: '100%', background: '#FEE500', color: '#000' }}>
            카카오톡 상담하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '0.8rem' }}>© 2025 HI-OP SHORT-FORM MOBILE</p>
      </footer>
    </main>
  );
}
