-- Simple OWASP Juice Shop Import (Using existing columns only)
-- This version only uses columns that already exist in your database

-- First, add the new columns we need
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_overview TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS installation_guide TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_main_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tab_overview_content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS related_projects TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_status TEXT DEFAULT 'published';

-- Now insert Juice Shop using only the core fields
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
  12000,
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
  
  -- Project overview
  'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!

Juice Shop is written in Node.js, Express and Angular. It was the first application written entirely in JavaScript listed in the OWASP VWA Directory.

The application contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities. The hacking progress is tracked on a score board. Finding this score board is actually one of the (easy) challenges!

Apart from the hacker and awareness training use case, pentesting proxies or security scanners can use Juice Shop as a "guinea pig"-application to check how well their tools cope with JavaScript-heavy application frontends and REST APIs.',
  
  -- Key features
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
  
  -- Installation guide
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

  -- Tab main content
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
| XSS | 3 | API-only XSS, Bonus Payload, DOM XSS |

## Testimonials

> The most trustworthy online shop out there. (@dschadow) —The best juice shop on the whole internet! (@shehackspurple) —Actually the most bug-free vulnerable application in existence! (@vanderaj) —First you 😂😂then you 😢 (@kramse) —But this doesn''t have anything to do with juice. (@coderPatros'' wife)',

  -- Tab overview content
  'The OWASP Juice Shop project provides comprehensive overview documentation including architecture diagrams, challenge explanations, and detailed vulnerability descriptions. All documentation is available through multiple channels for different learning preferences.

## Latest Releases

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

  -- Screenshots
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

  -- Meta fields
  'OWASP Juice Shop - Insecure Web Application for Security Training',
  'The most modern and sophisticated insecure web application for security training, awareness demos, CTFs and security tool testing. Contains OWASP Top 10 vulnerabilities.',
  
  -- Related projects
  ARRAY['OWASP WebGoat', 'OWASP Damn Vulnerable Web Application', 'OWASP Security Shepherd'],
  
  -- Content status
  'published'
);
