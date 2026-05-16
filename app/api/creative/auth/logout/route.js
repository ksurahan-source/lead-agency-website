import { NextResponse } from 'next/server';

import { STUDIO_COOKIE_NAME } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(request) {
  const response = NextResponse.redirect(new URL('/studio/login', request.url), { status: 303 });
  response.cookies.delete(STUDIO_COOKIE_NAME);

  return response;
}

export async function POST(request) {
  return GET(request);
}
