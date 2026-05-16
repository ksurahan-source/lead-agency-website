CREATE TABLE IF NOT EXISTS creative_usage_events (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  date TEXT NOT NULL,
  run_id TEXT,
  job_id TEXT,
  asset_id TEXT,
  provider TEXT NOT NULL,
  model TEXT,
  operation_type TEXT NOT NULL,
  status TEXT NOT NULL,
  estimated_cost_usd REAL NOT NULL DEFAULT 0,
  actual_cost_usd REAL NOT NULL DEFAULT 0,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cached_input_tokens INTEGER,
  characters INTEGER,
  image_count INTEGER,
  video_seconds REAL,
  lambda_duration_ms INTEGER,
  memory_mb INTEGER,
  storage_bytes INTEGER,
  prompt_hash TEXT,
  reason TEXT,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_creative_usage_events_date ON creative_usage_events (date);
CREATE INDEX IF NOT EXISTS idx_creative_usage_events_run_id ON creative_usage_events (run_id);
CREATE INDEX IF NOT EXISTS idx_creative_usage_events_job_id ON creative_usage_events (job_id);
CREATE INDEX IF NOT EXISTS idx_creative_usage_events_provider ON creative_usage_events (provider);

CREATE TABLE IF NOT EXISTS creative_daily_usage (
  date TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 0,
  cache_hits INTEGER NOT NULL DEFAULT 0,
  blocked INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  estimated_cost_usd REAL NOT NULL DEFAULT 0,
  actual_cost_usd REAL NOT NULL DEFAULT 0,
  failed_cost_usd REAL NOT NULL DEFAULT 0,
  tts_chars INTEGER NOT NULL DEFAULT 0,
  image_generations INTEGER NOT NULL DEFAULT 0,
  renders INTEGER NOT NULL DEFAULT 0,
  final_videos INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS creative_runs (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'created',
  mode TEXT NOT NULL DEFAULT 'draft',
  mock INTEGER NOT NULL DEFAULT 1,
  input_json TEXT,
  output_key TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_creative_runs_status ON creative_runs (status);
CREATE INDEX IF NOT EXISTS idx_creative_runs_created_at ON creative_runs (created_at);

CREATE TABLE IF NOT EXISTS creative_jobs (
  id TEXT PRIMARY KEY,
  run_id TEXT,
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'created',
  provider TEXT,
  r2_key TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (run_id) REFERENCES creative_runs(id)
);

CREATE INDEX IF NOT EXISTS idx_creative_jobs_run_id ON creative_jobs (run_id);
CREATE INDEX IF NOT EXISTS idx_creative_jobs_status ON creative_jobs (status);
