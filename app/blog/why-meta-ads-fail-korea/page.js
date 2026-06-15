'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function BlogPost1() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: 'clamp(1.05rem, 2.5vw, 1.5rem) clamp(1.1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/blog" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 인사이트 목록으로</Link>
      </nav>

      <article className="wrap" style={{ padding: 'clamp(3.5rem, 10vw, 8rem) clamp(1.1rem, 4vw, 2rem)', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>퍼포먼스 마케팅 | 2025.05.10</div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif', wordBreak: 'keep-all' }}>
            한국 마케팅 시장의 침몰: 왜 당신의 메타 광고는 돈만 낭비하는가?
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem', wordBreak: 'keep-all' }}>
            단순히 광고 세팅만으로는 살아남을 수 없는 시대입니다. 데이터 엔지니어링이 없는 마케팅은 도박과 다름없습니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 5.5vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 아이폰 추적 차단 이후의 대재앙: 끊어진 데이터의 고리</h2>
            <p>
              2021년 애플의 아이폰 개인정보 보호 정책 업데이트는 전 세계 마케팅 시장을 뒤흔들었습니다. 특히 한국처럼 아이폰 점유율이 높은 시장에서 그 파급력은 엄청났습니다. 사용자들은 앱 추적 동의를 거부하기 시작했고, 메타의 픽셀은 사실상 눈을 잃었습니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              광고주들은 ROAS가 폭락하는 것을 목격했습니다. 하지만 더 큰 문제는 &ldquo;ROAS가 왜 떨어지는지 모른다&rdquo;는 것이었습니다. 구매는 일어나고 있는데 광고 관리자에는 표시되지 않고, 알고리즘은 구매하지 않을 사람들에게 광고를 노출하기 시작했습니다. 이것이 바로 데이터 단절이 가져온 악순환입니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 5.5vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 해결책: 히옵의 엔지니어링 접근법</h2>
            <p>
              이 문제를 해결하는 핵심은 &lsquo;전환 API(CAPI)&rsquo;입니다. 브라우저 쿠키가 차단되어도 서버 간 직접 통신으로 데이터를 전송해 99% 이상의 데이터 정합성을 확보합니다. 이는 단순히 숫자를 맞추는 것이 아니라 알고리즘에게 &ldquo;누가 실제로 샀는지&rdquo;를 다시 알려주는 과정입니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              메타의 머신러닝은 양질의 데이터로 먹고삽니다. 히옵은 GA4, GTM, 전환 API를 통합해 매체 알고리즘이 가장 빠르게 학습할 수 있는 환경을 구축합니다.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 5.5vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 100만원 원스톱 패키지: 왜 일주일인가?</h2>
            <p>
              많은 광고주들이 &ldquo;준비 기간이 너무 길다&rdquo;고 말합니다. 비즈니스는 속도전입니다. 히옵은 일주일 안에 모든 인프라를 구축하고 실전 광고를 집행합니다.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 50만원: 고전환 웹사이트 + 알고리즘 최적화 릴스 제작</li>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 30만원: 6일간의 실전 데이터 수집 (메타·구글 믹스 광고비)</li>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 결과: 사업 방향을 결정할 확실한 첫 데이터 확보</li>
            </ul>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>내일부터 바로 시작하고 싶으신가요?</h3>
            <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)' }}>
              카카오톡으로 바로 상담받기
            </a>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
