-- Create project_admins table and RLS helpers to manage per-project admin assignments
-- Run this in Supabase SQL editor or via your migration process

create table if not exists public.project_admins (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  email text not null,
  user_id uuid null,
  created_at timestamp with time zone not null default now(),
  unique (project_id, email)
);

alter table public.project_admins enable row level security;

-- Helper: check if current user is admin for a given project
create or replace function public.is_project_admin(project uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.project_admins pa
    where pa.project_id = project
      and (
        pa.user_id = auth.uid()
        or lower(pa.email) = lower(coalesce((auth.jwt() ->> 'email')::text, ''))
      )
  );
$$;

-- Projects RLS: allow admins of a project to update that project
alter table public.projects enable row level security;

drop policy if exists "project_admins_update_project" on public.projects;
create policy "project_admins_update_project" on public.projects
  for update to authenticated
  using (public.is_project_admin(id))
  with check (public.is_project_admin(id));

-- Super admins already have policies in tighten-rls-policies.sql; ensure present
do $$ begin
  perform 1;
exception when others then null; end $$;

-- Indexes
create index if not exists idx_project_admins_project_id on public.project_admins(project_id);
create index if not exists idx_project_admins_email on public.project_admins(email);


