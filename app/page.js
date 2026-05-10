'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

const services = [
  { label: '01 / 패키지', title: '100만원\n올인원 패키지', desc: '웹사이트 + 릴스 영상 + 6일간의 광고 집행까지 한 번에.', href: '/package-1m' },
  { label: '02 / SEO 블로그', title: '퍼포먼스\n마케팅 인사이트', desc: '메타·구글 광고의 문제점과 기술적 솔루션에 대한 심층 분석.', href: '/blog' },
  { label: '03 / 트래킹', title: '트래킹\n완벽화', desc: 'CAPI, GA4, GTM 통합 설치 및 데이터 정합성 보장.', href: '/tracking' },
  { label: '04 / 리드젠', title: '리드수집\n웹사이트', desc: '고전환 원페이지 설계 및 모든 전환 이벤트 트래킹 세팅.', href: '/lead-gen' },
  { label: '05 / 이커머스 가이드', title: '이커머스\n트래킹 가이드', desc: '매출 누락 없는 완벽한 이커머스 추적 체계 구축 가이드.', href: '/ecom-guide' },
  { label: '06 / 이커머스 대행', title: '이커머스\n마케팅 대행', desc: '데이터 기반의 고효율 이커머스 퍼포먼스 마케팅 운영.', href: '/ecom-agency' },
  { label: '07 / 영상 카탈로그', title: '영상\n카탈로그', desc: '다이내믹 소재 최적화를 통한 ROAS 혁명.', href: '/video-catalog' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '히옵 퍼포먼스 마케팅',
  alternateName: '히옵',
  url: 'https://hi-ob.com',
  email: 'hiob4515@gmail.com',
  description: '메타·구글 광고 CAPI 기반 데이터 엔지니어링 퍼포먼스 마케팅 에이전시',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '강남구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '히옵 서비스',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '100만원 올인원 광고 패키지' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '메타 CAPI·GA4·GTM 트래킹 설정' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '리드 수집 웹사이트 제작' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '이커머스 퍼포먼스 마케팅 대행' } },
    ],
  },
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="bg-light min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 네비게이션 */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1 }}>히옵</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="font-syne" style={{ fontWeight: 800 }}>일주일 성장</div>
          <Link href="/en" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>EN</Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section style={{ padding: 'clamp(2rem, 8vw, 4rem) 1.2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="massive-text">광고 고민을</motion.h1>
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="massive-text massive-text-stroke">일주일 만에 해결</motion.h1>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ maxWidth: '600px', fontSize: 'clamp(1.1rem, 4vw, 1.6rem)', fontWeight: 700, textAlign: 'right', lineHeight: 1.4 }}>
            히옵은 복잡한 디지털 광고를 단 100만 원으로 끝내는 &lsquo;원스톱 성장 패키지&rsquo;를 제공합니다. 웹사이트 제작부터 릴스 소재, 광고 집행까지 일주일 만에 완료하세요.
          </motion.p>
        </div>
      </section>

      {/* 마퀴 */}
      <div className="marquee-container" style={{ marginTop: '4rem' }}>
        <div className="marquee-content">
          100만원 원스톱 패키지 • 일주일 완성 • 웹사이트 + 릴스 + 광고집행 • 데이터 엔지니어링 • ROAS 극대화 • 100만원 원스톱 패키지 • 일주일 완성 • 웹사이트 + 릴스 + 광고집행 • 데이터 엔지니어링 • ROAS 극대화 •
        </div>
      </div>

      {/* 서비스 그리드 */}
      <section style={{ borderTop: '4px solid var(--border-dark)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {services.map((s, i) => (
          <Link key={i} href={s.href} style={{ textDecoration: 'none', color: 'inherit', borderRight: '4px solid var(--border-dark)', borderBottom: '4px solid var(--border-dark)' }}>
            <motion.div whileHover={{ backgroundColor: '#111', color: '#fff' }} style={{ padding: '3rem 2rem', height: '100%', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem' }}>{s.label}</div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>{s.title}</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{s.desc}</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={32} strokeWidth={3} />
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* 리포트 섹션 */}
      <section style={{ padding: '10rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)', color: '#121212' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid var(--hiop-orange)', display: 'inline-block' }}>
            히옵 퍼포먼스 마케팅 리포트 2025
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.15rem', lineHeight: '2.2' }}>
            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>
                01. 왜 한국 광고주들은 메타·구글 광고에서 실패하는가?
              </h3>
              <p>대부분의 광고주들은 단순히 &quot;광고를 돌리면 팔릴 것&quot;이라고 생각합니다. 하지만 현실은 냉혹합니다. iOS 14.5 이후 데이터 추적이 끊겼고, 소재는 금방 질려버립니다. 히옵은 이 문제를 기술적으로 해결합니다.</p>
              <p style={{ marginTop: '1.5rem' }}>우리는 단순히 광고를 세팅하는 대행사가 아닙니다. 웹사이트의 전환율을 높이는 엔지니어링, 알고리즘이 좋아하는 릴스 영상 제작, 그리고 정밀한 데이터 트래킹을 하나로 묶어 제공합니다.</p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>
                06. 단 100만 원으로 시작하는 압도적 효율의 테스트
              </h3>
              <p>50만 원으로 고전환 웹사이트와 릴스 영상을 제작하고, 30만 원으로 6일간 메타와 구글에 집중 광고를 집행합니다. 남은 비용은 운영 및 최적화에 사용됩니다. 이 모든 과정이 단 7일 만에 일어납니다.</p>
              <p style={{ marginTop: '1.5rem' }}>지금 바로 문의하고 내일부터 광고를 시작하세요.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 리드 폼 */}
      <section style={{ padding: '6rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <LeadForm source="home" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
