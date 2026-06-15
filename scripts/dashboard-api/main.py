"""hi-ob admin dashboard backend — BQ-backed analytics endpoints.

Runs as a Cloud Function Gen2. Uses ADC (the function's runtime SA must have
BQ read access on the data project). Cloudflare Pages calls these with a
shared bearer token via /api/dashboard/*.

Routes (HTTP path):
- /overview     → KPI cards: total leads, leads_today, leads_7d, events_7d
- /timeseries   → 7-day daily series: leads (D1-side count via header) + events
- /sources      → source breakdown (top 20)
"""

from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone

import functions_framework
from google.cloud import bigquery

PROJECT_ID = os.environ.get("PROJECT_ID", "rising-goal-498613-a1")
DATASET = os.environ.get("DATASET", "hiob_analytics")
TABLE = os.environ.get("TABLE", "events_raw")
EXPECTED_TOKEN = os.environ.get("DASHBOARD_API_TOKEN", "")

EVENTS_FQN = f"`{PROJECT_ID}.{DATASET}.{TABLE}`"

_bq_client: bigquery.Client | None = None


def _bq() -> bigquery.Client:
    global _bq_client
    if _bq_client is None:
        _bq_client = bigquery.Client(project=PROJECT_ID)
    return _bq_client


def _authorized(request) -> bool:
    if not EXPECTED_TOKEN:
        return False
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return False
    return header[len("Bearer "):] == EXPECTED_TOKEN


def _json(body, status=200):
    return (
        json.dumps(body, ensure_ascii=False, default=str),
        status,
        {"Content-Type": "application/json; charset=utf-8"},
    )


# ───── queries ─────

def _q_overview() -> dict:
    sql = f"""
    WITH today AS (
      SELECT COUNT(*) AS c
      FROM {EVENTS_FQN}
      WHERE DATE(event_timestamp, 'Asia/Seoul') = CURRENT_DATE('Asia/Seoul')
    ),
    week AS (
      SELECT COUNT(*) AS c
      FROM {EVENTS_FQN}
      WHERE DATE(event_timestamp, 'Asia/Seoul')
            >= DATE_SUB(CURRENT_DATE('Asia/Seoul'), INTERVAL 7 DAY)
    ),
    total AS (
      SELECT COUNT(*) AS c FROM {EVENTS_FQN}
    ),
    last_event AS (
      SELECT MAX(event_timestamp) AS ts FROM {EVENTS_FQN}
    )
    SELECT
      (SELECT c FROM today)  AS events_today,
      (SELECT c FROM week)   AS events_7d,
      (SELECT c FROM total)  AS events_total,
      (SELECT ts FROM last_event) AS last_event_at
    """
    row = next(iter(_bq().query(sql).result()))
    return {
        "events_today": int(row["events_today"] or 0),
        "events_7d": int(row["events_7d"] or 0),
        "events_total": int(row["events_total"] or 0),
        "last_event_at": row["last_event_at"].isoformat() if row["last_event_at"] else None,
    }


def _q_timeseries() -> list[dict]:
    sql = f"""
    WITH days AS (
      SELECT day
      FROM UNNEST(GENERATE_DATE_ARRAY(
        DATE_SUB(CURRENT_DATE('Asia/Seoul'), INTERVAL 13 DAY),
        CURRENT_DATE('Asia/Seoul')
      )) AS day
    ),
    counted AS (
      SELECT DATE(event_timestamp, 'Asia/Seoul') AS day, COUNT(*) AS c
      FROM {EVENTS_FQN}
      WHERE event_timestamp >=
        TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 14 DAY)
      GROUP BY day
    )
    SELECT
      FORMAT_DATE('%Y-%m-%d', days.day) AS day,
      IFNULL(counted.c, 0) AS events
    FROM days LEFT JOIN counted USING (day)
    ORDER BY day
    """
    return [
        {"day": row["day"], "events": int(row["events"] or 0)}
        for row in _bq().query(sql).result()
    ]


def _q_sources(limit: int = 20) -> list[dict]:
    sql = f"""
    SELECT
      IFNULL(event_name, '(unknown)') AS event_name,
      COUNT(*) AS c,
      MAX(event_timestamp) AS last_seen
    FROM {EVENTS_FQN}
    WHERE event_timestamp >=
      TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 14 DAY)
    GROUP BY event_name
    ORDER BY c DESC
    LIMIT @limit
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[bigquery.ScalarQueryParameter("limit", "INT64", limit)]
    )
    return [
        {
            "event_name": row["event_name"],
            "count": int(row["c"]),
            "last_seen": row["last_seen"].isoformat() if row["last_seen"] else None,
        }
        for row in _bq().query(sql, job_config=job_config).result()
    ]


# ───── HTTP entry ─────

@functions_framework.http
def dashboard(request):
    if not _authorized(request):
        return _json({"error": "unauthorized"}, 401)

    path = (request.path or "/").rstrip("/") or "/"

    try:
        if path == "/overview":
            return _json({
                "overview": _q_overview(),
                "served_at": datetime.now(tz=timezone.utc).isoformat(),
            })

        if path == "/timeseries":
            return _json({
                "timeseries": _q_timeseries(),
                "served_at": datetime.now(tz=timezone.utc).isoformat(),
            })

        if path == "/sources":
            limit_raw = request.args.get("limit", "20")
            try:
                limit = max(1, min(int(limit_raw), 100))
            except ValueError:
                limit = 20
            return _json({
                "sources": _q_sources(limit=limit),
                "served_at": datetime.now(tz=timezone.utc).isoformat(),
            })

        if path == "/":
            return _json({
                "ok": True,
                "endpoints": ["/overview", "/timeseries", "/sources"],
            })

        return _json({"error": "not found", "path": path}, 404)
    except Exception:
        logging.exception("dashboard endpoint failed for path=%s", path)
        return _json({"error": "internal error"}, 500)
