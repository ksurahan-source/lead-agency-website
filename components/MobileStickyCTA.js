'use client';

import { ArrowRight } from 'lucide-react';

/**
 * Mobile-only fixed bottom conversion bar. Hidden on desktop via CSS
 * (.mobile-sticky-cta is display:none until <=768px). Renders a spacer so
 * the page footer is never hidden behind the fixed bar.
 *
 * @param {{ label?: string, href?: string }} props
 */
export default function MobileStickyCTA({
  label = '상담 신청하기',
  href = 'https://open.kakao.com/o/srdaF2si',
}) {
  const isExternal = href.startsWith('http');

  return (
    <>
      <div className="mobile-sticky-spacer" aria-hidden="true" />
      <div className="mobile-sticky-cta">
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label} <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
