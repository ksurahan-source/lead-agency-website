import type { ComponentType } from 'react';
import { Composition } from 'remotion';

import type { AspectRatio } from '@/lib/types';
import { ShortsComposition } from './ShortsComposition';

function getDurationInFrames(props: {
  script?: { scenes?: Array<{ duration?: number }> };
  targetDurationSeconds?: number;
}) {
  const scriptSeconds =
    props.script?.scenes?.reduce((total, scene) => total + (scene.duration ?? 3), 0) ?? 15;
  const seconds = Math.max(scriptSeconds, props.targetDurationSeconds ?? 0);

  return Math.max(Math.round(seconds * 30), 150);
}

export const RemotionRoot = () => {
  return (
    <Composition
      id="ShortsComposition"
      component={ShortsComposition as unknown as ComponentType<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={450}
      defaultProps={{
        script: {
          title: 'Sample Short',
          hook: 'Your first three seconds matter.',
          full_script: 'This is a sample short script.',
          scenes: [
            {
              text: 'Hook scene',
              voiceover: 'This is the hook',
              visual_search: 'laptop analytics dashboard close up no face vertical',
              duration: 3,
              shot_type: 'dashboard',
              asset_url: '',
            },
          ],
        },
        backgroundUrl: '',
        voiceoverAsset: undefined,
        backgroundMusicAsset: undefined,
        targetDurationSeconds: 15,
        aspectRatio: '9:16',
      }}
      calculateMetadata={({ props }) => {
        const typedProps = props as {
          script?: { scenes?: Array<{ duration?: number }> };
          targetDurationSeconds?: number;
          aspectRatio?: AspectRatio;
        };
        const dimensions = dimensionsForAspectRatio(typedProps.aspectRatio ?? '9:16');
        return {
          width: dimensions.width,
          height: dimensions.height,
          durationInFrames: getDurationInFrames(typedProps),
        };
      }}
    />
  );
};

function dimensionsForAspectRatio(aspectRatio: AspectRatio) {
  if (aspectRatio === '16:9') return { width: 1920, height: 1080 };
  if (aspectRatio === '1:1') return { width: 1080, height: 1080 };
  return { width: 1080, height: 1920 };
}
