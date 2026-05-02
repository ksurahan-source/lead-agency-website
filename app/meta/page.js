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

      {/* SUCCESS CASES SECTION */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>SUCCESS CASES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            
            <div className="brutalist-card" style={{ borderLeft: '15px solid var(--hiop-blue)' }}>
              <div style={{ background: 'var(--hiop-blue)', color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>MEDICAL & BEAUTY</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>OO 성형외과: CAPI 연동 및 리드 단가 65% 절감</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 쿠키 차단으로 인해 픽셀 데이터의 40%가 누락되어 광고 최적화가 불가능했던 상황.<br/><br/>
                솔루션: GTM 서버사이드 구축 및 Meta CAPI 완벽 연동. 고객 오프라인 데이터를 해시 처리하여 매칭률(EMQ)을 8.5점까지 확보.<br/><br/>
                결과: 머신러닝 학습 속도가 3배 빨라졌으며, 고품질 리드 유입량이 폭증하여 리드 당 단가(CPA)를 65% 절감하고 상담 전환율을 2배 높임.
              </p>
            </div>

            <div className="brutalist-card" style={{ borderLeft: '15px solid #ff0055' }}>
              <div style={{ background: '#ff0055', color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>FASHION D2C</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>XX 패션 브랜드: 릴스 엔지니어링으로 ROAS 750% 달성</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 브랜드 감성은 좋으나 실제 구매로 이어지는 CTR이 0.5% 미만으로 매우 저조했던 상황.<br/><br/>
                솔루션: 초반 3초 이탈률 데이터를 분석하여 '후킹 포인트'를 12종 테스트. 유저의 공감을 사는 네이티브한 릴스 소재 제작 및 ASC 캠페인 적용.<br/><br/>
                결과: CTR이 2.4%로 상승하였으며, 대량의 데이터가 한곳에 모이면서 머신러닝이 구매 유저를 정확히 타겟팅. 결과적으로 광고비 대비 매출 7.5배 상승.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MASSIVE META SEO ENCYCLOPEDIA V2 */}
      <section style={{ padding: '10rem 2rem', background: '#121212', color: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid var(--hiop-blue)', display: 'inline-block' }}>
            THE META ADS PERFORMANCE MASTERCLASS
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.2rem', lineHeight: '2.4', textAlign: 'justify', color: '#ccc' }}>
            
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 01: 개인정보 보호 시대의 매체 데이터 주권 확보</h3>
              <p>
                우리가 흔히 알고 있는 '메타 픽셀'은 더 이상 완벽한 추적 도구가 아닙니다. 브라우저의 지능형 추적 방지(ITP)와 사용자의 광고 차단 플러그인은 마케팅 데이터의 절반 이상을 가리고 있습니다. 데이터가 없는 마케팅은 눈을 감고 활을 쏘는 것과 같습니다. 히옵(HI-OP)은 '데이터 주권'을 되찾는 것부터 시작합니다.
              </p>
              <p>
                우리는 전환 API(CAPI)를 단순히 설치하는 수준을 넘어, 서버 사이드에서 발생하는 모든 비즈니스 시그널을 매칭합니다. 이는 고객의 이메일, 전화번호, 이름, 주소, 브라우저 ID, IP 주소 등을 정교하게 해싱하여 매칭률을 극대화하는 과정을 포함합니다. 매칭률(EMQ)이 높을수록 메타의 AI는 '이 사람이 우리 광고를 본 바로 그 사람'임을 더 정확히 인지하며, 이는 즉각적인 머신러닝 최적화로 이어집니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 02: 인공지능 오디언스 타겟팅 - Broad vs Segment</h3>
              <p>
                아직도 '서울에 사는 20대 여성 중 요가에 관심 있는 사람'을 타겟팅하고 계신가요? 메타의 최신 알고리즘에서는 이러한 세밀한 관심사 타겟팅이 오히려 성과를 방해할 수 있습니다. 메타의 AI는 유저의 검색어, 게시물 반응, 체류 시간 등 수천 개의 시그널을 통해 유저의 의도를 우리보다 더 잘 파악하고 있기 때문입니다.
              </p>
              <p>
                히옵은 '브로드 타겟팅(Broad Targeting)'의 힘을 믿습니다. 연령, 성별, 지역 외에 아무런 제약을 두지 않고 알고리즘이 자유롭게 오디언스를 탐색하게 만듭니다. 대신, 우리는 '광고 소재'를 통해 타겟을 필터링합니다. 소재 자체가 타겟팅의 역할을 수행하게 만드는 것입니다. 이를 통해 머신러닝은 잠재적 오디언스 풀을 넓게 가져가면서도 실질적인 구매 유저를 정교하게 찾아내는 '규모의 경제'를 실현합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 03: 어드밴티지+ 쇼핑 캠페인(ASC)의 구조적 혁신</h3>
              <p>
                ASC는 메타가 커머스 광고주를 위해 내놓은 최종 병기입니다. 하지만 ASC를 단순히 실행한다고 해서 성과가 보장되는 것은 아닙니다. 히옵은 ASC의 효율을 극대화하기 위해 '데이터 피딩(Data Feeding)' 전략을 사용합니다. 기존 고객의 구매 데이터와 장바구니 데이터를 AI에 주입하여, 머신러닝이 '어떤 유저가 돈을 쓰는 유저인지' 빠르게 학습할 수 있는 지름길을 만들어줍니다.
              </p>
              <p>
                또한, ASC 캠페인 내에서 신규 고객과 기존 고객의 예산 배분 비율을 실시간으로 조정하여, 불필요한 리마케팅 비용을 줄이고 순수 신규 유입(Acquisition)을 극대화합니다. 이는 비즈니스의 전체적인 파이를 키우는 가장 강력한 방법입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 04: 크리에이티브 피로도(Fatigue) 관리와 소재 수명 연장</h3>
              <p>
                메타 광고 성과의 80%는 소재에서 결정됩니다. 하지만 아무리 좋은 소재도 반복 노출되면 유저는 피로감을 느끼고 효율은 떨어집니다. 히옵은 소재의 '피로도'를 수치화하여 관리합니다. 주당 노출 빈도(Frequency)와 CPC의 상관관계를 분석하여 소재 교체 타이밍을 과학적으로 결정합니다.
              </p>
              <p>
                우리는 단순히 새로운 이미지를 만드는 것이 아니라, 성과가 증명된 소재의 'DNA'를 추출합니다. 어떤 폰트, 어떤 컬러, 어떤 메시지가 유효했는지 분석하여 이를 바탕으로 한 변주(Variant) 소재를 빠르게 생성합니다. 이는 소재 제작 비용을 절감하면서도 성과 우상향 곡선을 유지하는 히옵만의 비결입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 05: 기여도 모델(Attribution)의 진실과 MER 분석</h3>
              <p>
                광고 관리자에서 보여주는 ROAS 수치는 때로는 환상일 수 있습니다. 중복 전환, 기여 기간 설정에 따른 왜곡 등 데이터는 수많은 함정을 가지고 있습니다. 히옵은 매체 리포트에 매몰되지 않습니다. 우리는 비즈니스 전체의 마케팅 효율성 비율(MER, Marketing Efficiency Ratio)을 분석합니다.
              </p>
              <p>
                전체 매출 대비 총 광고비 비중을 확인하고, 광고 집행 후 브랜드 검색량이 얼마나 늘었는지, 자연 유입 매출에 어떤 영향을 주었는지 다각도로 검토합니다. 이러한 홀리스틱(Holistic)한 접근만이 광고주에게 진짜 수익을 안겨줄 수 있습니다. 히옵은 당신의 비즈니스가 지속 가능한 성장을 할 수 있도록 데이터를 엔지니어링합니다.
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
