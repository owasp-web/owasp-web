-- Check what columns actually exist in the projects table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'projects' 
ORDER BY ordinal_position;

-- Also try a very basic query to see if it works
SELECT id, title, slug FROM projects WHERE slug = 'amass';
