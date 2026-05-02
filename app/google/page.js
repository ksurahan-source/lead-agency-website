'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function GooglePage() {
  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / GOOGLE</div>
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
            <h1 className="massive-text" style={{ color: '#EA4335' }}>구글 광고</h1>
            <h1 className="massive-text">전략 설계</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
            <div style={{ padding: '2rem 0' }}>
              <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>
                검색 의도 분석부터<br />머신러닝 최적화까지<br /><span style={{ color: '#EA4335' }}>완벽히</span> 설계합니다.
              </p>
            </div>
            <div style={{ padding: '0 0 2rem' }}>
              <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.2rem', background: '#EA4335', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ color: '#fff' }}>문의가</h2>
          <h2 className="massive-text" style={{ color: 'rgba(255,255,255,0.3)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {[
              { b: 'OO 법률사무소', m: 'DB 단가 40% 절감' },
              { b: 'XX IT 솔루션', m: '검색 노출량 5배 증가' },
              { b: 'YY 가전 브랜드', m: 'PMax ROAS 420%' },
              { b: 'ZZ 스타트업', m: '가입 유저 1만명 돌파' },
              { b: 'AA 어학원', m: '상담 전환율 2.5배 상승' },
              { b: 'BB 코스메틱', m: '유튜브 광고 효율 200%' }
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
          <p style={{ fontWeight: 800, color: '#EA4335', marginBottom: '1rem' }}>INTENT ENGINEERING</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>구글 광고는<br/>키워드가 아니라<br/>'데이터' 싸움입니다.</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444' }}>
            단순히 높은 입찰가를 쓰는 것이 정답이 아닙니다. <br/>
            사용자의 검색 의도를 데이터화하고 머신러닝이 이를 학습하게 만드는 것이 핵심입니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#eee' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>01. 향상된 전환(EC) 구축</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>고객 정보를 해싱하여 매체에 직접 전달함으로써 누락된 전환 신호를 완벽하게 복구합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>02. PMax 자산 최적화</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>실적 최대화 캠페인의 시그널 데이터를 정교하게 설계하여 저효율 예산 낭비를 차단합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>03. GA4 오디언스 연동</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>GA4의 고급 사용자 행동 데이터를 구글 광고 오디언스로 직접 연동하여 고가치 타겟팅을 수행합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: '#EA4335', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>단순 입찰 조정을 넘어선 테크니컬 구글 광고 컨설팅.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: 'GTM 인프라 설계', d: 'Google Tag Manager를 활용한 정밀한 사용자 행동 추적 및 데이터 정합성 확보' },
              { t: '검색 의도 분석', d: '사용자의 검색 의도 기반 키워드 포트폴리오 및 맞춤 소재 전략 수립' },
              { t: 'PMax 효율 극대화', d: '실적 최대화 캠페인의 자산 그룹 최적화 및 머신러닝 학습 촉진' },
              { t: '유튜브 풀퍼널 전략', d: '브랜드 인지부터 최종 전환까지 아우르는 비디오 광고 캠페인 설계' }
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
              { title: 'GTM 기반 트래킹 설계', items: ['향상된 전환(EC) 연동', '서버사이드 GTM 구축', 'GA4 연동 및 진단'] },
              { title: '검색 & 디스플레이 최적화', items: ['키워드 포트폴리오 구축', '스마트 입찰 최적화', '광고 문안 및 에셋 개선'] },
              { title: '실적 최대화(PMax) 극대화', items: ['자산 그룹 시그널 최적화', '알고리즘 학습 촉진', '크로스 채널 예산 배분'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#EA4335" /> {item}
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
          <h2 className="massive-text" style={{ color: '#FBBC05' }}>최고의</h2>
          <h2 className="massive-text">성과를</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            구글 광고의 핵심은 데이터와 머신러닝의 조화입니다. 지금 바로 전문가의 무료 진단을 신청하세요.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="google" />
        </div>
      </section>

      {/* SEO Deep Dive Section */}
      <section style={{ padding: '8rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--text-dark)' }}>TECHNICAL GUIDE: GOOGLE ADS OPTIMIZATION</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>01. 검색 의도(Search Intent)의 과학적 분석</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                구글 검색 광고의 본질은 사용자의 '의도'에 답하는 것입니다. 하지만 단순히 키워드에 입찰하는 것만으로는 부족합니다. 사용자가 검색한 키워드가 정보 수집형(Informational)인지, 비교형(Commercial)인지, 아니면 즉각적인 구매형(Transactional)인지에 따라 광고 소재와 랜딩 페이지의 구성이 완전히 달라져야 합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵은 방대한 검색 데이터를 기반으로 고객사의 키워드 포트폴리오를 재구성합니다. 저효율 키워드를 과감히 제거하고, 높은 전환 가능성을 가진 '롱테일 키워드'를 발굴하여 광고비 효율을 극대화합니다. 또한, 구글의 스마트 입찰(Smart Bidding) 기능이 가장 정교하게 작동할 수 있도록 초기 학습 데이터를 정제하는 과정을 거칩니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>02. 실적 최대화(PMax) 캠페인의 테크니컬 튜닝</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                PMax(Performance Max)는 구글의 모든 지면을 아우르는 강력한 AI 기반 캠페인이지만, 동시에 '블랙박스'와 같아서 통제가 어렵다는 단점이 있습니다. 히옵은 PMax를 단순히 '켜두는' 것이 아니라 테크니컬하게 튜닝합니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                우리는 자산 그룹(Asset Groups)의 시그널 데이터를 정교하게 설계하고, 고효율 오디언스 시그널을 주입하여 머신러닝이 엉뚱한 곳에 예산을 쓰지 않도록 방어합니다. 또한, 유튜브 영상 소재와 디스플레이 이미지를 데이터 기반으로 교체하여 지속적인 성과 우상향을 이끌어냅니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>03. GTM 서버사이드와 향상된 전환(Enhanced Conversions)</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                구글 광고 성과의 절반은 '측정'에서 옵니다. 최근 쿠키 차단 환경에서 일반적인 자바스크립트 태그만으로는 전환 데이터의 상당 부분이 유실됩니다. 히옵은 구글 태그 매니저(GTM) 서버사이드 설계를 통해 이 문제를 해결합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                서버사이드 GTM은 브라우저의 간섭 없이 서버 대 서버로 데이터를 전송하여 전환 누락을 최소화합니다. 여기에 더해 '향상된 전환(EC)' 기능을 활성화하여, 로그인을 하지 않은 사용자의 전환까지 매칭할 수 있도록 시스템을 구축합니다. 이는 구글 머신러닝이 더 풍부한 데이터를 학습하게 하여 실질적인 tCPA 하락과 ROAS 상승으로 이어집니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>04. 유튜브 풀퍼널 마케팅과 브랜드 임팩트</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                유튜브는 단순히 영상을 보여주는 지면이 아니라, 구매 결정을 내리는 '검색 엔진'이자 '소셜 플랫폼'입니다. 히옵은 인지 단계의 범퍼 광고(Bumper Ads)부터 전환 단계의 비디오 액션 캠페인(VAC)까지 유기적으로 연결된 풀퍼널 전략을 수립합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                우리는 광고 시청 데이터와 웹사이트 방문 데이터를 교차 분석하여, 특정 영상을 시청한 사용자가 검색 광고를 통해 유입될 때 더 높은 전환율을 보이도록 시나리오를 설계합니다. 구글의 거대한 생태계를 하나의 유기적인 판매 기계로 만드는 것, 그것이 히옵의 구글 광고 엔지니어링입니다.
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
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
