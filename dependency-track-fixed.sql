-- OWASP Dependency-Track - FIXED Project Import (SQL Syntax Safe)

INSERT INTO projects (
  title,
  slug,
  description,
  long_description,
  category,
  status,
  project_url,
  github_url,
  website_url,
  documentation_url,
  is_featured,
  project_type,
  version,
  license,
  language,
  maintainers,
  difficulty_level,
  project_overview,
  key_features,
  installation_guide,
  tab_main_content,
  tab_overview_content,
  screenshots,
  meta_title,
  meta_description,
  related_projects,
  content_status
) VALUES (
  'OWASP Dependency-Track',
  'dependency-track',
  'Intelligent Component Analysis platform for software supply chain security using SBOM.',
  'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain using Software Bill of Materials (SBOM).',
  'Code',
  'active',
  'https://owasp.org/www-project-dependency-track/',
  'https://github.com/DependencyTrack/dependency-track',
  'https://dependencytrack.org',
  'https://docs.dependencytrack.org/',
  true,
  'flagship',
  'v4.5.0',
  'Apache 2.0',
  'Java',
  ARRAY['Steve Springett', 'Niklas Düster'],
  'intermediate',
  
  'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. The platform leverages Software Bill of Materials (SBOM) capabilities and provides an API-first design ideal for CI/CD environments.',
  
  ARRAY[
    'CycloneDX SBOM consumption and production',
    'Vulnerability intelligence from multiple sources',
    'Component usage tracking across portfolios',
    'Policy engine for security and compliance',
    'API-first design for CI/CD integration',
    'Docker container distribution',
    'Enterprise authentication support'
  ],
  
  'Install with Docker Compose: curl -LO https://dependencytrack.org/docker-compose.yml && docker-compose up -d',

  'OWASP Dependency-Track provides intelligent component analysis for software supply chain security. The platform monitors component usage across application portfolios and identifies security risks using SBOM analysis.',

  'Dependency-Track is a flagship OWASP project providing component analysis capabilities for modern software development and security teams.',

  '[
    {
      "url": "/images/dependency-track-dashboard.png",
      "caption": "Main Dashboard",
      "alt_text": "Dependency-Track main dashboard interface"
    }
  ]'::jsonb,

  'OWASP Dependency-Track - Software Supply Chain Security',
  'Intelligent component analysis platform for identifying software supply chain risks using SBOM.',
  
  ARRAY['OWASP CycloneDX', 'OWASP DefectDojo'],
  
  'published'
);

