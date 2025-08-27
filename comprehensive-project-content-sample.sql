-- Comprehensive Project Content Sample
-- This demonstrates how to populate projects with rich content for local hosting
-- Run this after the enhanced-project-schema.sql

-- Sample: OWASP Juice Shop with comprehensive content
UPDATE projects SET 
    -- Enhanced content
    project_overview = 'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools!

Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!

## Why Juice Shop?

Juice Shop is written in Node.js, Express and Angular. It was designed to run on all operating systems and can be easily deployed using Docker, npm, Heroku, or Vagrant.

The application contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities. The hacking progress is tracked on a score board. Finding this score board is actually one of the (easy) challenges!',

    key_features = ARRAY[
        'Over 100 hacking challenges based on the OWASP Top Ten and beyond',
        'Difficulty levels from "trivial" to "advanced"',
        'Score board to track your hacking progress',
        'Multi-language support (over 50 languages)',
        'Fully restored progress on re-launch',
        'CTF framework integration',
        'Optional tutorial mode with hints',
        'CodeQL powered vulnerability detection',
        'Customizable challenge set'
    ],

    installation_guide = '## Installation Options

### Option 1: From pre-packaged distribution

1. Download the latest `.zip`/`.7z` file
2. Unpack and enter the folder
3. Run `npm start` (requires Node.js v12+)
4. Browse to http://localhost:3000

### Option 2: From source code

```bash
git clone https://github.com/bkimminich/juice-shop.git --depth 1
cd juice-shop
npm install
npm start
```

### Option 3: Docker

