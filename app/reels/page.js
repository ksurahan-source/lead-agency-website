import ReelsLanding from './ReelsLanding';

const title = '폰 하나로 우리 가게 바이럴 릴스 | 히옵 AI 영상 제작';
const description =
  '촬영도 모델도 없이 폰 하나로 시작하세요. 히옵 AI가 단 10분 만에 우리 가게 맞춤형 바이럴 릴스를 제작해 드립니다. 지금 단돈 5만 원 프로모션.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/reels' },
  openGraph: {
    title,
    description,
    url: 'https://hi-ob.com/reels',
    siteName: 'hi-ob',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ReelsPage() {
  return <ReelsLanding />;
}
