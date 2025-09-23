-- Broaden SELECT policies so data appears in admin and public views
-- Safe: read-only access; write access remains governed by existing policies

-- Chapters: allow everyone to read active chapters
create policy if not exists "public_select_active_chapters"
on public.chapters for select to public
using (is_active = true);

-- Events: allow authenticated users (admins) to read all events
create policy if not exists "authenticated_select_events"
on public.events for select to authenticated
using (true);

-- Optionally, allow public to read only published events (uncomment if needed)
-- create policy if not exists "public_select_published_events"
-- on public.events for select to anon
-- using (status = 'published');


