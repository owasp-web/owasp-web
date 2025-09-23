-- Create chapter_admins table to manage per-chapter admin assignments
-- Run this in Supabase SQL editor or via your migration process

create table if not exists public.chapter_admins (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  email text not null,
  user_id uuid null,
  created_at timestamp with time zone not null default now(),
  unique (chapter_id, email)
);

-- Enable RLS; all CRUD is intended via service role through API routes
alter table public.chapter_admins enable row level security;

-- Optional read policy for authenticated users assigned to a chapter
-- Uncomment and adapt if you later want chapter admins to read their membership client-side.
-- create policy "chapter_admins_select_self" on public.chapter_admins
--   for select to authenticated
--   using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists idx_chapter_admins_chapter_id on public.chapter_admins(chapter_id);
create index if not exists idx_chapter_admins_email on public.chapter_admins(email);


