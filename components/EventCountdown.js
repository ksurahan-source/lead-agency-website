'use client';

import { useEffect, useState } from 'react';

const SLOT_MS = 72 * 60 * 60 * 1000;
const SLOT_ANCHOR_UTC = Date.UTC(2026, 5, 1, 0, 0, 0);

const getRemaining = () => {
  const now = Date.now();
  const elapsed = ((now - SLOT_ANCHOR_UTC) % SLOT_MS + SLOT_MS) % SLOT_MS;
  return SLOT_MS - elapsed;
};

const pad = (value, length = 2) => String(value).padStart(length, '0');

export default function EventCountdown({ variant = 'card' }) {
  const [remaining, setRemaining] = useState(SLOT_MS);

  useEffect(() => {
    const timeout = window.setTimeout(() => setRemaining(getRemaining()), 0);
    const interval = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  return (
    <div className={`hp-countdown ${variant}`} aria-label="이번 3일 신청 슬롯 마감까지 남은 시간">
      <div className="hp-countdown-copy">
        <span>이번 3일 신청 슬롯</span>
        <strong>곧 마감됩니다</strong>
      </div>
      <div className="hp-countdown-clock" aria-live="polite">
        <span><b>{days}</b><i>일</i></span>
        <span><b>{pad(hours)}</b><i>시간</i></span>
        <span><b>{pad(minutes)}</b><i>분</i></span>
        <span><b>{pad(seconds)}</b><i>초</i></span>
      </div>
      <p>마감 후 다음 슬롯으로 다시 열립니다.</p>
    </div>
  );
}
