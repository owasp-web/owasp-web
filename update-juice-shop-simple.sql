-- Update OWASP Juice Shop with correct custom tabs (Simple JSON-safe version)

UPDATE projects SET
  tabs = '[
    {
      "id": "main",
      "name": "Main",
      "content": "OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!\n\n## Key Features\n\n- Modern Technology Stack: Built with Node.js, Express, and Angular\n- Comprehensive Vulnerability Coverage: Contains challenges covering the entire OWASP Top Ten and beyond\n- CTF-Ready: Perfect for Capture The Flag events and security competitions\n- Educational: Ideal for security training and awareness demonstrations\n- Tool Testing: Excellent testbed for security tools and scanners\n\n## Why Juice Shop?\n\n- Realistic Vulnerabilities: All security flaws are based on real-world applications\n- Varying Difficulty: Challenges range from beginner to expert level\n- Progressive Learning: Built-in tutorial and progressive difficulty curve\n- Community Driven: Actively maintained by the OWASP community\n- Free and Open Source: Available to everyone under MIT license",
      "order": 1
    },
    {
      "id": "overview",
      "name": "Overview",
      "content": "## Project Overview\n\nOWASP Juice Shop is a flagship OWASP project that serves as an intentionally insecure web application for security testing and education. The project was created to provide a realistic, modern web application with numerous security vulnerabilities for hands-on learning.\n\n## Technology Stack\n\n- Frontend: Angular with TypeScript\n- Backend: Node.js with Express\n- Database: SQLite (default) with support for other databases\n- Package Management: npm\n- Build System: Webpack\n- Testing: Jest, Protractor, Frisby.js\n\n## Key Statistics\n\n- 100+ Challenges: Covering various security vulnerability categories\n- 6 Difficulty Levels: From tutorial to expert\n- Multiple Categories: Including OWASP Top 10, ASVS, and custom categories\n- Multilingual: Available in multiple languages\n- Cross-Platform: Runs on Windows, macOS, and Linux",
      "order": 2
    },
    {
      "id": "news",
      "name": "News",
      "content": "## Latest News and Updates\n\n### Recent Releases\n\nv15.0.0 - Latest Release\n- Enhanced security challenges\n- Updated dependencies and security fixes\n- Improved user interface and experience\n- New challenge categories and difficulty levels\n- Enhanced Docker support\n\nv14.5.1 - Security Update\n- Critical security patches\n- Performance improvements\n- Bug fixes and stability enhancements\n- Updated OWASP Top 10 mappings\n\nv14.0.0 - Major Update\n- New Angular version migration\n- Enhanced challenge engine\n- Improved accessibility features\n- Updated vulnerability categories\n- Enhanced mobile responsiveness",
      "order": 3
    },
    {
      "id": "challenges",
      "name": "Challenges",
      "content": "## Security Challenges Overview\n\nOWASP Juice Shop contains 100+ security challenges across multiple difficulty levels and vulnerability categories. Each challenge represents a real-world security vulnerability that participants must discover and exploit.\n\n## Difficulty Levels\n\n### Tutorial\n- Purpose: Introduction to basic concepts\n- Count: 4 challenges\n- Skills Required: Basic web application knowledge\n- Examples: Score Board discovery, DOM XSS\n\n### Easy\n- Purpose: Fundamental security vulnerabilities\n- Count: 25+ challenges\n- Skills Required: Basic security testing knowledge\n- Examples: SQL Injection, Broken Authentication\n\n### Medium\n- Purpose: Intermediate security concepts\n- Count: 35+ challenges\n- Skills Required: Security testing experience\n- Examples: Business Logic Flaws, Advanced XSS\n\n### Hard\n- Purpose: Advanced security vulnerabilities\n- Count: 25+ challenges\n- Skills Required: Professional security testing\n- Examples: Advanced Injection, Cryptographic Issues\n\n### Expert\n- Purpose: Complex security scenarios\n- Count: 15+ challenges\n- Skills Required: Expert-level security knowledge\n- Examples: Advanced Business Logic, Complex Chains",
      "order": 4
    },
    {
      "id": "learning",
      "name": "Learning",
      "content": "## Learning Resources\n\nOWASP Juice Shop provides comprehensive learning materials to help users understand web application security concepts and develop practical skills.\n\n## Official Companion Guide\n\n### Pwning OWASP Juice Shop\n- Free Online Access: Available at https://pwning.owasp-juice.shop\n- Comprehensive Coverage: Detailed explanations for all challenges\n- Step-by-Step Solutions: Complete walkthrough for each vulnerability\n- Learning Context: Security concepts and real-world implications\n- Multiple Formats: Web, PDF, and eBook versions available\n\n### Guide Features\n- Beginner-Friendly: Starts with basic security concepts\n- Progressive Difficulty: Builds complexity gradually\n- Practical Examples: Hands-on exploitation techniques\n- Defense Strategies: How to prevent and mitigate vulnerabilities\n- Industry Standards: Alignment with security frameworks and standards",
      "order": 5
    },
    {
      "id": "ctf",
      "name": "CTF",
      "content": "## Capture The Flag (CTF) Support\n\nOWASP Juice Shop is specifically designed to support Capture The Flag events, providing a robust platform for security competitions and educational challenges.\n\n## CTF Features\n\n### Built-in CTF Mode\n- Flag Generation: Automatic generation of unique flags for each solved challenge\n- Team Support: Multi-team competition capabilities\n- Real-time Scoring: Live scoreboard with automatic updates\n- Progress Tracking: Detailed statistics and progress monitoring\n- Export Capabilities: Data export for external CTF platforms\n\n### Competition Formats\n\n#### Individual Competition\n- Solo Participants: Individual scoring and ranking\n- Personal Progress: Individual challenge completion tracking\n- Skill Assessment: Personal skill development measurement\n- Learning Focus: Educational emphasis with detailed feedback\n\n#### Team Competition\n- Team Formation: Support for team-based challenges\n- Collaborative Solving: Shared progress and hints\n- Team Scoring: Collective team performance metrics\n- Communication: Built-in team collaboration features",
      "order": 6
    },
    {
      "id": "ecosystem",
      "name": "Ecosystem",
      "content": "## OWASP Juice Shop Ecosystem\n\nThe OWASP Juice Shop ecosystem consists of multiple projects, tools, and integrations that extend the platform capabilities and enhance the user experience.\n\n## Core Projects\n\n### OWASP Juice Shop\n- Main Application: The core vulnerable web application\n- Repository: https://github.com/juice-shop/juice-shop\n- Docker Images: Official container distributions\n- Release Cycle: Monthly releases with continuous updates\n- Platform Support: Cross-platform compatibility\n\n### Juice Shop CTF Extension\n- CTF Integration: Specialized CTF event support\n- Flag Generation: Automated flag creation system\n- Platform Compatibility: Integration with major CTF platforms\n- Event Management: Competition administration tools\n- Repository: https://github.com/juice-shop/juice-shop-ctf\n\n### Multi-Juicer\n- Multi-Tenant Platform: Support for multiple simultaneous users\n- Kubernetes Native: Cloud-native deployment architecture\n- Scalability: Automatic scaling based on demand\n- Isolation: Secure user instance separation",
      "order": 7
    },
    {
      "id": "supporters",
      "name": "Supporters",
      "content": "## Project Support and Recognition\n\nOWASP Juice Shop is supported by a global community of security professionals, educators, organizations, and volunteers who contribute to its success and continued development.\n\n## Project Leadership\n\n### Project Leader\n- Björn Kimminich: Creator and Project Leader\n  - Role: Overall project direction and architecture\n  - Background: Application Security Expert\n  - Contributions: Original creator and primary maintainer\n  - Contact: GitHub @bkimminich\n\n### Core Contributors\n- Active Maintainers: Regular code contributors and reviewers\n- Challenge Authors: Security experts contributing new challenges\n- Documentation Team: Technical writers and content creators\n- Translation Team: Internationalization and localization experts\n- Community Moderators: Support and community management\n\n## Recognition and Awards\n\n### Industry Recognition\n- OWASP Flagship Project: Top-tier OWASP project status\n- Community Choice Awards: User-voted recognition\n- Security Industry Awards: Professional recognition\n- Open Source Awards: Open source community recognition",
      "order": 8
    }
  ]'::jsonb,
  
  content_last_updated = NOW()

WHERE slug = 'juice-shop';
