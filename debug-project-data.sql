-- Debug: Check exactly what data is being returned for the OWASP Top 10 project
SELECT 
    title,
    slug,
    CASE 
        WHEN tab_main_content IS NOT NULL THEN 'HAS CONTENT' 
        ELSE 'NULL' 
    END as tab_main_status,
    CASE 
        WHEN tab_translation_content IS NOT NULL THEN 'HAS CONTENT' 
        ELSE 'NULL' 
    END as tab_translation_status,
    CASE 
        WHEN tab_sponsors_content IS NOT NULL THEN 'HAS CONTENT' 
        ELSE 'NULL' 
    END as tab_sponsors_status,
    CASE 
        WHEN tab_data_content IS NOT NULL THEN 'HAS CONTENT' 
        ELSE 'NULL' 
    END as tab_data_status,
    LENGTH(long_description) as long_desc_length,
    LEFT(long_description, 100) as long_desc_preview
FROM projects 
WHERE slug = 'owasp-top-10';
