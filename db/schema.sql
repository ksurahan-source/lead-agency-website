CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT DEFAULT '',
  inquiry TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'hi-op',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);
