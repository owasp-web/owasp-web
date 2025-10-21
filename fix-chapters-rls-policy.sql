-- Fix RLS policy for chapters to allow anonymous (public website) access
-- This allows the public website to read active chapters

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "public_select_active_chapters" ON public.chapters;

-- Create a new policy that works for both anonymous and authenticated users
CREATE POLICY "anon_and_auth_select_active_chapters"
ON public.chapters
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Verify RLS is enabled (it should be already)
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

