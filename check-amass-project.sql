-- Check if OWASP Amass project exists in database
SELECT 
  id, 
  title, 
  slug, 
  project_type, 
  status,
  content_status,
  created_at
FROM projects 
WHERE slug = 'amass' OR title ILIKE '%amass%'
ORDER BY created_at DESC;

-- Also check total project count
SELECT COUNT(*) as total_projects FROM projects;

-- Check what projects exist
SELECT title, slug, project_type, status FROM projects ORDER BY title;
