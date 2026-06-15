"""Export lead CRM events from hi-ob BigQuery to Meta CAPI.

This Gen2 Cloud Function reads sanitized lead/stage fields from BigQuery,
builds Meta CRM payloads, and sends only allow-listed user_data keys.

It intentionally does not forward raw BQ payload JSON. BigQuery currently stores
raw sGTM payloads, which can include contact fields. The parser below only uses
stable IDs, event times, lead_id, SHA-256 hashes, and fbp/fbc.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

import functions_framework
import requests
from google.api_core.exceptions import NotFound
from google.cloud import bigquery

try:
    from google.cloud import secretmanager
except ImportError:  # pragma: no cover - local lightweight tests
    secretmanager = None


PROJECT_ID = os.environ.get("PROJECT_ID", "rising-goal-498613-a1")
DATASET = os.environ.get("DATASET", "hiob_analytics")
SOURCE_TABLE = os.environ.get("SOURCE_TABLE", "events_raw")
LEDGER_TABLE = os.environ.get("LEDGER_TABLE", "meta_crm_event_ledger")
META_PIXEL_ID = os.environ.get("META_PIXEL_ID", "1715625702927911")
META_GRAPH_API_VERSION = os.environ.get("META_GRAPH_API_VERSION", "v25.0")
LEAD_EVENT_SOURCE = os.environ.get("LEAD_EVENT_SOURCE", "hi-ob BigQuery")
ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
ALLOW_META_SENDS = os.environ.get("ALLOW_META_SENDS", "").lower() == "true"
DEFAULT_LOOKBACK_HOURS = int(os.environ.get("LOOKBACK_HOURS", "72"))
DEFAULT_LIMIT = int(os.environ.get("MAX_EVENTS_PER_RUN", "50"))
HTTP_TIMEOUT_SECONDS = float(os.environ.get("HTTP_TIMEOUT_SECONDS", "20"))

# Website lead completion plus CRM stages. Keep this configurable because BQ may
# later receive dedicated CRM/stage rows instead of only web generate_lead rows.
DEFAULT_SOURCE_EVENT_NAMES = [
    name.strip().lower()
    for name in os.environ.get(
        "SOURCE_EVENT_NAMES",
        "generate_lead,lead,lead_contacted,lead_consulted,lead_paid,converted",
    ).split(",")
    if name.strip()
]

IDENTIFIER_RE = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")
SHA256_RE = re.compile(r"^[a-f0-9]{64}$")

_bq_client: bigquery.Client | None = None
_secret_client: Any | None = None


@dataclass(frozen=True)
class Candidate:
    source_event_id: str
    source_event_name: str
    crm_event_name: str
    event_time: int
    event_timestamp: datetime
    lead_id: str | None
    em: str | None
    ph: str | None
    fn: str | None
    ln: str | None
    external_id: str | None
    fbp: str | None
    fbc: str | None
    value: float | None
    currency: str | None


def _bq() -> bigquery.Client:
    global _bq_client
    if _bq_client is None:
        _bq_client = bigquery.Client(project=PROJECT_ID)
    return _bq_client


def _secrets():
    global _secret_client
    if _secret_client is None:
        if secretmanager is None:
            raise RuntimeError("google-cloud-secret-manager is not installed")
        _secret_client = secretmanager.SecretManagerServiceClient()
    return _secret_client


def _safe_identifier(value: str, label: str) -> str:
    if not IDENTIFIER_RE.match(value or ""):
        raise ValueError(f"Invalid {label}: {value!r}")
    return value


def _table_fqn(table: str) -> str:
    dataset = _safe_identifier(DATASET, "DATASET")
    table_id = _safe_identifier(table, "table")
    return f"`{PROJECT_ID}.{dataset}.{table_id}`"


def _plain_table_id(table: str) -> str:
    dataset = _safe_identifier(DATASET, "DATASET")
    table_id = _safe_identifier(table, "table")
    return f"{PROJECT_ID}.{dataset}.{table_id}"


def _json_response(body: dict[str, Any], status: int = 200):
    return (
        json.dumps(body, ensure_ascii=False, default=str),
        status,
        {"Content-Type": "application/json; charset=utf-8"},
    )


def _parse_bool_arg(value: str | None, default: bool = False) -> bool:
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "y"}


def _bounded_int(value: str | None, default: int, min_value: int, max_value: int) -> int:
    if value is None:
        return default
    try:
        parsed = int(value)
    except ValueError:
        return default
    return max(min_value, min(max_value, parsed))


def _valid_hash(value: str | None) -> str | None:
    if not value:
        return None
    normalized = value.strip().lower()
    return normalized if SHA256_RE.match(normalized) else None


def _clean_string(value: str | None, max_len: int = 2048) -> str | None:
    if value is None:
        return None
    cleaned = str(value).strip()
    if not cleaned:
        return None
    return cleaned[:max_len]


def _crm_event_name(source_event_name: str) -> str:
    normalized = (source_event_name or "").strip().lower()
    if normalized in {"generate_lead", "lead"}:
        return "Lead"
    if normalized == "converted":
        return "lead_paid"
    return source_event_name


def _meta_event_id(candidate: Candidate) -> str:
    if candidate.crm_event_name == "Lead":
        return candidate.source_event_id
    raw = f"crm:{candidate.source_event_id}:{candidate.crm_event_name}"
    # Keep event_id compact and deterministic for Meta dedupe.
    digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()[:32]
    return f"crm_{digest}"


def _event_key(candidate: Candidate) -> str:
    return f"meta:{META_PIXEL_ID}:{candidate.crm_event_name}:{_meta_event_id(candidate)}"


def build_meta_payload(candidate: Candidate, test_event_code: str | None = None) -> dict[str, Any]:
    """Build one Meta CRM event and omit empty or unsafe fields."""

    user_data: dict[str, Any] = {}

    lead_id = _clean_string(candidate.lead_id, max_len=32)
    if lead_id and lead_id.isdigit():
        user_data["lead_id"] = lead_id

    for source_name, meta_name in [
        ("em", "em"),
        ("ph", "ph"),
        ("fn", "fn"),
        ("ln", "ln"),
        ("external_id", "external_id"),
    ]:
        hashed_value = _valid_hash(getattr(candidate, source_name))
        if hashed_value:
            user_data[meta_name] = [hashed_value]

    fbp = _clean_string(candidate.fbp, max_len=256)
    if fbp:
        user_data["fbp"] = fbp

    fbc = _clean_string(candidate.fbc, max_len=256)
    if fbc:
        user_data["fbc"] = fbc

    custom_data: dict[str, Any] = {
        "event_source": "crm",
        "lead_event_source": LEAD_EVENT_SOURCE,
    }

    if candidate.crm_event_name == "lead_paid":
        if candidate.value is not None:
            custom_data["value"] = candidate.value
        if candidate.currency:
            custom_data["currency"] = candidate.currency

    event = {
        "event_name": candidate.crm_event_name,
        "event_time": candidate.event_time,
        "action_source": "system_generated",
        "event_id": _meta_event_id(candidate),
        "custom_data": custom_data,
        "user_data": user_data,
    }

    payload = {"data": [event]}
    if test_event_code:
        payload["test_event_code"] = test_event_code
    return payload


def _query_candidates(lookback_hours: int, limit: int) -> list[Candidate]:
    source_fqn = _table_fqn(SOURCE_TABLE)
    ledger_fqn = _table_fqn(LEDGER_TABLE)

    sql = f"""
    WITH parsed AS (
      SELECT
        event_timestamp,
        ingested_at,
        event_name AS row_event_name,
        CASE JSON_TYPE(payload)
          WHEN 'string' THEN SAFE.PARSE_JSON(JSON_VALUE(payload, '$'))
          ELSE payload
        END AS p
      FROM {source_fqn}
      WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @lookback_hours HOUR)
    ),
    candidates AS (
      SELECT
        COALESCE(NULLIF(JSON_VALUE(p, '$.event_id'), ''), NULLIF(JSON_VALUE(p, '$.lead_id'), '')) AS source_event_id,
        COALESCE(NULLIF(JSON_VALUE(p, '$.event_name'), ''), row_event_name) AS source_event_name,
        UNIX_SECONDS(event_timestamp) AS event_time,
        event_timestamp,
        NULLIF(JSON_VALUE(p, '$.lead_id'), '') AS lead_id,
        NULLIF(JSON_VALUE(p, '$.x-fb-ud-em'), '') AS em,
        NULLIF(JSON_VALUE(p, '$.x-fb-ud-ph'), '') AS ph,
        NULLIF(JSON_VALUE(p, '$.x-fb-ud-fn'), '') AS fn,
        NULLIF(JSON_VALUE(p, '$.x-fb-ud-ln'), '') AS ln,
        COALESCE(
          NULLIF(JSON_VALUE(p, '$.x-fb-ud-external_id'), ''),
          NULLIF(JSON_VALUE(p, '$.external_id'), '')
        ) AS external_id,
        COALESCE(NULLIF(JSON_VALUE(p, '$.fbp'), ''), NULLIF(JSON_VALUE(p, '$.x-fb-ck-fbp'), '')) AS fbp,
        COALESCE(NULLIF(JSON_VALUE(p, '$.fbc'), ''), NULLIF(JSON_VALUE(p, '$.x-fb-ck-fbc'), '')) AS fbc,
        SAFE_CAST(JSON_VALUE(p, '$.value') AS FLOAT64) AS value,
        NULLIF(JSON_VALUE(p, '$.currency'), '') AS currency
      FROM parsed
      WHERE LOWER(COALESCE(NULLIF(JSON_VALUE(p, '$.event_name'), ''), row_event_name))
            IN UNNEST(@source_event_names)
    ),
    keyed AS (
      SELECT
        *,
        CASE
          WHEN LOWER(source_event_name) IN ('generate_lead', 'lead') THEN 'Lead'
          WHEN LOWER(source_event_name) = 'converted' THEN 'lead_paid'
          ELSE source_event_name
        END AS crm_event_name
      FROM candidates
      WHERE source_event_id IS NOT NULL
      QUALIFY ROW_NUMBER() OVER (
        PARTITION BY source_event_id,
          CASE
            WHEN LOWER(source_event_name) IN ('generate_lead', 'lead') THEN 'Lead'
            WHEN LOWER(source_event_name) = 'converted' THEN 'lead_paid'
            ELSE source_event_name
          END
        ORDER BY event_timestamp DESC
      ) = 1
    )
    SELECT k.*
    FROM keyed k
    LEFT JOIN {ledger_fqn} l
      ON l.event_key = CONCAT(
        'meta:', @pixel_id, ':', k.crm_event_name, ':',
        CASE
          WHEN k.crm_event_name = 'Lead' THEN k.source_event_id
          ELSE CONCAT(
            'crm_',
            SUBSTR(TO_HEX(SHA256(CONCAT('crm:', k.source_event_id, ':', k.crm_event_name))), 1, 32)
          )
        END
      )
      AND l.status = 'sent'
    WHERE l.event_key IS NULL
    ORDER BY k.event_timestamp ASC
    LIMIT @limit
    """

    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("lookback_hours", "INT64", lookback_hours),
            bigquery.ArrayQueryParameter("source_event_names", "STRING", DEFAULT_SOURCE_EVENT_NAMES),
            bigquery.ScalarQueryParameter("pixel_id", "STRING", META_PIXEL_ID),
            bigquery.ScalarQueryParameter("limit", "INT64", limit),
        ]
    )

    rows = _bq().query(sql, job_config=job_config).result()
    return [
        Candidate(
            source_event_id=row["source_event_id"],
            source_event_name=row["source_event_name"],
            crm_event_name=row["crm_event_name"],
            event_time=int(row["event_time"]),
            event_timestamp=row["event_timestamp"],
            lead_id=row["lead_id"],
            em=_valid_hash(row["em"]),
            ph=_valid_hash(row["ph"]),
            fn=_valid_hash(row["fn"]),
            ln=_valid_hash(row["ln"]),
            external_id=_valid_hash(row["external_id"]),
            fbp=_clean_string(row["fbp"], max_len=256),
            fbc=_clean_string(row["fbc"], max_len=256),
            value=row["value"],
            currency=_clean_string(row["currency"], max_len=16),
        )
        for row in rows
    ]


def _ensure_ledger_table() -> None:
    table_id = _plain_table_id(LEDGER_TABLE)
    table = bigquery.Table(
        table_id,
        schema=[
            bigquery.SchemaField("event_key", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("pixel_id", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("source_event_id", "STRING"),
            bigquery.SchemaField("source_event_name", "STRING"),
            bigquery.SchemaField("crm_event_name", "STRING"),
            bigquery.SchemaField("meta_event_id", "STRING"),
            bigquery.SchemaField("event_timestamp", "TIMESTAMP"),
            bigquery.SchemaField("status", "STRING"),
            bigquery.SchemaField("attempts", "INT64"),
            bigquery.SchemaField("meta_status", "INT64"),
            bigquery.SchemaField("error", "STRING"),
            bigquery.SchemaField("first_seen_at", "TIMESTAMP"),
            bigquery.SchemaField("last_attempt_at", "TIMESTAMP"),
            bigquery.SchemaField("sent_at", "TIMESTAMP"),
        ],
    )
    try:
        _bq().get_table(table_id)
    except NotFound:
        created = _bq().create_table(table)
        logging.info("created ledger table %s", created.full_table_id)


def _mark_pending(candidate: Candidate) -> None:
    ledger_fqn = _table_fqn(LEDGER_TABLE)
    sql = f"""
    MERGE {ledger_fqn} AS target
    USING (
      SELECT
        @event_key AS event_key,
        @pixel_id AS pixel_id,
        @source_event_id AS source_event_id,
        @source_event_name AS source_event_name,
        @crm_event_name AS crm_event_name,
        @meta_event_id AS meta_event_id,
        TIMESTAMP_SECONDS(@event_time) AS event_timestamp
    ) AS source
    ON target.event_key = source.event_key
    WHEN NOT MATCHED THEN
      INSERT (
        event_key, pixel_id, source_event_id, source_event_name, crm_event_name,
        meta_event_id, event_timestamp, status, attempts, first_seen_at
      )
      VALUES (
        source.event_key, source.pixel_id, source.source_event_id,
        source.source_event_name, source.crm_event_name, source.meta_event_id,
        source.event_timestamp, 'pending', 0, CURRENT_TIMESTAMP()
      )
    """
    _bq().query(sql, job_config=_candidate_job_config(candidate)).result()


def _mark_done(candidate: Candidate, status: str, meta_status: int | None, error: str | None) -> None:
    ledger_fqn = _table_fqn(LEDGER_TABLE)
    sql = f"""
    UPDATE {ledger_fqn}
    SET
      status = @status,
      attempts = IFNULL(attempts, 0) + 1,
      meta_status = @meta_status,
      error = @error,
      last_attempt_at = CURRENT_TIMESTAMP(),
      sent_at = IF(@status = 'sent', CURRENT_TIMESTAMP(), sent_at)
    WHERE event_key = @event_key
    """
    params = _candidate_job_config(candidate).query_parameters
    params.extend([
        bigquery.ScalarQueryParameter("status", "STRING", status),
        bigquery.ScalarQueryParameter("meta_status", "INT64", meta_status),
        bigquery.ScalarQueryParameter("error", "STRING", error[:512] if error else None),
    ])
    _bq().query(sql, job_config=bigquery.QueryJobConfig(query_parameters=params)).result()


def _candidate_job_config(candidate: Candidate) -> bigquery.QueryJobConfig:
    return bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("event_key", "STRING", _event_key(candidate)),
            bigquery.ScalarQueryParameter("pixel_id", "STRING", META_PIXEL_ID),
            bigquery.ScalarQueryParameter("source_event_id", "STRING", candidate.source_event_id),
            bigquery.ScalarQueryParameter("source_event_name", "STRING", candidate.source_event_name),
            bigquery.ScalarQueryParameter("crm_event_name", "STRING", candidate.crm_event_name),
            bigquery.ScalarQueryParameter("meta_event_id", "STRING", _meta_event_id(candidate)),
            bigquery.ScalarQueryParameter("event_time", "INT64", candidate.event_time),
        ]
    )


def _meta_token() -> str | None:
    secret_name = os.environ.get("META_ACCESS_TOKEN_SECRET")
    if secret_name:
        response = _secrets().access_secret_version(request={"name": secret_name})
        return response.payload.data.decode("utf-8").strip()
    token = os.environ.get("META_ACCESS_TOKEN")
    return token.strip() if token else None


def _send_to_meta(payload: dict[str, Any], token: str) -> tuple[bool, int, str | None]:
    url = f"https://graph.facebook.com/{META_GRAPH_API_VERSION}/{META_PIXEL_ID}/events"
    response = requests.post(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        timeout=HTTP_TIMEOUT_SECONDS,
    )
    if response.ok:
        return True, response.status_code, None

    # Redact response body by keeping only a short error message, never request data.
    try:
        body = response.json()
        message = body.get("error", {}).get("message") or "Meta request failed"
    except Exception:
        message = "Meta request failed"
    return False, response.status_code, message


@functions_framework.http
def export_meta_crm_events(request):
    dry_run = _parse_bool_arg(request.args.get("dry"), default=not ALLOW_META_SENDS)
    lookback_hours = _bounded_int(request.args.get("lookback_hours"), DEFAULT_LOOKBACK_HOURS, 1, 24 * 90)
    limit = _bounded_int(request.args.get("limit"), DEFAULT_LIMIT, 1, 200)
    test_event_code = request.args.get("test_event_code") or os.environ.get("META_TEST_EVENT_CODE")

    if ENVIRONMENT != "production" and not dry_run and not test_event_code:
        return _json_response(
            {"error": "non-production sends require test_event_code", "dry_run": dry_run},
            400,
        )

    _ensure_ledger_table()
    candidates = _query_candidates(lookback_hours=lookback_hours, limit=limit)

    summary: dict[str, Any] = {
        "dry_run": dry_run,
        "environment": ENVIRONMENT,
        "source_table": f"{PROJECT_ID}.{DATASET}.{SOURCE_TABLE}",
        "ledger_table": f"{PROJECT_ID}.{DATASET}.{LEDGER_TABLE}",
        "lookback_hours": lookback_hours,
        "candidate_count": len(candidates),
        "sent": 0,
        "failed": 0,
        "skipped": 0,
        "events": [
            {
                "event_key": _event_key(candidate),
                "source_event_name": candidate.source_event_name,
                "crm_event_name": candidate.crm_event_name,
                "event_time": candidate.event_time,
                "has_lead_id": bool(candidate.lead_id),
                "match_keys": sorted(build_meta_payload(candidate)["data"][0]["user_data"].keys()),
            }
            for candidate in candidates
        ],
        "served_at": datetime.now(tz=timezone.utc).isoformat(),
    }

    if dry_run:
        return _json_response(summary)

    if not ALLOW_META_SENDS:
        return _json_response({"error": "ALLOW_META_SENDS is not true", **summary}, 403)

    token = _meta_token()
    if not token:
        return _json_response({"error": "Meta access token is not configured", **summary}, 500)

    for candidate in candidates:
        _mark_pending(candidate)
        payload = build_meta_payload(candidate, test_event_code=test_event_code)
        try:
            ok, meta_status, error = _send_to_meta(payload, token)
        except requests.RequestException as exc:
            ok, meta_status, error = False, 0, exc.__class__.__name__

        if ok:
            _mark_done(candidate, "sent", meta_status, None)
            summary["sent"] += 1
        else:
            _mark_done(candidate, "failed", meta_status, error)
            summary["failed"] += 1

    logging.info(
        "meta crm export finished dry_run=%s candidates=%d sent=%d failed=%d",
        dry_run,
        len(candidates),
        summary["sent"],
        summary["failed"],
    )
    return _json_response(summary, 207 if summary["failed"] else 200)
