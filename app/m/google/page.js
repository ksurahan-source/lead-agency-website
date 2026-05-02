'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Search, BarChart, Target } from 'lucide-react';
import Link from 'next/link';

export default function MobileGooglePage() {
  return (
    <main className="bg-light min-h-screen pb-20">
      <PixelScrollTracker />

      {/* Mobile Nav */}
      <nav style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '3px solid var(--border-dark)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/m" style={{ marginRight: '1rem', color: 'inherit' }}><ArrowLeft size={24} /></Link>
        <div className="font-display" style={{ fontSize: '1.2rem' }}>HI-OP / GOOGLE</div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '3rem 1.2rem', background: '#fff' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <p style={{ fontWeight: 900, color: '#EA4335', marginBottom: '1rem', fontSize: '0.9rem' }}>INTENT ENGINEERING</p>
          <h1 className="font-display" style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '2rem', wordBreak: 'keep-all' }}>
            구글 광고는<br />
            키워드가 아닌<br />
            <span style={{ background: '#EA4335', color: '#fff', padding: '0 0.4rem' }}>'데이터'</span> 싸움입니다.
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.6, color: '#333' }}>
            단순히 높은 입찰가를 쓰는 것이 정답이 아닙니다.<br />
            사용자의 의도를 데이터화하고 머신러닝이 이를 학습하게 만들어야 합니다.
          </p>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '2rem 1.2rem', background: '#EA4335', color: '#fff' }}>
        <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>문의가 증명하는 성과</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { b: 'OO 법률사무소', m: 'DB 단가 40% 절감', icon: <Search size={20} /> },
            { b: 'YY 가전 브랜드', m: 'PMax ROAS 420%', icon: <BarChart size={20} /> },
            { b: 'AA 어학원', m: '상담 전환율 2.5배 상승', icon: <Target size={20} /> }
          ].map((stat, i) => (
            <div key={i} style={{ border: '2px solid #fff', padding: '1.2rem', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#fff', color: '#EA4335', padding: '0.5rem', borderRadius: '50%' }}>{stat.icon}</div>
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
            { t: 'GTM 기반 트래킹 설계', d: '향상된 전환(EC) 연동 및 데이터 정합성 확보' },
            { t: 'PMax 효율 극대화', d: '실적 최대화 캠페인의 자산 그룹 및 시그널 최적화' },
            { t: 'GA4 오디언스 연동', d: '고급 행동 데이터를 활용한 정밀 타겟팅 수행' }
          ].map((item, idx) => (
            <div key={idx} className="brutalist-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Check size={24} color="#EA4335" strokeWidth={4} style={{ marginTop: '0.2rem' }} />
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
        <h2 className="font-display" style={{ color: '#FBBC05', fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>무료 진단 신청</h2>
        <LeadForm source="google-mobile" />
      </section>

      <footer style={{ padding: '3rem 1.2rem', textAlign: 'center', background: '#fff', borderTop: '2px solid #ddd' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a href="https://open.kakao.com/o/srdaF2si" className="btn-brutal" style={{ width: '100%', background: '#FEE500', color: '#000' }}>
            카카오톡 상담하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '0.8rem' }}>© 2025 HI-OP GOOGLE MOBILE</p>
      </footer>
    </main>
  );
}
