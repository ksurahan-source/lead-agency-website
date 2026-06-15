'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/Logo';
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
  {
    id: 3,
    title: '구글 애즈 전환 설정: 광고 AI가 제대로 학습하지 못하는 이유',
    date: '2025.05.11',
    category: '구글 광고',
    excerpt: '구글 애즈 전환 설정이 잘못되면 AI가 엉뚱한 유저를 학습합니다. 올바른 전환 설정 방법을 단계별로 설명합니다.',
    href: '/blog/google-ads-conversion-setup',
  },
  {
    id: 4,
    title: '퍼포먼스 마케팅 에이전시 선택 기준: 데이터를 보는 눈이 달라야 합니다',
    date: '2025.05.11',
    category: '퍼포먼스 마케팅',
    excerpt: '어떤 에이전시가 진짜 ROAS를 높이는지 구별하는 5가지 체크리스트.',
    href: '/blog/performance-marketing-agency',
  },
  {
    id: 5,
    title: '데이터 드리븐 마케팅: 감(感)으로 하는 광고는 이제 끝입니다',
    date: '2025.05.11',
    category: '마케팅 전략',
    excerpt: '모든 광고 결정을 숫자로 만드는 데이터 드리븐 마케팅 4단계 프로세스.',
    href: '/blog/data-driven-marketing',
  },
  {
    id: 6,
    title: 'GTM 서버사이드 트래킹: 2025년 데이터 수집의 표준이 된 이유',
    date: '2025.05.11',
    category: '데이터 엔지니어링',
    excerpt: '광고 차단기와 iOS 쿠키 제한을 우회하는 서버사이드 트래킹 완벽 가이드.',
    href: '/blog/gtm-server-side-tracking',
  },
  {
    id: 7,
    title: '매출로 직결되는 구글 광고 전략: ROAS 300% 달성의 공식',
    date: '2025.05.11',
    category: '구글 광고 전략',
    excerpt: '전환 가치 입찰, 검색 의도 기반 캠페인 구조, tROAS 최적화 방법론 공개.',
    href: '/blog/google-ads-revenue-strategy',
  },
  {
    id: 8,
    title: '페이스북 픽셀 오류 해결: 중복 이벤트·전환 누락 완벽 진단',
    date: '2025.05.11',
    category: '메타 광고',
    excerpt: '픽셀 미발화, 중복 이벤트, 전환값 누락 — 유형별 원인과 정확한 해결 방법.',
    href: '/blog/facebook-pixel-error-fix',
  },
  {
    id: 9,
    title: '쇼핑몰 구글 검색 광고: 클릭을 구매로 바꾸는 구조 설계법',
    date: '2025.05.11',
    category: '구글 광고 전략',
    excerpt: '구매 의도 키워드 발굴부터 tROAS 입찰까지, 쇼핑몰에 최적화된 검색 광고 전략.',
    href: '/blog/shopping-mall-google-search-ads',
  },
  {
    id: 10,
    title: '스타트업 퍼포먼스 마케팅: 적은 예산으로 빠르게 CAC를 낮추는 법',
    date: '2025.05.11',
    category: '스타트업 마케팅',
    excerpt: '제한된 예산에서 타깃을 빠르게 검증하고 CAC를 낮추는 3단계 전략.',
    href: '/blog/startup-performance-consulting',
  },
  {
    id: 11,
    title: '글로벌 구글 광고 대행: 해외 시장에서 ROAS를 만드는 방법',
    date: '2025.05.11',
    category: '글로벌 광고',
    excerpt: '다국어 키워드 현지화부터 국가별 캠페인 분리, 다국가 전환 추적 통합까지.',
    href: '/blog/global-google-ads-agency',
  },
  {
    id: 12,
    title: 'GA4 연동 대행: 잘못된 데이터가 광고를 망치는 이유',
    date: '2025.05.11',
    category: '데이터 분석',
    excerpt: 'GA4 전자상거래 추적, 구글 애즈 연동, 플랫폼별 맞춤 구현 서비스.',
    href: '/blog/google-analytics-setup-agency',
  },
  {
    id: 13,
    title: '광고 데이터 누락 복구: iOS·광고 차단기로 사라지는 전환을 되찾는 법',
    date: '2025.05.11',
    category: '데이터 엔지니어링',
    excerpt: 'CAPI와 서버사이드 이중 추적으로 20~40% 누락 데이터를 복구하는 방법.',
    href: '/blog/ad-data-loss-recovery',
  },
  {
    id: 14,
    title: '메타 CAPI 설치 완벽 가이드: 픽셀만으로는 부족합니다',
    date: '2025.05.11',
    category: '메타 광고',
    excerpt: '메타 Conversions API 설치 원리부터 이벤트 매칭 품질 개선까지.',
    href: '/blog/meta-capi-installation',
  },
  {
    id: 15,
    title: '히옵 에이전시: 광고를 돌리는 것과 엔지니어링하는 것의 차이',
    date: '2025.05.11',
    category: '히옵 소개',
    excerpt: '데이터 인프라부터 광고 AI 학습, 매출 엔지니어링까지 — 히옵의 방법론.',
    href: '/blog/hiob-agency-marketing',
  },
];

export default function BlogListPage() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 홈으로</Link>
      </nav>

      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.1rem, 4vw, 2rem)' }}>
        <div className="wrap">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="massive-text" style={{ marginBottom: 'clamp(3rem, 8vw, 5rem)', wordBreak: 'keep-all' }}>인사이트</motion.h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {posts.map((post) => (
              <Link key={post.id} href={post.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  whileHover={{ x: 20 }}
                  className="brutalist-card"
                  style={{ background: '#fff', cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--hiob-orange)', marginBottom: '1rem' }}>
                    {post.category} | {post.date}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: 1.2, wordBreak: 'keep-all' }}>{post.title}</h2>
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
