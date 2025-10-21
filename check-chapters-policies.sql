-- Check all RLS policies on chapters table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'chapters';

-- Also check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'chapters';

-- Test query - see if we can select chapters as anon
SET ROLE anon;
SELECT COUNT(*), array_agg(name) as chapter_names FROM chapters WHERE is_active = true;
RESET ROLE;


