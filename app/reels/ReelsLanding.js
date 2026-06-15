'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles, Check, TrendingUp } from 'lucide-react';
import Logo from '@/components/Logo';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import './reels.css';

const VIEW_TARGET = 102431;

const fadeUp = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

/* Count-up that triggers when scrolled into view, honoring reduced-motion. */
function CountUp({ target, duration = 1800, className }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            if (prefersReduced) {
              setValue(target);
              return;
            }
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('ko-KR')}
    </span>
  );
}

function PhoneMock({ variant }) {
  if (variant === 'viral') {
    return (
      <div className="reels-phone-wrap">
        <div className="reels-phone tilt" aria-hidden="true">
          <div className="reels-screen reels-screen--viral">
            <div className="reels-screen-scene">🔥</div>
            <div className="reels-screen-badge">🔥 인기 급상승</div>
            <div className="reels-screen-count">
              <CountUp target={VIEW_TARGET} className="num" />
              <span className="label">조회수</span>
            </div>
            <p className="reels-screen-caption">AI로 10분 만에 만든 우리 가게 릴스</p>
            <div className="reels-screen-actions">
              <div><span className="ico">❤️</span>8.2천</div>
              <div><span className="ico">💬</span>412</div>
              <div><span className="ico">↗</span>1.1천</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-phone-wrap">
      <div className="reels-phone tilt" aria-hidden="true">
        <div className="reels-screen reels-screen--panic">
          <div className="reels-screen-scene">🏪</div>
          <div className="reels-screen-badge">⏸ 게시 안 됨</div>
          <div className="reels-screen-count">
            <span className="num">0</span>
            <span className="label">조회수</span>
          </div>
          <p className="reels-screen-caption">우리 가게 릴스… 어떻게 올리지?</p>
          <div className="reels-screen-actions">
            <div><span className="ico">🤍</span>0</div>
            <div><span className="ico">💬</span>0</div>
            <div><span className="ico">↗</span>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const pains = [
  {
    emoji: '😵‍💫',
    title: '릴스? 뭘 어떻게 올려요',
    desc: '매일 장사만으로도 벅찬데, 영상 기획에 촬영에 편집까지… 시작부터 막막하기만 합니다.',
  },
  {
    emoji: '💸',
    title: '배보다 배꼽이 더 큰 제작비',
    desc: '가게 알리려고 모델 쓰고 비싼 대행사 쓰자니, 정작 남는 게 없습니다.',
  },
  {
    emoji: '🙈',
    title: '카메라 앞은 너무 쑥스러워요',
    desc: '직접 촬영하자니 어색하고, 얼굴이 나오는 것도 부담스럽기만 하죠.',
  },
];

const steps = [
  {
    title: '가게 정보만 보내주세요',
    desc: '메뉴, 사진, 알리고 싶은 한마디면 충분합니다. 복잡한 준비는 필요 없습니다.',
    tag: '준비물 = 폰 하나',
  },
  {
    title: '히옵 AI가 10분 만에 제작',
    desc: '촬영도, 모델도 필요 없습니다. 우리 가게에 꼭 맞는 바이럴 릴스를 AI가 만들어 드립니다.',
    tag: '최단 10분',
  },
  {
    title: '우리 가게 맞춤 릴스 완성',
    desc: '완성된 영상을 바로 올려서, 막막했던 홍보 걱정을 끝내고 손님을 부르세요.',
    tag: '바로 업로드',
  },
];

export default function ReelsLanding() {
  return (
    <main className="reels-main has-sticky-cta">
      {/* Nav */}
      <nav className="reels-nav">
        <Link href="/" className="brand" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="hiob 홈">
          <Logo height={28} />
        </Link>
        <a href="#apply" className="nav-cta">
          영상 제작 신청 <ArrowRight size={16} strokeWidth={3} />
        </a>
      </nav>

      {/* Hero */}
      <section className="reels-hero">
        <div className="reels-hero-grid">
          <motion.div {...fadeUp} className="reels-hero-copy">
            <span className="reels-eyebrow">
              <Sparkles size={15} strokeWidth={2.5} /> 자영업 사장님께
            </span>
            <h1 className="reels-h1">
              저 진짜<br />
              망했어요<span className="ellipsis">…</span>
            </h1>
            <p className="reels-sub">
              손님은 없고, 릴스 하나 올리려니 막막하기만 하셨나요?
            </p>
            <p className="reels-turn">
              촬영도 모델도 없이 <b>폰 하나로</b>. AI가 <b>10분 만에</b> 만든
              우리 가게 릴스가 <b>조회수 10만 회</b>를 넘었습니다.
            </p>
            <div className="reels-hero-actions">
              <a href="#apply" className="reels-cta">
                내 가게 릴스 10분 만에 만들기 <ArrowRight size={20} strokeWidth={3} />
              </a>
            </div>
            <div className="reels-trust-row">
              <span>촬영 X · 모델 X · 폰 하나</span>
              <span>최단 10분 제작</span>
              <span>실제 조회수 10만 사례</span>
              <span className="hot">지금 단돈 5만원</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <PhoneMock variant="panic" />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container reels-marquee">
        <div className="marquee-content">
          촬영 X&nbsp;&nbsp;·&nbsp;&nbsp;모델 X&nbsp;&nbsp;·&nbsp;&nbsp;폰 하나로&nbsp;&nbsp;·&nbsp;&nbsp;10분 제작&nbsp;&nbsp;·&nbsp;&nbsp;조회수 10만 돌파&nbsp;&nbsp;·&nbsp;&nbsp;단돈 5만원&nbsp;&nbsp;·&nbsp;&nbsp;
          촬영 X&nbsp;&nbsp;·&nbsp;&nbsp;모델 X&nbsp;&nbsp;·&nbsp;&nbsp;폰 하나로&nbsp;&nbsp;·&nbsp;&nbsp;10분 제작&nbsp;&nbsp;·&nbsp;&nbsp;조회수 10만 돌파&nbsp;&nbsp;·&nbsp;&nbsp;단돈 5만원&nbsp;&nbsp;·&nbsp;&nbsp;
        </div>
      </div>

      {/* Pain */}
      <section className="reels-section reels-pain">
        <div className="reels-inner">
          <motion.div {...fadeUp} className="reels-section-head">
            <span className="kicker">사장님의 진짜 고민</span>
            <h2>혹시, 이런 마음이셨나요?</h2>
            <p>홍보는 해야겠는데, 막상 시작하려니 하나부터 열까지 부담스럽기만 합니다.</p>
          </motion.div>
          <div className="reels-pain-grid">
            {pains.map((pain, i) => (
              <motion.div
                key={pain.title}
                className="reels-pain-card"
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div className="reels-pain-emoji">{pain.emoji}</div>
                <h3>{pain.title}</h3>
                <p>{pain.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empathy */}
      <section className="reels-section reels-empathy">
        <div className="reels-inner">
          <motion.h2 {...fadeUp}>
            <b>사장님</b> 잘못이<br />아닙니다.
          </motion.h2>
          <motion.p {...fadeUp}>
            장사에 집중해야 할 사장님이, 영상까지 잘 만들어야 할 이유는 없으니까요.
          </motion.p>
        </div>
      </section>

      {/* Solution / steps */}
      <section className="reels-section reels-solution">
        <div className="reels-inner">
          <motion.div {...fadeUp} className="reels-section-head">
            <span className="kicker">이렇게 바뀝니다</span>
            <h2>이제 촬영도, 모델도 없이<br />폰 하나로 시작하세요</h2>
            <p>히옵 AI가 단 10분 만에 우리 가게 맞춤형 바이럴 릴스를 만들어 드립니다.</p>
          </motion.div>
          <div className="reels-steps">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="reels-step"
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <span className="tag">
                  {i === 1 ? <Clock size={15} strokeWidth={2.5} /> : <Check size={15} strokeWidth={3} />}
                  {step.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="reels-section reels-proof">
        <div className="reels-inner">
          <div className="reels-proof-grid">
            <motion.div {...fadeUp} className="reels-proof-copy">
              <span className="reels-eyebrow">
                <TrendingUp size={15} strokeWidth={2.5} /> 실제 제작 사례
              </span>
              <h2>10분 만에 만든 릴스가<br />조회수 10만 회를 넘었습니다</h2>
              <div className="reels-proof-stat">
                <span className="big">
                  <CountUp target={VIEW_TARGET} />
                  <span className="plus">+</span>
                </span>
                <span className="cap">실제 히옵 AI로 제작한 릴스 조회수</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhoneMock variant="viral" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="reels-section reels-offer">
        <div className="reels-inner">
          <motion.div {...fadeUp} className="reels-offer-card">
            <span className="promo">🎉 현재 프로모션 진행 중</span>
            <div className="reels-price-old">대행사 · 모델 촬영 평균 수백만 원</div>
            <div className="reels-price-new">
              단돈 <b>5만 원</b>
            </div>
            <div className="reels-price-unit">히옵 AI 영상 제작 1편 기준</div>
            <p className="line">
              영상 걱정은 히옵에 맡기고,<br />사장님은 이제 장사에만 집중하세요.
            </p>
            <a href="#apply" className="reels-cta">
              지금 영상 제작 신청하기 <ArrowRight size={20} strokeWidth={3} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="reels-section reels-form">
        <div className="reels-inner">
          <motion.div {...fadeUp} className="reels-section-head">
            <span className="kicker">신청은 1분이면 충분합니다</span>
            <h2>우리 가게 첫 릴스, 지금 신청하세요</h2>
            <p>연락처를 남겨주시면 담당자가 제작 절차를 안내해 드립니다.</p>
          </motion.div>
          <div className="reels-form-grid">
            <LeadForm source="reels-owner" variant="video" />
            <div className="reels-kakao">
              <span>폼 작성이 번거로우신가요?</span>
              <a
                href="https://open.kakao.com/o/srdaF2si"
                target="_blank"
                rel="noopener noreferrer"
                className="reels-kakao-btn"
              >
                💬 카카오톡으로 바로 문의하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="reels-notes" aria-label="유의사항">
        <ul>
          <li>* 최단 10분 제작 가능 (조건에 따라 상이할 수 있습니다).</li>
          <li>* 조회수 10만 회는 실제 제작 사례 기준이며, 평균 수치는 다를 수 있습니다.</li>
          <li>* 5만 원은 현재 프로모션 할인가 기준입니다.</li>
        </ul>
      </section>

      <Footer lang="ko" />

      {/* Sticky mobile CTA */}
      <div className="reels-sticky-cta">
        <a href="#apply" className="reels-cta">
          단돈 5만원, 영상 제작 신청하기 <ArrowRight size={18} strokeWidth={3} />
        </a>
      </div>
    </main>
  );
}
