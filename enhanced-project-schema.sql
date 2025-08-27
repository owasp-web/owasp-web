-- Enhanced Project Schema for Comprehensive Local Project Pages
-- This schema supports full project content hosting locally

-- Add comprehensive content fields to support complete project pages
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_overview TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS installation_guide TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS usage_examples TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS api_documentation TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS security_considerations TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS best_practices TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS troubleshooting TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS changelog TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS roadmap TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS community_guidelines TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS contribution_guide TEXT;

-- Enhanced tab content with full HTML support
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_overview_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_documentation_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_downloads_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_community_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_contribute_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_support_content TEXT;

-- Project resources and assets
ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots JSONB; -- Array of screenshot URLs with captions
ALTER TABLE projects ADD COLUMN IF NOT EXISTS videos JSONB; -- Array of video URLs with descriptions
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tutorials JSONB; -- Array of tutorial links
ALTER TABLE projects ADD COLUMN IF NOT EXISTS case_studies JSONB; -- Array of case studies
ALTER TABLE projects ADD COLUMN IF NOT EXISTS integrations JSONB; -- Array of integration guides
ALTER TABLE projects ADD COLUMN IF NOT EXISTS third_party_tools JSONB; -- Compatible tools and services

-- Project metrics and statistics
ALTER TABLE projects ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS active_installations INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS security_advisories JSONB; -- Security notices
ALTER TABLE projects ADD COLUMN IF NOT EXISTS release_notes JSONB; -- Version release information

-- SEO and metadata
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_keywords TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- Project relationships
ALTER TABLE projects ADD COLUMN IF NOT EXISTS related_projects TEXT[]; -- Array of related project slugs
ALTER TABLE projects ADD COLUMN IF NOT EXISTS dependencies TEXT[]; -- Array of project dependencies
ALTER TABLE projects ADD COLUMN IF NOT EXISTS dependents TEXT[]; -- Array of projects that depend on this

-- Enhanced classification
ALTER TABLE projects ADD COLUMN IF NOT EXISTS industry_usage TEXT[]; -- Industries using this project
ALTER TABLE projects ADD COLUMN IF NOT EXISTS compliance_standards TEXT[]; -- Standards this project helps with
ALTER TABLE projects ADD COLUMN IF NOT EXISTS threat_categories TEXT[]; -- OWASP Top 10 categories addressed

-- Content versioning and management
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_version TEXT DEFAULT '1.0';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_reviewer TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_status TEXT DEFAULT 'draft' CHECK (content_status IN ('draft', 'review', 'published', 'archived'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_content_status ON projects(content_status);
CREATE INDEX IF NOT EXISTS idx_projects_project_type_featured ON projects(project_type, is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_category_status ON projects(category, status);
CREATE INDEX IF NOT EXISTS idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_projects_related ON projects USING GIN(related_projects);

-- Create a view for published projects with all content
CREATE OR REPLACE VIEW published_projects AS
SELECT 
    id, created_at, updated_at, title, slug, description, long_description,
    image, category, status, project_url, github_url, website_url, documentation_url,
    is_featured, project_type, github_stars, last_updated, version, downloads,
    contributors, features, requirements, getting_started, tags, license, language,
    maintainers, difficulty_level,
    
    -- Tab content
    tab_main_content, tab_translation_content, tab_sponsors_content, tab_data_content,
    tab_overview_content, tab_documentation_content, tab_downloads_content,
    tab_community_content, tab_contribute_content, tab_support_content,
    
    -- Enhanced content
    project_overview, key_features, installation_guide, usage_examples,
    api_documentation, security_considerations, best_practices, troubleshooting,
    changelog, roadmap, community_guidelines, contribution_guide,
    
    -- Resources
    project_links, project_leaders, social_links, screenshots, videos, tutorials,
    case_studies, integrations, third_party_tools,
    
    -- Metrics
    download_count, active_installations, security_advisories, release_notes,
    
    -- SEO
    meta_title, meta_description, meta_keywords, canonical_url,
    
    -- Relationships
    related_projects, dependencies, dependents, industry_usage,
    compliance_standards, threat_categories,
    
    -- Management
    content_version, content_last_updated, content_reviewer
FROM projects 
WHERE status = 'active' AND content_status = 'published';

-- Function to update content timestamp
CREATE OR REPLACE FUNCTION update_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.content_last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update content timestamp
DROP TRIGGER IF EXISTS trigger_update_content_timestamp ON projects;
CREATE TRIGGER trigger_update_content_timestamp
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_content_timestamp();

COMMIT;
