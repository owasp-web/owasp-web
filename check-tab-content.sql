-- Check if the OWASP Top 10 project has the tab content
SELECT 
    title,
    slug,
    CASE WHEN tab_main_content IS NOT NULL THEN 'YES' ELSE 'NO' END as has_main_content,
    CASE WHEN tab_translation_content IS NOT NULL THEN 'YES' ELSE 'NO' END as has_translation_content,
    CASE WHEN tab_sponsors_content IS NOT NULL THEN 'YES' ELSE 'NO' END as has_sponsors_content,
    CASE WHEN tab_data_content IS NOT NULL THEN 'YES' ELSE 'NO' END as has_data_content,
    LEFT(tab_main_content, 50) as main_preview
FROM projects 
WHERE slug = 'owasp-top-10';
