-- Community, Board EU, and Legal/Policies schema

-- Ensure updated_at trigger function exists
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- Community tabs (content sections only)
create table if not exists public.community_tabs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  content text,
  display_order int not null default 0
);

drop trigger if exists trg_community_tabs_updated_at on public.community_tabs;
create trigger trg_community_tabs_updated_at
before update on public.community_tabs
for each row execute function public.set_updated_at();

alter table public.community_tabs enable row level security;

drop policy if exists community_tabs_public_read on public.community_tabs;
create policy community_tabs_public_read on public.community_tabs
for select using (true);

drop policy if exists community_tabs_admin_write on public.community_tabs;
create policy community_tabs_admin_write on public.community_tabs
for all to authenticated
using (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
);

comment on table public.community_tabs is 'Community public page tabs with JSON content sections.';

-- Board EU tabs and members (mirror of board_*)
create table if not exists public.board_eu_tabs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  content text,
  display_order int not null default 0
);

drop trigger if exists trg_board_eu_tabs_updated_at on public.board_eu_tabs;
create trigger trg_board_eu_tabs_updated_at
before update on public.board_eu_tabs
for each row execute function public.set_updated_at();

alter table public.board_eu_tabs enable row level security;

drop policy if exists board_eu_tabs_public_read on public.board_eu_tabs;
create policy board_eu_tabs_public_read on public.board_eu_tabs
for select using (true);

drop policy if exists board_eu_tabs_admin_write on public.board_eu_tabs;
create policy board_eu_tabs_admin_write on public.board_eu_tabs
for all to authenticated
using (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
);

comment on table public.board_eu_tabs is 'OWASP Global Board EU tabs with JSON content sections.';

create table if not exists public.board_eu_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  title text,
  description text,
  image_url text,
  storage_path text,
  links jsonb not null default '[]'::jsonb,
  country text,
  display_order int not null default 0,
  is_active boolean not null default true
);

drop trigger if exists trg_board_eu_members_updated_at on public.board_eu_members;
create trigger trg_board_eu_members_updated_at
before update on public.board_eu_members
for each row execute function public.set_updated_at();

alter table public.board_eu_members enable row level security;

drop policy if exists board_eu_members_public_read on public.board_eu_members;
create policy board_eu_members_public_read on public.board_eu_members
for select using (is_active = true);

drop policy if exists board_eu_members_admin_write on public.board_eu_members;
create policy board_eu_members_admin_write on public.board_eu_members
for all to authenticated
using (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
);

comment on table public.board_eu_members is 'OWASP Global Board EU members with profile info and links.';

-- Legal pages (policies)
create table if not exists public.legal_pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  content text,
  display_order int not null default 0,
  is_active boolean not null default true
);

drop trigger if exists trg_legal_pages_updated_at on public.legal_pages;
create trigger trg_legal_pages_updated_at
before update on public.legal_pages
for each row execute function public.set_updated_at();

alter table public.legal_pages enable row level security;

drop policy if exists legal_pages_public_read on public.legal_pages;
create policy legal_pages_public_read on public.legal_pages
for select using (is_active = true);

drop policy if exists legal_pages_admin_write on public.legal_pages;
create policy legal_pages_admin_write on public.legal_pages
for all to authenticated
using (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
);

comment on table public.legal_pages is 'Legal policy pages (e.g., Code of Conduct, Privacy Policy) editable in admin.';


