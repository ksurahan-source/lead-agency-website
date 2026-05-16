import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

import type { AspectRatio, RenderableShortScript, ResolvedScene, ShotType } from '@/lib/types';

export interface ShortsCompositionProps {
  version?: string;
  layout?: 'article' | 'simple-reels';
  language?: 'ko';
  script: RenderableShortScript;
  backgroundUrl: string;
  voiceoverAsset?: string;
  voiceSegments?: Array<{
    asset: string;
    at: number;
    volume?: number;
    duration?: number;
    role?: string;
  }>;
  backgroundMusicAsset?: string;
  soundEffects?: Array<{
    asset: string;
    at: number;
    volume?: number;
    duration?: number;
  }>;
  targetDurationSeconds?: number;
  aspectRatio: AspectRatio;
}

const FONT =
  '"Apple SD Gothic Neo", "Noto Sans KR", "Pretendard", "Arial", sans-serif';

const COLORS = {
  ink: '#050505',
  paper: '#ffffff',
  navy: '#3e477b',
  orange: '#df5a2d',
  line: '#d5d2cc',
  muted: '#8d8d8d',
  soft: '#f3f1ed',
};

export const ShortsComposition = ({
  layout = 'article',
  script,
  voiceoverAsset,
  voiceSegments = [],
  backgroundMusicAsset,
  soundEffects = [],
  targetDurationSeconds,
  aspectRatio,
}: ShortsCompositionProps) => {
  const { fps } = useVideoConfig();
  const baseSeconds = script.scenes.reduce((total, scene) => total + scene.duration, 0);
  const durationScale =
    baseSeconds > 0 && targetDurationSeconds && targetDurationSeconds > baseSeconds
      ? targetDurationSeconds / baseSeconds
      : 1;

  const scenes = script.scenes.reduce<
    Array<{ scene: ResolvedScene; index: number; from: number; durationInFrames: number }>
  >((items, scene, index) => {
    const previous = items[items.length - 1];
    const durationInFrames = Math.max(Math.round(scene.duration * durationScale * fps), fps);
    const from = previous ? previous.from + previous.durationInFrames : 0;

    return [...items, { scene, index, from, durationInFrames }];
  }, []);

  if (aspectRatio !== '9:16') {
    return (
      <MultiFormatComposition
        script={script}
        scenes={scenes}
        aspectRatio={aspectRatio}
        voiceoverAsset={voiceoverAsset}
        voiceSegments={voiceSegments}
        backgroundMusicAsset={backgroundMusicAsset}
        soundEffects={soundEffects}
      />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', fontFamily: FONT }}>
      {layout === 'simple-reels' ? null : <ArticlePhone title={script.title} />}

      {scenes.map(({ scene, index, from, durationInFrames }) => (
        <Sequence key={`${scene.text}-${index}`} from={from} durationInFrames={durationInFrames}>
          {layout === 'simple-reels' ? (
            <SimpleReelsScene scene={scene} index={index} durationInFrames={durationInFrames} />
          ) : (
            <ArticleScene scene={scene} index={index} durationInFrames={durationInFrames} />
          )}
        </Sequence>
      ))}

      {layout === 'simple-reels' ? null : <ProgressRail scenes={scenes} />}

      {backgroundMusicAsset ? <Audio src={staticFile(backgroundMusicAsset)} volume={0.18} /> : null}
      {scenes.map(({ scene, from, durationInFrames }, index) =>
        scene.audio_asset ? (
          <Sequence
            key={`voice-${scene.audio_asset}-${index}`}
            from={from}
            durationInFrames={durationInFrames}
          >
            <Audio src={staticFile(scene.audio_asset)} volume={1} />
          </Sequence>
        ) : null,
      )}
      {soundEffects.map((effect, index) => (
        <Sequence
          key={`${effect.asset}-${effect.at}-${index}`}
          from={Math.max(0, Math.round(effect.at * fps))}
          durationInFrames={Math.max(1, Math.round((effect.duration ?? 1.5) * fps))}
        >
          <Audio src={staticFile(effect.asset)} volume={effect.volume ?? 0.44} />
        </Sequence>
      ))}
      {voiceSegments.map((segment, index) => (
        <Sequence
          key={`${segment.asset}-${segment.at}-${index}`}
          from={Math.max(0, Math.round(segment.at * fps))}
          durationInFrames={Math.max(1, Math.round((segment.duration ?? 2) * fps))}
        >
          <Audio src={staticFile(segment.asset)} volume={segment.volume ?? 1} />
        </Sequence>
      ))}
      {voiceoverAsset && voiceSegments.length === 0 && !script.scenes.some((scene) => scene.audio_asset) ? (
        <Audio src={staticFile(voiceoverAsset)} volume={1} />
      ) : null}
    </AbsoluteFill>
  );
};

const MultiFormatComposition = ({
  script,
  scenes,
  aspectRatio,
  voiceoverAsset,
  voiceSegments,
  backgroundMusicAsset,
  soundEffects,
}: {
  script: RenderableShortScript;
  scenes: Array<{ scene: ResolvedScene; index: number; from: number; durationInFrames: number }>;
  aspectRatio: AspectRatio;
  voiceoverAsset?: string;
  voiceSegments: ShortsCompositionProps['voiceSegments'];
  backgroundMusicAsset?: string;
  soundEffects: ShortsCompositionProps['soundEffects'];
}) => {
  return (
    <AbsoluteFill style={{ background: '#070707', fontFamily: FONT }}>
      {scenes.map(({ scene, index, from, durationInFrames }) => (
        <Sequence key={`${scene.text}-${index}`} from={from} durationInFrames={durationInFrames}>
          <MultiFormatScene
            title={script.title}
            scene={scene}
            index={index}
            durationInFrames={durationInFrames}
            aspectRatio={aspectRatio}
          />
        </Sequence>
      ))}

      <ProgressRail scenes={scenes} />
      {backgroundMusicAsset ? <Audio src={staticFile(backgroundMusicAsset)} volume={0.16} /> : null}
      {soundEffects?.map((effect, index) => (
        <Sequence
          key={`${effect.asset}-${effect.at}-${index}`}
          from={Math.max(0, Math.round(effect.at * 30))}
          durationInFrames={Math.max(1, Math.round((effect.duration ?? 1.5) * 30))}
        >
          <Audio src={staticFile(effect.asset)} volume={effect.volume ?? 0.34} />
        </Sequence>
      ))}
      {voiceSegments?.map((segment, index) => (
        <Sequence
          key={`${segment.asset}-${segment.at}-${index}`}
          from={Math.max(0, Math.round(segment.at * 30))}
          durationInFrames={Math.max(1, Math.round((segment.duration ?? 2) * 30))}
        >
          <Audio src={staticFile(segment.asset)} volume={segment.volume ?? 1} />
        </Sequence>
      ))}
      {voiceoverAsset && !voiceSegments?.length ? <Audio src={staticFile(voiceoverAsset)} volume={1} /> : null}
    </AbsoluteFill>
  );
};

const MultiFormatScene = ({
  title,
  scene,
  index,
  durationInFrames,
  aspectRatio,
}: {
  title: string;
  scene: ResolvedScene;
  index: number;
  durationInFrames: number;
  aspectRatio: AspectRatio;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLandscape = aspectRatio === '16:9';
  const opacity = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoom = interpolate(frame, [0, durationInFrames], [1.02, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const contentWidth = isLandscape ? width * 0.48 : width * 0.78;
  const mediaLeft = isLandscape ? width * 0.48 : width * 0.11;
  const mediaTop = isLandscape ? height * 0.14 : height * 0.38;
  const mediaWidth = isLandscape ? width * 0.42 : width * 0.78;
  const mediaHeight = isLandscape ? height * 0.72 : height * 0.42;
  const sceneSize = isLandscape ? fitWideText(scene.text) : fitSquareText(scene.text);

  return (
    <AbsoluteFill style={{ opacity, color: '#fff', background: '#070707' }}>
      {scene.asset_url ? (
        <Img
          src={assetSource(scene.asset_url)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.32,
            transform: `scale(${zoom})`,
            filter: 'saturate(1.05) contrast(1.08) blur(2px)',
          }}
        />
      ) : null}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.34))' }} />

      <div
        style={{
          position: 'absolute',
          left: width * 0.07,
          top: height * 0.1,
          width: contentWidth,
        }}
      >
        <div style={{ color: '#ffd84d', fontSize: 24, fontWeight: 950, letterSpacing: 0 }}>
          {scene.topic || cleanTitle(title)}
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: sceneSize,
            lineHeight: 1.08,
            fontWeight: 950,
            letterSpacing: 0,
            wordBreak: 'keep-all',
          }}
        >
          {scene.text}
        </div>
        {scene.proof_overlay ? (
          <div
            style={{
              display: 'inline-flex',
              marginTop: 26,
              padding: '14px 20px',
              background: '#ffd84d',
              color: '#090909',
              fontSize: isLandscape ? 26 : 24,
              fontWeight: 950,
            }}
          >
            {scene.proof_overlay}
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: mediaLeft,
          top: mediaTop,
          width: mediaWidth,
          height: mediaHeight,
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.08)',
        }}
      >
        {scene.asset_url ? (
          <Img
            src={assetSource(scene.asset_url)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom})`,
            }}
          />
        ) : (
          <GeneratedPlaceholder scene={scene} index={index} frame={frame} />
        )}
      </div>
    </AbsoluteFill>
  );
};

const SimpleReelsScene = ({
  scene,
  durationInFrames,
}: {
  scene: ResolvedScene;
  index: number;
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 6, durationInFrames - 6, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const steps = scene.subtitle_steps?.length ? scene.subtitle_steps : splitSubtitle(scene.text);
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const snap = activeEffect(scene, frame, 'snap');
  const shake = activeEffect(scene, frame, 'shake');
  const zoomHit = activeEffect(scene, frame, 'zoom');
  const xMark = activeEffect(scene, frame, 'x-mark');
  const check = activeEffect(scene, frame, 'check');
  const topic = scene.topic || '광고비 새는 이유';
  const imageShake = shake ? Math.sin(frame * 1.6) * 11 : 0;

  return (
    <AbsoluteFill style={{ background: '#fff', opacity, color: COLORS.ink }}>
      <div
        style={{
          position: 'absolute',
          left: 54,
          right: 54,
          top: 88,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: fitTopic(topic),
            lineHeight: 1.08,
            fontWeight: 950,
            letterSpacing: 0,
            wordBreak: 'keep-all',
          }}
        >
          {topic}
        </div>
      </div>

      <SubtitleLine
        cues={scene.subtitle_cues}
        steps={steps}
        frame={frame}
        fps={fps}
        durationInFrames={durationInFrames}
      />

      <div
        style={{
          position: 'absolute',
          left: 68,
          right: 68,
          top: 570,
          height: 720,
          overflow: 'hidden',
          background: '#f4f4f4',
          boxShadow: '0 16px 42px rgba(0,0,0,0.13)',
          transform: `translateX(${imageShake}px) scale(${1 + zoomHit * 0.035})`,
          transformOrigin: 'center center',
        }}
      >
        {scene.asset_url ? (
          <Img
            src={assetSource(scene.asset_url)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom + snap * 0.035})`,
              filter: 'saturate(1.04) contrast(1.03)',
            }}
          />
        ) : (
          <SimpleTextBackdrop scene={scene} frame={frame} />
        )}

        {xMark ? <XMark intensity={xMark} /> : null}
        {check ? <CheckMark intensity={check} /> : null}
      </div>

      {scene.proof_overlay ? (
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 1390,
            padding: '18px 26px',
            background: '#ffd84d',
            color: '#111',
            borderRadius: 0,
            fontSize: 34,
            lineHeight: 1,
            fontWeight: 950,
            transform: `rotate(-1deg) scale(${1 + snap * 0.03})`,
          }}
        >
          {scene.proof_overlay}
        </div>
      ) : null}

    </AbsoluteFill>
  );
};

