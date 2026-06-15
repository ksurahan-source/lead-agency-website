# BigQuery -> Meta CRM events

Cloud Function source for sending hi-ob CRM/lead-stage events from BigQuery to
Meta Conversions API.

## Contract

- Source table defaults to `rising-goal-498613-a1.hiob_analytics.events_raw`.
- Ledger table defaults to `hiob_analytics.meta_crm_event_ledger`.
- Only these source events are eligible by default:
  - `generate_lead`
  - `Lead`
  - `lead_contacted`
  - `lead_consulted`
  - `lead_paid`
  - `converted` -> mapped to `lead_paid`
- The function does not forward raw `payload` JSON. It allow-lists:
  - stable event id / event time
  - `lead_id`
  - hashed `x-fb-ud-*` fields
  - `fbp` / `fbc`
  - terminal-stage `value` / `currency`

## Deploy

Use a dedicated runtime service account with BigQuery read access on
`events_raw`, write access on the ledger table, and Secret Manager access only to
the Meta access token secret.

```bash
gcloud functions deploy hiob-meta-crm-export \
  --gen2 --runtime=python311 --region=us-central1 \
  --source=./scripts/meta-crm-bq-export \
  --entry-point=export_meta_crm_events --trigger-http --no-allow-unauthenticated \
  --service-account=hiob-meta-crm-export@rising-goal-498613-a1.iam.gserviceaccount.com \
  --set-env-vars=PROJECT_ID=rising-goal-498613-a1,DATASET=hiob_analytics,SOURCE_TABLE=events_raw,LEDGER_TABLE=meta_crm_event_ledger,META_PIXEL_ID=1715625702927911,META_GRAPH_API_VERSION=v25.0,LEAD_EVENT_SOURCE="hi-ob BigQuery",ENVIRONMENT=production,ALLOW_META_SENDS=false \
  --memory=512Mi --timeout=300s --max-instances=1 \
  --project=rising-goal-498613-a1
```

Set `ALLOW_META_SENDS=true` only after a dry-run confirms the candidate rows.

## Secret

Preferred production token source:

```bash
gcloud services enable secretmanager.googleapis.com \
  --project=rising-goal-498613-a1

gcloud secrets create hiob-meta-crm-access-token \
  --project=rising-goal-498613-a1 \
  --replication-policy=automatic

printf '%s' "$META_ACCESS_TOKEN" | gcloud secrets versions add hiob-meta-crm-access-token \
  --project=rising-goal-498613-a1 \
  --data-file=-
```

Then deploy/update with:

```bash
--set-env-vars=...,META_ACCESS_TOKEN_SECRET=projects/rising-goal-498613-a1/secrets/hiob-meta-crm-access-token/versions/latest
```

Do not put the Meta token in source files, docs, Scheduler URLs, or ordinary
Cloud Function env vars.

## Manual dry-run

```bash
gcloud functions call hiob-meta-crm-export \
  --region=us-central1 \
  --project=rising-goal-498613-a1 \
  --data='{}'
```

For HTTP invocation, call with `?dry=1&lookback_hours=72&limit=50`.

## Scheduler

Use private HTTP invocation with OIDC. Keep the job disabled until
`ALLOW_META_SENDS=true` and the Secret Manager token are configured.

```bash
gcloud scheduler jobs create http hiob-meta-crm-daily \
  --schedule="15 3 * * *" \
  --time-zone="Asia/Seoul" \
  --location=asia-northeast3 \
  --project=rising-goal-498613-a1 \
  --uri="https://hiob-meta-crm-export-hgtol5aofa-uc.a.run.app/?dry=1" \
  --http-method=GET \
  --oidc-service-account-email=hiob-scheduler@rising-goal-498613-a1.iam.gserviceaccount.com
```
