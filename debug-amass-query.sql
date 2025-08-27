-- Test the exact query that the app is running
SELECT 
  id, created_at, updated_at, title, slug, description, long_description,
  image, category, status, project_url, github_url, website_url,
  documentation_url, is_featured, project_type, github_stars,
  last_updated, version, downloads, contributors, features,
  requirements, getting_started, tags, license, language,
  maintainers, difficulty_level
FROM projects 
WHERE slug = 'amass' AND status = 'active';

-- Also check if the new fields exist and have data
SELECT 
  slug, 
  project_overview, 
  tab_main_content, 
  tab_overview_content,
  screenshots,
  content_status
FROM projects 
WHERE slug = 'amass';
