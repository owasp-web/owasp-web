-- Board tabs and members schema with RLS and updated_at trigger

-- Helper: updated_at trigger function (re-use if already exists)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- Board tabs for content sections
create table if not exists public.board_tabs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  content text, -- JSON-encoded array of sections (title, content, imageUrl, buttons, etc)
  display_order int not null default 0
);

drop trigger if exists trg_board_tabs_updated_at on public.board_tabs;
create trigger trg_board_tabs_updated_at
before update on public.board_tabs
for each row execute function public.set_updated_at();

alter table public.board_tabs enable row level security;

-- Public read
drop policy if exists board_tabs_public_read on public.board_tabs;
create policy board_tabs_public_read on public.board_tabs
for select using (true);

-- Admin write (global_admins)
drop policy if exists board_tabs_admin_write on public.board_tabs;
create policy board_tabs_admin_write on public.board_tabs
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

comment on table public.board_tabs is 'Board public page tabs with JSON content sections.';

-- Board members listing
create table if not exists public.board_members (
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

drop trigger if exists trg_board_members_updated_at on public.board_members;
create trigger trg_board_members_updated_at
before update on public.board_members
for each row execute function public.set_updated_at();

alter table public.board_members enable row level security;

-- Public read of visible members
drop policy if exists board_members_public_read on public.board_members;
create policy board_members_public_read on public.board_members
for select using (is_active = true);

-- Admin write (global_admins)
drop policy if exists board_members_admin_write on public.board_members;
create policy board_members_admin_write on public.board_members
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

comment on table public.board_members is 'OWASP Global Board members with profile info and links.';


