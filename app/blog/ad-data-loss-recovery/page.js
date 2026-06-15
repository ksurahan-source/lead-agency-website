'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function AdDataLossRecoveryPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>데이터 엔지니어링 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif', wordBreak: 'keep-all' }}>
            광고 데이터 누락 복구: iOS·광고 차단기로 사라지는 전환을 되찾는 법
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem' }}>
            실제 구매가 100건 일어났는데 광고 플랫폼에는 60~70건만 잡힌다면, 나머지 30~40건의 데이터가 광고 최적화에 기여하지 못하고 있는 겁니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 왜 광고 데이터가 누락되는가</h2>
            <p>
              클라이언트 사이드 픽셀(메타 픽셀, 구글 태그)은 사용자 브라우저에서 직접 광고 플랫폼으로 데이터를 전송합니다. 문제는 이 경로를 차단하는 요소가 너무 많다는 것입니다.
            </p>
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              {[
                'Safari ITP(Intelligent Tracking Prevention): 쿠키 수명 7일 제한, 크로스사이트 추적 차단',
                'iOS ATT(App Tracking Transparency): 앱 내 광고 추적 차단',
                'Chrome, Firefox 광고 차단 확장프로그램: 픽셀 스크립트 자체를 로드하지 않음',
                'Firefox Enhanced Tracking Protection: 기본값으로 추적 스크립트 차단',
              ].map((item, i) => (
                <div key={i} style={{ padding: '1rem 1.5rem', background: '#fff3f0', border: '2px solid var(--hiob-orange)', fontWeight: 700 }}>
                  • {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#f4f4f0', padding: 'clamp(2rem, 6vw, 3rem)', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 히옵의 데이터 누락 복구 3단계</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  step: 'STEP 1',
                  title: '현재 누락 규모 진단',
                  desc: 'GA4 전자상거래 purchase 수 vs 실제 쇼핑몰 주문 수를 비교해 데이터 손실 규모를 정확하게 측정합니다. 평균 20~40% 누락이 발견됩니다.',
                },
                {
                  step: 'STEP 2',
                  title: 'CAPI·서버사이드 이중 추적 구축',
                  desc: '메타 CAPI, 구글 전환 API, GTM 서버사이드를 구축해 브라우저 차단 환경에서도 서버에서 직접 전환 데이터를 전송합니다.',
                },
                {
                  step: 'STEP 3',
                  title: '이벤트 중복 제거 및 검증',
                  desc: '픽셀(클라이언트)과 CAPI(서버) 이중 추적 시 발생하는 중복을 event_id로 제거합니다. 구현 후 QA 리포트로 수집률 개선 수치를 확인합니다.',
                },
              ].map(({ step, title, desc }, i) => (
                <div key={i} style={{ padding: '2rem', background: '#fff', border: '2px solid #000', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--hiob-orange)' }}>{step}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.5rem' }}>{title}</div>
                    <div>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 기대 효과: 데이터 복구가 ROAS를 높이는 이유</h2>
            <p>
              누락됐던 전환 데이터가 복구되면 메타·구글 AI의 학습 품질이 향상됩니다. 더 많은 전환 신호로 학습한 AI는 고가치 유저를 더 정확하게 찾아냅니다. 데이터 복구만으로 ROAS가 20~50% 개선되는 사례가 빈번합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵의 데이터 복구 구축을 완료한 패션 브랜드 E사는 메타 픽셀 매칭 품질이 6.2점에서 8.1점으로 향상되었고, 동일 예산에서 구매 전환수가 35% 증가했습니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>데이터 누락 무료 진단 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 데이터 누락 규모와 복구 가능 범위를 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
