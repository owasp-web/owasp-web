-- Global super admins table and RLS policies to grant full chapter/event management

create table if not exists public.global_admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table public.global_admins enable row level security;

-- Helper function to check super admin
create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.global_admins ga
    where ga.user_id = auth.uid()
       or lower(ga.email) = lower(coalesce((auth.jwt() ->> 'email')::text, ''))
  );
$$;

-- Chapters policies: allow super admins to select and update all
do $$ begin
  perform 1;
exception when others then
  -- ensure table exists
  null;
end $$;

-- Allow super admins to select all chapters
drop policy if exists "super_admins_select_chapters" on public.chapters;
create policy "super_admins_select_chapters" on public.chapters
  for select to authenticated
  using (public.is_super_admin());

-- Allow chapter admins to select their own chapter (optional, if not already allowed)
drop policy if exists "chapter_admins_select_chapter" on public.chapters;
create policy "chapter_admins_select_chapter" on public.chapters
  for select to authenticated
  using (public.is_chapter_admin(id));

-- Allow super admins to update any chapter
drop policy if exists "super_admins_update_chapter" on public.chapters;
create policy "super_admins_update_chapter" on public.chapters
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Events policies: allow super admins to manage all
drop policy if exists "super_admins_select_events" on public.events;
create policy "super_admins_select_events" on public.events
  for select to authenticated
  using (public.is_super_admin());

drop policy if exists "super_admins_insert_event" on public.events;
create policy "super_admins_insert_event" on public.events
  for insert to authenticated
  with check (public.is_super_admin());

drop policy if exists "super_admins_update_event" on public.events;
create policy "super_admins_update_event" on public.events
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "super_admins_delete_event" on public.events;
create policy "super_admins_delete_event" on public.events
  for delete to authenticated
  using (public.is_super_admin());


