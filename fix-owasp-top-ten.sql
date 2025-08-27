-- Fix OWASP Top Ten project
-- First add the project_type column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'other';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS documentation_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'intermediate';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS license TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS downloads TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS contributors INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS features TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS requirements TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS getting_started TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS maintainers TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_stars INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_updated TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description TEXT;

-- Add constraint
ALTER TABLE projects ADD CONSTRAINT check_project_type 
    CHECK (project_type IN ('flagship', 'production', 'other') OR project_type IS NULL);

-- Insert OWASP Top Ten with the correct slug to match existing links
INSERT INTO projects (
    title, 
    slug, 
    description, 
    long_description,
    category, 
    project_type, 
    status, 
    is_featured, 
    website_url,
    github_url,
    documentation_url,
    language,
    difficulty_level,
    license,
    version,
    features,
    requirements,
    getting_started,
    tags
) VALUES (
    'OWASP Top 10',
    'owasp-top-10',  -- This matches the existing hardcoded links
    'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.',
    'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

Globally recognized by developers as the first step towards more secure coding.

Companies should adopt this document and start the process of ensuring that their web applications minimize these risks. Using the OWASP Top 10 is perhaps the most effective first step towards changing the software development culture within your organization into one that produces more secure code.

## Current Status (2025)
We are on track to announce the release of the OWASP Top 10:2025 in the late summer/early fall 2025.

## Top 10 Web Application Security Risks (2021)

The current version includes three new categories, four categories with naming and scoping changes:

1. **A01:2021-Broken Access Control** - Moves up from fifth position; 94% of applications tested
2. **A02:2021-Cryptographic Failures** - Previously "Sensitive Data Exposure"
3. **A03:2021-Injection** - Slides down to third position, now includes XSS
4. **A04:2021-Insecure Design** - New category focusing on design flaws
5. **A05:2021-Security Misconfiguration** - Moves up from #6
6. **A06:2021-Vulnerable and Outdated Components** - Previously "Using Components with Known Vulnerabilities"
7. **A07:2021-Identification and Authentication Failures** - Previously "Broken Authentication"
8. **A08:2021-Software and Data Integrity Failures** - New category for 2021
9. **A09:2021-Security Logging and Monitoring Failures** - Previously "Insufficient Logging & Monitoring"
10. **A10:2021-Server-Side Request Forgery** - Added from community survey

## Available Languages
The OWASP Top 10 2021 is available in multiple languages including Arabic, Spanish, French, Indonesian, Italian, Japanese, Portuguese (Brazil), Chinese (Simplified and Traditional).',
    'Standards',
    'flagship',
    'active',
    true,
    'https://owasp.org/www-project-top-ten/',
    'https://github.com/OWASP/Top10',
    'https://owasp.org/www-project-top-ten/',
    'Documentation',
    'beginner',
    'Creative Commons Attribution-ShareAlike v4.0',
    '2021 (2025 coming soon)',
    ARRAY[
        'Standard awareness document for developers',
        'Globally recognized security framework',
        'Available in multiple languages',
        'Community-driven consensus',
        'Regular updates (every 3-4 years)',
        'Data-driven analysis',
        'Industry adoption standard'
    ],
    ARRAY[
        'Web application development knowledge',
        'Basic security awareness',
        'Understanding of common vulnerabilities',
        'Application security testing tools',
        'Development team training'
    ],
    ARRAY[
        'Download the latest OWASP Top 10 document',
        'Review each of the 10 security risks',
        'Assess your applications against the Top 10',
        'Implement security controls for each category',
        'Train your development team',
        'Integrate into your SDLC process',
        'Use as baseline for security testing'
    ],
    ARRAY[
        'web security',
        'application security',
        'vulnerability assessment',
        'secure coding',
        'security standards',
        'risk assessment',
        'developer education',
        'security framework'
    ]
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    project_type = EXCLUDED.project_type,
    is_featured = EXCLUDED.is_featured,
    website_url = EXCLUDED.website_url,
    github_url = EXCLUDED.github_url,
    documentation_url = EXCLUDED.documentation_url,
    language = EXCLUDED.language,
    difficulty_level = EXCLUDED.difficulty_level,
    license = EXCLUDED.license,
    version = EXCLUDED.version,
    features = EXCLUDED.features,
    requirements = EXCLUDED.requirements,
    getting_started = EXCLUDED.getting_started,
    tags = EXCLUDED.tags,
    updated_at = NOW();

-- Verify the project was added
SELECT title, slug, project_type, is_featured FROM projects WHERE slug = 'owasp-top-10';