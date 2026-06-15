DROP TABLE IF EXISTS leads;

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  inquiry TEXT,
  status TEXT DEFAULT 'new',
  source TEXT,
  source_id TEXT,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_source_id ON leads(source_id) WHERE source_id IS NOT NULL;
