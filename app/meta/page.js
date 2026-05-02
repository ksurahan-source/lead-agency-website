'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function MetaPage() {
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
        <div className="wrap" style={{ padding: '6rem 2rem' }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: 'var(--hiop-blue)' }}>메타 광고</h1>
            <h1 className="massive-text">퍼포먼스</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                트래킹 인프라부터<br />다시 설계하여<br /><span style={{ color: 'var(--hiop-blue)' }}>ROAS</span>를 증명합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                픽셀 · CAPI · 계정 구조 · 소재 전략까지<br />
                데이터 기반의 완벽한 Meta 광고 솔루션을 제공합니다.
              </p>
              <div style={{ marginTop: '2.5rem' }}>
                <ArrowDown size={56} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: '6rem 2rem', background: 'var(--hiop-blue)', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', color: '#fff' }}>문의가</h2>
          <h2 className="massive-text" style={{ fontSize: '7vw', color: 'rgba(255,255,255,0.3)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
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

      {/* SEO Deep Dive Section */}
      <section style={{ padding: '8rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--text-dark)' }}>TECHNICAL GUIDE: META ADS OPTIMIZATION</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>01. 메타 픽셀(Pixel)과 전환 API(CAPI)의 조화</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                과거의 메타 광고는 브라우저 기반의 '픽셀' 스크립트만으로도 충분한 성과 측정이 가능했습니다. 하지만 최근 브라우저의 쿠키 차단 정책과 iOS의 앱 추적 투명성(ATT) 정책으로 인해 픽셀 데이터의 누락률은 30%에서 많게는 50%까지 치솟고 있습니다. 이러한 상황에서 등장한 것이 바로 전환 API(Conversions API)입니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                CAPI는 웹사이트 서버에서 메타의 서버로 직접 데이터를 전송함으로써 브라우저의 제약을 우회합니다. 단순히 누락된 전환을 복구하는 것뿐만 아니라, 고객의 이메일, 전화번호 등의 해시 데이터를 함께 전송하여 매칭률(Event Match Quality)을 획기적으로 높입니다. 히옵은 픽셀과 CAPI를 동시에 활용하는 하이브리드 설계를 통해 업계 최고 수준의 데이터 정합성을 확보합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>02. 머신러닝을 춤추게 하는 계정 구조(ASC)</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                메타의 알고리즘은 이제 인간 마케터보다 더 정교하게 타겟팅을 수행합니다. 따라서 마케터의 역할은 세세한 타겟팅 설정에서 벗어나 머신러닝이 가장 효율적으로 작동할 수 있는 '구조'를 만드는 것으로 바뀌어야 합니다. 히옵은 어드밴티지+ 쇼핑 캠페인(ASC)과 브로드 타겟팅(Broad Targeting)을 적극 활용합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                불필요한 타겟 쪼개기를 지양하고 데이터를 한곳으로 모으는 '통합 학습' 환경을 구축할 때, 메타의 머신러닝은 비로소 진가를 발휘합니다. 우리는 학습 제한(Learning Limited) 상태를 빠르게 탈출시켜 안정적인 성과 궤도에 진입시키는 노하우를 보유하고 있습니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>03. 릴스(Reels)와 숏폼 콘텐츠의 퍼포먼스화</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                이제 메타 생태계에서 릴스는 가장 강력한 노출 지면입니다. 하지만 단순히 예쁜 영상만으로는 전환을 이끌어낼 수 없습니다. 퍼포먼스 관점의 릴스 소재는 첫 3초의 '후크(Hook)'와 중간의 '신뢰 구축', 그리고 마지막의 '강력한 행동 유도(CTA)'가 조화를 이루어야 합니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵은 수많은 테스트를 통해 검증된 릴스 기획 템플릿을 바탕으로 소재를 제작합니다. 유저가 광고임을 인지하더라도 끝까지 시청하게 만드는 콘텐츠 경쟁력이 곧 광고 성과로 이어집니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>04. 지속 가능한 성장을 위한 성과 분석</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                광고 관리자 상의 수치만으로는 비즈니스의 전체적인 건강 상태를 파악하기 어렵습니다. 히옵은 메타의 기여도(Attribution) 설정에 따른 성과뿐만 아니라, 전체 매출 대비 광고비 비중(MER, Marketing Efficiency Ratio)을 함께 분석합니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                우리는 매주 정교한 분석 리포트를 통해 어떤 캠페인이 실제로 비즈니스의 성장을 견인하고 있는지, 어떤 소재가 피로도를 느끼고 있는지 진단하고 즉각적인 액션 플랜을 제안합니다. 데이터 엔지니어링과 크리에이티브의 완벽한 조화, 히옵이 약속하는 메타 광고의 미래입니다.
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
