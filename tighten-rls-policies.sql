-- Tighten RLS policies to enforce super admin and chapter admin scopes
--
-- Prerequisites (run these first if not already applied):
--   1) add-super-admins.sql          -- defines global_admins and is_super_admin()
--   2) add-chapter-admins.sql        -- defines chapter_admins table
--   3) enable-chapter-admin-rls.sql  -- defines is_chapter_admin(chapter uuid)
--
-- This script:
--   - Drops broad "Authenticated users can manage *" policies
--   - Removes broad authenticated events SELECT policy
--   - Ensures per-role policies:
--       • Super admins: full manage on chapters/events/projects
--       • Chapter admins: manage only assigned chapters and their events
--   - Keeps public read of active/published content

-- Ensure required columns/rls are present (idempotent)
alter table if exists public.events
  add column if not exists chapter_id uuid references public.chapters(id) on delete set null;

alter table public.chapters enable row level security;
alter table public.events   enable row level security;
alter table public.projects enable row level security;

-- Drop broad policies created earlier
drop policy if exists "Authenticated users can manage chapters" on public.chapters;
drop policy if exists "Authenticated users can manage events"   on public.events;
drop policy if exists "Authenticated users can manage projects" on public.projects;

-- Drop previously added broad authenticated events select policy (if applied)
drop policy if exists "authenticated_select_events" on public.events;

-- CHAPTERS
-- Public can SELECT active chapters (retain if already exists)
do $$ begin
  perform 1;
exception when others then null; end $$;

drop policy if exists "super_admins_select_chapters" on public.chapters;
create policy "super_admins_select_chapters" on public.chapters
  for select to authenticated
  using (public.is_super_admin());

drop policy if exists "chapter_admins_select_chapter" on public.chapters;
create policy "chapter_admins_select_chapter" on public.chapters
  for select to authenticated
  using (public.is_chapter_admin(id));

drop policy if exists "super_admins_insert_chapter" on public.chapters;
create policy "super_admins_insert_chapter" on public.chapters
  for insert to authenticated
  with check (public.is_super_admin());

drop policy if exists "super_admins_update_chapter" on public.chapters;
create policy "super_admins_update_chapter" on public.chapters
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "chapter_admins_update_chapter" on public.chapters;
create policy "chapter_admins_update_chapter" on public.chapters
  for update to authenticated
  using (public.is_chapter_admin(id))
  with check (public.is_chapter_admin(id));

drop policy if exists "super_admins_delete_chapter" on public.chapters;
create policy "super_admins_delete_chapter" on public.chapters
  for delete to authenticated
  using (public.is_super_admin());

-- EVENTS
-- Public can SELECT published events (retain if already exists)
do $$ begin
  perform 1;
exception when others then null; end $$;

drop policy if exists "super_admins_select_events" on public.events;
create policy "super_admins_select_events" on public.events
  for select to authenticated
  using (public.is_super_admin());

drop policy if exists "chapter_admins_select_events" on public.events;
create policy "chapter_admins_select_events" on public.events
  for select to authenticated
  using (public.is_chapter_admin(chapter_id));

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

drop policy if exists "chapter_admins_insert_event" on public.events;
create policy "chapter_admins_insert_event" on public.events
  for insert to authenticated
  with check (public.is_chapter_admin(chapter_id));

drop policy if exists "chapter_admins_update_event" on public.events;
create policy "chapter_admins_update_event" on public.events
  for update to authenticated
  using (public.is_chapter_admin(chapter_id))
  with check (public.is_chapter_admin(chapter_id));

drop policy if exists "chapter_admins_delete_event" on public.events;
create policy "chapter_admins_delete_event" on public.events
  for delete to authenticated
  using (public.is_chapter_admin(chapter_id));

-- PROJECTS
-- Keep public read of active projects; restrict manage to super admins only for now
drop policy if exists "super_admins_insert_project" on public.projects;
create policy "super_admins_insert_project" on public.projects
  for insert to authenticated
  with check (public.is_super_admin());

drop policy if exists "super_admins_update_project" on public.projects;
create policy "super_admins_update_project" on public.projects
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "super_admins_delete_project" on public.projects;
create policy "super_admins_delete_project" on public.projects
  for delete to authenticated
  using (public.is_super_admin());

-- Optional future: if you add projects.chapter_id, mirror the events policies with public.is_chapter_admin(chapter_id)

-- Done.


