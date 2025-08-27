-- Check if OWASP Top 10 project exists and verify the new columns
SELECT 
    title,
    slug,
    tab_main_content IS NOT NULL as has_main_content,
    tab_translation_content IS NOT NULL as has_translation_content,
    tab_sponsors_content IS NOT NULL as has_sponsors_content,
    tab_data_content IS NOT NULL as has_data_content
FROM projects 
WHERE slug = 'owasp-top-10' OR title ILIKE '%top 10%';

-- If no project found, let's see what projects exist
SELECT title, slug FROM projects WHERE status = 'active' ORDER BY title;
