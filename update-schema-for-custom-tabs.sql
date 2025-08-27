-- Update database schema to support custom tabs

-- Add support for custom tabs as JSONB
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tabs JSONB DEFAULT '[]'::jsonb;

-- Create an index on the tabs column for better performance
CREATE INDEX IF NOT EXISTS idx_projects_tabs ON projects USING GIN (tabs);

-- Add a comment for documentation
COMMENT ON COLUMN projects.tabs IS 'Custom project tabs with id, name, content, and order fields as JSONB array';

-- Example of how tabs should be structured:
-- [
--   {
--     "id": "main",
--     "name": "Main", 
--     "content": "Main tab content here...",
--     "order": 1
--   },
--   {
--     "id": "features",
--     "name": "Features",
--     "content": "Features content with [YOUTUBE]https://youtube.com/watch?v=abc[/YOUTUBE] embeds...", 
--     "order": 2
--   }
-- ]
