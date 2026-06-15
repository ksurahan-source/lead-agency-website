'use client';

import { ArrowRight } from 'lucide-react';
import { trackCta } from './track';

// Fixed, scroll-following 문의하기 button → jumps to the lead form (#contact).
export default function FloatCta() {
  return (
    <a
      className="hp-float-cta"
      href="#contact"
      onClick={() => trackCta('float', '문의하기')}
      aria-label="문의하기 — 신청 폼으로 이동"
    >
      문의하기
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}
