'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function GooglePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m/google';
    }
  }, []);

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

      {/* SUCCESS CASES SECTION */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>SUCCESS CASES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            
            <div className="brutalist-card" style={{ borderLeft: '15px solid #EA4335' }}>
              <div style={{ background: '#EA4335', color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>B2B SaaS / IT</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>OO 협업툴: 서버사이드 GTM 구축 및 리드 품질 3배 상승</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 단순히 유입은 많으나 실제 구매로 이어지는 유료 결제 전환율이 0.1%로 매우 낮았던 상황.<br/><br/>
                솔루션: GA4와 GTM 서버사이드를 연동하여 '진성 유저'의 행동 데이터를 정밀 추적. 구글 머신러닝에 단순 유입이 아닌 '결제 페이지 도달 유저' 시그널을 주입.<br/><br/>
                결과: 광고 유입 유저의 질이 획기적으로 개선되어, 한 달 만에 유료 결제 전환율이 0.35%로 상승하며 성과를 증명함.
              </p>
            </div>

            <div className="brutalist-card" style={{ borderLeft: '15px solid #FBBC05' }}>
              <div style={{ background: '#FBBC05', color: '#000', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>LEGAL & PROF.</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>XX 법률사무소: 의도 기반 키워드 최적화로 DB 단가 40% 절감</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 메인 키워드(이혼, 상속 등)의 높은 입찰 경쟁으로 인해 DB 한 건당 획득 비용이 15만 원을 상회하던 상황.<br/><br/>
                솔루션: 사용자의 구체적인 고충이 담긴 '롱테일 키워드'와 '질문형 키워드'를 대량 발굴. 검색 의도에 최적화된 랜딩 페이지를 각각 매칭.<br/><br/>
                결과: DB 단가를 8만 원대까지 낮추는 데 성공하였으며, 검색 노출 점유율을 80% 이상 확보하여 안정적인 수임 채널 구축.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MASSIVE GOOGLE SEO ENCYCLOPEDIA V2 */}
      <section style={{ padding: '10rem 2rem', background: '#121212', color: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid #EA4335', display: 'inline-block' }}>
            THE GOOGLE ADS MASTERCLASS 2025
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.2rem', lineHeight: '2.4', textAlign: 'justify', color: '#ccc' }}>
            
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 01: 검색의 본질 - 사용자의 고통(Pain Point)을 해결하는 기술</h3>
              <p>
                구글 검색창은 세상에서 가장 솔직한 '욕망의 집합체'입니다. 사용자는 고민이 있을 때 구글을 찾습니다. 따라서 구글 검색 광고의 핵심은 단순히 상위에 노출되는 것이 아니라, 사용자가 가진 문제에 대한 '가장 완벽한 해답'임을 증명하는 것입니다.
              </p>
              <p>
                히옵(HI-OP)은 키워드 분석 단계부터 다르게 접근합니다. 우리는 단순히 조회수가 높은 키워드를 나열하지 않습니다. 사용자가 검색을 수행하는 시점의 심리 상태를 분석하여 '인지-비교-결정'의 단계를 나눕니다. 각 단계에 맞는 광고 문구(Headline)와 설명(Description)을 설계하고, 사용자가 클릭 후 마주할 랜딩 페이지의 콘텐츠까지 일관성 있게 정렬(Alignment)합니다. 이러한 정교한 설계만이 높은 품질지수(Quality Score)와 낮은 CPC를 보장합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 02: 실적 최대화(PMax) 캠페인의 통제권을 되찾는 전략</h3>
              <p>
                구글이 야심 차게 내놓은 PMax 캠페인은 강력하지만 위험합니다. AI에게 모든 것을 맡기면 브랜드의 가치를 훼손하거나, 이미 우리 브랜드를 알고 있는 유저에게 예산을 낭비할 가능성이 크기 때문입니다. 히옵은 PMax를 단순히 '운영'하지 않고 '통제'합니다.
              </p>
              <p>
                우리는 '브랜드 제외' 설정과 '맞춤형 오디언스 시그널' 주입을 통해 PMax가 순수 신규 고객을 찾는 데 집중하게 만듭니다. 또한, 자산 그룹별로 검색 테마를 세분화하여 어떤 메시지가 어떤 지면에서 가장 잘 통하는지 데이터로 증명합니다. PMax는 블랙박스가 아닙니다. 히옵의 엔지니어링을 통하면 투명한 성과 측정 도구가 됩니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 03: 유튜브 VAC를 활용한 비디오 퍼포먼스의 극대화</h3>
              <p>
                유튜브는 이제 인지도를 높이는 브랜딩 채널을 넘어, 즉각적인 구매를 일으키는 퍼포먼스 채널입니다. 비디오 액션 캠페인(VAC)은 구글의 강력한 의도 시그널을 유튜브 영상에 결합합니다.
              </p>
              <p>
                히옵은 '시청 완료'가 아닌 '전환'을 목표로 영상을 기획합니다. 영상 하단에 제품 피드를 연동하고, 시청자의 클릭을 유도하는 강력한 오버레이 버튼을 배치합니다. 무엇보다 구글 검색 데이터를 기반으로 '우리 제품을 검색했던 유저'가 유튜브를 볼 때 광고를 노출하는 '커스텀 세그먼트' 전략을 통해 전환 가능성을 극대화합니다. 영상은 감상이 아닌 구매의 도구입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 04: 구글 애널리틱스 4(GA4)와 데이터 거버넌스의 완성</h3>
              <p>
                GA4는 구글 광고의 '두뇌'입니다. GA4가 데이터를 잘못 읽으면 광고 캠페인 전체가 흔들립니다. 히옵은 GA4의 기본 세팅을 넘어선 '맞춤형 데이터 거버넌스'를 구축합니다.
              </p>
              <p>
                교차 도메인 추적, 향상된 측정 이벤트 최적화, 그리고 가장 중요한 '향상된 전환(Enhanced Conversions)' 기능을 통해 데이터 누락을 최소화합니다. 특히 1st Party 데이터를 구글 시스템에 안전하게 전송하여 머신러닝이 고객을 더 정확히 매칭할 수 있도록 돕습니다. 깨끗한 데이터만이 명확한 ROAS를 산출합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 05: 스마트 입찰 알고리즘의 튜닝과 수익률 극대화</h3>
              <p>
                tCPA, tROAS 입찰 전략은 구글 광고의 정점입니다. 하지만 매체의 추천만 따르다 보면 예산이 과도하게 집행되거나 오히려 성과가 정체될 수 있습니다. 히옵은 알고리즘의 학습 상태를 실시간으로 모니터링하며 '입찰 목표치'를 미세 조정합니다.
              </p>
              <p>
                계절성(Seasonality) 데이터를 미리 주입하여 대규모 프로모션 기간에 머신러닝이 당황하지 않게 만들고, 가치 기반 입찰(Value-based Bidding)을 통해 단순히 구매 수가 아닌 '높은 객단가를 가진 유저'를 우선적으로 획득하도록 설계합니다. 히옵은 구글의 AI를 가장 효율적으로 부리는 데이터 엔지니어입니다.
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
