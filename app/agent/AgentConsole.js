'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Clipboard,
  Download,
  Film,
  Loader2,
  LogOut,
  Play,
  RefreshCcw,
  WandSparkles,
} from 'lucide-react';
import styles from './page.module.css';

const DEFAULT_BRIEF = {
  brand: 'HI-OB',
  product: 'AI 광고 엔진',
  audience: '월 광고비 500만 원 이상 쓰는 한국 광고주',
  painPoint: '소재 퀄리티 검수와 원재료 부족 때문에 대량 생성이 막힘',
  offer: '20개 후보 자동 생성 + QA + 상위 소재 선별',
  proof: '고객 설정값 기반으로 후보를 만들고 중복을 제거합니다',
  cta: '무료 진단 신청',
  style: 'ugc',
  duration: '18',
};

const STYLE_OPTIONS = ['ugc', 'influencer', 'pov', 'testimonial', 'native', 'shortform'];

const LOADING_STEPS = [
  '상위 퍼포먼스 광고 패턴 분석 중...',
  'UGC 구조 조합 중...',
  '후킹 문장 생성 중...',
  '전환형 CTA 최적화 중...',
  'Meta/Reels 비율로 렌더링 중...',
];

const EXPECTED_RESULTS = [
  'Hook 5종',
  'CTA 3종',
  'UGC 구조 자동 조합',
  'Meta/Reels 최적화 비율 적용',
];

