import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
};

export async function GET(request) {
  try {
    const env = getEnv();
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('pw');
    const adminPassword = (env.ADMIN_PASSWORD || 'hiop2025').trim();

    if (password !== adminPassword) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const DB = env.DB;

    if (!DB) {
      return NextResponse.json({ message: 'Database not found' }, { status: 500 });
    }

    const { results } = await DB.prepare(`
      SELECT * FROM leads ORDER BY created_at DESC
    `).all();

    return NextResponse.json(results);
  } catch (error) {
    console.error('[Admin API Error]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
