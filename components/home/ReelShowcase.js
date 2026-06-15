'use client';

import { useEffect, useRef } from 'react';
import { trackReel } from './track';

// Honest proof: these are ads hi-ob produces. Reels autoplay (muted) only
// while in view to save bandwidth, and emit a single reel_play per reel.
export default function ReelShowcase({ reels }) {
  const videoRefs = useRef([]);
  const played = useRef(new Set());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play?.().catch(() => {});
          } else {
            video.pause?.();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hp-reels">
      {reels.map((reel, index) => (
        <article className="hp-reel" key={reel.src}>
          <div className="hp-reel-media">
            <span className="hp-reel-tag">{reel.tag}</span>
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={reel.src}
              poster={reel.poster}
              muted
              loop
              playsInline
              preload="none"
              onPlay={() => {
                if (!played.current.has(reel.src)) {
                  played.current.add(reel.src);
                  trackReel(reel.title);
                }
              }}
            />
          </div>
          <div className="hp-reel-body">
            <h3>{reel.title}</h3>
            <p>{reel.caption}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
