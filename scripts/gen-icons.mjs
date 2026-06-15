// Generates raster app icons from the hiob wordmark using sharp.
// Run: node scripts/gen-icons.mjs
// favicon.svg (transparent, dark-mode aware) is authored by hand in public/.
// iOS/PWA icons need an opaque background (transparent → black tile hides the
// dark wordmark), so those use the brand cream #F7F8FA.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const INK = '#15171F';
const CREAM = '#F7F8FA';

const wordmark = `
  <g transform="translate(46,176.5) scale(1.448)">
    <g fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="butt" stroke-linejoin="round">
      <path d="M30 10V100"/>
      <path d="M30 65a22 22 0 0 1 44 0V100"/>
      <path d="M105 43V100"/>
      <circle cx="158" cy="71.5" r="22"/>
      <path d="M211 10V100"/>
      <circle cx="233" cy="71.5" r="22"/>
    </g>
    <circle cx="105" cy="24" r="7" fill="${INK}"/>
  </g>`;

const square = (bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${
    bg ? `<rect width="512" height="512" fill="${bg}"/>` : ''
  }${wordmark}</svg>`;

const png = (svg, size, name) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(pub, name));

await Promise.all([
  png(square(CREAM), 180, 'apple-icon.png'),
  png(square(CREAM), 192, 'icon-192.png'),
  png(square(CREAM), 512, 'icon-512.png'),
  png(square(null), 32, 'favicon-32.png'),
]);

console.log('Generated: apple-icon.png, icon-192.png, icon-512.png, favicon-32.png');
