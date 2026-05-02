'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function MobilePortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-light min-h-screen pb-20">
      {/* Mobile Header */}
      <nav style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid var(--border-dark)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem', lineHeight: 1 }}>HI-OP</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 900, background: 'var(--hiop-orange)', padding: '0.2rem 0.5rem' }}>MOBILE</div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '3rem 1.2rem' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="font-display" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            데이터로<br />증명하는<br /><span style={{ color: 'var(--hiop-orange)' }}>ROAS 1위</span>
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.5, color: '#444' }}>
            가장 최신 기술을 적용한 디지털 광고를 설계하여 고객에게 압도적 성과를 가져다 드립니다.
          </p>
        </motion.div>
      </section>

      {/* Service Links - Large Tap Targets */}
      <section style={{ padding: '0 1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { href: '/m/meta', name: '메타 광고', color: 'var(--hiop-blue)', text: '#fff' },
            { href: '/m/google', name: '구글 광고', color: '#EA4335', text: '#fff' },
            { href: '/m/tiktok-moloco', name: '틱톡 & 몰로코', color: 'var(--hiop-green)', text: '#000' }
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <motion.div 
                whileTap={{ scale: 0.98 }}
                style={{ 
                  background: item.color, 
                  color: item.text, 
                  padding: '2.5rem 1.5rem', 
                  border: '3px solid var(--border-dark)',
                  boxShadow: '6px 6px 0 var(--border-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span className="font-display" style={{ fontSize: '2rem' }}>{item.name}</span>
                <ArrowRight size={32} strokeWidth={3} />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Contact Button */}
      <div style={{ padding: '3rem 1.2rem 1rem' }}>
        <a 
          href="https://open.kakao.com/o/srdaF2si" 
          className="btn-brutal" 
          style={{ width: '100%', background: '#FEE500', color: '#000', fontSize: '1.4rem' }}
        >
          카카오톡 실시간 문의
        </a>
      </div>

      {/* SEO Section */}
      <section style={{ padding: '3rem 1.2rem', background: '#fff', borderTop: '3px solid var(--border-dark)' }}>
        <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>디지털 마케팅 핸드북 2025</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
          <article>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 900 }}>01. 데이터 엔지니어링의 중요성</h3>
            <p>쿠키리스 시대에 가장 중요한 것은 정확한 데이터 수집입니다. 히옵은 CAPI와 서버사이드 트래킹을 통해 누락 없는 성과 측정을 보장합니다.</p>
          </article>
          
          <article>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 900 }}>02. 머신러닝 학습 최적화</h3>
            <p>매체의 AI가 가장 잘 작동할 수 있도록 최적의 계정 구조를 설계합니다. 단순한 타겟팅이 아닌 데이터 피딩 전략이 승부를 가릅니다.</p>
          </article>

          <article>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 900 }}>03. 풀퍼널 마케팅 전략</h3>
            <p>인지부터 구매까지, 유기적으로 연결된 캠페인 설계를 통해 고객 생애 가치(LTV)를 극대화합니다.</p>
          </article>

          <article>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 900 }}>04. 실시간 성과 대시보드</h3>
            <p>투명한 데이터 공유를 통해 광고주와 마케터가 동일한 지표를 보고 최선의 결정을 내릴 수 있는 환경을 제공합니다.</p>
          </article>

          <article>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 900 }}>05. 히옵의 성과 증명</h3>
            <p>우리는 숫자로 말합니다. 업종별 성공 공식을 바탕으로 귀사의 비즈니스에 최적화된 ROAS 상승 시나리오를 제안합니다.</p>
          </article>
        </div>
      </section>

      <footer style={{ padding: '3rem 1.2rem', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#999' }}>
        © 2025 HI-OP DIGITAL. MOBILE VER.
      </footer>
    </main>
  );
}