export default function AgentConsole() {
  const canvasRef = useRef(null);
  const [form, setForm] = useState(DEFAULT_BRIEF);
  const [job, setJob] = useState(null);
  const [videoOutput, setVideoOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const [error, setError] = useState('');
  const isBusy = isGenerating || isRendering;

  useEffect(() => {
    if (!isBusy) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setLoadingStep((current) => (current + 1) % LOADING_STEPS.length);
    }, 1100);

    return () => window.clearInterval(timer);
  }, [isBusy]);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  async function generateStoryboard(event) {
    event.preventDefault();
    await runGeneration(form);
  }

  async function runGeneration(nextForm) {
    setError('');
    setCopyStatus('');
    setVideoOutput(null);
    setLoadingStep(0);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/agent/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextForm),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.message || '생성에 실패했습니다.');
      }

      setJob(data);
      await renderVideo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  }

  async function regenerateWithNextStyle() {
    const currentIndex = STYLE_OPTIONS.indexOf(form.style);
    const nextStyle = STYLE_OPTIONS[(currentIndex + 1) % STYLE_OPTIONS.length];
    const nextForm = { ...form, style: nextStyle };
    setForm(nextForm);
    await runGeneration(nextForm);
  }

  async function copyScript() {
    if (!job) return;
    const script = job.fullScript || job.scenes.map((scene) => scene.voiceover).join('\n');

    try {
      await navigator.clipboard.writeText(script);
      setCopyStatus('스크립트 복사 완료');
    } catch {
      setCopyStatus('브라우저 권한 때문에 복사에 실패했습니다.');
    }
  }

  async function renderVideo(nextJob = job) {
    if (!nextJob || !canvasRef.current) return;
    setIsRendering(true);
    setVideoOutput(null);
    setLoadingStep(0);

    try {
      const output = await recordCanvasVideo(canvasRef.current, nextJob);
      setVideoOutput(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : '영상 렌더링에 실패했습니다.');
    } finally {
      setIsRendering(false);
    }
  }

  return (
    <main className={styles.engineShell}>
      <header className={styles.engineHeader}>
        <div>
          <p className={styles.kicker}>
            <WandSparkles size={18} />
            Private HI-OB Engine
          </p>
          <h1>성과형 광고 소재 엔진</h1>
          <p>영상 제작이 아니라 광고 소재 병목을 줄이고, Hook/CTA/UGC 구조를 성과형으로 조합합니다.</p>
        </div>
        <form action="/api/agent/logout" method="post">
          <button className={styles.logoutButton} type="submit">
            <LogOut size={18} />
            로그아웃
          </button>
        </form>
      </header>

      <section className={styles.engineGrid}>
        <form className={styles.controlPanel} onSubmit={generateStoryboard}>
          <div className={styles.panelTitle}>
            <Film size={19} />
            크리에이티브 설계
          </div>

          <label>
            브랜드
            <input name="brand" value={form.brand} onChange={updateField} required />
          </label>
          <label>
            상품/서비스
            <input name="product" value={form.product} onChange={updateField} required />
          </label>
          <label>
            전환 타깃
            <textarea name="audience" value={form.audience} onChange={updateField} required />
          </label>
          <label>
            구매/전환 마찰
            <textarea name="painPoint" value={form.painPoint} onChange={updateField} required />
          </label>
          <label>
            오퍼
            <textarea name="offer" value={form.offer} onChange={updateField} required />
          </label>
          <label>
            검증 포인트
            <textarea name="proof" value={form.proof} onChange={updateField} />
          </label>
          <div className={styles.formRow}>
            <label>
              스타일
              <select name="style" value={form.style} onChange={updateField}>
                <option value="ugc">UGC</option>
                <option value="influencer">인플루언서</option>
                <option value="pov">POV</option>
                <option value="testimonial">후기형</option>
                <option value="native">Native</option>
                <option value="shortform">숏폼</option>
              </select>
            </label>
            <label>
              길이
              <input name="duration" type="number" min="12" max="35" value={form.duration} onChange={updateField} />
            </label>
          </div>
          <label>
            전환 행동
            <input name="cta" value={form.cta} onChange={updateField} required />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button className={styles.generateButton} type="submit" disabled={isBusy}>
            {isBusy ? <Loader2 size={18} className={styles.spin} /> : <Play size={18} />}
            {isGenerating ? '성과 구조 생성 중' : isRendering ? '광고 소재 렌더링 중' : '크리에이티브 설계 실행'}
          </button>
        </form>

        <div className={styles.previewPanel}>
          <canvas ref={canvasRef} className={styles.canvas} width="1080" height="1920" />

          {isBusy ? (
            <div className={styles.loadingOverlay}>
              <Loader2 size={22} className={styles.spin} />
              <strong>{LOADING_STEPS[loadingStep]}</strong>
              <span>광고비를 태우는 영상 말고, 전환을 만드는 구조로 조합하고 있습니다.</span>
            </div>
          ) : null}

          <div className={styles.outputActions}>
            <button type="button" onClick={() => renderVideo()} disabled={!job || isRendering}>
              <Play size={17} />
              소재 다시 렌더
            </button>
            {videoOutput ? (
              <>
                <a href={videoOutput.url} download={`hiob-meta-ad-${job?.id || 'video'}.${videoOutput.extension}`}>
                  <Download size={17} />
                  Meta 광고용 다운로드
                </a>
                <a href={videoOutput.url} download={`hiob-reels-${job?.id || 'video'}.${videoOutput.extension}`}>
                  <Download size={17} />
                  릴스 업로드용 저장
                </a>
              </>
            ) : null}
            {job ? (
              <>
                <button type="button" onClick={copyScript}>
                  <Clipboard size={17} />
                  스크립트 복사
                </button>
                <button type="button" onClick={regenerateWithNextStyle} disabled={isBusy}>
                  <RefreshCcw size={17} />
                  다른 스타일로 재생성
                </button>
              </>
            ) : null}
          </div>

          {job ? (
            <>
              <div className={styles.resultHeader}>
                <span>생성 완료</span>
                <h2>전환을 만드는 광고 구조가 준비됐습니다.</h2>
                <p>Hook, 문제 제기, 증거, 오퍼, CTA까지 성과형 쇼츠 흐름으로 조합했습니다.</p>
                {copyStatus ? <em>{copyStatus}</em> : null}
              </div>
              <div className={styles.storyboard}>
                {job.scenes.map((scene, index) => (
                  <article key={scene.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{scene.text}</strong>
                    <p>{scene.voiceover}</p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span>예상 생성 결과</span>
              <h2>광고비를 태우는 영상 말고, 전환을 만드는 영상을 생성하세요.</h2>
              <p>클릭률과 체류시간을 고려한 퍼포먼스 쇼츠가 자동 생성됩니다.</p>
              <ul>
                {EXPECTED_RESULTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

async function recordCanvasVideo(canvas, job) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('현재 브라우저에서 영상 캔버스를 열 수 없습니다.');
  }
  if (typeof canvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
    throw new Error('현재 브라우저가 영상 녹화를 지원하지 않습니다. Chrome 또는 최신 Safari에서 다시 시도해주세요.');
  }

  const stream = canvas.captureStream(30);
  const chunks = [];
  const canCheckMimeType = typeof MediaRecorder.isTypeSupported === 'function';
  const mimeType = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4',
  ].find((type) => !canCheckMimeType || MediaRecorder.isTypeSupported(type));

  if (!mimeType) {
    throw new Error('현재 브라우저가 영상 녹화를 지원하지 않습니다. Chrome 또는 최신 Safari에서 다시 시도해주세요.');
  }

  const recorder = new MediaRecorder(stream, { mimeType });

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  const done = new Promise((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve({
        url: URL.createObjectURL(blob),
        extension: mimeType.includes('mp4') ? 'mp4' : 'webm',
      });
    };
  });

  recorder.start();
  await animateScenes(context, canvas, job.scenes, job.duration);
  recorder.stop();

  return done;
}

async function readJsonResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const message = response.ok ? '응답 형식을 확인할 수 없습니다.' : '로그인이 만료되었거나 서버 응답이 올바르지 않습니다.';
  return { message };
}

async function animateScenes(context, canvas, scenes, totalDuration) {
  const totalMs = totalDuration * 1000;
  const sceneMs = totalMs / scenes.length;
  const start = performance.now();

  return new Promise((resolve) => {
    function draw(now) {
      const elapsed = now - start;
      const sceneIndex = Math.min(scenes.length - 1, Math.floor(elapsed / sceneMs));
      const progress = Math.min(1, (elapsed - sceneIndex * sceneMs) / sceneMs);
      drawScene(context, canvas, scenes[sceneIndex], sceneIndex, scenes.length, progress);

      if (elapsed < totalMs) {
        requestAnimationFrame(draw);
      } else {
        drawScene(context, canvas, scenes.at(-1), scenes.length - 1, scenes.length, 1);
        resolve();
      }
    }

    requestAnimationFrame(draw);
  });
}

function drawScene(context, canvas, scene, index, total, progress) {
  const { width, height } = canvas;
  context.fillStyle = scene.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = scene.accent;
  context.fillRect(0, 0, width, 34);
  context.fillRect(0, height - 34, width, 34);

  context.globalAlpha = 0.08;
  context.fillStyle = '#ffffff';
  context.beginPath();
  context.arc(width * (0.3 + progress * 0.25), height * 0.28, 280, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 1;

  context.fillStyle = scene.accent === '#ffffff' ? '#ffffff' : '#111111';
  context.font = '900 54px Pretendard, Arial';
  context.fillText(`HI-OB AGENT / ${String(index + 1).padStart(2, '0')}`, 72, 130);

  context.fillStyle = scene.accent;
  context.fillRect(72, 176, 180 + progress * 540, 14);

  context.fillStyle = scene.accent === '#ffffff' ? '#ffffff' : '#111111';
  wrapText(context, scene.text, 72, 520, 920, 118, '900 104px Pretendard, Arial');

  context.fillStyle = scene.background === '#111111' ? '#f8f6ef' : '#333333';
  wrapText(context, scene.voiceover, 76, 1190, 900, 58, '800 44px Pretendard, Arial');

  context.fillStyle = scene.accent;
  context.font = '900 42px Pretendard, Arial';
  context.fillText(`${index + 1}/${total}`, 72, height - 98);
}

function wrapText(context, text, x, y, maxWidth, lineHeight, font) {
  context.font = font;
  const chars = [...text];
  let line = '';
  let currentY = y;

  for (const char of chars) {
    const nextLine = line + char;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = nextLine;
    }
  }

  if (line) context.fillText(line, x, currentY);
}
