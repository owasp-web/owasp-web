-- Add volunteers field to chapters table for storing volunteer information

-- Add volunteers column if it doesn't exist
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS volunteers JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN chapters.volunteers IS 'Array of volunteer names for the chapter';

-- Create index for volunteers field (optional, for queries)
CREATE INDEX IF NOT EXISTS idx_chapters_volunteers ON chapters USING GIN (volunteers);

COMMIT;