```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

### Option 4: Heroku

Deploy directly to Heroku:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)',

    usage_examples = '## Basic Usage

1. **Start the application** and browse to http://localhost:3000
2. **Find the Score Board** (this is your first challenge!)
3. **Solve challenges** by exploiting vulnerabilities
4. **Track your progress** on the score board
5. **Use hints** if you get stuck (tutorial mode)

## Educational Scenarios

### Security Awareness Training
Use Juice Shop to demonstrate real vulnerabilities to developers and stakeholders.

### Capture The Flag (CTF)
Run Juice Shop in CTF mode for competitive hacking events.

### Penetration Testing Practice
Use as a safe environment to practice security testing techniques.

### DevSecOps Pipeline Testing
Test your security tools against a known vulnerable application.',

    api_documentation = '## API Endpoints

Juice Shop provides several APIs for integration:

### Authentication
- `POST /rest/user/login` - User login
- `POST /rest/user/register` - User registration
- `GET /rest/user/whoami` - Current user info

### Products
- `GET /rest/products/search` - Search products
- `GET /rest/products/:id` - Get product details

### Basket
- `GET /rest/basket/:id` - Get basket contents
- `POST /rest/basket/:id/checkout` - Checkout basket

### Admin
- `GET /rest/admin/application-version` - Application version
- `GET /rest/admin/application-configuration` - App config',

    security_considerations = '## Security Features for Hosting

While Juice Shop is intentionally vulnerable, consider these points when hosting:

### Network Isolation
- Run in isolated network segments
- Restrict outbound internet access
- Monitor network traffic

### Access Control
- Limit access to authorized users only
- Use VPN or internal network access
- Implement proper authentication

### Monitoring
- Log all access attempts
- Monitor for unexpected behavior
- Alert on suspicious activities

### Data Protection
- Use dummy data only
- No real user information
- Regular backups of clean state',

    troubleshooting = '## Common Issues

### Installation Problems

**Node.js version incompatibility**
- Ensure Node.js v12 or higher is installed
- Use `node --version` to check

**NPM install failures**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

**Port conflicts**
- Check if port 3000 is in use
- Use `PORT=4000 npm start` for different port

### Runtime Issues

**Database errors**
- Delete data/juiceshop.sqlite to reset
- Check file permissions

**Memory issues**
- Increase Node.js memory: `node --max-old-space-size=4096 app.js`

**Performance problems**
- Disable unnecessary features
- Use production build: `npm run build`',

    changelog = '## Recent Updates

### v15.1.0 (Latest)
- Added 5 new challenges
- Improved multi-language support
- Enhanced Docker support
- Bug fixes and performance improvements

### v15.0.0
- Major UI overhaul
- New challenge categories
- Improved accessibility
- Breaking changes in API

### v14.5.0
- Added tutorial mode
- New integration options
- Security improvements
- Documentation updates',

    roadmap = '## Upcoming Features

### Q2 2025
- Advanced challenge editor
- Enhanced CTF integration
- New vulnerability categories
- Mobile app companion

### Q3 2025
- Cloud deployment templates
- Advanced analytics
- Custom branding options
- Kubernetes support

### Q4 2025
- AI-powered hints
- Advanced scoring system
- Team collaboration features
- Integration marketplace',

    -- Tab content
    tab_overview_content = 'OWASP Juice Shop is the most complete vulnerable web application for security education and testing. Built with modern technologies and containing over 100 challenges.',

    tab_documentation_content = '# Documentation

## Getting Started
Follow our comprehensive guides to get up and running quickly.

## Challenge Solutions
Step-by-step solutions for all challenges (spoiler alert!).

## Customization
Learn how to customize Juice Shop for your specific needs.

## Integration
Integrate with your existing security tools and workflows.',

    tab_downloads_content = '# Downloads & Usage

## Latest Release: v15.1.0

### Pre-built Packages
- [Windows Installer](https://github.com/bkimminich/juice-shop/releases/download/v15.1.0/juice-shop-15.1.0-setup.exe)
- [macOS Package](https://github.com/bkimminich/juice-shop/releases/download/v15.1.0/juice-shop-15.1.0.dmg)
- [Linux Archive](https://github.com/bkimminich/juice-shop/releases/download/v15.1.0/juice-shop-15.1.0-linux.tar.gz)

### Docker Images
```bash
docker pull bkimminich/juice-shop:latest
docker pull bkimminich/juice-shop:v15.1.0
```

### Source Code
Clone from GitHub for the latest development version.',

    tab_community_content = '# Community

## Join Our Community

### Discussion Forums
- [GitHub Discussions](https://github.com/bkimminich/juice-shop/discussions)
- [OWASP Slack](https://owasp.slack.com/channels/project-juice-shop)

### Contribution Guidelines
We welcome contributions! Check our [contribution guide](https://github.com/bkimminich/juice-shop/blob/main/CONTRIBUTING.md).

### Code of Conduct
Please read our [code of conduct](https://github.com/bkimminich/juice-shop/blob/main/CODE_OF_CONDUCT.md).',

    -- Resources
    screenshots = '[
        {
            "url": "/images/projects/juice-shop-main.png",
            "caption": "Juice Shop main interface showing the product catalog",
            "alt_text": "Main Juice Shop interface"
        },
        {
            "url": "/images/projects/juice-shop-scoreboard.png", 
            "caption": "Score board tracking challenge completion progress",
            "alt_text": "Juice Shop score board"
        }
    ]'::jsonb,

    videos = '[
        {
            "url": "https://www.youtube.com/embed/Lu0-HBhna8k",
            "title": "Introduction to OWASP Juice Shop",
            "description": "Complete overview of Juice Shop features and capabilities",
            "duration": "15:30"
        },
        {
            "url": "https://www.youtube.com/embed/zi3yDovd0RY", 
            "title": "Setting up Juice Shop for CTF",
            "description": "How to configure Juice Shop for Capture The Flag events",
            "duration": "12:45"
        }
    ]'::jsonb,

    tutorials = '[
        {
            "title": "Complete Beginner Guide to Juice Shop",
            "url": "https://pwning.owasp-juice.shop/",
            "difficulty": "beginner",
            "duration": "2 hours"
        },
        {
            "title": "Advanced Exploitation Techniques",
            "url": "https://pwning.owasp-juice.shop/part2/",
            "difficulty": "advanced", 
            "duration": "4 hours"
        }
    ]'::jsonb,

    case_studies = '[
        {
            "title": "University Security Training Program",
            "company": "Stanford University",
            "url": "https://example.com/stanford-case-study",
            "summary": "How Stanford integrated Juice Shop into their cybersecurity curriculum"
        },
        {
            "title": "Corporate Security Awareness",
            "company": "Tech Corp",
            "url": "https://example.com/techcorp-case-study", 
            "summary": "Using Juice Shop for enterprise security awareness training"
        }
    ]'::jsonb,

    integrations = '[
        {
            "name": "OWASP ZAP",
            "description": "Automated scanning integration",
            "url": "https://github.com/bkimminich/juice-shop/blob/main/zap-baseline-scan.py",
            "category": "Security Testing"
        },
        {
            "name": "GitLab CI/CD",
            "description": "Continuous security testing pipeline",
            "url": "https://github.com/bkimminich/juice-shop/blob/main/.gitlab-ci.yml",
            "category": "DevSecOps"
        }
    ]'::jsonb,

    security_advisories = '[
        {
            "id": "GHSA-xxxx-yyyy-zzzz",
            "title": "Prototype Pollution in Dependencies",
            "severity": "medium",
            "date": "2024-01-15",
            "description": "Third-party dependency vulnerability affecting development builds",
            "fixed_in_version": "15.0.1"
        }
    ]'::jsonb,

    release_notes = '[
        {
            "version": "15.1.0",
            "date": "2024-02-01",
            "changes": ["Added 5 new challenges", "Improved multi-language support", "Enhanced Docker support"],
            "breaking_changes": []
        },
        {
            "version": "15.0.0", 
            "date": "2024-01-01",
            "changes": ["Major UI overhaul", "New challenge categories", "Improved accessibility"],
            "breaking_changes": ["API endpoint changes", "Configuration format updates"]
        }
    ]'::jsonb,

    -- Metadata
    meta_title = 'OWASP Juice Shop - Modern Vulnerable Web Application for Security Training',
    meta_description = 'The most complete vulnerable web application for security education. Over 100 challenges covering OWASP Top 10 and beyond. Perfect for training, CTFs, and security tool testing.',
    meta_keywords = ARRAY['owasp', 'juice shop', 'vulnerable application', 'security training', 'ctf', 'web security', 'penetration testing'],

    -- Relationships
    related_projects = ARRAY['webgoat', 'security-shepherd', 'dvwa'],
    dependencies = ARRAY['nodejs', 'angular', 'express'],
    industry_usage = ARRAY['Education', 'Security Training', 'Enterprise', 'Government'],
    compliance_standards = ARRAY['OWASP Top 10', 'NIST Cybersecurity Framework'],
    threat_categories = ARRAY['A01:2021-Broken Access Control', 'A02:2021-Cryptographic Failures', 'A03:2021-Injection'],

    -- Content management
    content_status = 'published',
    content_version = '2.0',
    content_reviewer = 'OWASP Team'

WHERE slug = 'juice-shop';

-- Sample: OWASP ZAP with comprehensive content  
UPDATE projects SET
    project_overview = 'The OWASP Zed Attack Proxy (ZAP) is one of the world''s most popular free security tools and is actively maintained by a dedicated international team of volunteers.

ZAP is an easy to use integrated penetration testing tool for finding vulnerabilities in web applications. It is designed to be used by people with a wide range of security experience and as such is ideal for developers and functional testers who are new to penetration testing.

ZAP provides automated scanners as well as a set of tools that allow you to find security vulnerabilities manually.',

    key_features = ARRAY[
        'Intercepting Proxy to inspect and modify HTTP/HTTPS traffic',
        'Automated vulnerability scanner for web applications',
        'Passive scanning that analyzes responses for security issues',
        'Active scanning that probes for vulnerabilities',
        'WebSocket support for modern applications',
        'REST API for automation and integration',
        'Extensive marketplace of add-ons',
        'Docker images for easy deployment',
        'CI/CD pipeline integration'
    ],

    installation_guide = '## Installation Methods

### Desktop Application
1. Download from [zaproxy.org](https://www.zaproxy.org/download/)
2. Install using the installer for your OS
3. Launch ZAP and complete the initial setup

### Docker Container
```bash
# Stable release
docker run -u zap -p 8080:8080 -i owasp/zap2docker-stable zap.sh -daemon -host 0.0.0.0 -port 8080

