/**
 * hiob wordmark. Geometric monoline, drawn with strokes so it stays crisp at
 * any size. Inherits color from its parent via currentColor — ink on light
 * navs, cream on dark navs — so the same component works everywhere.
 *
 * @param {{ height?: number | string, className?: string, title?: string }} props
 */
export default function Logo({ height = 28, className, title = 'hiob' }) {
  return (
    <svg
      viewBox="0 0 290 110"
      role="img"
      aria-label={title}
      className={className}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: 'auto',
        display: 'block',
      }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="butt" strokeLinejoin="round">
        <path d="M30 10V100" />
        <path d="M30 65a22 22 0 0 1 44 0V100" />
        <path d="M105 43V100" />
        <circle cx="158" cy="71.5" r="22" />
        <path d="M211 10V100" />
        <circle cx="233" cy="71.5" r="22" />
      </g>
      <circle cx="105" cy="24" r="7" fill="currentColor" />
    </svg>
  );
}
