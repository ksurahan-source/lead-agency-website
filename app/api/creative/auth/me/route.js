import { NextResponse } from 'next/server';

import { STUDIO_COOKIE_NAME, getStudioSession, hasStudioAuthConfig } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(request) {
  const session = await getStudioSession(request.cookies.get(STUDIO_COOKIE_NAME)?.value);

  return NextResponse.json({
    authenticated: Boolean(session),
    configured: hasStudioAuthConfig(),
    user: session ? { email: session.email } : null,
  });
}
