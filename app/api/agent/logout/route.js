import { NextResponse } from 'next/server';
import { AGENT_COOKIE_NAME } from '@/lib/agentAuth';

export const runtime = 'edge';

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/agent', request.url), { status: 303 });
  response.cookies.delete(AGENT_COOKIE_NAME);

  return response;
}