const SubtitleLine = ({
  cues,
  steps,
  frame,
  fps,
  durationInFrames,
}: {
  cues?: ResolvedScene['subtitle_cues'];
  steps: string[];
  frame: number;
  fps: number;
  durationInFrames: number;
}) => {
  const safeSteps = steps.length > 0 ? steps : [''];
  const safeCues = cues?.length
    ? cues.map((cue) => ({ ...cue, frame: Math.round(cue.at * fps) }))
    : null;
  const pairCount = Math.max(1, Math.ceil(safeSteps.length / 2));
  const pairSlot = Math.max(24, Math.floor(durationInFrames / pairCount));
  const activeIndex = safeCues
    ? Math.max(
        0,
        safeCues.findIndex((cue, index) => {
          const nextPairCue = safeCues[Math.floor(index / 2) * 2 + 2];
          const nextCue = safeCues[index + 1];
          return frame >= cue.frame && (!nextCue || frame < nextCue.frame || (nextPairCue && frame < nextPairCue.frame));
        }),
      )
    : Math.min(safeSteps.length - 1, Math.max(0, Math.floor(frame / Math.max(12, pairSlot / 2))));
  const activePair = Math.floor(activeIndex / 2);
  const pairStartIndex = activePair * 2;
  const pairItems = safeCues
    ? safeCues.slice(pairStartIndex, pairStartIndex + 2)
    : safeSteps.slice(pairStartIndex, pairStartIndex + 2).map((text, index) => ({
        text,
        frame: activePair * pairSlot + index * Math.min(18, Math.floor(pairSlot * 0.38)),
      }));
  const nextPairFrame = safeCues?.[pairStartIndex + 2]?.frame ?? (activePair + 1) * pairSlot;
  const pairExit = Math.max(0, interpolate(frame, [nextPairFrame - 6, nextPairFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return (
    <div
      style={{
        position: 'absolute',
        left: 74,
        right: 74,
        top: 314,
        minHeight: 164,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {pairItems.map((item, index) =>
        frame >= item.frame ? (
          <SubtitleChip
            key={`${item.text}-${item.frame}`}
            text={item.text}
            frame={frame - item.frame}
            opacityScale={pairExit}
            tone={index}
          />
        ) : null,
      )}
    </div>
  );
};

const SubtitleChip = ({
  text,
  frame,
  opacityScale = 1,
  tone = 0,
}: {
  text: string;
  frame: number;
  opacityScale?: number;
  tone?: number;
}) => {
  const start = 0;
  const progress = spring({
    fps: 30,
    frame: frame - start,
    config: { damping: 88, stiffness: 182 },
  });
  const opacity = interpolate(frame, [start - 2, start + 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hit = interpolate(frame, [0, 3, 14], [1.08, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isAccent = tone % 2 === 1;

  return (
    <div
      style={{
        opacity: opacity * opacityScale,
        transform: `translateY(${(1 - progress) * 18}px) scale(${(0.88 + progress * 0.12) * hit})`,
        background: isAccent ? '#ffd84d' : '#050505',
        color: isAccent ? '#050505' : '#fff',
        padding: '14px 24px',
        borderRadius: 0,
        fontSize: fitSubtitle(text),
        lineHeight: 1.08,
        fontWeight: 950,
        letterSpacing: 0,
        whiteSpace: 'pre-wrap',
        boxShadow: `0 ${isAccent ? 8 : 10}px ${isAccent ? 0 : 22}px ${
          isAccent ? 'rgba(5,5,5,0.82)' : 'rgba(5,5,5,0.18)'
        }`,
      }}
    >
      {text}
    </div>
  );
};

const XMark = ({ intensity }: { intensity: number }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: intensity,
        transform: `scale(${0.86 + intensity * 0.14})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '48%',
          height: 30,
          background: '#ff1717',
          transform: 'rotate(43deg)',
          borderRadius: 999,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '48%',
          height: 30,
          background: '#ff1717',
          transform: 'rotate(-43deg)',
          borderRadius: 999,
        }}
      />
    </div>
  );
};

const CheckMark = ({ intensity }: { intensity: number }) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 54,
        bottom: 46,
        width: 174,
        height: 174,
        borderRadius: 999,
        background: '#0fbd5e',
        opacity: intensity,
        transform: `scale(${0.75 + intensity * 0.25})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 78,
          width: 38,
          height: 18,
          background: '#fff',
          transform: 'rotate(45deg)',
          borderRadius: 8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 68,
          width: 78,
          height: 18,
          background: '#fff',
          transform: 'rotate(-45deg)',
          borderRadius: 8,
        }}
      />
    </div>
  );
};

const activeEffect = (scene: ResolvedScene, frame: number, type: NonNullable<ResolvedScene['effects']>[number]['type']) => {
  const effects = scene.effects?.filter((item) => item.type === type) ?? [];
  if (!effects.length) return 0;

  return Math.max(
    ...effects.map((effect) => {
      const start = Math.round(effect.at * 30);
      return interpolate(frame, [start, start + 4, start + 18], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }),
  );
};

const SimpleTextBackdrop = ({ scene, frame }: { scene: ResolvedScene; frame: number }) => {
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.84, 1]);

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, #101820 0%, #1f2937 45%, #2f3a4a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <div
        style={{
          width: 620,
          height: 620,
          borderRadius: 32,
          background: `rgba(255,255,255,${0.09 * pulse})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          fontWeight: 950,
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {scene.proof_overlay || '진단'}
      </div>
    </AbsoluteFill>
  );
};

const ArticlePhone = ({ title }: { title: string }) => {
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          inset: '0 132px',
          background: COLORS.paper,
          boxShadow: '0 0 90px rgba(255,255,255,0.16)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 132,
          right: 132,
          top: 0,
          height: 142,
          background: COLORS.navy,
          color: '#fff',
          display: 'grid',
          gridTemplateColumns: '132px 1fr 132px',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 400 }}>☰</div>
        <div style={{ fontSize: 44, fontWeight: 950, letterSpacing: 0 }}>찐썰리뷰</div>
        <div style={{ fontSize: 60, fontWeight: 300 }}>⌕</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 178,
          right: 178,
          top: 178,
          color: COLORS.ink,
        }}
      >
        <div style={{ fontSize: 47, lineHeight: 1.15, fontWeight: 950, letterSpacing: 0 }}>
          {headlineForTitle(title)}
        </div>
        <div style={{ marginTop: 24, fontSize: 25, color: COLORS.muted, fontWeight: 850 }}>
          조회수 34413&nbsp;&nbsp; 추천 1254
        </div>
        <div style={{ marginTop: 28, height: 3, background: COLORS.line }} />
      </div>
    </AbsoluteFill>
  );
};

const ArticleScene = ({
  scene,
  index,
  durationInFrames,
}: {
  scene: ResolvedScene;
  index: number;
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  const entry = spring({
    fps: 30,
    frame,
    config: { damping: 130, stiffness: 95 },
  });
  const opacity = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const punchScale = interpolate(frame, [0, 10, 18], [0.95, 1.035, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drift = interpolate(frame, [0, durationInFrames], [0, -24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          left: 178,
          right: 178,
          top: 330,
          transform: `translateY(${(1 - entry) * 38 + drift}px) scale(${punchScale})`,
          transformOrigin: 'center top',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: COLORS.ink,
            fontSize: fitCaption(scene.text),
            lineHeight: 1.16,
            fontWeight: 950,
            letterSpacing: 0,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {scene.text}
        </div>

        <VisualBlock scene={scene} index={index} frame={frame} />

        <div
          style={{
            marginTop: 42,
            borderTop: `4px solid ${COLORS.ink}`,
            borderBottom: `4px solid ${COLORS.ink}`,
            padding: '25px 0',
            textAlign: 'center',
            color: COLORS.ink,
            fontSize: 40,
            lineHeight: 1.24,
            fontWeight: 950,
            letterSpacing: 0,
            wordBreak: 'keep-all',
          }}
        >
          {captionStrip(scene, index)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const VisualBlock = ({
  scene,
  index,
  frame,
}: {
  scene: ResolvedScene;
  index: number;
  frame: number;
}) => {
  const zoom = interpolate(frame, [0, 90], [1.03, 1.13], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });
  const shake = isMemeShot(scene.shot_type)
    ? Math.sin(frame * 0.9) * interpolate(frame, [0, 8, 30], [0, 7, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <div
      style={{
        marginTop: 46,
        height: 430,
        overflow: 'hidden',
        background: COLORS.soft,
        border: `1px solid ${COLORS.line}`,
        transform: `translateX(${shake}px)`,
      }}
    >
      {scene.asset_url ? (
        <Img
          src={assetSource(scene.asset_url)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${zoom})`,
          }}
        />
      ) : (
        <GeneratedPlaceholder scene={scene} index={index} frame={frame} />
      )}
    </div>
  );
};

const GeneratedPlaceholder = ({
  scene,
  index,
  frame,
}: {
  scene: ResolvedScene;
  index: number;
  frame: number;
}) => {
  if (scene.shot_type === 'workflow') {
    return <PipelineGraphic frame={frame} />;
  }

  if (scene.shot_type === 'cta') {
    return <CtaGraphic frame={frame} />;
  }

  return <ReviewMemeGraphic scene={scene} index={index} frame={frame} />;
};

const ReviewMemeGraphic = ({
  scene,
  index,
  frame,
}: {
  scene: ResolvedScene;
  index: number;
  frame: number;
}) => {
  const flash = interpolate(Math.sin(frame / 5), [-1, 1], [0.1, 0.26]);

  return (
    <div
      style={{
        height: '100%',
        padding: 42,
        background: `linear-gradient(135deg, rgba(62,71,123,${flash}), rgba(223,90,45,0.15)), #d8ddd9`,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '14px 22px',
          background: index % 2 === 0 ? COLORS.orange : COLORS.navy,
          color: '#fff',
          borderRadius: 4,
          fontSize: 26,
          fontWeight: 950,
        }}
      >
        {scene.proof_overlay || 'CHECK'}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          marginTop: 54,
        }}
      >
        {metricLabels(scene.shot_type).map((item, itemIndex) => (
          <div
            key={item}
            style={{
              minHeight: 76,
              padding: 20,
              background: '#fff',
              color: COLORS.ink,
              border: `2px solid ${itemIndex === 1 ? COLORS.orange : '#e1e1e1'}`,
              fontSize: 24,
              fontWeight: 950,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const PipelineGraphic = ({ frame }: { frame: number }) => {
  const progress = interpolate(frame, [0, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labels = ['Pixel', 'CAPI', 'GTM', 'GA4'];

  return (
    <div style={{ height: '100%', padding: 48, background: '#111923', color: '#fff' }}>
      <div style={{ fontSize: 30, fontWeight: 950, color: '#fff', marginBottom: 54 }}>
        전환 데이터 연결 점검
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {labels.map((label, index) => {
          const active = progress > index * 0.22;
          return (
            <div
              key={label}
              style={{
                minHeight: 170,
                padding: 22,
                border: `3px solid ${active ? COLORS.orange : '#384352'}`,
                background: active ? 'rgba(223,90,45,0.16)' : '#182232',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: active ? COLORS.orange : '#7f8998', fontSize: 24, fontWeight: 950 }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong style={{ fontSize: 30, letterSpacing: 0 }}>{label}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CtaGraphic = ({ frame }: { frame: number }) => {
  const pulse = interpolate(Math.sin(frame / 5), [-1, 1], [0.97, 1.04]);

  return (
    <div
      style={{
        height: '100%',
        padding: 50,
        background: '#111923',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ color: COLORS.orange, fontSize: 32, fontWeight: 950 }}>HI-OB 무료 진단</div>
      <div style={{ marginTop: 18, fontSize: 58, lineHeight: 1.1, fontWeight: 950, letterSpacing: 0 }}>
        광고비 더 쓰기 전에
        <br />
        데이터부터 점검
      </div>
      <div
        style={{
          marginTop: 34,
          width: 300,
          height: 72,
          background: COLORS.orange,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          fontWeight: 950,
          transform: `scale(${pulse})`,
        }}
      >
        hi-ob.com
      </div>
    </div>
  );
};

const ProgressRail = ({
  scenes,
}: {
  scenes: Array<{ from: number; durationInFrames: number }>;
}) => {
  const frame = useCurrentFrame();
  const totalFrames = scenes.reduce((total, scene) => total + scene.durationInFrames, 0);
  const width = totalFrames > 0 ? Math.min(100, (frame / totalFrames) * 100) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        background: 'rgba(255,255,255,0.22)',
      }}
    >
      <div style={{ width: `${width}%`, height: '100%', background: '#326df0' }} />
    </div>
  );
};

const headlineForTitle = (title: string) => {
  if (title.includes('광고비')) return '전환 원인 99%가 여기 막혀서임';
  return `${cleanTitle(title)} 진짜 원인 공개`;
};

const captionStrip = (scene: ResolvedScene, index: number) => {
  if (index === 0) return '일단 광고 탓하기 전에';
  if (scene.shot_type === 'workflow') return '연결 상태부터 보세요.';
  if (scene.shot_type === 'cta') return '무료 진단 받아보세요.';
  if (scene.shot_type === 'proof') return '이러면 돈이 샙니다.';
  return '그냥 기분 탓 아닙니다.';
};

const metricLabels = (shotType: ShotType) => {
  if (shotType === 'dashboard') return ['Spend ₩842,000', 'Lead 0', 'GA4 13', 'Meta 2'];
  if (shotType === 'phone') return ['Click 있음', 'Purchase 없음', 'Cookie 차단', 'Event 누락'];
  if (shotType === 'proof') return ['기록 없음', '돈 샘', '헛돈', '손실'];
  return ['Pixel', 'CAPI', 'GTM', 'GA4'];
};

const assetSource = (assetUrl: string) => {
  if (assetUrl.startsWith('http')) return assetUrl;
  return staticFile(assetUrl);
};

const isMemeShot = (shotType: ShotType) => shotType === 'proof' || shotType === 'phone';

const cleanTitle = (title: string) => title.replace(/[^\w\s가-힣.-]/g, '').slice(0, 18);

const fitCaption = (text: string) => {
  if (text.length > 24) return 50;
  if (text.length > 17) return 58;
  return 66;
};

const fitTopic = (text: string) => {
  if (text.length > 18) return 72;
  if (text.length > 11) return 84;
  return 98;
};

const fitSubtitle = (text: string) => {
  if (text.length > 12) return 42;
  if (text.length > 8) return 48;
  return 56;
};

const fitWideText = (text: string) => {
  if (text.length > 34) return 42;
  if (text.length > 22) return 50;
  return 60;
};

const fitSquareText = (text: string) => {
  if (text.length > 26) return 42;
  if (text.length > 17) return 50;
  return 58;
};

const splitSubtitle = (text: string) =>
  text
    .split(/\n|,|\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
