'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function MetaPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m/meta';
    }
  }, []);

  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / META</div>
        <a href="#contact" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none', fontSize: '1.1rem' }}>무료 진단 신청 →</a>
      </nav>

      {/* Hero */}
      <section style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.2rem' }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: 'var(--hiop-blue)' }}>메타 광고</h1>
            <h1 className="massive-text">퍼포먼스</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
            <div style={{ padding: '2rem 0' }}>
              <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>
                트래킹 인프라부터<br />다시 설계하여<br /><span style={{ color: 'var(--hiop-blue)' }}>ROAS</span>를 증명합니다.
              </p>
            </div>
            <div style={{ padding: '0 0 2rem' }}>
              <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                픽셀 · CAPI · 계정 구조 · 소재 전략까지<br />
                데이터 기반의 완벽한 Meta 광고 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.2rem', background: 'var(--hiop-blue)', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ color: '#fff' }}>문의가</h2>
          <h2 className="massive-text" style={{ color: 'rgba(255,255,255,0.3)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {[
              { b: 'OO 성형외과', m: '문의 324% 상승' },
              { b: 'XX 패션 브랜드', m: 'ROAS 580% 달성' },
              { b: 'YY 뷰티 몰', m: 'CPA 45% 절감' },
              { b: 'ZZ 교육 플랫폼', m: '리드 단가 60% 하락' },
              { b: 'AA 건강식품', m: '첫 달 매출 2억 달성' },
              { b: 'BB 가구 브랜드', m: '전환 수 4배 증가' }
            ].map((stat, i) => (
              <div key={i} style={{ border: '3px solid #fff', padding: '1.5rem', background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{stat.b}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Black Han Sans, sans-serif' }}>{stat.m}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'right' }}>
            <p className="font-syne" style={{ fontSize: '2rem', fontWeight: 800 }}>AND 1,200+ MORE INQUIRIES</p>
          </div>
        </div>
      </section>

      {/* Engineering Focus Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ padding: '6rem 2rem' }}>
          <p style={{ fontWeight: 800, color: 'var(--hiop-blue)', marginBottom: '1rem' }}>ENGINEERING SPIRIT</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>우리는 광고를<br/>'집행'하지 않고<br/>'설계'합니다.</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444' }}>
            대부분의 대행사는 '어떤 소재를 쓸까'만 고민합니다. <br/>
            히옵은 '어떻게 데이터를 머신러닝에 학습시킬까'를 먼저 고민합니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#eee' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>01. 데이터 파이프라인 구축</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>CAPI와 GTM을 통해 쿠키리스 시대에도 완벽한 전환 데이터를 매체에 피딩합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>02. 머신러닝 최적화 구조</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>매체 알고리즘이 가장 효율적으로 작동할 수 있도록 계정 구조를 테크니컬하게 튜닝합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>03. 실시간 성과 대시보드</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>투명한 성과 보고를 위해 실시간으로 업데이트되는 자체 퍼포먼스 대시보드를 공유합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: 'var(--hiop-blue)', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>일반 대행사와는 차원이 다른 데이터 인프라를 구축합니다.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: 'CAPI 서버사이드 트래킹', d: 'iOS 14+ 대응을 위한 서버 사이드 트래킹 완벽 구축 및 누락 데이터 복구' },
              { t: '고급 매칭 솔루션', d: '고객 데이터를 활용한 매칭률 극대화로 머신러닝 최적화 가속' },
              { t: '계정 구조 최적화', d: '광고 세트 중복 제거 및 머신러닝 학습에 최적화된 캠페인 설계' },
              { t: '릴스 소재 전략', d: '고효율 숏폼 소재 기획 및 데이터 기반의 소재 방향성 제안' }
            ].map((item, idx) => (
              <div key={idx} style={{ borderBottom: '3px solid #ddd', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.t}</h3>
                <p style={{ color: '#444', fontSize: '1.1rem', fontWeight: 600 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '7rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', marginBottom: '5rem' }}>핵심 서비스</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: '트래킹 인프라 설계', items: ['픽셀 이벤트 정합성 진단', 'CAPI 연동 및 검증', 'AEM(합산 이벤트 측정) 설정'] },
              { title: '광고 계정 구조 최적화', items: ['캠페인 구조 전면 개편', '예산 배분 및 입찰 전략', '리타겟팅 오디언스 설계'] },
              { title: '성과 분석 & 개선', items: ['데이터 기반 의사결정', '월간 상세 액션 플랜', '실질적인 ROAS 개선'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="var(--hiop-blue)" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="split-section" style={{ background: 'var(--bg-dark)', color: 'var(--text-light)' }}>
        <div className="split-left" style={{ padding: '7rem 2rem' }}>
          <h2 className="massive-text" style={{ color: 'var(--hiop-orange)' }}>지금</h2>
          <h2 className="massive-text">시작하세요</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            현재 광고 계정의 문제점을 데이터 기반으로 무료 진단해 드립니다. 24시간 내로 담당자가 분석 리포트와 함께 연락드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="meta" />
        </div>
      </section>

      {/* MASSIVE META SEO ENCYCLOPEDIA */}
      <section style={{ padding: '10rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)', color: '#121212' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid var(--hiop-blue)', display: 'inline-block' }}>
            THE ULTIMATE META ADS HANDBOOK
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.15rem', lineHeight: '2.2', textAlign: 'justify' }}>
            
            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 01: 메타 광고의 새로운 질서 - 픽셀에서 CAPI로</h3>
              <p>
                메타(Meta) 광고 생태계는 지난 몇 년간 유례없는 기술적 격변기를 거쳤습니다. 애플의 iOS 14.5 업데이트로 도입된 앱 추적 투명성(ATT) 정책은 브라우저 기반의 서드파티 쿠키 추적을 무력화시켰고, 이는 곧 전통적인 '메타 픽셀(Meta Pixel)'의 한계로 이어졌습니다. 픽셀 데이터의 누락은 머신러닝의 학습 데이터 부족으로 직결되며, 이는 곧 광고 효율 하락과 ROAS 저하라는 결과를 초래했습니다.
              </p>
              <p>
                이에 대한 메타의 기술적 해답이 바로 전환 API(Conversions API, CAPI)입니다. CAPI는 브라우저를 거치지 않고 웹사이트 서버에서 메타 서버로 직접 데이터를 전송하는 방식입니다. 이는 광고 차단기나 브라우저의 쿠키 제한 설정과 상관없이 정확한 전환 데이터를 전송할 수 있게 해줍니다. 히옵(HI-OP)은 서버 사이드 트래킹(Server-side GTM) 기술을 통해 업계 최고 수준의 CAPI 연동 솔루션을 제공합니다. 단순히 전환을 기록하는 것을 넘어, 고객의 이메일, 전화번호 등의 해시 데이터를 함께 전송하여 매칭률(Event Match Quality)을 극대화합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 02: 어드밴티지+ 쇼핑 캠페인(ASC)과 자동화의 미학</h3>
              <p>
                마케터가 수동으로 타겟을 설정하던 시대는 저물고 있습니다. 메타의 인공지능은 이제 수십억 개의 시그널을 실시간으로 분석하여 가장 전환 가능성이 높은 사용자를 인간보다 더 잘 찾아냅니다. 이러한 자동화의 정점이 바로 어드밴티지+ 쇼핑 캠페인(ASC)입니다. ASC는 머신러닝을 기반으로 타겟팅, 입찰, 소재 배분을 자동화하여 효율을 극대화하는 캠페인 구조입니다.
              </p>
              <p>
                하지만 모든 자동화가 정답은 아닙니다. AI가 올바른 판단을 내릴 수 있도록 질 좋은 데이터를 공급하고, 창의적인 소재를 기획하는 것은 여전히 인간의 몫입니다. 히옵은 ASC를 단순히 실행하는 것이 아니라, 기존 고객 제외 리스트 관리, 고가치 오디언스 시그널 주입, 그리고 소재별 성과 분석을 통해 자동화의 효율을 엔지니어링 관점에서 튜닝합니다. 우리는 알고리즘을 맹신하지 않고, 알고리즘이 최고의 성과를 낼 수 있는 '판'을 짭니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 03: 릴스(Reels)와 숏폼 콘텐츠의 퍼포먼스 마케팅 기획</h3>
              <p>
                현재 메타 플랫폼(페이스북, 인스타그램)에서 가장 체류 시간이 길고 노출량이 많은 지면은 단연 릴스입니다. 릴스는 일반적인 피드 광고와는 완전히 다른 문법을 가집니다. 사용자는 매우 빠른 속도로 화면을 넘기며, 첫 3초 이내에 관심을 끌지 못하는 콘텐츠는 즉시 외면받습니다.
              </p>
              <p>
                히옵의 크리에이티브 팀은 데이터 분석을 기반으로 릴스 소재를 기획합니다. 영상의 초반 3초 이탈률을 분석하여 어떤 '후킹(Hook)' 장치가 효과적인지 찾아냅니다. 또한, 광고처럼 보이지 않는 네이티브한 구성, 유행하는 사운드와 트렌드의 적절한 활용, 그리고 명확한 행동 유도(CTA)를 통해 릴스 지면에서의 전환율을 극대화합니다. 소재의 수명이 짧아진 만큼, 우리는 지속 가능한 소재 생산 시스템을 구축하여 성과의 연속성을 보장합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 04: 계정 구조의 단순화와 통합 학습(Consolidation)</h3>
              <p>
                과거에는 관심사 타겟팅, 맞춤 타겟팅 등을 세밀하게 쪼개어 수십 개의 광고 세트를 운영하는 것이 유능한 마케터의 덕목이었습니다. 하지만 현대의 머신러닝 환경에서는 이러한 '세분화'가 독이 됩니다. 각 광고 세트별로 데이터가 쪼개지면 머신러닝이 충분한 전환 데이터를 확보하지 못해 '학습 제한(Learning Limited)' 상태에 빠지기 때문입니다.
              </p>
              <p>
                히옵은 계정 구조의 단순화(Consolidation)를 최우선 가치로 둡니다. 데이터를 한곳으로 모아 머신러닝이 가장 빠르게 최적화 지점을 찾을 수 있도록 돕습니다. 브로드 타겟팅(Broad Targeting)을 적극 활용하여 알고리즘이 스스로 고객을 찾게 만들고, 마케터는 데이터 분석과 소재 기획에 집중합니다. 이러한 구조적 혁신이 메타 광고의 성공 방정식을 바꿉니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 05: 데이터 매칭률(EMQ)과 실질적인 성과 측정</h3>
              <p>
                매체에서 리포트하는 성과가 실제 비즈니스 매출과 일치하지 않는 경우는 흔합니다. 이는 기여도(Attribution) 윈도우의 차이와 데이터 누락 때문입니다. 히옵은 이벤트 매치 퀄리티(Event Match Quality, EMQ)를 6.0점 이상의 높은 수준으로 관리합니다. 
              </p>
              <p>
                우리는 메타의 픽셀 데이터와 서버 데이터를 대조 검증하고, 오프라인 전환 데이터를 연동하여 온라인 광고가 오프라인 비즈니스에 미치는 영향까지 파악합니다. 또한, 브랜드 검색 증가량이나 전체 매출 기여도(MER) 분석을 통해 메타 광고가 브랜드의 전체 성장에 얼마나 기여하고 있는지 다각도로 분석합니다. 숫자로 증명되지 않는 마케팅은 하지 않습니다. 히옵과 함께 진짜 성과를 경험하십시오.
              </p>
            </article>

          </div>
        </div>
      </section>

      <footer style={{ padding: '5rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <a
            href="https://open.kakao.com/o/srdaF2si"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal"
            style={{ background: '#FEE500', color: '#000', fontSize: '1.2rem' }}
          >
            카카오톡 1:1 채팅 문의하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP / META SPECIALIST. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
