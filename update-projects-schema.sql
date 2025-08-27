-- Update projects table schema to match OWASP project requirements
-- Run this in your Supabase SQL editor

-- First, add new columns to the existing projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'other' CHECK (project_type IN ('flagship', 'production', 'other')),
ADD COLUMN IF NOT EXISTS github_stars INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_updated DATE,
ADD COLUMN IF NOT EXISTS version TEXT,
ADD COLUMN IF NOT EXISTS downloads TEXT,
ADD COLUMN IF NOT EXISTS contributors INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS documentation_url TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[], -- Array of features
ADD COLUMN IF NOT EXISTS requirements TEXT[], -- Array of requirements
ADD COLUMN IF NOT EXISTS getting_started TEXT[], -- Array of getting started steps
ADD COLUMN IF NOT EXISTS tags TEXT[], -- Array of tags/categories
ADD COLUMN IF NOT EXISTS license TEXT DEFAULT 'Apache-2.0',
ADD COLUMN IF NOT EXISTS language TEXT,
ADD COLUMN IF NOT EXISTS maintainers TEXT[], -- Array of maintainer names
ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'intermediate' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced'));

-- Update existing category column to match OWASP categories
ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_category_check;

ALTER TABLE projects 
ADD CONSTRAINT projects_category_check 
CHECK (category IN (
    'Code', 'Documentation', 'Standards', 'Tool', 
    'Framework', 'Guide', 'Testing', 'Security', 
    'Vulnerability Management', 'Web Application Security',
    'Mobile Security', 'API Security', 'Cloud Security',
    'DevSecOps', 'Training', 'Authentication', 'Authorization',
    'Cryptography', 'Threat Modeling', 'Asset Discovery',
    'Penetration Testing', 'Static Analysis', 'Dynamic Analysis'
));

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_language ON projects(language);
CREATE INDEX IF NOT EXISTS idx_projects_difficulty_level ON projects(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_projects_tags ON projects USING GIN(tags);

-- Update the updated_at trigger to work with the new columns
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample OWASP flagship projects
INSERT INTO projects (
    title, slug, description, long_description, image, category, 
    project_type, github_url, website_url, documentation_url,
    features, requirements, getting_started, tags, language,
    difficulty_level, is_featured, status
) VALUES 
(
    'OWASP Application Security Verification Standard (ASVS)',
    'asvs',
    'The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.',
    'The primary aim of the OWASP Application Security Verification Standard (ASVS) Project is to normalize the range in the coverage and level of rigor available in the market when it comes to performing Web application security verification using a commercially-workable open standard. The standard provides a basis for testing application technical security controls, as well as any technical security controls in the environment, that are relied on to protect against vulnerabilities such as Cross-Site Scripting (XSS) and SQL injection.',
    '/images/asvs-logo.png',
    'Standards',
    'flagship',
    'https://github.com/OWASP/ASVS',
    'https://owasp.org/www-project-application-security-verification-standard/',
    'https://github.com/OWASP/ASVS/tree/master/4.0',
    ARRAY['Comprehensive security requirements framework', 'Three levels of verification (L1, L2, L3)', 'Covers 14 security categories', 'Industry standard for application security'],
    ARRAY['Understanding of web application security', 'Basic knowledge of security testing', 'Familiarity with security frameworks'],
    ARRAY['Download the latest ASVS standard document', 'Identify your application security verification level', 'Map security requirements to ASVS controls', 'Implement verification testing'],
    ARRAY['verification', 'standard', 'security-testing', 'web-application'],
    'Documentation',
    'intermediate',
    true,
    'active'
),
(
    'OWASP Top Ten',
    'top-ten',
    'The OWASP Top 10 is the reference standard for the most critical web application security risks.',
    'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications. Globally recognized by developers as the first step towards more secure coding.',
    '/images/icons/project-owasp-top-10.png',
    'Standards',
    'flagship',
    'https://github.com/OWASP/Top10',
    'https://owasp.org/www-project-top-ten/',
    'https://owasp.org/Top10/',
    ARRAY['Top 10 most critical web application security risks', 'Regular updates reflecting current threat landscape', 'Educational content for developers', 'Risk assessment methodology'],
    ARRAY['Basic understanding of web applications', 'Knowledge of common vulnerability classes'],
    ARRAY['Read the latest Top 10 document', 'Assess your applications against each risk', 'Implement recommended mitigations', 'Train your development team'],
    ARRAY['top-10', 'web-security', 'vulnerabilities', 'awareness'],
    'Documentation',
    'beginner',
    true,
    'active'
),
(
    'OWASP Juice Shop',
    'juice-shop',
    'Probably the most modern and sophisticated insecure web application for security trainings, awareness demos and CTFs.',
    'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!',
    '/images/icons/project-juice-shop.png',
    'Tool',
    'flagship',
    'https://github.com/bkimminich/juice-shop',
    'https://owasp-juice.shop',
    'https://pwning.owasp-juice.shop',
    ARRAY['Modern vulnerable web application', 'OWASP Top 10 vulnerabilities included', 'CTF support with built-in hacking instructor', 'Multiple deployment options'],
    ARRAY['Node.js 16+ for local setup', 'Docker for containerized deployment', 'Basic web application knowledge'],
    ARRAY['Run with Docker: docker run --rm -p 3000:3000 bkimminich/juice-shop', 'Access application at http://localhost:3000', 'Follow hacking instructor for guided challenges', 'Check documentation for advanced setup'],
    ARRAY['training', 'vulnerable-app', 'ctf', 'education', 'javascript'],
    'JavaScript',
    'beginner',
    true,
    'active'
),
(
    'OWASP Dependency-Check',
    'dependency-check',
    'Software Composition Analysis (SCA) tool that identifies project dependencies and checks for known vulnerabilities.',
    'Dependency-Check is a Software Composition Analysis (SCA) tool that attempts to detect publicly disclosed vulnerabilities contained within a project dependencies. It does this by determining if there is a Common Platform Enumeration (CPE) identifier for a given dependency. If found, it will generate a report linking to the associated CVE entries.',
    '/images/icons/project-dependency-check.png',
    'Tool',
    'flagship',
    'https://github.com/jeremylong/DependencyCheck',
    'https://owasp.org/www-project-dependency-check/',
    'https://jeremylong.github.io/DependencyCheck/',
    ARRAY['Identifies known vulnerabilities in dependencies', 'Supports multiple languages and package managers', 'Jenkins, Maven, Gradle, SBT plugins available', 'Command line tool and GUI available'],
    ARRAY['Java 8+ runtime environment', 'Internet connectivity for vulnerability database updates', 'Project with dependency manifest files'],
    ARRAY['Download and install dependency-check CLI', 'Run scan: dependency-check --project "MyProject" --scan "/path/to/project"', 'Review generated HTML report', 'Integrate into CI/CD pipeline'],
    ARRAY['sca', 'vulnerability-scanning', 'dependencies', 'security', 'java'],
    'Java',
    'intermediate',
    true,
    'active'
),
(
    'OWASP ModSecurity Core Rule Set',
    'modsecurity-crs',
    'Generic attack detection rules for use with ModSecurity or compatible web application firewalls.',
    'The OWASP ModSecurity Core Rule Set (CRS) is a set of generic attack detection rules for use with ModSecurity or compatible web application firewalls. The CRS aims to protect web applications from a wide range of attacks, including the OWASP Top Ten, with a minimum of false alerts.',
    '/images/icons/project-crs.png',
    'Tool',
    'flagship',
    'https://github.com/coreruleset/coreruleset',
    'https://coreruleset.org/',
    'https://coreruleset.org/docs/',
    ARRAY['Generic attack detection rules', 'Protection against OWASP Top 10', 'Low false positive rates', 'Compatible with multiple WAF engines'],
    ARRAY['ModSecurity or compatible WAF', 'Web server (Apache, Nginx, IIS)', 'Basic understanding of WAF concepts'],
    ARRAY['Install ModSecurity on your web server', 'Download and configure CRS rules', 'Test with your application', 'Monitor and tune rules as needed'],
    ARRAY['waf', 'web-application-firewall', 'modsecurity', 'security-rules'],
    'Configuration',
    'advanced',
    true,
    'active'
) 
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    long_description = EXCLUDED.long_description,
    features = EXCLUDED.features,
    requirements = EXCLUDED.requirements,
    getting_started = EXCLUDED.getting_started,
    updated_at = NOW();

-- Add more sample projects from different categories
INSERT INTO projects (
    title, slug, description, long_description, image, category, 
    project_type, github_url, website_url, documentation_url,
    tags, language, difficulty_level, status
) VALUES 
(
    'OWASP OWTF',
    'owtf',
    'Offensive Web Testing Framework (OWTF), is an OWASP+PTES focused try to unite great tools and make pen testing more efficient.',
    'OWASP OWTF is a tool to make security assessments as efficient as possible by automating the execution of security testing tools. It is very suitable for penetration testing teams looking to save time and increase their testing coverage.',
    '/images/icons/project-owtf.png',
    'Tool',
    'production',
    'https://github.com/owtf/owtf',
    'https://owasp.org/www-project-owtf/',
    'https://docs.owtf.org/',
    ARRAY['penetration-testing', 'automation', 'web-security', 'python'],
    'Python',
    'advanced',
    'active'
),
(
    'OWASP Dependency-Track',
    'dependency-track',
    'Intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain.',
    'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. Dependency-Track takes a unique and highly beneficial approach by leveraging the capabilities of Software Bill of Materials (SBOM).',
    '/images/icons/project-dependency-track.png',
    'Tool',
    'flagship',
    'https://github.com/DependencyTrack/dependency-track',
    'https://dependencytrack.org/',
    'https://docs.dependencytrack.org/',
    ARRAY['sbom', 'supply-chain', 'vulnerability-management', 'java'],
    'Java',
    'intermediate',
    'active'
)
ON CONFLICT (slug) DO NOTHING;