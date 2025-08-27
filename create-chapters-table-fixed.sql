-- Create chapters table for OWASP chapters management (FIXED VERSION)

-- Drop table if it exists to start fresh
DROP TABLE IF EXISTS chapters CASCADE;

-- Create the chapters table
CREATE TABLE chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  country_flag VARCHAR(10),
  region VARCHAR(50) NOT NULL,
  description TEXT,
  tagline TEXT,
  
  -- Hero Section
  hero_description TEXT,
  hero_highlight_title VARCHAR(255),
  hero_highlight_description TEXT,
  
  -- Rich Content (stored as JSONB for flexibility)
  about_content TEXT,
  mission_points JSONB DEFAULT '[]'::jsonb,
  focus_areas JSONB DEFAULT '[]'::jsonb,
  tech_ecosystem JSONB DEFAULT '[]'::jsonb,
  leadership_team JSONB DEFAULT '[]'::jsonb,
  events JSONB DEFAULT '[]'::jsonb,
  past_events JSONB DEFAULT '[]'::jsonb,
  next_event JSONB,
  
  -- Contact and Social
  contact_email VARCHAR(255),
  website_url TEXT,
  meetup_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  
  -- Meeting Information
  meeting_info TEXT,
  meeting_schedule VARCHAR(255),
  
  -- Economic/Impact Data
  economic_impact JSONB,
  
  -- Supporters and Partnerships
  supporters JSONB DEFAULT '[]'::jsonb,
  partnerships JSONB DEFAULT '[]'::jsonb,
  
  -- Administrative
  is_active BOOLEAN DEFAULT true,
  content_status VARCHAR(20) DEFAULT 'draft'
);

-- Add constraints after table creation
ALTER TABLE chapters ADD CONSTRAINT check_region 
  CHECK (region IN ('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Central America', 'Oceania'));

ALTER TABLE chapters ADD CONSTRAINT check_content_status 
  CHECK (content_status IN ('draft', 'published', 'archived'));

-- Create indexes for better performance
CREATE INDEX idx_chapters_slug ON chapters(slug);
CREATE INDEX idx_chapters_region ON chapters(region);
CREATE INDEX idx_chapters_is_active ON chapters(is_active);
CREATE INDEX idx_chapters_content_status ON chapters(content_status);
CREATE INDEX idx_chapters_city ON chapters(city);
CREATE INDEX idx_chapters_country ON chapters(country);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_chapters_updated_at 
    BEFORE UPDATE ON chapters 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for existing chapters
