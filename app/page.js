'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PortalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-light min-h-screen">
      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1 }}>HI-OP</div>
        <div className="font-syne" style={{ fontWeight: 800, textTransform: 'uppercase' }}>MAXIMUM ROAS</div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="massive-text"
        >
          데이터 기반
        </motion.h1>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="massive-text massive-text-stroke"
        >
          퍼포먼스 마케팅
        </motion.h1>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ maxWidth: '600px', fontSize: '1.6rem', fontWeight: 700, textAlign: 'right' }}
          >
            히옵(HI-OP)은 가장 최신 기술을 적용한 디지털 광고를 설계하여 고객에게 <span style={{ color: 'var(--hiop-orange)' }}>최대의 ROAS</span>를 가져다 주는 것을 목표로 합니다.
          </motion.p>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container" style={{ marginTop: '4rem' }}>
        <div className="marquee-content">
          MAXIMUM ROAS • 히옵 컨설팅 • META ADS • GOOGLE ADS • TIKTOK & MOLOCO • MAXIMUM ROAS • 히옵 컨설팅 • META ADS • GOOGLE ADS • TIKTOK & MOLOCO •
        </div>
      </div>

      {/* Services Grid */}
      <section className="grid-half">
        <Link href="/meta" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <motion.div 
            whileHover={{ backgroundColor: 'var(--hiop-blue)', color: '#fff' }}
            style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>01 / META</div>
            <h2 className="massive-text" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>메타<br/>광고</h2>
            <p style={{ marginTop: '2rem', fontSize: '1.3rem', fontWeight: 700 }}>정밀한 타겟팅과 CAPI 연동을 통한 성과 최적화 솔루션.</p>
            <div style={{ marginTop: '3rem' }}>
              <ArrowUpRight size={56} strokeWidth={4} />
            </div>
          </motion.div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href="/google" style={{ textDecoration: 'none', color: 'inherit', flex: 1, borderBottom: '4px solid var(--border-dark)' }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-orange)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>02 / GOOGLE</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>구글<br/>광고</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>검색 의도 분석 및 머신러닝 기반 스마트 캠페인.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={48} strokeWidth={4} />
              </div>
            </motion.div>
          </Link>

          <Link href="/tiktok-moloco" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-green)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>03 / SHORT-FORM</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>틱톡 &<br/>몰로코</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>글로벌 숏폼 및 머신러닝 RTB 광고 최적화.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={48} strokeWidth={4} />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>
      
      <footer style={{ padding: '4rem 2rem', borderTop: '4px solid var(--border-dark)', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
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
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP DIGITAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
