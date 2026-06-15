'use client';

import { ArrowRight } from 'lucide-react';
import { trackCta } from './track';

const VARIANTS = {
  accent: 'hp-btn is-accent',
  ink: 'hp-btn',
  ghost: 'hp-btn is-ghost',
  ondark: 'hp-btn is-ondark',
};

export default function CtaButton({
  href = '#contact',
  location = 'unknown',
  variant = 'accent',
  children,
}) {
  const label = typeof children === 'string' ? children : location;
  return (
    <a
      className={VARIANTS[variant] || VARIANTS.accent}
      href={href}
      onClick={() => trackCta(location, label)}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}
