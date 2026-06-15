import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { fetchMetaLeads, buildLeadRow, upsertLead } from '@/lib/metaLeadSync';

export const runtime = 'edge';

const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
};

/**
 * GET /api/cron/pull-meta-leads
 * Query params:
 *   - key: Must match env.CRON_SECRET (required)
 *   - dry: '1' to fetch but not insert
 *   - days: Number of days to look back (default 7, min 1, max 90)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const env = getEnv();

    // Verify CRON_SECRET
    if (!env.CRON_SECRET) {
      console.error('[Cron] CRON_SECRET not configured');
      return NextResponse.json(
        { error: 'CRON_SECRET not configured' },
        { status: 500 }
      );
    }

    if (!key || key !== env.CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const DB = env.DB;
    if (!DB) {
      return NextResponse.json(
        { error: 'DB not configured' },
        { status: 500 }
      );
    }

    // Parse options
    const dryRun = searchParams.get('dry') === '1';
    const daysParam = parseInt(searchParams.get('days') || '7', 10);
    const days = Math.max(1, Math.min(90, daysParam));

    // Token selection with warning flag
    const accessToken = env.META_LEADS_TOKEN || env.META_ACCESS_TOKEN;
    const hasTokenWarning = !env.META_LEADS_TOKEN && env.META_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No Meta access token configured' },
        { status: 500 }
      );
    }

    // Form IDs
    const formIdsStr = env.META_LEAD_FORM_IDS || '867521075797089';
    const formIds = formIdsStr.split(',').map(id => id.trim()).filter(Boolean);

    if (formIds.length === 0) {
      return NextResponse.json(
        { error: 'No Meta form IDs configured' },
        { status: 500 }
      );
    }

    // Calculate sinceUnix (days ago)
    const sinceUnix = Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000);

    const stats = {
      forms: [],
      errors: [],
      dry: dryRun,
      ...(hasTokenWarning && { warning: 'Using META_ACCESS_TOKEN; prefer META_LEADS_TOKEN' }),
    };

    // Process each form
    for (const formId of formIds) {
      const formStats = {
        form_id: formId,
        scanned: 0,
        inserted: 0,
        skipped: 0,
      };

      let after = null;
      let pageCount = 0;
      const maxPages = 10;

      while (pageCount < maxPages) {
        const { leads, after: nextAfter, error } = await fetchMetaLeads(
          formId,
          accessToken,
          { sinceUnix, after, limit: 100 }
        );

        if (error) {
          stats.errors.push({ form_id: formId, page: pageCount, error });
          break;
        }

        if (leads.length === 0) {
          break;
        }

        formStats.scanned += leads.length;

        if (!dryRun) {
          for (const metaLead of leads) {
            const row = buildLeadRow(metaLead);
            const { action } = await upsertLead(DB, row);
            if (action === 'inserted') {
              formStats.inserted += 1;
            } else if (action === 'skipped') {
              formStats.skipped += 1;
            }
          }
        }

        after = nextAfter;
        pageCount += 1;

        if (!after) {
          break;
        }
      }

      stats.forms.push(formStats);
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('[Cron Error]', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