# Weekly build  
docker run -u zap -p 8080:8080 -i owasp/zap2docker-weekly zap.sh -daemon -host 0.0.0.0 -port 8080
```

### Package Managers
```bash
# Snap
sudo snap install zaproxy --classic

# Homebrew (macOS)
brew install --cask owasp-zap
```',

    tab_overview_content = 'ZAP is a comprehensive security testing tool that helps identify vulnerabilities in web applications through both automated scanning and manual testing capabilities.',

    tab_documentation_content = '# ZAP Documentation

## User Guide
Comprehensive documentation for using ZAP effectively.

## API Reference  
Complete REST API documentation for automation.

## Add-on Marketplace
Extend ZAP functionality with community add-ons.',

    tab_downloads_content = '# Download ZAP

## Latest Release: 2.14.0

### Cross Platform
- [Windows Installer](https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2_14_0_windows.exe)
- [Linux Package](https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2_14_0_linux.tar.gz)
- [macOS DMG](https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2_14_0_macos.dmg)

### Docker Images
```bash
docker pull owasp/zap2docker-stable:latest
docker pull owasp/zap2docker-weekly:latest
```',

    related_projects = ARRAY['juice-shop', 'webgoat', 'owtf'],
    industry_usage = ARRAY['Penetration Testing', 'DevSecOps', 'Security Consulting', 'Education'],
    compliance_standards = ARRAY['OWASP Testing Guide', 'NIST SP 800-115'],
    content_status = 'published'

WHERE slug = 'zap';

COMMIT;
