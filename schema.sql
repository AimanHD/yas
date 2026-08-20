-- Yasmin App — PostgreSQL / Supabase schema

CREATE TABLE IF NOT EXISTS letters (
  id          BIGSERIAL     PRIMARY KEY,
  title       TEXT          NOT NULL,
  subtitle    TEXT          DEFAULT '',
  content     TEXT,
  filename    TEXT,
  src         TEXT,
  type        TEXT          DEFAULT 'letter',
  seeded      BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id          BIGSERIAL     PRIMARY KEY,
  date        DATE          NOT NULL,
  title       TEXT          DEFAULT '',
  content     TEXT          NOT NULL,
  mood        TEXT          DEFAULT '🥰',
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS poems (
  id          BIGSERIAL     PRIMARY KEY,
  title       TEXT          NOT NULL,
  content     TEXT          NOT NULL,
  type        TEXT          DEFAULT 'poem',
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id          BIGSERIAL     PRIMARY KEY,
  filename    TEXT,
  src         TEXT,
  title       TEXT          DEFAULT '',
  description TEXT,
  seeded      BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS capsules (
  id          BIGSERIAL     PRIMARY KEY,
  title       TEXT          NOT NULL,
  content     TEXT          NOT NULL,
  open_date   DATE          NOT NULL,
  opened      BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dates (
  id          BIGSERIAL     PRIMARY KEY,
  title       TEXT          NOT NULL,
  date        DATE          NOT NULL,
  description TEXT          DEFAULT '',
  icon        TEXT          DEFAULT '',
  recurring   BOOLEAN       DEFAULT TRUE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movies (
  id          BIGSERIAL     PRIMARY KEY,
  title       TEXT          NOT NULL,
  drive_url   TEXT          NOT NULL,
  description TEXT          DEFAULT '',
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key         TEXT          PRIMARY KEY,
  value       TEXT
);
