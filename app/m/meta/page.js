'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, TrendingUp, BarChart3, Database } from 'lucide-react';
import Link from 'next/link';

export default function MobileMetaPage() {
  return (
    <main className="bg-light min-h-screen pb-20">
      <PixelScrollTracker />

      {/* Mobile Nav */}
      <nav style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '3px solid var(--border-dark)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/m" style={{ marginRight: '1rem', color: 'inherit' }}><ArrowLeft size={24} /></Link>
        <div className="font-display" style={{ fontSize: '1.2rem' }}>HI-OP / META</div>
      </nav>

      {/* Hero Section - Readability Focus */}
      <section style={{ padding: '3rem 1.2rem', background: '#fff' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <p style={{ fontWeight: 900, color: 'var(--hiop-blue)', marginBottom: '1rem', fontSize: '0.9rem' }}>ENGINEERING SPIRIT</p>
          <h1 className="font-display" style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '2rem', wordBreak: 'keep-all' }}>
            우리는 광고를<br />
            <span style={{ background: 'var(--hiop-blue)', color: '#fff', padding: '0 0.4rem' }}>'집행'</span>하지 않고<br />
            <span style={{ borderBottom: '5px solid var(--hiop-blue)' }}>'설계'</span>합니다.
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.6, color: '#333' }}>
            대부분의 대행사는 '어떤 소재를 쓸까'만 고민합니다.<br />
            히옵은 '어떻게 데이터를 머신러닝에 학습시킬까'를 먼저 고민합니다.
          </p>
        </motion.div>
      </section>

      {/* Social Proof - Mobile Grid */}
      <section style={{ padding: '2rem 1.2rem', background: 'var(--hiop-blue)', color: '#fff' }}>
        <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>문의가 증명하는 성과</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {[
            { b: 'OO 성형외과', m: '문의 324% 상승', icon: <TrendingUp size={20} /> },
            { b: 'XX 패션 브랜드', m: 'ROAS 580% 달성', icon: <BarChart3 size={20} /> },
            { b: 'YY 뷰티 몰', m: 'CPA 45% 절감', icon: <Database size={20} /> }
          ].map((stat, i) => (
            <div key={i} style={{ border: '2px solid #fff', padding: '1.2rem', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#fff', color: 'var(--hiop-blue)', padding: '0.5rem', borderRadius: '50%' }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.8 }}>{stat.b}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>{stat.m}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services - Mobile List */}
      <section style={{ padding: '3rem 1.2rem' }}>
        <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '2rem' }}>핵심 서비스</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { t: 'CAPI 서버사이드 트래킹', d: 'iOS 14+ 대응을 위한 서버 사이드 트래킹 완벽 구축' },
            { t: '고급 매칭 솔루션', d: '고객 데이터를 활용한 매칭률 극대화' },
            { t: '릴스 소재 전략', d: '고효율 숏폼 소재 기획 및 데이터 기반 방향성 제안' }
          ].map((item, idx) => (
            <div key={idx} className="brutalist-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Check size={24} color="var(--hiop-blue)" strokeWidth={4} style={{ marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.t}</h3>
                  <p style={{ color: '#555', fontSize: '0.95rem', fontWeight: 600 }}>{item.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form - Mobile Full Width */}
      <section id="contact" style={{ padding: '3rem 1.2rem', background: 'var(--bg-dark)' }}>
        <h2 className="font-display" style={{ color: 'var(--hiop-orange)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>무료 진단 신청</h2>
        <LeadForm source="meta-mobile" />
      </section>

      {/* SEO Section - Compressed for Mobile */}
      <section style={{ padding: '3rem 1.2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>META ADS DEEP DIVE</h3>
        <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#555', fontWeight: 600 }}>
          <p style={{ marginBottom: '1rem' }}>
            현대 메타 광고의 핵심은 픽셀을 넘어선 CAPI(전환 API) 설계에 있습니다. 히옵은 브라우저의 제약을 우회하여 데이터를 서버에서 서버로 직접 전송하는 기술적 인프라를 구축합니다.
          </p>
          <p>
            이를 통해 매칭률(EMQ)을 극대화하고 머신러닝이 더 정확한 잠재 고객을 찾아낼 수 있도록 돕습니다. 단순한 소재 제작을 넘어선 엔지니어링 기반의 성과 최적화, 그것이 히옵의 약속입니다.
          </p>
        </div>
      </section>

      <footer style={{ padding: '3rem 1.2rem', textAlign: 'center', background: '#fff', borderTop: '2px solid #ddd' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a href="https://open.kakao.com/o/srdaF2si" className="btn-brutal" style={{ width: '100%', background: '#FEE500', color: '#000' }}>
            카카오톡 상담하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '0.8rem' }}>© 2025 HI-OP META MOBILE</p>
      </footer>
    </main>
  );
}
