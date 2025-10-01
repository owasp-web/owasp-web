-- Add hero media and highlights to projects
ALTER TABLE projects 
  ADD COLUMN IF NOT EXISTS hero_video_url TEXT,
  ADD COLUMN IF NOT EXISTS hero_image TEXT,
  ADD COLUMN IF NOT EXISTS hero_gif_url TEXT,
  ADD COLUMN IF NOT EXISTS hero_highlights JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS overview_sections JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS hero_buttons JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN projects.hero_highlights IS 'Array of objects: {title, value, url} rendered as hero highlight chips/links';
COMMENT ON COLUMN projects.overview_sections IS 'Optional sections JSON for the project overview page, parallel to tab sections';
COMMENT ON COLUMN projects.hero_buttons IS 'Buttons displayed in the hero: [{label, url, style}]';


