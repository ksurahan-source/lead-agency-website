'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function TikTokMolocoPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m/tiktok-moloco';
    }
  }, []);

  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / SHORT-FORM</div>
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
            <h1 className="massive-text" style={{ color: '#00f2fe' }}>숏폼 &</h1>
            <h1 className="massive-text">알고리즘</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
            <div style={{ padding: '2rem 0' }}>
              <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>
                강력한 알고리즘과<br />크리에이티브로<br /><span style={{ color: '#00f2fe' }}>시장</span>을 장악합니다.
              </p>
            </div>
            <div style={{ padding: '0 0 2rem' }}>
              <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                틱톡 숏폼 기획부터 몰로코 머신러닝 최적화까지, 차세대 퍼포먼스 광고의 모든 것을 히옵이 설계합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.2rem', background: '#00f2fe', color: '#111', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ color: '#111' }}>문의가</h2>
          <h2 className="massive-text" style={{ color: 'rgba(0,0,0,0.2)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {[
              { b: 'OO 모바일 게임', m: 'CPI 60% 절감' },
              { b: 'XX 이커머스', m: '신규 가입 300% 증가' },
              { b: 'YY 라이프스타일', m: '숏폼 조회수 100만 돌파' },
              { b: 'ZZ 글로벌 앱', m: '몰로코 ROAS 350%' },
              { b: 'AA 데이팅 서비스', m: '진성 유저 획득비 50% 하락' },
              { b: 'BB 웹툰 플랫폼', m: '결제 전환 4.5배 상승' }
            ].map((stat, i) => (
              <div key={i} style={{ border: '3px solid #111', padding: '1.5rem', background: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(0,0,0,0.6)', marginBottom: '0.5rem' }}>{stat.b}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Black Han Sans, sans-serif' }}>{stat.m}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'right' }}>
            <p className="font-syne" style={{ fontSize: '2rem', fontWeight: 800 }}>AND 1,200+ MORE INQUIRIES</p>
          </div>
        </div>
      </section>

      {/* Algorithm Focus Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ padding: '6rem 2rem' }}>
          <p style={{ fontWeight: 800, color: '#00f2fe', marginBottom: '1rem' }}>ALGORITHM HACKING</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>숏폼의 성공은<br/>기획이 아니라<br/>'알고리즘' 이해입니다.</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444' }}>
            예쁘고 멋진 영상이 반드시 성과를 내지는 않습니다. <br/>
            알고리즘이 '반응할 수밖에 없는' 장치들을 소재 곳곳에 심어두는 것이 히옵의 전략입니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#eee' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>01. Retention-driven 기획</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>초반 3초의 이탈률을 최소화하여 알고리즘이 '좋은 콘텐츠'로 인식하게 만드는 기법을 적용합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>02. 몰로코 RTB 머신러닝 학습</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>글로벌 수준의 RTB 머신러닝 데이터를 활용하여, 가장 구매 확률이 높은 진성 유저를 정밀하게 찾아냅니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>03. MMP 포스트백 최적화</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>앱 내부의 핵심 이벤트를 매체 알고리즘에 실시간 피드백하여 타겟팅의 정밀도를 지속적으로 높입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: '#00f2fe', color: '#111', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>숏폼 알고리즘을 꿰뚫는 네이티브 콘텐츠 중심의 퍼포먼스 전략.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: '후킹 크리에이티브', d: '틱톡 유저의 시선을 3초 만에 사로잡는 Hook 중심의 네이티브 소재 기획' },
              { t: '몰로코 머신러닝 최적화', d: '글로벌 RTB 머신러닝 기반의 정밀한 오디언스 타겟팅 및 자동 입찰 설계' },
              { t: 'MMP 데이터 매핑', d: 'AppsFlyer, Airbridge 등 MMP 연동을 통한 진성 유저 행동 추적 및 성과 측정' },
              { t: '알고리즘 튜닝', d: '매체별 추천 알고리즘을 학습시키는 퍼포먼스 운영 기법으로 노출 극대화' }
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
              { title: '틱톡 크리에이티브 기획', items: ['숏폼 후크(Hook) 설계', 'UGC 스타일 소재 발굴', '고효율 스토리보드 기획'] },
              { title: 'Moloco RTB 퍼포먼스', items: ['글로벌 프로그래매틱 세팅', 'CPA 목표 기반 자동 입찰', '리타겟팅 오디언스 설계'] },
              { title: 'MMP & 데이터 분석', items: ['MMP 포스트백 매핑', '어트리뷰션 윈도우 진단', '인앱 이벤트 퍼널 분석'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#00f2fe" /> {item}
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
          <h2 className="massive-text" style={{ color: '#00FF66' }}>트렌드를</h2>
          <h2 className="massive-text">선도하라</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            숏폼과 RTB 광고의 성공은 속도와 정확성입니다. 히옵의 전문가들이 여러분의 캠페인을 가속화해 드립니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="tiktok-moloco" />
        </div>
      </section>

      {/* SUCCESS CASES SECTION */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>SUCCESS CASES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            
            <div className="brutalist-card" style={{ borderLeft: '15px solid #00f2fe' }}>
              <div style={{ background: '#00f2fe', color: '#111', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>MOBILE GAMING</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>OO RPG 게임: 몰로코 RTB 최적화로 CPI 60% 절감</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 신작 런칭 후 매체 효율 저하로 인해 신규 유저 획득 비용(CPI)이 목표 대비 2배 이상 높았던 상황.<br/><br/>
                솔루션: 몰로코의 머신러닝 엔진에 '튜토리얼 완료' 데이터를 실시간 피드백. 진성 유저가 많이 분포된 지면을 실시간으로 분석하여 입찰가 최적화.<br/><br/>
                결과: 캠페인 운영 2주 만에 CPI를 60% 낮추는 데 성공하였으며, LTV가 높은 고액 결제 유저 비율이 25% 상승함.
              </p>
            </div>

            <div className="brutalist-card" style={{ borderLeft: '15px solid #000' }}>
              <div style={{ background: '#000', color: '#fff', display: 'inline-block', padding: '0.3rem 1rem', fontWeight: 900, marginBottom: '1.5rem' }}>GLOBAL SOCIAL APP</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>XX 글로벌 앱: 틱톡 알고리즘 해킹으로 북미 시장 안착</h3>
              <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>
                상황: 북미 시장 진출을 위해 틱톡 광고를 집행했으나, 문화적 차이로 인해 영상 시청 완료율이 5% 미만이었던 상황.<br/><br/>
                솔루션: 현지 크리에이터와의 협업 및 '트랜지션' 기법을 활용한 후킹 소재 20종 제작. 알고리즘이 선호하는 시그널(공유, 재시청)을 유도하는 참여형 광고 설계.<br/><br/>
                결과: 시청 완료율이 35%로 폭증하며 알고리즘 추천 지면에 대량 노출. 결과적으로 북미 지역 다운로드 순위 10위권 진입 성공.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MASSIVE TIKTOK SEO ENCYCLOPEDIA V2 */}
      <section style={{ padding: '10rem 2rem', background: '#121212', color: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid #00f2fe', display: 'inline-block' }}>
            THE NEXT-GEN ADS PERFORMANCE MASTERCLASS
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.2rem', lineHeight: '2.4', textAlign: 'justify', color: '#ccc' }}>
            
            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 01: 틱톡 추천 알고리즘(FYP)의 핵심 시그널 해독</h3>
              <p>
                틱톡은 기존 소셜 미디어와는 완전히 다른 문법을 가진 '엔터테인먼트 플랫폼'입니다. 지인 기반의 네트워크가 아닌, 오직 유저의 '관심사'와 '반응'만을 기반으로 콘텐츠를 추천하는 FYP(For You Page) 알고리즘은 마케팅 관점에서 거대한 기회를 제공합니다. 
              </p>
              <p>
                히옵(HI-OP)은 틱톡 알고리즘이 '고성과 콘텐츠'로 인식하게 만드는 요소를 공학적으로 분석합니다. 영상의 시청 지속 시간(Retention), 완료율(Completion Rate), 재시청률, 그리고 공유 데이터를 실시간으로 모니터링하여 어떤 크리에이티브 장치가 알고리즘의 선택을 받는지 데이터화합니다. 틱톡 마케팅은 운에 맡기는 것이 아니라, 알고리즘의 선호도를 맞추는 '최적화'의 영역입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 02: 몰로코(Moloco) 머신러닝과 프로그래매틱 RTB의 파워</h3>
              <p>
                빅테크 매체 외에도 강력한 성과를 내는 플랫폼이 있습니다. 바로 몰로코(Moloco)입니다. 몰로코의 강점은 전 세계 수백만 개의 앱 지면을 대상으로 실시간 입찰(RTB)을 수행하는 독자적인 머신러닝 엔진에 있습니다. 
              </p>
              <p>
                히옵은 몰로코의 머신러닝 엔진이 고객사의 비즈니스 지표를 가장 빠르게 학습할 수 있도록 '포스트백(Postback)' 설계를 수행합니다. 인앱 이벤트(구매, 가입, 특정 버튼 클릭 등) 데이터를 정교하게 매핑하여, 머신러닝이 LTV(고객 생애 가치)가 높은 유저를 초단위로 찾아내 입찰하게 만듭니다. 몰로코는 잘 길들여진 사냥개와 같아서, 마케터의 데이터 엔지니어링 역량에 따라 성과가 수십 배 차이납니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 03: 숏폼 크리에이티브 엔지니어링 - Don't Make Ads</h3>
              <p>
                틱톡의 슬로건인 "Don't make ads, make TikToks"는 숏폼 광고의 본질을 관통합니다. 유저들은 광고임을 인지하는 순간 스크롤을 넘깁니다. 히옵은 '광고 같지 않은 광고'를 만들기 위해 크리에이티브 엔지니어링을 수행합니다.
              </p>
              <p>
                우리는 실제 유저들의 자발적 참여(User Generated Content) 스타일을 차용하고, 틱톡 내에서 유행하는 챌린지나 트렌드를 즉각적으로 광고 소재에 이식합니다. 하지만 단순히 재미에 그치지 않고, 영상 곳곳에 브랜드 메시지와 구매 동기를 자극하는 장치들을 교묘하게 배치합니다. 데이터 분석을 통해 이탈이 가장 많이 발생하는 초수를 파악하고, 해당 지점에 반전 요소나 텍스트 오버레이를 추가하여 시청 지속 시간을 늘립니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 04: ATT 시대의 앱 마케팅과 성과 측정 (MMP/SKAN)</h3>
              <p>
                애플의 개인정보 보호 강화 이후 모바일 앱 마케팅의 성과 측정은 미로처럼 복잡해졌습니다. 이제는 단순한 트래킹 링크가 아닌, MMP(AppsFlyer, Airbridge 등)와 애플의 SKAdNetwork(SKAN) 체계에 대한 깊은 이해가 필수적입니다.
              </p>
              <p>
                히옵은 복잡한 데이터 유실 환경에서도 비즈니스의 진정한 성과를 측정할 수 있는 시스템을 구축합니다. 매체 데이터와 MMP 데이터, 그리고 실제 서버 매출 데이터를 교차 검증하는 'MMM(마케팅 믹스 모델링)' 기법을 도입하여, 각 매체의 기여도를 과학적으로 산출합니다. 안 보이는 것을 보이게 하는 것, 그것이 히옵의 앱 마케팅 기술력입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '3rem', marginBottom: '2.5rem', fontFamily: 'Black Han Sans, sans-serif', color: '#fff' }}>CHAPTER 05: 글로벌 시장 진출과 확장성(Scalability)</h3>
              <p>
                틱톡과 몰로코의 공통점은 글로벌 확장성이 뛰어나다는 점입니다. 히옵은 국내 성과에 안주하지 않고 북미, 동남아, 일본 등 글로벌 시장 진출을 원하는 브랜드에게 최적의 솔루션을 제공합니다. 
              </p>
              <p>
                각 국가별 유저들의 특성을 고려한 크리에이티브 로컬라이제이션과 글로벌 매체 운영 노하우를 바탕으로, 전 세계 어디에서나 통하는 퍼포먼스 마케팅 시스템을 구축합니다. 히옵과 함께라면 세계 시장은 더 이상 낯선 곳이 아닙니다. 데이터라는 공용어를 통해 전 세계 잠재 고객의 마음을 사로잡으십시오.
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
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP / SHORT-FORM SPECIALIST. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
