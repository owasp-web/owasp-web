-- OWASP Website Database Schema
-- Run this script in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    month TEXT NOT NULL CHECK (month IN ('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC')),
    year TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Conference', 'Chapter Meeting', 'Training', 'Workshop')),
    image TEXT NOT NULL,
    price TEXT,
    registration_url TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled'))
);

-- Projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    project_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE
);

-- Chapters table
CREATE TABLE chapters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT NOT NULL CHECK (region IN ('Africa', 'Asia', 'Europe', 'North America', 'South America', 'Central America', 'Oceania')),
    description TEXT,
    meeting_info TEXT,
    contact_email TEXT,
    website_url TEXT,
    meetup_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_is_featured ON events(is_featured);
CREATE INDEX idx_events_created_at ON events(created_at);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_slug ON projects(slug);

CREATE INDEX idx_chapters_region ON chapters(region);
CREATE INDEX idx_chapters_is_active ON chapters(is_active);
CREATE INDEX idx_chapters_slug ON chapters(slug);

-- Row Level Security (RLS) policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published events
CREATE POLICY "Public can view published events" ON events
    FOR SELECT USING (status = 'published');

-- Allow public read access to active projects
CREATE POLICY "Public can view active projects" ON projects
    FOR SELECT USING (status = 'active');

-- Allow public read access to active chapters
CREATE POLICY "Public can view active chapters" ON chapters
    FOR SELECT USING (is_active = true);

-- Admin policies (authenticated users can manage all records)
-- You should replace this with proper role-based access control
CREATE POLICY "Authenticated users can manage events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage chapters" ON chapters
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO events (title, date, month, year, time, location, type, image, price, registration_url, description, is_featured, status) VALUES
('OWASP Global AppSec USA 2025', '3-7', 'NOV', '2025', '9:00 AM - 6:00 PM', 'Washington, DC', 'Conference', '/images/events/event-1.png', 'Early Bird', 'https://globalappsec.us', 'The premier application security conference in the US', true, 'published'),
('OWASP London Chapter Meeting', '19', 'MAY', '2025', '12:00-12:45 PM', 'London, UK', 'Chapter Meeting', '/images/events/event-2.png', 'Free', 'https://owasp.org/www-chapter-london', 'Monthly chapter meeting discussing latest security topics', false, 'published'),
('OWASP Berlin Meetup', '22', 'MAY', '2025', '2:00-3:30 PM', 'Berlin, Germany', 'Chapter Meeting', '/images/events/event-3.png', 'Free', null, 'Berlin chapter monthly meetup', false, 'published');

-- Note: You'll need to create an admin user in Supabase Auth
-- Then you can sign in through the admin interface 