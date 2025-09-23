-- Add chapter scoping to events and enable RLS policies for chapter admins

-- 1) Ensure events has chapter_id linkage
alter table if exists public.events
  add column if not exists chapter_id uuid null references public.chapters(id) on delete set null;

-- 2) Helper function: check if current user is admin for a chapter
create or replace function public.is_chapter_admin(chapter uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.chapter_admins ca
    where ca.chapter_id = chapter
      and (
        ca.user_id = auth.uid()
        or lower(ca.email) = lower(coalesce((auth.jwt() ->> 'email')::text, ''))
      )
  );
$$;

-- 3) Chapters RLS: allow admins of a chapter to update that chapter
alter table public.chapters enable row level security;

drop policy if exists "chapter_admins_update_chapter" on public.chapters;
create policy "chapter_admins_update_chapter" on public.chapters
  for update to authenticated
  using (public.is_chapter_admin(id))
  with check (public.is_chapter_admin(id));

-- 4) Events RLS: allow admins of chapter to manage its events
alter table public.events enable row level security;

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

-- Optional: allow chapter admins to select their own chapter and events
-- (Selection is typically already permitted; enable if needed)
-- drop policy if exists "chapter_admins_select_events" on public.events;
-- create policy "chapter_admins_select_events" on public.events
--   for select to authenticated
--   using (chapter_id is null or public.is_chapter_admin(chapter_id));


