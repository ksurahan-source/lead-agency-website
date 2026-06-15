'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function DataDrivenMarketingPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>마케팅 전략 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif', wordBreak: 'keep-all' }}>
            데이터 드리븐 마케팅: 감(感)으로 하는 광고는 이제 끝입니다
          </h1>
          <p style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem' }}>
            광고를 집행하면서도 "왜 잘 되는지, 왜 안 되는지" 모르고 계신가요? 데이터 드리븐 마케팅으로 모든 결정을 숫자로 만드세요.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 데이터 드리븐 마케팅이란 무엇인가</h2>
            <p>
              데이터 드리븐 마케팅(Data-Driven Marketing)은 광고의 모든 의사결정을 데이터에 기반하여 내리는 방법론입니다. 어떤 소재가 잘 되는지, 어떤 오디언스가 구매 전환율이 높은지, 어느 채널에 예산을 더 써야 하는지를 모두 수치로 판단합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              이를 위해서는 데이터 수집 인프라가 선행되어야 합니다. GA4 전자상거래 추적, 메타 CAPI 설치, GTM 서버사이드 트래킹이 제대로 구축되지 않으면 수집되는 데이터 자체가 부정확해 잘못된 결정을 내리게 됩니다.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { title: '감(感) 기반 마케팅', items: ['경험과 직관으로 소재 선택', '고정된 예산 비율로 채널 분배', 'A/B 테스트 없이 집행', '보고 지표: 노출수, 클릭수'], color: '#ff4500' },
              { title: '데이터 드리븐 마케팅', items: ['전환율 데이터로 소재 자동 선별', '채널별 ROAS 기반 예산 동적 배분', '다변량 테스트로 지속 개선', '보고 지표: ROAS, CAC, LTV'], color: '#0044ff' },
            ].map((col, i) => (
              <div key={i} style={{ padding: '2.5rem', border: `4px solid ${col.color}`, background: '#fff' }}>
                <h3 style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.8rem)', color: col.color, marginBottom: '1.5rem' }}>{col.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                  {col.items.map((item, j) => <li key={j} style={{ fontWeight: 700 }}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ background: '#f4f4f0', padding: 'clamp(1.8rem, 5vw, 3rem)', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 히옵의 데이터 드리븐 마케팅 4단계 프로세스</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
              {[
                ['1단계: 데이터 인프라 구축', 'GA4 전자상거래 세팅, 메타 CAPI 연동, GTM 서버사이드 트래킹으로 정확한 데이터 수집 기반을 만듭니다.'],
                ['2단계: 전환 가치 설계', '단순 전환수가 아닌 실제 결제금액이 광고 플랫폼에 전달되도록 동적 전환 가치를 연동합니다.'],
                ['3단계: 머신러닝 학습 가속화', '구글 · 메타 AI가 고가치 유저를 학습하도록 충분한 전환 데이터를 안정적으로 공급합니다.'],
                ['4단계: 데이터 기반 의사결정', '통합 대시보드를 통해 채널별 ROAS, 소재별 성과를 실시간으로 모니터링하고 예산을 최적화합니다.'],
              ].map(([title, desc], i) => (
                <li key={i} style={{ padding: '1.5rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{title}</div>
                  <div>{desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 기대 효과: 데이터가 쌓일수록 광고는 스스로 똑똑해집니다</h2>
            <p>
              데이터 드리븐 마케팅의 가장 큰 장점은 복리 효과입니다. 정확한 데이터가 쌓일수록 구글·메타의 AI 학습이 정교해지고, 광고 효율이 자동으로 개선됩니다. 초기 3~6개월의 데이터 인프라 투자가 이후 장기적인 ROAS 개선으로 돌아옵니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>데이터로 광고를 바꾸고 싶으신가요?</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.12rem, 3.4vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 데이터 인프라 상태를 무료로 진단해 드립니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
