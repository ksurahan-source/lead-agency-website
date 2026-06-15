'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function StartupPerformanceConsultingPost() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo height={28} />
        </Link>
        <Link href="/blog" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 인사이트 목록으로</Link>
      </nav>

      <article className="wrap" style={{ padding: 'clamp(3.5rem, 10vw, 8rem) clamp(1.1rem, 4vw, 2rem)', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>스타트업 마케팅 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            스타트업 퍼포먼스 마케팅: 적은 예산으로 빠르게 CAC를 낮추는 법
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem' }}>
            스타트업은 대기업처럼 광고비를 쏟아부을 수 없습니다. 그래서 데이터 기반 최적화가 더 중요합니다. 한 번의 실패도 아깝습니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 스타트업 퍼포먼스 마케팅의 특수성</h2>
            <p>
              스타트업이 퍼포먼스 마케팅에서 직면하는 가장 큰 문제는 데이터 부족입니다. 메타·구글 AI가 제대로 학습하려면 월 50건 이상의 전환 데이터가 필요하지만, 초기에는 그 수치를 채우기조차 어렵습니다. 잘못된 세팅으로 학습 기간이 길어지면 예산 대부분이 낭비됩니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              또한 스타트업은 타깃 고객이 명확하지 않은 경우가 많습니다. 초기 광고는 가설 검증 도구입니다. 어떤 메시지가, 어떤 타깃에게, 어떤 가격대로 반응하는지 빠르게 실험하고 데이터로 확인해야 합니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: 'clamp(1.8rem, 6vw, 3rem)', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 히옵의 스타트업 퍼포먼스 컨설팅 3단계</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  step: 'STEP 1',
                  title: '빠른 데이터 인프라 구축',
                  desc: 'GA4 전자상거래, 메타 CAPI, 구글 전환 API를 2주 내 완성합니다. 정확한 전환 데이터 없이는 어떤 광고도 최적화할 수 없습니다.',
                },
                {
                  step: 'STEP 2',
                  title: '가설 기반 소규모 테스트',
                  desc: '타깃 세그먼트 3~4개를 소액으로 동시에 테스트합니다. CPA·ROAS 데이터로 2주 내 어떤 타깃이 가장 효율적인지 파악합니다.',
                },
                {
                  step: 'STEP 3',
                  title: '승자 집중 스케일업',
                  desc: '가장 낮은 CAC를 기록한 세그먼트에 예산을 집중합니다. 구글·메타 AI가 해당 세그먼트를 자동 확장하도록 tROAS/CBO로 전환합니다.',
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
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 스타트업이 얻는 것: 빠른 PMF 검증</h2>
            <p>
              히옵의 스타트업 컨설팅을 받은 SaaS D사는 3개 타깃 세그먼트를 동시에 테스트해 4주 만에 CAC가 가장 낮은 SMB 세그먼트를 발견했습니다. 예산을 집중한 후 2개월 내 월 신규 가입자가 3배로 증가했습니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              퍼포먼스 마케팅은 스타트업에게 가장 빠른 PMF(Product-Market Fit) 검증 도구입니다. 단, 데이터 인프라가 정확히 구축되어 있어야 합니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>스타트업 마케팅 무료 컨설팅 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 광고 구조와 CAC 개선 가능성을 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
