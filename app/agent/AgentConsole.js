'use client';

import { useRef, useState } from 'react';
import {
  Download,
  Film,
  Loader2,
  LogOut,
  Play,
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

export default function AgentConsole() {
  const canvasRef = useRef(null);
  const [form, setForm] = useState(DEFAULT_BRIEF);
  const [job, setJob] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState('');

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  async function generateStoryboard(event) {
    event.preventDefault();
    setError('');
    setVideoUrl('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/agent/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

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

  async function renderVideo(nextJob = job) {
    if (!nextJob || !canvasRef.current) return;
    setIsRendering(true);
    setVideoUrl('');

    try {
      const url = await recordCanvasVideo(canvasRef.current, nextJob);
      setVideoUrl(url);
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
          <h1>광고 영상 생성 콘솔</h1>
          <p>고객 설정값을 넣으면 5씬 숏폼 스토리보드와 즉시 다운로드 가능한 WebM 영상을 생성합니다.</p>
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
            생성 설정
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
            타깃
            <textarea name="audience" value={form.audience} onChange={updateField} required />
          </label>
          <label>
            핵심 문제
            <textarea name="painPoint" value={form.painPoint} onChange={updateField} required />
          </label>
          <label>
            오퍼
            <textarea name="offer" value={form.offer} onChange={updateField} required />
          </label>
          <label>
            증거/후킹 근거
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
            CTA
            <input name="cta" value={form.cta} onChange={updateField} required />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button className={styles.generateButton} type="submit" disabled={isGenerating || isRendering}>
            {isGenerating || isRendering ? <Loader2 size={18} className={styles.spin} /> : <Play size={18} />}
            {isGenerating ? '스토리보드 생성 중' : isRendering ? '영상 렌더링 중' : '영상 생성'}
          </button>
        </form>

        <div className={styles.previewPanel}>
          <canvas ref={canvasRef} className={styles.canvas} width="1080" height="1920" />

          <div className={styles.outputActions}>
            <button type="button" onClick={() => renderVideo()} disabled={!job || isRendering}>
              <Play size={17} />
              다시 렌더
            </button>
            {videoUrl ? (
              <a href={videoUrl} download={`hiob-agent-${job?.id || 'video'}.webm`}>
                <Download size={17} />
                영상 다운로드
              </a>
            ) : null}
          </div>

          {job ? (
            <div className={styles.storyboard}>
              {job.scenes.map((scene, index) => (
                <article key={scene.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{scene.text}</strong>
                  <p>{scene.voiceover}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>설정값을 확인한 뒤 영상 생성 버튼을 누르세요.</div>
          )}
        </div>
      </section>
    </main>
  );
}

async function recordCanvasVideo(canvas, job) {
  const context = canvas.getContext('2d');
  const stream = canvas.captureStream(30);
  const chunks = [];
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  const done = new Promise((resolve) => {
    recorder.onstop = () => resolve(URL.createObjectURL(new Blob(chunks, { type: 'video/webm' })));
  });

  recorder.start();
  await animateScenes(context, canvas, job.scenes, job.duration);
  recorder.stop();

  return done;
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
