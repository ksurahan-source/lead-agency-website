import { NextResponse } from 'next/server';

import { readCreativeRunDetail } from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(request, { params }) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const routeParams = await params;
  const runId = typeof routeParams?.runId === 'string' ? routeParams.runId.trim() : '';
  if (!runId) {
    return NextResponse.json({ error: 'RUN_ID_REQUIRED' }, { status: 400 });
  }

  try {
    const detail = await readCreativeRunDetail(runId);
    if (!detail) {
      return NextResponse.json({ error: 'RUN_NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      run: detail.run,
      scriptArtifactKey: detail.scriptArtifactKey,
      renderJob: detail.renderJob,
    });
  } catch (error) {
    console.error('[creative/runs/:runId]', error);

    return NextResponse.json({
      success: false,
      error: 'RUN_DETAIL_UNAVAILABLE',
      message: 'Unable to read creative run detail.',
    }, { status: 500 });
  }
}
