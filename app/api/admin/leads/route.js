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
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('pw');

    // 간단한 비밀번호 검증 (보안을 위해 실제 운영시에는 더 강력한 방법을 권장합니다)
    if (password !== '1234') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const env = getEnv();
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
