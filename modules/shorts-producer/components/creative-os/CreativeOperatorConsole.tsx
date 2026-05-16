"use client";

import Image from "next/image";
import {
  Activity,
  ArrowDownUp,
  AlertTriangle,
  BadgeCheck,
  Bolt,
  Boxes,
  Captions,
  Check,
  ChevronRight,
  Clock3,
  CopyPlus,
  Database,
  Download,
  DollarSign,
  Flame,
  Gauge,
  Heart,
  ImagePlus,
  Layers3,
  Megaphone,
  Mic2,
  MousePointerClick,
  Play,
  RefreshCw,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  Star,
  TimerReset,
  Wand2,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./CreativeOperatorConsole.module.css";

const angles = ["불안 자극", "성장 욕구", "내부자 관점", "긴급성", "놓칠까 봐 불안", "권위", "사회적 증거"];
const tones = ["공격적", "내부자형", "대표형", "차분한", "운영자형", "긴급한"];

const initialBrief = {
  brand: "HI-OP",
  product: "Creative Velocity OS (소재 생산·테스트 운영 시스템)",
  audience: "월 ₩1,000만-₩5,000만 이상 광고비를 집행하는 DTC 브랜드",
  pain: "소재 부족 때문에 스케일이 막히고, 이긴 훅을 빨리 못 찾음",
  offer: "하루 20개 광고 변형 테스트 워크플로우",
  cta: "오늘 테스트 큐 만들기",
  angle: "불안 자극",
};

const briefLabels: Record<keyof typeof initialBrief, string> = {
  brand: "브랜드",
  product: "운영 시스템",
  audience: "타깃",
  pain: "문제",
  offer: "제안",
  cta: "행동 유도",
  angle: "소구점",
};

const baseHooks = [
  "광고비는 나가는데, 이긴 소재는 왜 안 쌓입니까?",
  "소재 부족 때문에 스케일이 막히는 순간이 있습니다.",
  "클릭률이 죽는 건 조용합니다. 대시보드만 늦게 알려줄 뿐.",
  "하루에 3개 만들고 20개 테스트하는 팀을 이길 수 있을까요?",
  "지금 필요한 건 예쁜 영상이 아니라, 이기는 훅의 물량입니다.",
  "광고 성과가 안 나는 게 아니라, 테스트 속도가 느릴 수 있습니다.",
  "아직도 새 광고를 처음부터 다시 만들고 있나요?",
  "소재 회의가 길어질수록 시장 테스트는 늦어집니다.",
  "좋은 브랜드도 첫 1초를 못 잡으면 그냥 지나갑니다.",
  "이긴 광고는 감으로 나온 게 아니라 변형 수에서 나옵니다.",
];

const ctaVariations = [
  "오늘 테스트 큐 만들기",
  "20개 변형 바로 뽑기",
  "후킹 소재부터 생성하기",
  "이번 주 승자 소재 찾기",
  "광고 운영 속도 올리기",
];

const emotionalAngles = [
  {
    name: "불안 자극",
    trigger: "광고비가 조용히 새고 있다는 불안",
    line: "대시보드는 늦게 말합니다. 시장은 이미 스크롤했습니다.",
  },
  {
    name: "내부자 관점",
    trigger: "잘 되는 팀만 아는 운영 방식",
    line: "상위 팀은 광고를 만들지 않습니다. 테스트 시스템을 돌립니다.",
  },
  {
    name: "성장 욕구",
    trigger: "이긴 소재를 더 빨리 찾는 욕망",
    line: "한 개의 예쁜 영상보다, 20개의 날카로운 훅이 더 빨리 배웁니다.",
  },
];

const visualIdeas = [
  {
    type: "AI 이미지",
    title: "심야 광고 운영 데스크",
    img: "/memes/hiob-001/01-shocked-dashboard.webp",
    prompt:
      "자정에 Meta 광고관리자 화면 여러 개를 띄워 둔 한국 퍼포먼스 마케터, 스마트폰 UGC 느낌, 실제 운영 데스크, 낮은 조도",
    tags: ["운영 데스크", "광고관리자", "야간 화면"],
  },
  {
    type: "밈",
    title: "소재 큐 부족 경고",
    img: "/memes/hiob-001/06-ceo-leads-shocked.jpeg",
    prompt: "내일 캠페인 런칭인데 준비된 소재가 3개뿐인 상황을 본 대표의 리액션 밈",
    tags: ["놀란 대표", "내일 런칭", "소재 부족"],
  },
  {
    type: "Pexels",
    title: "빠른 운영 입력",
    img: "/memes/hiob-001/10-wrong-person-money.jpeg",
    prompt: "Pexels 검색어: 노트북, 야간 마케팅 대시보드, 빠른 타이핑, 휴대폰 알림, 스타트업 팀",
    tags: ["빠른 타이핑", "운영 알림", "대시보드 클로즈업"],
  },
];

const timeline = [
  { time: "0.0-1.5s", role: "후킹", copy: "광고비는 나가는데, 이긴 소재는 왜 안 쌓입니까?", metric: "초반 정지율" },
  { time: "1.5-3.0s", role: "문제", copy: "팀은 바쁜데 테스트 물량이 부족합니다.", metric: "문제 공감도" },
  { time: "3.0-5.0s", role: "증거", copy: "이기는 팀은 훅, 행동 유도 문구, 비주얼을 매일 갈아 끼웁니다.", metric: "신뢰도" },
  { time: "5.0-8.0s", role: "해결 구조", copy: "브리프 하나로 20개 변형을 큐에 올립니다.", metric: "클릭률 개선" },
  { time: "8.0-12s", role: "행동 유도", copy: "오늘 테스트 큐부터 만드세요.", metric: "행동 유도" },
];

const subtitlePresets = ["Hormozi 스타일", "한국 금융톤", "TikTok 네이티브", "AI 소프트웨어형", "뉴스형", "다크 퍼포먼스"];
const reusableAssets = ["후킹 데이터베이스", "행동 유도 문구 뱅크", "밈 레퍼런스", "Pexels 검색어", "보이스 스타일", "자막 프리셋"];

interface DailyCostSummary {
  totals?: {
    actualCostUsd?: number;
    estimatedCostUsd?: number;
  };
  byProvider?: Record<string, number>;
}

function makeHooks(brand: string, product: string, pain: string, offer: string, angle: string, cycle: number) {
  const variants = [
    `${brand} 없이도 광고는 돌아갑니다. 문제는 이긴 소재가 안 쌓인다는 겁니다.`,
    `${pain.split(",")[0]}? 그건 디자인 문제가 아니라 테스트 속도 문제입니다.`,
    `${product}는 영상을 예쁘게 만드는 툴이 아닙니다. 승자 소재를 빨리 찾는 운영판입니다.`,
    `아직도 훅 하나 바꾸려고 새 영상을 처음부터 만들고 있나요?`,
    `${offer}가 필요한 팀은 이미 광고비로 답을 듣고 있습니다.`,
  ];

  return baseHooks.map((hook, index) => {
    if ((index + cycle) % 3 === 0) return variants[index % variants.length];
    if (angle === "긴급성" && index % 2 === 0) return `이번 주 스케일 막히기 전에: ${hook}`;
    if (angle === "내부자 관점" && index % 2 === 1) return `잘 되는 팀은 압니다. ${hook}`;
    return hook;
  });
}

export default function CreativeOperatorConsole() {
  const [brief, setBrief] = useState(initialBrief);
  const [tone, setTone] = useState("공격적");
  const [costMode, setCostMode] = useState<"draft" | "final">("draft");
  const [cycle, setCycle] = useState(0);
  const [hooks, setHooks] = useState(() =>
    makeHooks(initialBrief.brand, initialBrief.product, initialBrief.pain, initialBrief.offer, initialBrief.angle, 0),
  );
  const [selectedHook, setSelectedHook] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([0, 4]);
  const [subtitle, setSubtitle] = useState("다크 퍼포먼스");
  const [dailyCost, setDailyCost] = useState<DailyCostSummary | null>(null);

  const score = useMemo(() => {
    const hook = hooks[selectedHook] ?? "";
    return {
      thumbstop: Math.min(96, 72 + hook.length % 19),
      emotional: Math.min(94, 69 + brief.angle.length * 3),
      velocity: 20 + favorites.length * 2,
    };
  }, [brief.angle, favorites.length, hooks, selectedHook]);

  const ttsScript = useMemo(() => {
    const hook = hooks[selectedHook] ?? "";
    return `${hook.split(",")[0]}...\n\n${hook.split(",").slice(1).join(",").trim() || "그 순간은 조용합니다."}\n\n[0.4초 쉼]\n${brief.offer}.\n\n${brief.cta}.`;
  }, [brief.cta, brief.offer, hooks, selectedHook]);

  const estimatedFinalCost = useMemo(() => {
    const ttsChars = ttsScript.replace(/\s+/g, "").length;
    const imageGenerations = Math.min(3, Math.max(1, favorites.length));
    return 0.14 + imageGenerations * 0.06 + (ttsChars / 1000) * 0.18;
  }, [favorites.length, ttsScript]);

  const providerCostBreakdown = useMemo(() => {
    const ttsChars = ttsScript.replace(/\s+/g, "").length;
    const imageGenerations = Math.min(3, Math.max(1, favorites.length));
    return [
      { provider: "OpenAI", label: "초안 대본", cost: hooks.length * 0.003 },
      { provider: "ElevenLabs", label: `${ttsChars}자`, cost: (ttsChars / 1000) * 0.18 },
      { provider: "PiAPI", label: `이미지 레퍼런스 ${imageGenerations}개`, cost: imageGenerations * 0.06 },
      { provider: "AWS Remotion", label: "최종 렌더 1회", cost: 0.14 },
    ];
  }, [favorites.length, hooks.length, ttsScript]);

  const todaySpend = dailyCost?.totals?.actualCostUsd ?? 0;

  useEffect(() => {
    let cancelled = false;

    fetch("/api/usage/daily")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DailyCostSummary | null) => {
        if (!cancelled) setDailyCost(data);
      })
      .catch(() => {
        if (!cancelled) setDailyCost(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateBrief = (key: keyof typeof brief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
  };

  const regenerateHooks = () => {
    const nextCycle = cycle + 1;
    setCycle(nextCycle);
    setHooks(makeHooks(brief.brand, brief.product, brief.pain, brief.offer, brief.angle, nextCycle));
    setSelectedHook(0);
  };

  const toggleFavorite = (index: number) => {
    setFavorites((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  return (
    <main className={styles.shell}>
      <nav className={styles.navbar} aria-label="Creative Velocity OS 내비게이션">
        <div className={styles.brandLockup}>
          <span className={styles.logoMark}>OS</span>
          <div>
            <strong>Creative Velocity OS</strong>
            <small>성과형 소재 운영 시스템</small>
          </div>
        </div>
        <div className={styles.navPills}>
          <span>후킹 랩</span>
          <span>보이스</span>
          <span>비주얼</span>
          <span>타임라인</span>
          <span>렌더</span>
        </div>
        <button className={styles.deployButton} type="button">
          <Download size={16} />
          Meta / TikTok 내보내기
        </button>
      </nav>

      <section className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <Zap size={16} />
            AI 소재 테스트 엔진
          </p>
          <h1>이기는 광고 소재를 더 빠르게 찾으세요.</h1>
          <p>
            월 ₩1,000만-₩5,000만 이상 광고비를 집행하는 DTC 브랜드를 위한 시스템입니다.
            브랜드 브리프 하나로 훅, 보이스, 비주얼, 자막, 타임라인 변형을 운영 큐에 쌓습니다.
            목표는 예쁜 영상이 아니라 하루 10-20개 시장 테스트입니다.
          </p>
          <div className={styles.heroStats}>
            <div>
              <span>일일 생산량</span>
              <strong>20+</strong>
            </div>
            <div>
              <span>핵심 지표</span>
              <strong>초반 정지율</strong>
            </div>
            <div>
              <span>비용 모드</span>
              <div className={styles.modeSwitch} aria-label="비용 제어 모드">
                <button
                  className={costMode === "draft" ? styles.activeMode : ""}
                  onClick={() => setCostMode("draft")}
                  type="button"
                >
                  초안
                </button>
                <button
                  className={costMode === "final" ? styles.activeMode : ""}
                  onClick={() => setCostMode("final")}
                  type="button"
                >
                  최종
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.commandPanel}>
          <div className={styles.panelHeader}>
            <span>
              <Activity size={15} />
              오늘의 테스트 큐
            </span>
            <strong>운영 중</strong>
          </div>
          <div className={styles.queueBars}>
            <span style={{ "--value": "88%" } as React.CSSProperties} />
            <span style={{ "--value": "66%" } as React.CSSProperties} />
            <span style={{ "--value": "74%" } as React.CSSProperties} />
            <span style={{ "--value": "53%" } as React.CSSProperties} />
          </div>
          <div className={styles.scoreGrid}>
            <div>
              <MousePointerClick size={18} />
              <span>후킹 강도</span>
              <strong>{score.thumbstop}</strong>
            </div>
            <div>
              <Flame size={18} />
              <span>감정 반응</span>
              <strong>{score.emotional}</strong>
            </div>
            <div>
              <TimerReset size={18} />
              <span>일일 변형</span>
              <strong>{score.velocity}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.opsGrid}>
        <aside className={styles.briefPanel}>
          <div className={styles.panelHeader}>
            <span>
              <SlidersHorizontal size={15} />
              브리프 입력
            </span>
            <small>1단계 카피만 입력</small>
          </div>
          {Object.entries(brief).map(([key, value]) => (
            <label className={styles.inputGroup} key={key}>
              <span>{briefLabels[key as keyof typeof brief]}</span>
              {key === "angle" ? (
                <select value={value} onChange={(event) => updateBrief(key as keyof typeof brief, event.target.value)}>
                  {angles.map((angle) => (
                    <option key={angle}>{angle}</option>
                  ))}
                </select>
              ) : (
                <textarea
                  rows={key === "pain" || key === "audience" ? 3 : 2}
                  value={value}
                  onChange={(event) => updateBrief(key as keyof typeof brief, event.target.value)}
                />
              )}
            </label>
          ))}
          <button className={styles.primaryAction} onClick={regenerateHooks} type="button">
            <RefreshCw size={17} />
            후킹 문구 다시 생성
          </button>
        </aside>

        <section className={styles.workbench}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>
                <Megaphone size={16} />
                후킹·대본 엔진
              </p>
              <h2>짧고 날카롭게 스크롤을 멈추는 변형 소재</h2>
            </div>
            <div className={styles.toneSwitch}>
              {tones.map((item) => (
                <button
                  className={item === tone ? styles.activeTone : ""}
                  key={item}
                  onClick={() => setTone(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.hookList}>
            {hooks.map((hook, index) => (
              <article className={index === selectedHook ? styles.selectedHook : styles.hookCard} key={`${hook}-${index}`}>
                <button className={styles.hookSelect} onClick={() => setSelectedHook(index)} type="button">
                  <span>훅{String(index + 1).padStart(2, "0")}</span>
                  <textarea
                    value={hook}
                    onChange={(event) => {
                      const next = [...hooks];
                      next[index] = event.target.value;
                      setHooks(next);
                    }}
                  />
                  <small className={styles.costBadge}>예상 ${((index + 1) * 0.003).toFixed(3)}</small>
                </button>
                <button
                  className={favorites.includes(index) ? styles.favorited : styles.iconButton}
                  aria-label="후킹 문구 즐겨찾기"
                  onClick={() => toggleFavorite(index)}
                  type="button"
                >
                  <Heart size={16} />
                </button>
              </article>
            ))}
          </div>

          <div className={styles.engineGrid}>
            <article className={styles.enginePanel}>
              <div className={styles.panelHeader}>
                <span>
                  <Mic2 size={15} />
                  보이스 디렉션 엔진
                </span>
                <small>{tone} 마케터</small>
              </div>
              <pre>{ttsScript}</pre>
              <div className={styles.directionRows}>
                <span>빠른 대화형 속도</span>
                <span>문제 제기 후 0.4초 쉼</span>
                <span>광고비 누수와 테스트 물량 강조</span>
              </div>
            </article>

            <article className={styles.enginePanel}>
              <div className={styles.panelHeader}>
                <span>
                  <Sparkles size={15} />
                  감정 소구점
                </span>
                <small>3개 선택</small>
              </div>
              <div className={styles.angleStack}>
                {emotionalAngles.map((item) => (
                  <div key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.trigger}</span>
                    <p>{item.line}</p>
                  </div>
                ))}
              </div>
              <div className={styles.ctaBank}>
                {ctaVariations.map((cta) => (
                  <button key={cta} type="button" onClick={() => updateBrief("cta", cta)}>
                    {cta}
                  </button>
                ))}
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className={styles.lowerGrid}>
        <article className={styles.visualPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>
                <ImagePlus size={16} />
                비주얼·밈 엔진
              </p>
              <h2>뻔한 스톡 이미지가 아니라 실제 운영 장면 추천</h2>
            </div>
            <button className={styles.secondaryAction} type="button">
              <ArrowDownUp size={16} />
              소스 교체
            </button>
          </div>
          <div className={styles.visualCards}>
            {visualIdeas.map((idea) => (
              <div className={styles.visualCard} key={idea.title}>
                <Image src={idea.img} alt={idea.title} width={360} height={240} />
                <div>
                  <span>{idea.type}</span>
                  <strong>{idea.title}</strong>
                  <p>{idea.prompt}</p>
                  <small>{idea.tags.join(" / ")}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.timelinePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>
                <Clock3 size={16} />
                장면 타임라인 엔진
              </p>
              <h2>보기 좋은 완성도보다 이탈을 줄이는 속도 설계</h2>
            </div>
            <button className={styles.secondaryAction} type="button">
              <CopyPlus size={16} />
              장면 복제
            </button>
          </div>
          <div className={styles.timeline}>
            {timeline.map((scene) => (
              <div className={styles.sceneRow} key={scene.time}>
                <span>{scene.time}</span>
                <strong>{scene.role}</strong>
                <p>{scene.copy}</p>
                <small>{scene.metric}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.previewGrid}>
        <article className={styles.subtitlePanel}>
          <div className={styles.panelHeader}>
            <span>
              <Captions size={15} />
              자막·보더 시스템
            </span>
            <small>{subtitle}</small>
          </div>
          <div className={styles.presetGrid}>
            {subtitlePresets.map((preset) => (
              <button
                className={preset === subtitle ? styles.activePreset : ""}
                onClick={() => setSubtitle(preset)}
                key={preset}
                type="button"
              >
                {preset}
              </button>
            ))}
          </div>
          <div className={styles.captionPreview}>
            <span>광고비는 나가는데</span>
            <strong>이긴 소재가 안 쌓입니까?</strong>
          </div>
        </article>

        <article className={styles.phonePreview}>
          <div className={styles.phoneTop}>
            <span>9:16 미리보기</span>
            <Play size={18} />
          </div>
          <Image src="/memes/hiob-001/12-meta-dashboard-blur-needed.jpeg" alt="광고관리자 화면 미리보기" width={420} height={620} />
          <div className={styles.phoneCaption}>
            <span>{timeline[0].time}</span>
            <strong>{hooks[selectedHook]}</strong>
          </div>
          <div className={styles.retentionRail}>
            <span />
          </div>
        </article>

        <article className={styles.exportPanel}>
          <div className={styles.panelHeader}>
            <span>
              <Boxes size={15} />
              변형 소재 시스템
            </span>
            <small>재사용, 교체, 테스트</small>
          </div>
          <div className={styles.assetGrid}>
            {reusableAssets.map((asset) => (
              <div key={asset}>
                <Database size={16} />
                <span>{asset}</span>
                <Check size={15} />
              </div>
            ))}
          </div>
          <div className={styles.exportStack}>
            <div className={styles.spendBadge}>
              <DollarSign size={16} />
              <span>오늘 사용 비용</span>
              <strong>US${todaySpend.toFixed(2)}</strong>
            </div>
            <button type="button">
              <Layers3 size={17} />
              초안 묶음 생성
            </button>
            <button type="button">
              <Scissors size={17} />
              선택 초안 저장
            </button>
            <div className={styles.costWarning}>
              <AlertTriangle size={16} />
              <span>유료 API 호출이 발생합니다.</span>
            </div>
            <div className={styles.costLine}>
              <span>예상 최종 비용</span>
              <strong>~US${estimatedFinalCost.toFixed(2)}</strong>
            </div>
            <div className={styles.providerBreakdown}>
              {providerCostBreakdown.map((item) => (
                <div key={item.provider}>
                  <span>{item.provider}</span>
                  <small>{item.label}</small>
                  <strong>US${item.cost.toFixed(3)}</strong>
                </div>
              ))}
            </div>
            <button className={costMode === "final" ? styles.finalAction : ""} disabled={costMode !== "final"} type="button">
              <Gauge size={17} />
              최종 렌더 승인 - 예상 ${estimatedFinalCost.toFixed(2)}
            </button>
          </div>
        </article>
      </section>

      <section className={styles.operatorFooter}>
        <div>
          <BadgeCheck size={18} />
          <span>후킹 / 초반 정지율 / 클릭률 / 시청 유지율 / 감정 소구점 중심으로 설계</span>
        </div>
        <ChevronRight size={18} />
        <div>
          <Bolt size={18} />
          <span>성공 지표: 하루에 시장에서 검증한 광고 변형 수</span>
        </div>
        <ChevronRight size={18} />
        <div>
          <Star size={18} />
          <span>다음 묶음에 사용할 후킹 문구 {favorites.length}개 선택됨</span>
        </div>
        <Wand2 className={styles.footerIcon} size={20} />
      </section>
    </main>
  );
}
