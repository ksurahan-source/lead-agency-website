'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../../components/Footer';

const posts = [
  {
    id: 1,
    title: '한국 마케팅 시장의 침몰: 왜 당신의 메타 광고는 돈만 낭비하는가?',
    date: '2025.05.10',
    category: '퍼포먼스 마케팅',
    excerpt: '아이폰 추적 차단 이후 국내 광고주들이 겪고 있는 데이터 단절의 실체와 기술적 해결책.',
    href: '/blog/why-meta-ads-fail-korea',
  },
  {
    id: 2,
    title: '구글 광고의 함정: 스마트 캠페인이 당신의 예산을 갉아먹고 있다',
    date: '2025.05.09',
    category: '구글 광고',
    excerpt: '머신러닝에만 의존하는 광고의 위험성과 데이터 주도권을 되찾는 방법.',
    href: '/blog/google-ads-trap',
  },
];

export default function BlogListPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="font-display" style={{ fontSize: '2.5rem' }}>히옵</div>
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <section style={{ padding: '5rem 2rem' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ marginBottom: '5rem' }}>인사이트</motion.h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {posts.map((post) => (
              <Link key={post.id} href={post.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  whileHover={{ x: 20 }}
                  className="brutalist-card"
                  style={{ background: '#fff', cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--hiop-orange)', marginBottom: '1rem' }}>
                    {post.category} | {post.date}
                  </div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{post.title}</h2>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444' }}>{post.excerpt}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
