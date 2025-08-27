-- Setup Enhanced Schema and Import OWASP Juice Shop
-- Run this script to add all required columns and then import Juice Shop

-- First, add all the enhanced columns to the projects table
BEGIN;

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

COMMIT;

-- Now insert the OWASP Juice Shop project
INSERT INTO projects (
  id,
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
  github_stars,
  version,
  downloads,
  contributors,
  features,
  requirements,
  getting_started,
  tags,
  license,
  language,
  maintainers,
  difficulty_level,
  
  -- Enhanced content fields
  project_overview,
  key_features,
  installation_guide,
  usage_examples,
  security_considerations,
  best_practices,
  troubleshooting,
  changelog,
  roadmap,
  community_guidelines,
  contribution_guide,
  
  -- Tab content fields
  tab_main_content,
  tab_overview_content,
  tab_documentation_content,
  tab_downloads_content,
  tab_community_content,
  tab_contribute_content,
  tab_support_content,
  
  -- Rich media content
  screenshots,
  videos,
  tutorials,
  case_studies,
  integrations,
  third_party_tools,
  
  -- Metrics and statistics
  download_count,
  security_advisories,
  release_notes,
  
  -- SEO and metadata
  meta_title,
  meta_description,
  meta_keywords,
  canonical_url,
  
  -- Project relationships
  related_projects,
  dependencies,
  industry_usage,
  compliance_standards,
  threat_categories,
  
  -- Content management
  content_version,
  content_last_updated,
  content_reviewer,
  content_status,
  
  -- Legacy fields
  project_links,
  project_leaders,
  social_links,
  
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'OWASP Juice Shop',
  'juice-shop',
  'The most modern and sophisticated insecure web application for security training, awareness demos, CTFs and security tool testing.',
  'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!',
  'Code',
  'active',
  'https://owasp.org/www-project-juice-shop/',
  'https://github.com/juice-shop/juice-shop',
  'https://juice-shop.herokuapp.com/',
  'https://pwning.owasp-juice.shop',
  true,
  'flagship',
  12000, -- GitHub stars from the page
  'v18.0.0',
  '1M+ Docker pulls',
  100,
  ARRAY[
    'Modern JavaScript/TypeScript application',
    'Node.js, Express and Angular technology stack',
    'Vast number of hacking challenges',
    'Score board with progress tracking',
    'Beginner-friendly with hacking instructor scripts',
    'Gamification with challenge notifications',
    'Self-healing - resets on every startup',
    'Fully customizable and re-brandable',
    'CTF support with flag codes',
    'Over 20 coding challenges',
    'API and webhook integration',
    'Multiple installation options'
  ],
  ARRAY[
    'Node.js 18+ or Docker',
    'Modern web browser',
    '2GB RAM minimum',
    'Internet connection for dependencies'
  ],
  ARRAY[
    'Install via npm: npm install -g juice-shop',
    'Run with: juice-shop',
    'Access at http://localhost:3000',
    'Alternative: Docker run -p 3000:3000 bkimminich/juice-shop'
  ],
  ARRAY[
    'vulnerable-application',
    'security-training',
    'web-security',
    'owasp-top-10',
    'ctf',
    'javascript',
    'nodejs',
    'angular',
    'penetration-testing',
    'security-tools',
    'educational'
  ],
  'MIT',
  'JavaScript/TypeScript',
  ARRAY['Björn Kimminich', 'Jannik Hollenbach'],
  'beginner',
  
  -- Enhanced content fields
  'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!

Juice Shop is written in Node.js, Express and Angular. It was the first application written entirely in JavaScript listed in the OWASP VWA Directory.

The application contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities. The hacking progress is tracked on a score board. Finding this score board is actually one of the (easy) challenges!

Apart from the hacker and awareness training use case, pentesting proxies or security scanners can use Juice Shop as a "guinea pig"-application to check how well their tools cope with JavaScript-heavy application frontends and REST APIs.',
  
  ARRAY[
    'Free and Open source: Licensed under the MIT license with no hidden costs or caveats',
    'Easy-to-install: Choose between node.js, Docker and Vagrant to run on Windows/Mac/Linux as well as all major cloud providers',
    'Self-contained: Additional dependencies are pre-packaged or will be resolved and downloaded automatically',
    'Beginner-friendly: Hacking Instructor scripts with optional tutorial mode guide newcomers through several challenges while explaining the underlying vulnerabilities',
    'Gamification: The application notifies you on solved challenges and keeps track of successfully exploited vulnerabilities on a Score Board',
    'Self-healing: Wiped clean and repopulated from scratch on every server startup while automatically persisting progress in your browser or via manual local backup',
    'Re-branding: Fully customizable in business context and look & feel to your own corporate or customer requirements',
    'CTF-support: Challenge notifications optionally contain a flag code for your own Capture-The-Flag events',
    'Coding Challenges: Over 20 hacking challenges come with an additional Coding Challenge where finding and fixing the responsible code flaw can be trained',
    'Interoperability: Integrate with your own training systems via WebHook, monitor the extensive metrics or consume challenge information directly via API or file import'
  ],
  
  '## Installation Options

### From Source
```bash
git clone https://github.com/juice-shop/juice-shop.git --depth 1
cd juice-shop
npm install
npm start
```

### Docker
```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

### Packaged Distributions
- Download from GitHub Releases
- Available on SourceForge
- NPM package: `npm install -g juice-shop`

### Cloud Deployment
- Heroku: One-click deployment available
- AWS, Google Cloud, Azure: Docker container deployment
- Kubernetes: Use official Helm charts',

  '## Basic Usage

1. **Start the Application**: Navigate to http://localhost:3000
2. **Find the Score Board**: This is your first challenge!
3. **Explore Vulnerabilities**: Browse the application and try to find security flaws
4. **Track Progress**: Check the score board to see solved challenges
5. **Use Hacking Instructor**: Enable tutorial mode for guided challenges

## Advanced Usage

### CTF Mode
Enable CTF flags for organized events:
```bash
set NODE_ENV=ctf
npm start
```

### Custom Configuration
Modify `config/default.yml` for:
- Custom branding
- Challenge difficulty
- Application behavior

### API Integration
- REST API available at `/api/`
- WebHook notifications
- Challenge data export',

  'Juice Shop contains vulnerabilities spanning the entire OWASP Top 10 and beyond. Categories include:

- **Broken Access Control**: Admin sections, CSRF, basket manipulation
- **Broken Authentication**: Password reset flaws, 2FA bypass
- **Injection Flaws**: SQL injection, NoSQL injection, command injection
- **XSS Vulnerabilities**: Reflected, stored, and DOM-based XSS
- **Cryptographic Issues**: Weak encryption, hash collisions
- **Security Misconfiguration**: Exposed endpoints, debug information
- **Sensitive Data Exposure**: Information disclosure, privacy violations

All vulnerabilities are intentionally designed for educational purposes.',

  '## Security Training Best Practices

1. **Controlled Environment**: Always run in isolated environment
2. **Educational Purpose**: Use only for legitimate security training
3. **No Production Use**: Never deploy on production networks
4. **Guided Learning**: Start with hacking instructor tutorials
5. **Progressive Difficulty**: Begin with easy challenges
6. **Document Learning**: Keep notes on discovered vulnerabilities

## Teaching Guidelines

- Explain vulnerability context before exploitation
- Demonstrate both attack and defense
- Reference OWASP cheat sheets for mitigation
- Encourage responsible disclosure practices',

  '## Common Issues

### Installation Problems
- **Node.js Version**: Ensure Node.js 18+ is installed
- **Memory Issues**: Increase heap size with `--max-old-space-size=4096`
- **Port Conflicts**: Change port with `PORT=8080 npm start`

### Challenge Issues
- **Score Board Not Found**: Look for patterns in URL structure
- **Challenges Not Unlocking**: Check browser console for hints
- **Progress Lost**: Enable local backup in settings

### Performance Issues
- **Slow Loading**: Clear browser cache and restart application
- **High CPU Usage**: Normal during vulnerability scanning
- **Docker Issues**: Ensure sufficient memory allocated',

  '## Recent Changes

### v18.0.0 (2025-06-17)
- Angular 18 update
- New Web3 sandbox challenges
- Improved accessibility features
- Enhanced Docker security

### v17.3.0 (2025-04-22)
- NFT challenges added
- Blockchain integration demos
- Updated dependencies

### v17.2.0 (2025-03-14)
- New API security challenges
- Improved tutorial mode
- Bug fixes and performance improvements',

  '## Project Roadmap

### Short Term (2025)
- Auction off up to ten unique anniversary NFT artworks to true Juice Shop fans
- Update to the newest Angular Version
- Pay back other accumulated technical debt and harmonize codebase overall
- Bring overall test coverage back over 90%+

### Medium Term
- Enhanced mobile security challenges
- Cloud-native vulnerability scenarios
- Advanced AI/ML security testing features
- Improved integration with security scanners

### Long Term
- Virtual reality security training mode
- Advanced threat modeling integration
- Enterprise security training platform
- Advanced automation and CI/CD integration',

  '## Community Guidelines

### Code of Conduct
We follow the OWASP Code of Conduct. Be respectful, inclusive, and constructive.

### Getting Help
- GitHub Discussions for questions
- Gitter/Matrix chat for real-time help
- Stack Overflow with `juice-shop` tag

### Reporting Issues
- Security vulnerabilities: security@owasp.org
- Bugs and features: GitHub Issues
- Documentation: GitHub Wiki edits

### Community Channels
- Gitter/Matrix Chat
- Reddit r/owasp
- Slack workspace
- Google Groups mailing list',

  '## Contributing

### How to Contribute
1. **Fork the Repository**: Create your own fork on GitHub
2. **Create Feature Branch**: `git checkout -b feature/new-challenge`
3. **Follow Guidelines**: Check CONTRIBUTING.md for coding standards
4. **Test Changes**: Run full test suite before submitting
5. **Submit PR**: Create detailed pull request with description

### Contribution Types
- **New Challenges**: Add security vulnerabilities and challenges
- **Bug Fixes**: Fix existing issues and improve stability
- **Documentation**: Improve guides, tutorials, and help content
- **Translations**: Help translate to new languages via Crowdin
- **Testing**: Add test coverage and quality assurance

### Development Setup
```bash
git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop
npm install
npm run serve
npm test
```',

  -- Tab content fields
  'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!

## Description

Juice Shop is written in Node.js, Express and Angular. It was the first application written entirely in JavaScript listed in the OWASP VWA Directory.

The application contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities. The hacking progress is tracked on a score board. Finding this score board is actually one of the (easy) challenges!

## Main Selling Points

* **Free and Open source**: Licensed under the MIT license with no hidden costs or caveats
* **Easy-to-install**: Choose between node.js, Docker and Vagrant to run on Windows/Mac/Linux as well as all major cloud providers
* **Self-contained**: Additional dependencies are pre-packaged or will be resolved and downloaded automatically
* **Beginner-friendly**: Hacking Instructor scripts with optional tutorial mode guide newcomers through several challenges while explaining the underlying vulnerabilities
* **Gamification**: The application notifies you on solved challenges and keeps track of successfully exploited vulnerabilities on a Score Board
* **Self-healing**: Wiped clean and repopulated from scratch on every server startup while automatically persisting progress in your browser or via manual local backup
* **Re-branding**: Fully customizable in business context and look & feel to your own corporate or customer requirements
* **CTF-support**: Challenge notifications optionally contain a flag code for your own Capture-The-Flag events
* **Coding Challenges**: Over 20 hacking challenges come with an additional Coding Challenge where finding and fixing the responsible code flaw can be trained
* **Interoperability**: Integrate with your own training systems via WebHook, monitor the extensive metrics or consume challenge information directly via API or file import

## Challenge Categories

The vulnerabilities found in the OWASP Juice Shop are categorized into several different classes:

| Category | # | Description |
|----------|---|-------------|
| Broken Access Control | 11 | Admin Section, CSRF, Easter Egg, Five-Star Feedback, Forged Feedback, Forged Review, Manipulate Basket, Product Tampering, SSRF, View Basket, Web3 Sandbox |
| Broken Anti Automation | 4 | CAPTCHA Bypass, Extra Language, Multiple Likes, Reset Morty''s Password |
| Broken Authentication | 9 | Bjoern''s Favorite Pet, Change Bender''s Password, GDPR Data Erasure, Login Bjoern, Password Strength, Reset Bender''s Password, Reset Bjoern''s Password, Reset Jim''s Password, Two Factor Authentication |
| Cryptographic Issues | 5 | Forged Coupon, Imaginary Challenge, Nested Easter Egg, Premium Paywall, Weird Crypto |
| Improper Input Validation | 12 | Various injection and validation bypass challenges |
| Injection | 12 | SQL injection, NoSQL injection, command injection challenges |
| Insecure Deserialization | 1 | Object deserialization vulnerabilities |
| Miscellaneous | 2 | Score Board, Wallet Depletion |
| Security through Obscurity | 1 | Blockchain Hype |
| Sensitive Data Exposure | 5 | Access Log, Confidential Document, Exposed Metrics, NFT Takeover, Reset Uvogin''s Password |
| Unvalidated Redirects | 2 | Allowlist Bypass, Outdated Allowlist |
| XSS | 3 | API-only XSS, Bonus Payload, DOM XSS |',

  'The OWASP Juice Shop project provides comprehensive overview documentation including architecture diagrams, challenge explanations, and detailed vulnerability descriptions. All documentation is available through multiple channels for different learning preferences.',

  '## Latest Releases

### Main Application
* **v18.0.0** (2025-06-17): Latest major release with Angular 18 update
* **v17.3.0** (2025-04-22): NFT challenges and blockchain features
* **v17.2.0** (2025-03-14): API security enhancements
* **v17.1.1** (2024-09-09): Bug fixes and stability improvements

### CTF Extension
* **v11.1.0** (2025-02-18): Latest CTF framework support
* **v11.0.0** (2024-10-25): Major CTF tooling update

### MultiJuicer Platform
* **v8.3.0** (2025-06-17): Multi-user training platform
* **v8.2.0** (2025-04-30): Enhanced leader board features

## Download Statistics
- GitHub: 12K+ stars
- Docker: 1M+ pulls
- NPM: 100K+ downloads
- SourceForge: Active distribution',

  'The OWASP Juice Shop has an active global community of security professionals, educators, and students. Join our community channels for support, discussions, and collaboration on security education.',

  'Join the OWASP Juice Shop community and contribute to making web application security education accessible to everyone. We welcome contributions of all types from developers, security professionals, and educators.',

  'Get help with OWASP Juice Shop through our comprehensive support channels including documentation, community forums, and direct project support.',

  -- Rich media content
  '[
    {
      "url": "/images/juice-shop-screenshot-1.png",
      "caption": "Juice Shop Main Interface",
      "alt_text": "Screenshot of the OWASP Juice Shop main shopping interface"
    },
    {
      "url": "/images/juice-shop-screenshot-2.png", 
      "caption": "Score Board",
      "alt_text": "Screenshot of the Juice Shop score board showing challenge progress"
    },
    {
      "url": "/images/juice-shop-screenshot-3.png",
      "caption": "Challenge Categories",
      "alt_text": "Screenshot showing different vulnerability categories"
    },
    {
      "url": "/images/juice-shop-screenshot-4.png",
      "caption": "Hacking Instructor",
      "alt_text": "Screenshot of the tutorial mode and hacking instructor"
    },
    {
      "url": "/images/juice-shop-screenshot-5.png",
      "caption": "Architecture Diagram", 
      "alt_text": "Technical architecture diagram of Juice Shop application"
    }
  ]'::jsonb,

  '[
    {
      "url": "https://youtu.be/Msi52Kicb-w",
      "title": "Shake Logger Demo",
      "description": "Demo showing XSS dangers with Harlem Shake and Keylogger",
      "duration": "5:30"
    }
  ]'::jsonb,

  '[
    {
      "title": "Getting Started with Juice Shop",
      "url": "https://pwning.owasp-juice.shop/introduction/",
      "difficulty": "beginner",
      "duration": "30 minutes"
    },
    {
      "title": "Advanced Exploitation Techniques", 
      "url": "https://pwning.owasp-juice.shop/part2/",
      "difficulty": "advanced",
      "duration": "2 hours"
    }
  ]'::jsonb,

  '[
    {
      "title": "Enterprise Security Training Program",
      "company": "Fortune 500 Company",
      "url": "#",
      "summary": "Successfully trained 500+ developers using Juice Shop"
    }
  ]'::jsonb,

  '[
    {
      "name": "CTFd Integration",
      "description": "Native integration with CTFd framework",
      "url": "https://github.com/CTFd/CTFd",
      "category": "CTF Platform"
    },
    {
      "name": "FBCTF Integration", 
      "description": "Facebook CTF platform integration",
      "url": "https://github.com/facebookarchive/fbctf",
      "category": "CTF Platform"
    }
  ]'::jsonb,

  '[
    {
      "name": "Shake Logger",
      "description": "XSS demonstration tool with Harlem Shake effect",
      "url": "https://github.com/wurstbrot/shake-logger",
      "compatibility": "Chrome, Firefox, Safari"
    }
  ]'::jsonb,

  -- Metrics and statistics
  1000000, -- Docker pulls

  '[]'::jsonb, -- No current security advisories

  '[
    {
      "version": "v18.0.0",
      "date": "2025-06-17",
      "changes": [
        "Angular 18 update",
        "New Web3 sandbox challenges", 
        "Improved accessibility features",
        "Enhanced Docker security"
      ],
      "breaking_changes": []
    },
    {
      "version": "v17.3.0", 
      "date": "2025-04-22",
      "changes": [
        "NFT challenges added",
        "Blockchain integration demos",
        "Updated dependencies"
      ],
      "breaking_changes": []
    }
  ]'::jsonb,

  -- SEO and metadata
  'OWASP Juice Shop - Insecure Web Application for Security Training',
  'The most modern and sophisticated insecure web application for security training, awareness demos, CTFs and security tool testing. Contains OWASP Top 10 vulnerabilities.',
  ARRAY['owasp', 'security training', 'web application security', 'vulnerable application', 'ctf', 'penetration testing', 'javascript', 'nodejs'],
  'https://owasp.org/www-project-juice-shop/',

  -- Project relationships
  ARRAY['OWASP WebGoat', 'OWASP Damn Vulnerable Web Application', 'OWASP Security Shepherd'],
  ARRAY['Node.js', 'Express.js', 'Angular', 'SQLite'],
  ARRAY['Financial Services', 'Education', 'Government', 'Healthcare', 'Technology'],
  ARRAY['OWASP Top 10', 'OWASP ASVS', 'NIST Cybersecurity Framework'],
  ARRAY['Web Application Security', 'Injection Attacks', 'Authentication Bypass', 'XSS', 'CSRF'],

  -- Content management
  '1.0',
  NOW(),
  'OWASP Juice Shop Team',
  'published',

  -- Legacy fields
  '[
    {
      "title": "GitHub Repository",
      "url": "https://github.com/juice-shop/juice-shop",
      "type": "source"
    },
    {
      "title": "Live Demo",
      "url": "https://juice-shop.herokuapp.com/",
      "type": "demo"
    },
    {
      "title": "Companion Guide",
      "url": "https://pwning.owasp-juice.shop",
      "type": "documentation"
    },
    {
      "title": "CTF Extension",
      "url": "https://github.com/juice-shop/juice-shop-ctf",
      "type": "tool"
    }
  ]'::jsonb,

  '[
    {
      "name": "Björn Kimminich",
      "role": "Project Leader & Creator"
    },
    {
      "name": "Jannik Hollenbach", 
      "role": "Project Leader"
    }
  ]'::jsonb,

  '[
    {
      "platform": "GitHub",
      "url": "https://github.com/juice-shop/juice-shop"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com/owasp_juiceshop"
    },
    {
      "platform": "Gitter",
      "url": "https://gitter.im/bkimminich/juice-shop"
    }
  ]'::jsonb,

  NOW(),
  NOW()
);
