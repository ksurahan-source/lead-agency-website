'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function TikTokMolocoPage() {
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
        <div className="wrap" style={{ padding: '6rem 2rem' }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: '#00f2fe' }}>숏폼 &</h1>
            <h1 className="massive-text">알고리즘</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                강력한 알고리즘과<br />크리에이티브로<br /><span style={{ color: '#00f2fe' }}>시장</span>을 장악합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                틱톡 숏폼 기획부터 몰로코 머신러닝 최적화까지, 차세대 퍼포먼스 광고의 모든 것을 히옵이 설계합니다.
              </p>
              <div style={{ marginTop: '2.5rem' }}>
                <ArrowDown size={56} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: '6rem 2rem', background: '#00f2fe', color: '#111', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', color: '#111' }}>문의가</h2>
          <h2 className="massive-text" style={{ fontSize: '7vw', color: 'rgba(0,0,0,0.2)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
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

      {/* SEO Deep Dive Section */}
      <section style={{ padding: '8rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--text-dark)' }}>TECHNICAL GUIDE: TIKTOK & MOLOCO OPTIMIZATION</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>01. 틱톡 추천 알고리즘(FYP)의 메커니즘 이해</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                틱톡은 소셜 그래프(인맥)가 아닌 콘텐츠 그래프(관심사) 기반의 추천 시스템을 가지고 있습니다. 이는 신규 브랜드라도 콘텐츠의 재미와 반응도만 좋다면 폭발적인 도달을 기록할 수 있음을 의미합니다. 하지만 퍼포먼스 마케팅의 관점에서는 단순히 '재미있는 영상'만으로는 부족합니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵은 틱톡 알고리즘이 '고성과 콘텐츠'로 인식하게 만드는 테크니컬한 장치들을 활용합니다. 시청 지속 시간(Retention), 완료율(Completion Rate), 그리고 상호작용 데이터를 분석하여 알고리즘이 더 많은 잠재 고객에게 영상을 추천하도록 유도합니다. 또한, 스파크 애즈(Spark Ads)를 전략적으로 사용하여 자연스러운 노출과 높은 전환을 동시에 달성합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>02. 몰로코(Moloco)와 프로그래매틱 RTB의 위력</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                몰로코는 구글, 메타와는 또 다른 강력한 머신러닝 기반의 RTB(Real-Time Bidding) 플랫폼입니다. 특히 모바일 앱 마케팅 분야에서 몰로코의 머신러닝 엔진은 전 세계 수백만 개의 앱 지면 중 '가장 구매 확률이 높은 사용자'를 초단위로 찾아냅니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵은 몰로코의 정교한 머신러닝이 고객사의 데이터를 학습하여 CPA를 낮추고 LTV(고객 생애 가치)가 높은 유저를 획득할 수 있도록 캠페인을 설계합니다. 몰로코의 강점인 글로벌 커버리지와 투명한 성과 측정을 활용하여, 국내뿐만 아니라 글로벌 시장 진출을 노리는 브랜드에게 최적의 솔루션을 제공합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>03. ATT 시대의 앱 퍼포먼스 측정 (MMP 연동)</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                애플의 ATT(App Tracking Transparency) 정책 이후 앱 마케팅의 성과 측정은 매우 복잡해졌습니다. 이제는 단순한 트래킹 링크가 아니라 MMP(Mobile Measurement Partner)와 매체 간의 정교한 데이터 포스트백(Post-back) 설정이 필수적입니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵은 앱스플라이어(AppsFlyer), 에어브릿지(Airbridge) 등의 MMP 솔루션을 완벽하게 세팅하여 SkAdNetwork 환경에서도 누락 없는 성과를 분석합니다. 또한, 인앱 이벤트 데이터를 몰로코와 틱톡의 알고리즘에 실시간으로 전송하여 머신러닝이 진성 유저를 지속적으로 학습하도록 최적화 파이프라인을 구축합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>04. 크리에이티브 엔지니어링: 숏폼의 공식</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                틱톡에서의 광고는 광고 같지 않아야(Don't make ads, make TikToks) 성공합니다. 히옵은 '크리에이티브 엔지니어링'이라는 이름으로 소재를 제작합니다. 유저의 스크롤을 멈추게 하는 3초 후킹과 실제 유저의 후기 같은 네이티브한 구성, 그리고 명확한 보상 체계를 담은 CTA까지. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                우리는 제작된 소재의 초단위 시청 데이터를 분석하여 어떤 지점에서 유저가 이탈하는지 파악하고, 이를 즉각적으로 수정하여 소재의 수명을 늘리고 효율을 극대화합니다. 숏폼과 머신러닝의 시너지를 극대화하는 곳, 히옵이 제안하는 차세대 퍼포먼스 마케팅의 정점입니다.
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
