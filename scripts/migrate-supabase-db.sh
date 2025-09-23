#!/usr/bin/env bash
set -euo pipefail

# Supabase DB migration: dump from OLD project, restore into NEW project.
# Prereqs: supabase CLI, psql, Node (optional), network access.

# Required env vars (set before running):
#   OLD_DB_URL  - e.g. postgresql://postgres:POSTGRES_PASSWORD@db.OLDREF.supabase.co:5432/postgres
#   NEW_DB_URL  - e.g. postgresql://postgres:POSTGRES_PASSWORD@db.NEWREF.supabase.co:5432/postgres
# Optional:
#   OUTPUT_DIR  - directory to write dump files (default: ./.tmp-migration)

OUTPUT_DIR=${OUTPUT_DIR:-".tmp-migration"}
mkdir -p "$OUTPUT_DIR"

if [[ -z "${OLD_DB_URL:-}" || -z "${NEW_DB_URL:-}" ]]; then
  echo "ERROR: Please export OLD_DB_URL and NEW_DB_URL before running." >&2
  exit 1
fi

echo "[1/4] Dumping roles from OLD project..."
supabase db dump --db-url "$OLD_DB_URL" -f "$OUTPUT_DIR/roles.sql" --role-only

echo "[2/4] Dumping schema from OLD project..."
supabase db dump --db-url "$OLD_DB_URL" -f "$OUTPUT_DIR/schema.sql"

echo "[3/4] Dumping data from OLD project..."
supabase db dump --db-url "$OLD_DB_URL" -f "$OUTPUT_DIR/data.sql" --use-copy --data-only

echo "[4/4] Restoring into NEW project..."
psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file "$OUTPUT_DIR/roles.sql" \
  --file "$OUTPUT_DIR/schema.sql" \
  --command 'SET session_replication_role = replica' \
  --file "$OUTPUT_DIR/data.sql" \
  --dbname "$NEW_DB_URL"

echo "Done. Verify objects, RLS policies, and extensions in the new project."


