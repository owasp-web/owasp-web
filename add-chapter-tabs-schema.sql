-- Add chapter-level custom tabs with rich sections and buttons

-- JSONB structure (for reference):
-- tabs: [
--   {
--     "id": "main",
--     "name": "Main",
--     "order": 1,
--     "sections": [
--       {
--         "title": "Welcome",
--         "content": "Paragraphs separated by double newlines...",
--         "buttons": [ { "label": "Join Meetup", "url": "https://meetup.com", "style": "primary" } ]
--       }
--     ]
--   }
-- ]

ALTER TABLE chapters ADD COLUMN IF NOT EXISTS tabs JSONB DEFAULT '[]'::jsonb;

-- Helpful index for containment queries
CREATE INDEX IF NOT EXISTS idx_chapters_tabs ON chapters USING GIN (tabs);

COMMENT ON COLUMN chapters.tabs IS 'Custom chapter tabs (array): {id,name,order,sections[{title,content,buttons[{label,url,style}]}]}';

COMMIT;