INSERT INTO chapters (
  name, slug, city, country, country_flag, region, description, tagline,
  hero_description, hero_highlight_title, hero_highlight_description,
  about_content, mission_points, focus_areas, tech_ecosystem, economic_impact,
  contact_email, website_url, meetup_url, linkedin_url, facebook_url, youtube_url,
  is_active, content_status
) VALUES 
(
  'OWASP Lagos',
  'lagos',
  'Lagos',
  'Nigeria',
  '🇳🇬',
  'Africa',
  'Africa''s economic powerhouse cybersecurity chapter',
  'Securing Africa''s economic powerhouse and protecting innovations that connect, finance, and empower hundreds of millions across Nigeria and the continent.',
  'Africa''s economic powerhouse. OWASP Lagos secures the innovations flowing from Nigeria''s financial capital, home to Flutterwave, Paystack, and the continent''s most dynamic fintech ecosystem serving over 200 million people.',
  '💰 Fintech Capital of Africa',
  'Protecting $100B+ in transactions across Nigeria''s leading fintech companies',
  'Lagos stands as Africa''s undisputed economic powerhouse, home to over 20 million people and the continent''s largest concentration of fintech companies, banks, and digital innovations. As Nigeria''s commercial capital, Lagos drives technological advancement across West Africa and beyond.

OWASP Lagos operates at the epicenter of African fintech innovation, working with industry leaders like Flutterwave, Paystack, and Interswitch to ensure that Nigeria''s digital economy is built on unshakeable security foundations.',
  '["Secure Nigeria''s $100B+ fintech ecosystem", "Protect 200M+ users across payment platforms", "Lead West African cybersecurity standards", "Support Africa''s largest startup ecosystem", "Foster digital innovation with security-first practices"]'::jsonb,
  '[
    {"icon": "🏙️", "title": "Megacity Security", "description": "Protecting Africa''s largest urban economy with 20M+ people and massive digital infrastructure"},
    {"icon": "💰", "title": "Fintech Capital", "description": "Securing Nigeria''s $100B+ fintech ecosystem and pan-African payment networks"},
    {"icon": "🌍", "title": "West African Gateway", "description": "Leading cybersecurity initiatives across Nigeria, Ghana, Senegal, and the broader region"},
    {"icon": "🏦", "title": "Banking Hub", "description": "Supporting Africa''s largest banking sector with advanced security frameworks"},
    {"icon": "🎬", "title": "Nollywood Digital", "description": "Securing Nigeria''s creative economy and digital entertainment platforms"},
    {"icon": "🚀", "title": "Startup Ecosystem", "description": "Nurturing Africa''s most vibrant startup scene with security-first practices"}
  ]'::jsonb,
  '[
    {"name": "Flutterwave", "sector": "Fintech", "description": "Pan-African payment infrastructure", "impact": "$150B+ processed"},
    {"name": "Paystack", "sector": "Fintech", "description": "Payment processing for businesses", "impact": "Acquired by Stripe"},
    {"name": "Andela", "sector": "Tech Talent", "description": "Global software engineering talent", "impact": "100+ countries"},
    {"name": "Interswitch", "sector": "Financial Services", "description": "Digital payment infrastructure", "impact": "30M+ users"}
  ]'::jsonb,
  '{
    "people_protected": "20M+ people across Nigeria''s largest urban economy",
    "economy_secured": "$100B+ fintech ecosystem and payment networks",
    "regional_influence": ["Nigeria", "Ghana", "Senegal", "West Africa"]
  }'::jsonb,
  'lagos@owasp.org',
  'https://owasp.org/www-chapter-lagos/',
  'https://www.meetup.com/owasp-lagos/',
  'https://www.linkedin.com/company/owasp-lagos/',
  'https://www.facebook.com/OWASPLagos/',
  'https://www.youtube.com/channel/UCxxxxxx',
  true,
  'published'
),
(
  'OWASP Tunisia',
  'tunisia',
  'Tunis',
  'Tunisia',
  '🇹🇳',
  'Africa',
  'North Africa''s cybersecurity excellence hub',
  'Be part of North Africa''s premier cybersecurity community. Join us in driving innovation, fostering collaboration, and shaping the future of regional cybersecurity.',
  'North Africa''s cybersecurity excellence hub. OWASP Tunisia stands as a regional bridge between Africa and Europe, driving cutting-edge security research, government partnerships, and community-driven innovation across the MENA region.',
  '🌉 Regional Bridge',
  'Connecting Africa and Europe through cybersecurity excellence and cross-border collaboration',
  'The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. All of our projects, tools, documents, forums, and chapters are free and open to anyone interested in improving application security.

Follow chapter news on Facebook, LinkedIn, YouTube and Meetup. We schedule our meetings on the Meetup.',
  '[]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  '{}'::jsonb,
  'nihel.benyoussef@owasp.org',
  'https://owasp.org/www-chapter-tunisia/',
  'https://www.meetup.com/fr-FR/owasp-tunis-meetup-group/',
  'https://www.linkedin.com/company/owasp-tunisia/',
  'https://www.facebook.com/OWASPTunisia/',
  'https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA',
  true,
  'published'
);

-- Add more sample chapters for other regions
INSERT INTO chapters (
  name, slug, city, country, country_flag, region, 
  hero_description, hero_highlight_title, hero_highlight_description,
  contact_email, is_active, content_status
) VALUES 
('OWASP Cairo', 'cairo', 'Cairo', 'Egypt', '🇪🇬', 'Africa', 
 'Egypt''s cybersecurity excellence hub protecting the digital transformation of the Middle East and North Africa.',
 '🏛️ Ancient Wisdom, Modern Security', 'Bridging millennia of knowledge with cutting-edge cybersecurity practices',
 'cairo@owasp.org', true, 'draft'),
 
('OWASP Cape Town', 'cape-town', 'Cape Town', 'South Africa', '🇿🇦', 'Africa',
 'South Africa''s cybersecurity innovation center driving continental digital security standards.',
 '🌍 Gateway to Africa', 'Leading cybersecurity excellence across the African continent',
 'capetown@owasp.org', true, 'draft'),

('OWASP Nairobi', 'nairobi', 'Nairobi', 'Kenya', '🇰🇪', 'Africa',
 'East Africa''s cybersecurity hub fostering innovation and security across the region.',
 '🦁 Digital Safari Security', 'Protecting East Africa''s rapidly growing tech ecosystem',
 'nairobi@owasp.org', true, 'draft');

-- Add comments for documentation
COMMENT ON TABLE chapters IS 'OWASP chapters worldwide with rich content support';
COMMENT ON COLUMN chapters.focus_areas IS 'Array of focus area objects with icon, title, and description';
COMMENT ON COLUMN chapters.tech_ecosystem IS 'Array of local tech companies and their details';
COMMENT ON COLUMN chapters.leadership_team IS 'Array of chapter leaders with names, roles, and contact info';
COMMENT ON COLUMN chapters.events IS 'Array of recent and upcoming events';
COMMENT ON COLUMN chapters.economic_impact IS 'Object containing economic impact metrics';
COMMENT ON COLUMN chapters.mission_points IS 'Array of mission statement bullet points';
