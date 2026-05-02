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
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2rem', lineHeight: 1 }}>HI-OP</div>
        <div className="font-syne" style={{ fontWeight: 800, textTransform: 'uppercase' }}>Maximum ROAS</div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="massive-text"
        >
          DATA DRIVEN
        </motion.h1>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="massive-text massive-text-stroke"
        >
          PERFORMANCE
        </motion.h1>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ maxWidth: '500px', fontSize: '1.5rem', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}
          >
            히옵(HI-OP)은 가장 최신 기술을 적용한 디지털 광고를 설계하여 고객에게 <span style={{ color: 'var(--hiop-orange)' }}>최대의 ROAS</span>를 가져다 주는 것을 목표로 합니다.
          </motion.p>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container" style={{ marginTop: '4rem' }}>
        <div className="marquee-content">
          MAXIMUM ROAS • HI-OP CONSULTING • META ADS • GOOGLE ADS • TIKTOK & MOLOCO • MAXIMUM ROAS • HI-OP CONSULTING • META ADS • GOOGLE ADS • TIKTOK & MOLOCO •
        </div>
      </div>

      {/* Services Grid */}
      <section className="grid-half">
        <Link href="/meta" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <motion.div 
            whileHover={{ backgroundColor: 'var(--hiop-blue)', color: '#fff' }}
            style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>01 / META</div>
            <h2 className="massive-text" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>META<br/>ADS</h2>
            <p style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 500 }}>정밀한 타겟팅과 CAPI 연동을 통한 최적화 솔루션.</p>
            <div style={{ marginTop: '3rem' }}>
              <ArrowUpRight size={48} strokeWidth={3} />
            </div>
          </motion.div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href="/google" style={{ textDecoration: 'none', color: 'inherit', flex: 1, borderBottom: '3px solid var(--border-dark)' }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-orange)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>02 / GOOGLE</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>GOOGLE<br/>ADS</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 500 }}>검색 의도 분석 및 스마트 캠페인.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={40} strokeWidth={3} />
              </div>
            </motion.div>
          </Link>

          <Link href="/tiktok-moloco" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-green)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', fontFamily: 'Syne, sans-serif' }}>03 / SHORT-FORM</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>TIKTOK<br/>& MOLOCO</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 500 }}>글로벌 숏폼 및 머신러닝 RTB 최적화.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={40} strokeWidth={3} />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>
      
      <footer style={{ padding: '2rem', borderTop: '3px solid var(--border-dark)', textAlign: 'center', fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: '1.2rem' }}>
        © 2025 HI-OP DIGITAL. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
