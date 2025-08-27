-- Check the content_status of the Amass project
SELECT title, slug, status, content_status FROM projects WHERE slug = 'amass';

-- Update Amass project to have published content_status
UPDATE projects 
SET content_status = 'published' 
WHERE slug = 'amass' AND content_status IS NULL;

-- Verify the update
SELECT title, slug, status, content_status FROM projects WHERE slug = 'amass';
