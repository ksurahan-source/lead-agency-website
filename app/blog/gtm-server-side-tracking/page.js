'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Footer from '../../../components/Footer';

export default function GtmServerSideTrackingPost() {
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
            GTM 서버사이드 트래킹: 2025년 데이터 수집의 표준이 된 이유
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: 'clamp(1.1rem, 4vw, 2rem)' }}>
            광고 차단기, iOS 쿠키 제한, 개인정보 보호 강화... 클라이언트 사이드 추적만으로는 20~40%의 데이터가 사라집니다. GTM 서버사이드 트래킹이 해답입니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 클라이언트 사이드 vs 서버사이드: 무엇이 다른가</h2>
            <p>
              기존 GTM 방식(클라이언트 사이드)은 사용자의 브라우저에서 직접 구글·메타 서버로 데이터를 전송합니다. 문제는 광고 차단 프로그램, Safari의 ITP(Intelligent Tracking Prevention), Firefox의 ETP 등이 이 신호를 차단한다는 것입니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              GTM 서버사이드 트래킹(Server-side Tracking)은 다릅니다. 브라우저에서 여러분 소유의 서버로 먼저 신호를 보내고, 그 서버에서 구글·메타·기타 플랫폼으로 데이터를 전달합니다. 광고 차단기가 당신의 서버를 막을 수는 없습니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. GTM 서버사이드 트래킹의 4가지 핵심 장점</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
              {[
                ['데이터 손실 최소화', '광고 차단기와 브라우저 쿠키 제한의 영향을 받지 않아 수집률이 95% 이상으로 향상됩니다.'],
                ['퍼스트 파티 쿠키 활용', '서버에서 발급하는 쿠키는 7일 제한을 받지 않습니다. 사용자 추적 기간을 최대 400일까지 연장합니다.'],
                ['사이트 성능 개선', '브라우저에서 실행되던 추적 스크립트가 서버로 이동해 페이지 로딩 속도가 빨라집니다.'],
                ['개인정보 보호 강화', 'PII(개인식별정보)를 서버에서 필터링한 뒤 광고 플랫폼에 전달해 GDPR, 개인정보보호법 준수가 용이합니다.'],
              ].map(([title, desc], i) => (
                <li key={i} style={{ padding: '1.5rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', color: 'var(--hiob-orange)', marginBottom: '0.5rem' }}>{title}</div>
                  <div>{desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 히옵의 서버사이드 트래킹 구축 프로세스</h2>
            <p>
              서버사이드 트래킹 구축은 기술적으로 복잡합니다. 클라우드 서버(GCP, AWS) 설정, GTM 서버 컨테이너 배포, 도메인 연결, 각 플랫폼 클라이언트 구성까지 전문 지식이 필요합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 이 모든 과정을 일괄 대행합니다. 구축 후에는 데이터 수집률 QA 리포트를 제공하여 기존 대비 데이터 개선 수치를 수치로 확인하실 수 있습니다. 쇼핑몰 플랫폼(카페24, 아임웹, 고도몰 등)별 맞춤 설정도 지원합니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>서버사이드 트래킹 도입을 검토 중이신가요?</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 데이터 손실 규모를 무료로 진단해 드립니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
