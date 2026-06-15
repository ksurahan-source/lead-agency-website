-- Migration: Add Meta Lead Ads index/ledger support
-- Apply only via: wrangler d1 migrations apply leads-db --remote
-- Wrangler tracks applied migrations and rolls back failed runs; do not hand-edit prod DB.

-- The production DB already has source_id + metadata from the pre-Wrangler
-- rollout. Fresh DBs get these columns from db/schema.sql. This tracked
-- migration only guarantees the dedupe index and records 0002 in Wrangler's
-- migration ledger.
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_source_id ON leads(source_id) WHERE source_id IS NOT NULL;
