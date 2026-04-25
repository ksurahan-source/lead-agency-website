import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';

export const metadata = {
  title: 'Premium Agency | Transform Your Business',
  description: 'We help visionary companies scale with cutting-edge design and technology.',
};

export default function RootLayout({ children }) {
  // Replace with your actual GTM Container ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P74PV945';

  return (
    <html lang="en">
      <GoogleTagManager gtmId={gtmId} />
      <body>
        {children}
      </body>
    </html>
  );
}
