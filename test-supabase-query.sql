-- Test the exact query that the app should be making
SELECT 
    id, created_at, updated_at, title, slug, description, long_description, 
    image, category, status, project_url, github_url, website_url, 
    documentation_url, is_featured, project_type, github_stars, 
    last_updated, version, downloads, contributors, features, 
    requirements, getting_started, tags, license, language, 
    maintainers, difficulty_level,
    -- These are the new fields
    tab_main_content, tab_translation_content, tab_sponsors_content, tab_data_content
FROM projects 
WHERE slug = 'owasp-top-10' AND status = 'active';
