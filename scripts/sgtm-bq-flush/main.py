"""hi-ob events flush — pulls from Pub/Sub and BQ-loads in batches.

Triggered by Cloud Scheduler every 30 min. Drains the pull subscription,
converts each message to a row, and runs a single BigQuery LOAD job
(free, no streaming-insert cost).
"""

from __future__ import annotations

import io
import json
import logging
import os
from datetime import datetime, timezone

import functions_framework
from google.cloud import bigquery, pubsub_v1

PROJECT_ID = os.environ.get("PROJECT_ID", "rising-goal-498613-a1")
SUBSCRIPTION_ID = os.environ.get("SUBSCRIPTION_ID", "hiob-events-flush-sub")
TABLE_FQN = os.environ.get("TABLE_FQN", f"{PROJECT_ID}.hiob_analytics.events_raw")

MAX_PULL_ROUNDS = 50          # safety cap: up to 50 * 1000 = 50k events / run
MAX_MESSAGES_PER_PULL = 1000
PULL_TIMEOUT_S = 10.0


def _row_from_message(msg: pubsub_v1.types.ReceivedMessage) -> dict:
    raw = msg.message.data.decode("utf-8", errors="replace")
    try:
        payload = json.loads(raw)
        if not isinstance(payload, dict):
            payload = {"_value": payload}
    except json.JSONDecodeError:
        payload = {"_raw": raw}

    publish_time = msg.message.publish_time
    if publish_time is None:
        publish_time = datetime.now(tz=timezone.utc)

    event_name = payload.get("event_name") or payload.get("en") or "unknown"

    return {
        "event_timestamp": publish_time.isoformat(),
        "event_name": str(event_name)[:128],
        "payload": json.dumps(payload, ensure_ascii=False),
        "ingested_at": datetime.now(tz=timezone.utc).isoformat(),
    }


def _drain(subscriber: pubsub_v1.SubscriberClient, subscription_path: str):
    rows: list[dict] = []
    ack_ids: list[str] = []

    for _ in range(MAX_PULL_ROUNDS):
        try:
            response = subscriber.pull(
                request={
                    "subscription": subscription_path,
                    "max_messages": MAX_MESSAGES_PER_PULL,
                },
                timeout=PULL_TIMEOUT_S,
            )
        except Exception as exc:
            logging.warning("pull failed mid-drain: %s", exc)
            break

        if not response.received_messages:
            break

        for msg in response.received_messages:
            rows.append(_row_from_message(msg))
            ack_ids.append(msg.ack_id)

        if len(response.received_messages) < MAX_MESSAGES_PER_PULL:
            break  # likely emptied

    return rows, ack_ids


def _bq_load(bq: bigquery.Client, rows: list[dict]) -> bigquery.LoadJob:
    ndjson = "\n".join(json.dumps(r, ensure_ascii=False) for r in rows).encode("utf-8")

    job_config = bigquery.LoadJobConfig(
        source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON,
        write_disposition=bigquery.WriteDisposition.WRITE_APPEND,
        schema=[
            bigquery.SchemaField("event_timestamp", "TIMESTAMP", mode="REQUIRED"),
            bigquery.SchemaField("event_name", "STRING"),
            bigquery.SchemaField("payload", "JSON"),
            bigquery.SchemaField("ingested_at", "TIMESTAMP"),
        ],
    )

    job = bq.load_table_from_file(
        io.BytesIO(ndjson),
        TABLE_FQN,
        job_config=job_config,
    )
    job.result()
    return job


@functions_framework.http
def flush_to_bq(request):
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(PROJECT_ID, SUBSCRIPTION_ID)

    rows, ack_ids = _drain(subscriber, subscription_path)
    if not rows:
        logging.info("no messages to flush")
        return ("no messages", 200)

    bq = bigquery.Client(project=PROJECT_ID)
    try:
        job = _bq_load(bq, rows)
    except Exception:
        logging.exception("BQ load failed, leaving messages unacked")
        # leaving messages unacked → next run will retry
        raise

    # only ack after BQ confirmed
    # Pub/Sub limits acknowledge() to 2500 ack_ids per request
    for i in range(0, len(ack_ids), 2500):
        subscriber.acknowledge(
            request={
                "subscription": subscription_path,
                "ack_ids": ack_ids[i : i + 2500],
            }
        )

    logging.info(
        "flushed %d rows via load job %s", len(rows), job.job_id
    )
    return (f"flushed {len(rows)} rows; job={job.job_id}", 200)
