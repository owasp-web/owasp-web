## Supabase project migration (old → new)

This guide helps migrate database, Auth, and Storage from your old Supabase project (`vudgtccbledygvotyqho`) to your new one (`remssssfmrgmyzqnpeas`).

### 0) Prereqs
- Supabase CLI installed and logged in
- `psql` installed
- Node 18+
- `npm install` (adds `ts-node` for the storage script) 

### 1) Prepare environment
Copy and fill `.env.migration.example` → `.env.migration`:

```bash
cp .env.migration.example .env.migration
source .env.migration
```

Set values for:
- `OLD_DB_URL`, `NEW_DB_URL`
- `OLD_SUPABASE_URL`, `OLD_SERVICE_ROLE_KEY`, `NEW_SUPABASE_URL`, `NEW_SERVICE_ROLE_KEY`

You can find project refs and API keys in the dashboards:
- Old project: `https://supabase.com/dashboard/project/vudgtccbledygvotyqho`
- New project: `https://supabase.com/dashboard/project/remssssfmrgmyzqnpeas`

### 2) Database: dump and restore

```bash
npm run migrate:db
```

This runs `scripts/migrate-supabase-db.sh` which:
- Dumps roles, schema, and data from OLD
- Restores them into NEW using `psql` with `session_replication_role = replica`

### 3) Auth users and JWT secret
- All `auth.*` tables are copied by the DB dump/restore. Password hashes remain valid.
- Existing tokens will be invalid unless the NEW project reuses the old JWT secret. Optionally set your NEW project JWT secret to match the old one in Settings → API.
- Reference: Supabase guide on migrating auth users between projects: [`supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects`](https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects?utm_source=openai)

### 4) Storage objects

Buckets are part of the DB, but objects must be copied. Run:

```bash
npm run migrate:storage
```

This uses service role keys to enumerate buckets, ensure existence in NEW, and recursively copy objects.

Reference: Migrating within Supabase: [`supabase.com/docs/guides/platform/migrating-within-supabase`](https://supabase.com/docs/guides/platform/migrating-within-supabase?utm_source=openai)

### 5) Post-migration verification
- Database: tables, data volumes, extensions, RLS policies present
- Auth: users count matches; sign-in works; new JWTs issued correctly
- Storage: object counts per bucket; random sample downloads OK
- Realtime/replication settings as needed

### 6) Rollout
- Update environment variables for your app to point to the NEW project: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and any server keys
- If you changed the JWT secret, users must sign in again. If you kept it the same, existing tokens remain valid until expiry


