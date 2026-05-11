export default function LogoKr({ height = '2.4rem' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 620 180"
      style={{ height, width: 'auto', display: 'block' }}
      aria-label="히옵"
      role="img"
    >
      <defs>
        <filter id="kr-sh1" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.65"/>
        </filter>
        <filter id="kr-sh2" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.55"/>
        </filter>
        <filter id="kr-sh3" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.45"/>
        </filter>
        <filter id="kr-sh4" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.45"/>
        </filter>
        <radialGradient id="kr-gO" cx="50%" cy="22%" r="62%">
          <stop offset="0%" stopColor="#FF7040"/>
          <stop offset="100%" stopColor="#CC3000"/>
        </radialGradient>
        <radialGradient id="kr-gC" cx="50%" cy="22%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#D8D4CE"/>
        </radialGradient>
        <radialGradient id="kr-gK" cx="50%" cy="18%" r="62%">
          <stop offset="0%" stopColor="#FF6030"/>
          <stop offset="100%" stopColor="#BB2800"/>
        </radialGradient>
        <radialGradient id="kr-gOB" cx="38%" cy="18%" r="72%">
          <stop offset="0%" stopColor="#FF6030"/>
          <stop offset="100%" stopColor="#C42B00"/>
        </radialGradient>
        <radialGradient id="kr-gWH" cx="38%" cy="18%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#CCCCCC"/>
        </radialGradient>
        <mask id="kr-mTt">
          <ellipse cx="0" cy="-52" rx="108" ry="28" fill="white"/>
          <ellipse cx="0" cy="-48" rx="78" ry="20" fill="black"/>
        </mask>
        <mask id="kr-mTs">
          <ellipse cx="0" cy="-44" rx="108" ry="28" fill="white"/>
          <ellipse cx="0" cy="-40" rx="78" ry="20" fill="black"/>
        </mask>
        <mask id="kr-mSt">
          <ellipse cx="0" cy="-22" rx="78" ry="32" fill="white"/>
          <ellipse cx="0" cy="-16" rx="50" ry="22" fill="black"/>
        </mask>
        <mask id="kr-mSs">
          <ellipse cx="0" cy="-12" rx="78" ry="32" fill="white"/>
          <ellipse cx="0" cy="-6" rx="50" ry="22" fill="black"/>
        </mask>
        <mask id="kr-mMt">
          <ellipse cx="0" cy="14" rx="50" ry="36" fill="white"/>
          <ellipse cx="0" cy="20" rx="28" ry="22" fill="black"/>
        </mask>
        <mask id="kr-mMs">
          <ellipse cx="0" cy="26" rx="50" ry="36" fill="white"/>
          <ellipse cx="0" cy="32" rx="28" ry="22" fill="black"/>
        </mask>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@900&display=swap');`}</style>
      </defs>

      {/* 심볼 */}
      <g transform="translate(78,90) scale(0.667)">
        <ellipse cx="0" cy="-44" rx="108" ry="28" fill="#7A2000" filter="url(#kr-sh1)" mask="url(#kr-mTs)"/>
        <ellipse cx="0" cy="-52" rx="108" ry="28" fill="url(#kr-gO)" mask="url(#kr-mTt)"/>
        <ellipse cx="0" cy="-12" rx="78" ry="32" fill="#5A1800" filter="url(#kr-sh2)" mask="url(#kr-mSs)"/>
        <ellipse cx="0" cy="-22" rx="78" ry="32" fill="url(#kr-gO)" mask="url(#kr-mSt)"/>
        <ellipse cx="0" cy="26" rx="50" ry="36" fill="#9A9690" filter="url(#kr-sh3)" mask="url(#kr-mMs)"/>
        <ellipse cx="0" cy="14" rx="50" ry="36" fill="url(#kr-gC)" mask="url(#kr-mMt)"/>
        <ellipse cx="0" cy="58" rx="28" ry="22" fill="#882000" filter="url(#kr-sh4)"/>
        <ellipse cx="0" cy="46" rx="28" ry="22" fill="url(#kr-gK)"/>
        <ellipse cx="-4" cy="41" rx="12" ry="6" fill="#FF9070" opacity="0.4"/>
      </g>

      {/* 구분선 */}
      <line x1="166" y1="20" x2="166" y2="160" stroke="#DDDDDD" strokeWidth="0.6"/>

      {/* 워드마크 */}
      <text x="186" y="116"
        fontFamily="'Noto Sans KR','Apple SD Gothic Neo',sans-serif"
        fontSize="92" fontWeight="900" letterSpacing="-4">
        <tspan fill="#0D0D0D">히</tspan>
        <tspan fill="url(#kr-gOB)">옵</tspan>
      </text>

      {/* 서브 */}
      <text x="188" y="140"
        fontFamily="'Helvetica Neue',Helvetica,Arial,sans-serif"
        fontSize="11" letterSpacing="2" fill="#AAAAAA">hi-ob</text>
      <rect x="188" y="150" width="414" height="0.5" fill="#DDDDDD"/>
      <text x="188" y="164"
        fontFamily="'Helvetica Neue',Helvetica,Arial,sans-serif"
        fontSize="9" letterSpacing="4" fill="#CCCCCC">PERFORMANCE MARKETING</text>
    </svg>
  );
}
