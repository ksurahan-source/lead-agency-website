'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';
import Logo from '@/components/Logo';

export default function FacebookPixelErrorFixPost() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <Link href="/blog" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 인사이트 목록으로</Link>
      </nav>

      <article className="wrap" style={{ padding: 'clamp(3.5rem, 10vw, 8rem) clamp(1.1rem, 4vw, 2rem)', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiob-orange)', marginBottom: '2rem' }}>메타 광고 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            페이스북 픽셀 오류 해결: 중복 이벤트·전환 누락 완벽 진단
          </h1>
          <p style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiob-blue)', paddingLeft: '2rem', wordBreak: 'keep-all' }}>
            픽셀이 발화되지 않거나 구매 이벤트가 2~3번씩 중복 집계된다면, 광고비는 나가는데 메타 AI는 엉뚱한 유저를 학습하고 있는 겁니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>1. 페이스북 픽셀 오류의 3가지 주요 유형</h2>
            <p>
              메타 광고 픽셀 오류는 크게 세 가지로 나뉩니다. 첫째, 픽셀 미발화 — 브라우저 차단이나 잘못된 설치로 이벤트 자체가 전송되지 않는 경우. 둘째, 중복 이벤트 — 같은 구매 이벤트가 2회 이상 전송되어 전환수가 부풀려지는 경우. 셋째, 전환값 누락 — purchase 이벤트는 발화되지만 금액 데이터가 0으로 전달되는 경우.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              세 가지 모두 메타 AI 학습에 치명적입니다. 잘못된 전환 데이터로 학습된 Advantage+ 캠페인은 실제 고가치 구매자 대신 엉뚱한 유저를 타겟팅하게 됩니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>2. 유형별 원인과 해결 방법</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  label: '픽셀 미발화',
                  cause: '원인: 광고 차단 확장프로그램, Safari ITP, GTM 트리거 오류',
                  fix: '해결: 메타 CAPI(Conversions API) 서버사이드 연동으로 브라우저 차단 우회. 픽셀 + CAPI 이중 추적 구성.',
                },
                {
                  label: '중복 이벤트',
                  cause: '원인: 픽셀 스크립트 다중 설치(GTM + 하드코딩 동시 설치), 감사 페이지 새로고침',
                  fix: '해결: 이벤트 중복제거(Deduplication) 설정. event_id 파라미터로 픽셀·CAPI 이벤트 매칭.',
                },
                {
                  label: '전환값 누락',
                  cause: '원인: purchase 이벤트에 value·currency 파라미터 미전달',
                  fix: '해결: GTM 데이터레이어에 실제 결제금액 연동. 동적 전환 가치 전달로 ROAS 입찰 최적화.',
                },
              ].map(({ label, cause, fix }, i) => (
                <div key={i} style={{ padding: '2rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--hiob-orange)', marginBottom: '0.8rem' }}>{label}</div>
                  <div style={{ marginBottom: '0.5rem', color: '#555' }}>{cause}</div>
                  <div style={{ fontWeight: 700 }}>{fix}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.55rem, 6vw, 2.5rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>3. 픽셀 오류 진단 체크리스트</h2>
            <p>
              Meta Events Manager의 테스트 이벤트 탭에서 실시간으로 이벤트 수신 여부를 확인하세요. 이벤트가 보이지 않는다면 픽셀 미설치 또는 차단 문제입니다. 동일 이벤트 ID가 2회 이상 보인다면 중복 설치 문제입니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 픽셀 오류 진단부터 CAPI 연동, 이벤트 중복 제거, 전환값 동적 연동까지 일괄 처리합니다. 오류 수정 후 Meta Events Manager에서 매칭 품질 점수 7점 이상을 목표로 세팅합니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', marginBottom: '2rem', wordBreak: 'keep-all' }}>픽셀 오류 무료 진단 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.8rem)' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 픽셀 설치 상태와 이벤트 오류를 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
