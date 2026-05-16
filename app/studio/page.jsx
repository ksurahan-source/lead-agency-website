import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { STUDIO_COOKIE_NAME, verifyStudioSessionToken } from '@/lib/studioAuth';
import CreativeStudioClient from './CreativeStudioClient';

export const runtime = 'edge';

export const metadata = {
  title: 'HI-OP Creative Studio',
  description: '쇼츠 제작 모듈이 lead-agency-website에 연결되었습니다.',
};

export default async function StudioPage() {
  const cookieStore = await cookies();
  const isAuthenticated = await verifyStudioSessionToken(cookieStore.get(STUDIO_COOKIE_NAME)?.value);

  if (!isAuthenticated) {
    redirect('/studio/login');
  }

  return <CreativeStudioClient />;
}
