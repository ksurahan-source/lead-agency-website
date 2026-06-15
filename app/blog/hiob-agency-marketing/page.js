'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function HiobAgencyMarketingPost() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/blog" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 인사이트 목록으로</Link>
      </nav>

      <article className="wrap" style={{ padding: 'clamp(3.5rem, 10vw, 8rem) clamp(1.1rem, 4vw, 2rem)', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>히옵 소개 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif', wordBreak: 'keep-all' }}>
            히옵 에이전시: 광고를 돌리는 것과 엔지니어링하는 것의 차이
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem', wordBreak: 'keep-all' }}>
            대부분의 광고 대행사는 캠페인을 집행합니다. 히옵은 데이터 인프라를 설계하고, 광고 AI를 학습시키고, 매출을 엔지니어링합니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 히옵이 다른 이유</h2>
            <p>
              일반 퍼포먼스 마케팅 에이전시는 광고 소재를 만들고 캠페인을 설정합니다. 하지만 데이터 추적이 잘못되어 있으면 아무리 좋은 소재도 AI가 최적화할 수 없습니다. 히옵은 광고 운영 이전에 데이터 인프라를 먼저 점검하고 구축합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              메타 픽셀 + CAPI, 구글 전환 API, GTM 서버사이드 트래킹, GA4 전자상거래 추적 — 이 네 가지가 정확하게 구축되어야 광고 AI가 올바른 유저를 학습하고 ROAS가 개선됩니다. 히옵의 모든 광고 대행은 데이터 인프라 구축에서 시작합니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 히옵의 서비스 영역</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: '데이터 인프라 구축', items: ['GA4 전자상거래 추적', '메타 CAPI 연동', '구글 전환 API', 'GTM 서버사이드 트래킹'] },
                { title: '퍼포먼스 광고 운영', items: ['메타 광고 (Advantage+ ROAS)', '구글 검색·쇼핑·PMax', '데이터 기반 소재 테스트', 'tROAS 입찰 최적화'] },
                { title: '분석·리포팅', items: ['Looker Studio 대시보드', '채널별 ROAS 분석', '코호트·LTV 분석', '월간 성과 보고'] },
              ].map((col, i) => (
                <div key={i} style={{ padding: '2rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--hiob-orange)', marginBottom: '1rem' }}>{col.title}</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                    {col.items.map((item, j) => <li key={j} style={{ fontWeight: 700 }}>• {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 히옵과 함께한 결과</h2>
            <p>
              히옵의 데이터 인프라 구축 + 광고 운영을 도입한 클라이언트들은 평균 3개월 내 ROAS 2배 이상 개선을 경험했습니다. 광고비를 늘리지 않아도 데이터 품질 향상만으로 AI 최적화 효율이 크게 달라집니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 이커머스 쇼핑몰, SaaS, 앱 서비스, 글로벌 D2C 브랜드까지 다양한 업종의 퍼포먼스 마케팅을 대행하고 있습니다. 데이터를 기반으로 매출을 엔지니어링하고 싶다면 지금 상담하세요.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>히옵과 함께 시작하세요</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 광고 구조와 데이터 인프라를 무료로 진단하고 개선 방향을 제안합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
