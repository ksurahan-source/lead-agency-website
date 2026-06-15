'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function PerformanceMarketingAgencyPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>퍼포먼스 마케팅 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif', wordBreak: 'keep-all' }}>
            퍼포먼스 마케팅 에이전시, 이 5가지를 묻지 않으면 반드시 후회합니다
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem' }}>
            광고비는 쓰는데 매출이 안 오른다면, 에이전시 선택 기준이 잘못된 것입니다. 데이터 기술력이 곧 성과입니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. '광고 집행'과 '퍼포먼스 마케팅'은 완전히 다릅니다</h2>
            <p>
              많은 에이전시가 퍼포먼스 마케팅을 표방하지만, 실제로는 광고 소재를 만들고 예산을 집행하는 수준에 머뭅니다. 진정한 퍼포먼스 마케팅 에이전시는 데이터 수집 → 분석 → 최적화의 전체 사이클을 자체적으로 구축할 수 있어야 합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              GA4 전자상거래 추적, 메타 CAPI 설치, GTM 서버사이드 트래킹 등 기술적 기반 없이는 구글·메타 알고리즘의 머신러닝을 제대로 활용할 수 없습니다. 기술이 빠진 퍼포먼스 마케팅은 감(感)으로 하는 광고와 다를 바 없습니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 에이전시 선택 전 반드시 물어야 할 5가지 질문</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
              {[
                ['Q1. 서버사이드 트래킹을 직접 구축할 수 있나요?', 'GTM Server-side 컨테이너를 자체 운영할 수 있는 에이전시만이 ITP, 쿠키 차단 환경에서도 데이터를 정확히 수집합니다.'],
                ['Q2. 메타 CAPI와 구글 전환 API를 연동한 경험이 있나요?', '브라우저 픽셀의 한계를 서버 API로 보완하는 기술 없이는 데이터 누락을 막을 수 없습니다.'],
                ['Q3. 전환 가치(Revenue) 기반 입찰을 운영해 본 경험이 있나요?', 'tROAS, Maximize Conversion Value 입찰 전략을 제대로 운영하려면 정밀한 전환 가치 데이터 연동이 선행되어야 합니다.'],
                ['Q4. 성과 보고는 어떤 지표로 하나요?', 'CPC, CTR 같은 허영 지표가 아닌 ROAS, 매출, 고객 획득 비용(CAC)으로 보고하는 에이전시를 선택하세요.'],
                ['Q5. 데이터 대시보드를 직접 구축해 주나요?', 'GA4, 구글 애즈, 메타 데이터를 통합해 실시간으로 확인할 수 있는 대시보드 구축 역량이 있어야 합니다.'],
              ].map(([q, a], i) => (
                <li key={i} style={{ padding: '1.5rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{q}</div>
                  <div style={{ color: '#444' }}>{a}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 히옵이 다른 이유: 기술 × 전략의 통합</h2>
            <p>
              히옵은 데이터 엔지니어링과 광고 전략을 동시에 수행하는 소수 에이전시 중 하나입니다. 추적 코드 설치부터 전환 가치 최적화 입찰 전략까지, 분리하지 않고 하나의 팀이 일관되게 운영합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              스타트업부터 쇼핑몰, 글로벌 진출 기업까지 업종을 가리지 않고 데이터 기반으로 매출을 증명해온 실적이 히옵의 차별점입니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>히옵과 함께라면 광고비가 매출로 바뀝니다</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 광고 계정 무료 진단 후 개선 방향을 제시해 드립니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
