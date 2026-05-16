import { NextResponse } from 'next/server';

import { readDailyUsage } from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(req) {
  try {
    if (!(await isStudioRequestAuthenticated(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date') || undefined;

    return NextResponse.json(await readDailyUsage(date));
  } catch (error) {
    console.error('[creative/usage/daily]', error);

    return NextResponse.json({
      date: new Date().toISOString().slice(0, 10),
      currency: 'USD',
      totals: {
        requests: 0,
        cacheHits: 0,
        blocked: 0,
        failed: 0,
        estimatedCostUsd: 0,
        actualCostUsd: 0,
        failedCostUsd: 0,
        ttsChars: 0,
        imageGenerations: 0,
        renders: 0,
        finalVideos: 0,
        averageCostPerFinalVideoUsd: 0,
      },
      byProvider: {},
      byRun: {},
      byAsset: {},
      events: [],
      error: 'usage_unavailable',
    });
  }
}
