# sGTM → Pub/Sub → BQ 30-min batch flush

Cloud Function (Gen2) source for the lead-measurement pipeline.

Architecture: see [brain memory `hiob-lead-bq-pubsub-pipeline`](https://github.com/anthropics/claude-code) — this is the WRITE side of the lead-gen moat. Same template works for any future brand.

## Files

- `main.py` — `flush_to_bq` HTTP handler. Synchronously pulls from a Pub/Sub subscription, batches up to 50k events into NDJSON, runs a single BigQuery LOAD job (free, not streaming), then acks.
- `requirements.txt` — `functions-framework`, `google-cloud-pubsub`, `google-cloud-bigquery`.

## Deploy (hi-ob.com production)

```bash
gcloud functions deploy hiob-flush-to-bq \
  --gen2 --runtime=python311 --region=us-central1 \
  --source=./scripts/sgtm-bq-flush \
  --entry-point=flush_to_bq --trigger-http --no-allow-unauthenticated \
  --service-account=hiob-bq-flush@rising-goal-498613-a1.iam.gserviceaccount.com \
  --set-env-vars=PROJECT_ID=rising-goal-498613-a1,SUBSCRIPTION_ID=hiob-events-flush-sub \
  --memory=512Mi --timeout=300s --max-instances=2 \
  --project=rising-goal-498613-a1
```

Already deployed and live as of 2026-06-07. Cloud Scheduler `hiob-flush-30min` invokes it every 30 min Asia/Seoul.

## Manual flush

```bash
gcloud scheduler jobs run hiob-flush-30min \
  --location=asia-northeast3 --project=rising-goal-498613-a1
```

## Replay on a new brand

Full runbook in brain memory `hiob-lead-bq-pubsub-pipeline.md`. ~25 min including sGTM tag setup once you know the steps.
