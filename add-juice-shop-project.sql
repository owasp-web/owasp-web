-- Add OWASP Juice Shop Project to the database
-- Based on data from https://owasp.org/www-project-juice-shop/

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
    contributors,
    github_stars,
    features,
    requirements,
    getting_started,
    tags,
    maintainers,
    project_links,
    tab_main_content,
    tab_translation_content,
    tab_sponsors_content,
    tab_data_content
) VALUES (
    'OWASP Juice Shop',
    'juice-shop',
    'Probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!',
    'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools! Juice Shop encompasses vulnerabilities from the entire OWASP Top Ten along with many other security flaws found in real-world applications!

## Project Overview

Juice Shop is written in Node.js, Express and Angular. It was the first application written entirely in JavaScript listed in the OWASP VWA Directory. The application contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities. The hacking progress is tracked on a score board. Finding this score board is actually one of the (easy) challenges!

## Primary Use Cases

### Security Training and Education
- **Hands-on Learning**: Practical experience with real vulnerabilities
- **Progress Tracking**: Score board system tracks hacking achievements
- **Beginner-Friendly**: Hacking Instructor scripts with tutorial mode
- **Gamification**: Achievement notifications and challenge completion tracking

### Penetration Testing and Tool Testing
- **Security Scanner Testing**: "Guinea pig" application for testing security tools
- **JavaScript-Heavy Frontend**: Tests tools against modern web application architectures
- **REST API Testing**: Comprehensive API security testing scenarios
- **Proxy Tool Testing**: Ideal for testing pentesting proxies and scanners

### Capture The Flag (CTF) Events
- **CTF Support**: Challenge notifications contain flag codes for CTF events
- **Multiple Difficulty Levels**: Challenges ranging from beginner to expert
- **Flexible Deployment**: Easy setup for CTF competitions
- **Team Collaboration**: Multi-user platform support through MultiJuicer

## Challenge Categories and Vulnerabilities

The application contains **31 challenge categories** covering vulnerabilities from:
- **OWASP Top 10**: Complete coverage of web application security risks
- **OWASP ASVS**: Application Security Verification Standard compliance
- **OWASP API Security Top 10**: Modern API security vulnerabilities
- **MITRE CWE**: Common Weakness Enumeration coverage

### Key Challenge Areas
- **Broken Access Control** (11 challenges): Admin sections, CSRF, basket manipulation
- **Improper Input Validation** (12 challenges): Injection attacks, XSS, file uploads
- **Broken Authentication** (9 challenges): Password attacks, authentication bypass
- **Cryptographic Issues** (5 challenges): Weak crypto, token manipulation
- **Sensitive Data Exposure** (5 challenges): Information leakage, access logs

## Technical Architecture

### Modern Technology Stack
- **Frontend**: Angular framework with modern JavaScript
- **Backend**: Node.js with Express framework
- **Database**: SQLite for easy deployment and reset
- **Architecture**: Single-page application with REST API

### Self-Healing Capabilities
- **Automatic Reset**: Wiped clean and repopulated on every server startup
- **Progress Persistence**: Maintains user progress across sessions
- **Browser Storage**: Local progress tracking without server dependency
- **Manual Backup**: Optional local backup functionality

## Educational Resources

### Official Companion Guide
**"Pwning OWASP Juice Shop"** - The official companion guide provides:
- Complete vulnerability overview and explanations
- Step-by-step exploitation techniques
- Hints for spotting and exploiting vulnerabilities
- Complete solutions to every challenge
- Available free online and in multiple formats (PDF, Kindle, ePub)

### Learning Features
- **Hacking Instructor**: Guided tutorial scripts for newcomers
- **Tutorial Mode**: Optional guided learning experience
- **Coding Challenges**: Over 20 challenges include code fixing exercises
- **Mitigation Links**: Direct links to OWASP Cheat Sheets for remediation

## Deployment and Integration

### Easy Installation Options
- **Node.js**: Direct installation from source
- **Docker**: Containerized deployment for consistent environments
- **Vagrant**: Virtual machine deployment
- **Cloud Deployment**: Support for major cloud providers

### Integration Capabilities
- **WebHook Integration**: Connect with training systems
- **API Access**: Programmatic access to challenge information
- **Metrics Monitoring**: Extensive metrics for training assessment
- **File Import**: Bulk challenge data import capabilities

## Community and Ecosystem

### Project Extensions
- **CTF Extension (juice-shop-ctf-cli)**: Tool for preparing CTF events
- **MultiJuicer**: Multi-user platform for team training and CTFs
- **Community Tools**: Third-party tools and integrations

### Active Development
- **Regular Releases**: Frequent updates with new challenges and features
- **Community Contributions**: Open source development model
- **Translation Support**: International community with multiple language support
- **Corporate Adoption**: Used by organizations worldwide for security training

## Recognition and Testimonials

The project has received widespread recognition with testimonials highlighting its effectiveness:
- **Most trustworthy online shop**: Community recognition for educational value
- **Bug-free vulnerable application**: Paradoxical achievement in quality
- **Industry Standard**: Benchmark for vulnerable applications and security training

The project maintains high development standards with OpenSSF Best Practices compliance and active community governance.',
    
    'Security Training',
    'flagship',
    'active',
    true,
    'https://owasp-juice.shop/',
    'https://github.com/juice-shop/juice-shop',
    'https://pwning.owasp-juice.shop/',
    'JavaScript',
    'beginner',
    'MIT License',
    'v18.0.0',
    500, -- Estimated based on GitHub contributors and community size
    9000, -- Estimated GitHub stars based on project popularity
    ARRAY[
        'Modern Insecure Web Application',
        'OWASP Top 10 Vulnerability Coverage',
        'Gamified Learning Experience',
        'CTF Event Support',
        'Self-Healing Application',
        'Multi-Platform Deployment',
        'Hacking Instructor Scripts',
        'Score Board Progress Tracking',
        'Official Companion Guide',
        'Security Tool Testing Platform'
    ],
    ARRAY[
        'Basic web application security knowledge',
        'Understanding of JavaScript and web technologies',
        'Familiarity with security testing concepts',
        'Node.js environment for local installation',
        'Docker for containerized deployment (optional)'
    ],
    ARRAY[
        'Try the online demo at https://demo.owasp-juice.shop/',
        'Install locally using Node.js, Docker, or Vagrant',
        'Start with the tutorial mode for guided learning',
        'Read the companion guide at https://pwning.owasp-juice.shop/',
        'Join the community chat for support and discussions',
        'Use for security training, CTFs, or tool testing',
        'Explore the score board to track progress'
    ],
    ARRAY[
        'vulnerable application',
        'security training',
        'penetration testing',
        'ctf',
        'web security',
        'owasp top 10',
        'javascript',
        'nodejs',
        'angular',
        'security education'
    ],
    ARRAY[
        'Bjoern Kimminich',
        'Jannik Hollenbach',
        'OWASP Juice Shop Community'
    ],
    '[
        {
            "title": "Online Demo",
            "url": "https://demo.owasp-juice.shop/",
            "type": "demo"
        },
        {
            "title": "Official Companion Guide",
            "url": "https://pwning.owasp-juice.shop/",
            "type": "guide"
        },
        {
            "title": "GitHub Repository",
            "url": "https://github.com/juice-shop/juice-shop",
            "type": "source"
        },
        {
            "title": "CTF Extension",
            "url": "https://github.com/juice-shop/juice-shop-ctf",
            "type": "tool"
        },
        {
            "title": "MultiJuicer Platform",
            "url": "https://github.com/juice-shop/multi-juicer",
            "type": "platform"
        },
        {
            "title": "Docker Image",
            "url": "https://hub.docker.com/r/bkimminich/juice-shop",
            "type": "container"
        },
        {
            "title": "Introduction Slides",
            "url": "https://owasp-juice.shop/slides/",
            "type": "presentation"
        },
        {
            "title": "Project Statistics",
            "url": "https://owasp-juice.shop/stats/",
            "type": "analytics"
        }
    ]'::jsonb,
    
    -- Main tab content
    'OWASP Juice Shop is probably the most modern and sophisticated insecure web application! It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools!

## Project Mission

Create the most comprehensive, modern, and educational vulnerable web application that serves as the industry standard for security training, tool testing, and awareness demonstrations.

## Key Features

### 🎯 Comprehensive Vulnerability Coverage
- **OWASP Top 10**: Complete coverage of the most critical web application security risks
- **31 Challenge Categories**: Extensive range of vulnerability types and difficulty levels
- **Real-World Scenarios**: Vulnerabilities based on actual security flaws found in production applications
- **Modern Attack Vectors**: Up-to-date with current threat landscape and attack techniques

### 🎮 Gamified Learning Experience
- **Score Board**: Progress tracking system for completed challenges
- **Achievement System**: Notifications for solved challenges and milestones
- **Difficulty Levels**: Challenges ranging from beginner to expert
- **Hidden Challenges**: Easter eggs and secret challenges for advanced users

### 🏫 Educational Excellence
- **Hacking Instructor**: Guided tutorial scripts for newcomers
- **Tutorial Mode**: Optional step-by-step learning experience
- **Coding Challenges**: Over 20 challenges include code fixing exercises
- **Mitigation Links**: Direct access to OWASP Cheat Sheets for remediation techniques

### 🛠️ Technical Innovation
- **Modern Stack**: Built with Node.js, Express, and Angular
- **JavaScript-First**: First entirely JavaScript application in OWASP VWA Directory
- **Self-Healing**: Automatic reset and repopulation on startup
- **API-Driven**: REST API architecture for modern application testing

### 🏆 CTF and Competition Support
- **Flag Integration**: Built-in CTF flag generation for competitions
- **Team Platform**: MultiJuicer for multi-user training environments
- **Event Ready**: Easy deployment for training events and competitions
- **Leaderboards**: Competitive progress tracking and scoring

## Latest Release Information

### Current Version: v18.0.0 (June 2025)
- Latest features and security challenges
- Enhanced performance and stability
- Updated vulnerability coverage
- Improved user experience

### Related Projects
- **CTF Extension v11.1.0**: Advanced CTF event preparation tools
- **MultiJuicer v8.3.0**: Multi-user platform for team training

## Project Impact

### Industry Recognition
- **OpenSSF Best Practices**: Compliant with open source security standards
- **Community Testimonials**: Widespread recognition for educational value
- **Corporate Adoption**: Used by organizations worldwide for security training
- **Academic Integration**: Standard reference in cybersecurity education

### Global Reach
- **International Community**: Contributors and users from around the world
- **Multiple Languages**: Community-driven translation support
- **Cloud Deployment**: Available on all major cloud platforms
- **Easy Access**: Online demo available for immediate use

## Getting Started

### Quick Start Options
1. **Online Demo**: Try immediately at https://demo.owasp-juice.shop/
2. **Local Installation**: Deploy using Node.js, Docker, or Vagrant
3. **Guided Learning**: Start with tutorial mode for structured learning
4. **Advanced Training**: Use CTF extension for competition scenarios

### Learning Path
1. **Explore the Application**: Understand the juice shop functionality
2. **Find the Score Board**: Complete your first challenge
3. **Follow Tutorials**: Use hacking instructor for guided learning
4. **Progress Through Challenges**: Work from easy to expert level
5. **Study Mitigations**: Learn how to fix discovered vulnerabilities

## Community and Support

### Active Community
- **GitHub Contributors**: Large community of developers and security professionals
- **Chat Channels**: Gitter, Matrix, and Slack for real-time support
- **Social Media**: Active presence across multiple platforms
- **Regular Events**: Presentations at security conferences and training events

### Professional Development
- **Certification Training**: Used in professional security certification programs
- **Corporate Training**: Adopted by companies for employee security education
- **Academic Curriculum**: Integrated into university cybersecurity programs
- **Skill Development**: Career advancement for security professionals',

    -- Translation tab content  
    'The OWASP Juice Shop project maintains global accessibility through comprehensive internationalization support and community-driven translation efforts.

## Multi-Language Support

### Crowdin Translation Platform
The project uses **Crowdin** for community-driven translation management:
- **Collaborative Translation**: Community members can contribute translations
- **Quality Assurance**: Peer review and validation of translations
- **Version Synchronization**: Translations stay current with latest releases
- **Professional Tools**: Advanced translation management capabilities

### Supported Languages
The application interface and content are available in multiple languages through community contributions:
- **Interface Localization**: Complete user interface translation
- **Challenge Content**: Challenge descriptions and hints in multiple languages
- **Documentation Translation**: Key documentation available in various languages
- **Community Contributions**: Ongoing translation efforts by global community

## Global Community Engagement

### International Contributors
- **Worldwide Participation**: Contributors from diverse geographic regions
- **Cultural Adaptation**: Content adapted for different cultural contexts
- **Regional Expertise**: Local security knowledge integration
- **Knowledge Sharing**: Cross-cultural collaboration and learning

### Regional Deployment
- **Local Hosting**: Support for regional cloud deployments
- **Compliance Adaptation**: Alignment with local regulatory requirements
- **Educational Integration**: Adaptation for regional educational systems
- **Corporate Customization**: Localization for multinational organizations

## Accessibility Features

### Technical Accessibility
- **Web Standards Compliance**: Adherence to international web accessibility standards
- **Screen Reader Support**: Compatible with assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility for all features
- **Visual Accessibility**: High contrast and readable design elements

### Educational Accessibility
- **Multiple Learning Styles**: Visual, auditory, and kinesthetic learning support
- **Skill Level Adaptation**: Content appropriate for different experience levels
- **Flexible Pacing**: Self-paced learning with progress tracking
- **Comprehensive Documentation**: Detailed guides and explanations

## Documentation Internationalization

### Multi-Format Availability
- **Web Documentation**: Localized online documentation
- **Companion Guide**: "Pwning OWASP Juice Shop" translation efforts
- **Video Content**: Subtitles and translated video materials
- **Presentation Materials**: Localized slides and training materials

### Translation Workflow
- **Community Coordination**: Organized translation team management
- **Quality Standards**: Consistent translation quality across languages
- **Regular Updates**: Translation maintenance for new releases
- **Feedback Integration**: Community feedback incorporation for improvements

## Future Internationalization Plans

### Expanding Language Support
- **New Language Addition**: Ongoing efforts to add more language support
- **Regional Dialects**: Consideration for regional language variations
- **Cultural Adaptation**: Enhanced cultural sensitivity in content
- **Technical Localization**: Advanced localization features

### Community Growth
- **Translation Teams**: Formation of dedicated language teams
- **Regional Champions**: Local community leaders for language support
- **Educational Partnerships**: Collaboration with international educational institutions
- **Global Events**: International training and conference support

## Contributing to Translation

### How to Contribute
1. **Join Crowdin Project**: Access the OWASP Juice Shop translation project
2. **Select Language**: Choose your preferred language for contribution
3. **Translate Content**: Work on interface elements and documentation
4. **Review Submissions**: Participate in peer review process
5. **Test Translations**: Validate translations in application context

### Translation Guidelines
- **Consistency Standards**: Maintain consistent terminology across translations
- **Technical Accuracy**: Preserve technical meaning in security context
- **Cultural Sensitivity**: Adapt content appropriately for target culture
- **Quality Assurance**: Follow established quality review processes',

    -- Sponsors tab content
    'The OWASP Juice Shop project is supported by a diverse ecosystem of corporate supporters, individual contributors, and community partners committed to advancing security education and training.

## Corporate Supporters and Donors

### Top Supporters ($1000+ annually)
Organizations that have demonstrated significant financial commitment to the project:
- **Recognition Criteria**: $1000+ donation attributed to Juice Shop or restricted gift in last 12 months
- **Support Benefits**: Prominent recognition in project materials and community acknowledgment
- **Industry Leadership**: Association with leading security education initiative

### Corporate Supporter History

**Recent Supporters (2020-2023)**
- **secuvera** (2018/2019/2023): Multi-year support and commitment
- **mindsetters OG** (2023): Recent corporate supporter
- **Heyhack** (2022): Security community platform support
- **Schutzwerk** (2022): German security consultancy support
- **New Work SE** (2019/2021): Technology company multi-year support
- **RandoriSec** (2021): Security company contribution

**Historical Supporters (2016-2020)**
- **Wild West Hackin\' Fest** (2020): Security conference partnership
- **Denim Group** (2018-2019): Multi-year application security company support
- **PlexTrac** (2019): Security platform company contribution
- **Silpion** (2019): IT consultancy support
- **iteratec** (2017): Technology consultancy and MultiJuicer development
- **eSailors** (2016): Early project supporter
- **XING** (2016): Professional networking platform support

### Corporate-Sponsored Code Contributions

**Panasonic Information Systems Company Europe (2019-2020)**
- **Technical Contributions**: Issues #1221 and #1356
- **IP Waiver**: Formal intellectual property waiver submitted to OWASP Foundation
- **Recognition Criteria**: Official written confirmation of IP waiver required

## Individual Supporters and Contributors

### Project Leadership and Core Contributors
- **Björn Kimminich**: Project founder and primary maintainer
- **Jeroen Willemsen**: Significant long-term contributor
- **Jannik Hollenbach**: Current project co-leader

### Community Contributors
Notable individual supporters who have contributed financially:
- **Soron Foster**: Community supporter
- **Bendik Mjaaland**: Individual contributor
- **Timo Pagel**: Security professional supporter
- **Benjamin Pfänder**: Community member
- **Kevin Chung**: Technical contributor
- **Brian Johnson**: Official jingle composer and supporter
- **Omar Santos**: Security educator and supporter

### Recognition Program
- **Donation Attribution**: Clear attribution system for project donations
- **Community Recognition**: Public acknowledgment of supporter contributions
- **Ongoing Support**: Encouragement for continued community involvement

## Special Contributions and Partnerships

### LeanPub Royalty Donations
- **Author Contribution**: Björn Kimminich\'s "Pwning OWASP Juice Shop" ebook
- **Donation Amount**: $1,251.68 in royalties donated between 09/2017 and 07/2019
- **Community Benefit**: Proceeds directly support project development and maintenance

### MultiJuicer Development Partnership
- **iteratec Partnership**: Original development and ongoing maintenance
- **Official Integration**: Became official OWASP Juice Shop component in 05/2023
- **Corporate Contribution**: Significant development resources and expertise
- **Community Impact**: Enhanced multi-user training capabilities

## Donation and Support Information

### How to Support the Project
- **Direct Donation**: Use official OWASP donation link with Juice Shop attribution
- **Corporate Sponsorship**: Multiple sponsorship levels and recognition options
- **Code Contributions**: Technical contributions with appropriate IP waivers
- **Community Building**: Event hosting, training delivery, and awareness promotion

### Support Benefits
- **Recognition**: Public acknowledgment in project materials
- **Community Access**: Connection to global security education community
- **Industry Association**: Alignment with leading security training initiative
- **Tax Benefits**: OWASP Foundation 501(c)(3) tax-exempt status

### Vendor Neutrality Statement
**Important Notice**: The OWASP Foundation maintains strict vendor neutrality and does not endorse any supporters. Donations do not influence project content, direction, or technical decisions in any way.

## Partnership Opportunities

### Corporate Partnership Levels
- **Financial Sponsorship**: Direct monetary support for project activities
- **Resource Contribution**: Development time, expertise, and infrastructure
- **Event Partnerships**: Conference hosting, training events, and workshops
- **Educational Collaboration**: Academic partnerships and curriculum development

### Community Impact
- **Global Reach**: Support enables worldwide security education access
- **Open Source Commitment**: Maintains free and open access to security training
- **Innovation Support**: Enables continuous improvement and new feature development
- **Professional Development**: Supports career advancement in cybersecurity field

## Recognition and Acknowledgment

### Supporter Recognition
- **Public Acknowledgment**: Listed on official project pages and materials
- **Community Events**: Recognition at conferences and training events
- **Social Media**: Acknowledgment through project social media channels
- **Annual Reports**: Inclusion in project annual summaries and reports

For information about becoming a project supporter or corporate partner, organizations and individuals can contact the project leadership through official OWASP channels.',

    -- Data tab content
    'The OWASP Juice Shop project maintains comprehensive data resources and analytics to support evidence-based security education, training effectiveness measurement, and community engagement tracking.

## Challenge and Vulnerability Data

### Comprehensive Vulnerability Database
- **31 Challenge Categories**: Systematic categorization of security vulnerabilities
- **OWASP Top 10 Mapping**: Complete coverage of critical web application security risks
- **OWASP ASVS Integration**: Application Security Verification Standard alignment
- **CWE Classification**: Common Weakness Enumeration standardized categorization
- **API Security Coverage**: OWASP API Security Top 10 representation

### Challenge Statistics and Analytics
- **Difficulty Distribution**: Statistical analysis of challenge completion rates
- **Learning Progression**: Data on typical learning paths and user advancement
- **Vulnerability Frequency**: Real-world vulnerability prevalence mapping
- **Educational Effectiveness**: Assessment of training impact and knowledge retention

### Mitigation and Remediation Data
- **OWASP Cheat Sheet Integration**: Direct linking to 30+ security cheat sheets
- **Fix Guidance**: Comprehensive remediation instructions for each vulnerability type
- **Best Practices Documentation**: Industry-standard security implementation guidance
- **Code Examples**: Secure coding examples and implementation patterns

## User Analytics and Engagement Metrics

### Platform Usage Statistics
- **Daily Project Stats**: Comprehensive usage analytics and engagement metrics
- **Global Deployment**: Worldwide installation and usage tracking
- **Platform Distribution**: Analysis across different deployment methods (Docker, Node.js, cloud)
- **Challenge Completion**: Statistical analysis of user progress and achievement patterns

### Educational Impact Assessment
- **Learning Outcomes**: Measurement of educational effectiveness and skill development
- **Training Programs**: Analysis of corporate and academic training program integration
- **Certification Impact**: Assessment of professional certification and career advancement
- **Skill Assessment**: Pre/post-training security knowledge evaluation

### Community Engagement Data
- **Contributor Analytics**: GitHub contribution patterns and community participation
- **Translation Progress**: Multi-language localization status and community involvement
- **Event Participation**: Conference presentations, workshops, and training event metrics
- **Social Media Metrics**: Community engagement across multiple platforms

## Technical Performance and Quality Data

### Application Performance Metrics
- **Self-Healing Effectiveness**: Reset and recovery time analytics
- **Challenge Availability**: Uptime and accessibility monitoring
- **User Experience**: Interface responsiveness and usability metrics
- **Cross-Platform Compatibility**: Performance across different deployment environments

### Security Testing Platform Data
- **Tool Effectiveness**: Analysis of security scanner and proxy tool performance
- **JavaScript Testing**: Modern web application security testing effectiveness
- **API Security Assessment**: REST API security testing capabilities and results
- **Penetration Testing**: Real-world penetration testing scenario effectiveness

### Code Quality and Development Metrics
- **OpenSSF Best Practices**: Compliance with open source security standards
- **Test Coverage**: Comprehensive testing coverage and quality assurance metrics
- **Code Quality**: Static analysis and security code review results
- **Dependency Management**: Security vulnerability tracking in project dependencies

## Research and Academic Data

### Educational Research Integration
- **Academic Partnerships**: University research collaboration and curriculum integration
- **Student Projects**: Analysis of academic projects and learning outcomes
- **Research Publications**: Peer-reviewed research using Juice Shop data
- **Innovation Tracking**: Emerging security education methodologies and effectiveness

### Industry Research Applications
- **Vulnerability Trends**: Real-world application security trend analysis
- **Training Effectiveness**: Corporate security training program assessment
- **Tool Development**: Security tool improvement and validation research
- **Methodology Development**: Security testing methodology refinement and validation

### Comparative Analysis Data
- **Vulnerability Application Comparison**: Analysis against other vulnerable applications
- **Training Platform Assessment**: Effectiveness comparison with alternative training methods
- **Industry Benchmarking**: Corporate security training program benchmarking
- **Technology Evolution**: Tracking of web application security technology advancement

## Data Privacy and Security

### Privacy Protection Measures
- **User Data Anonymization**: Protection of individual user information and progress
- **Compliance Frameworks**: Adherence to international privacy regulations
- **Data Minimization**: Collection of only necessary data for educational purposes
- **Consent Management**: Transparent data collection and usage policies

### Security and Integrity
- **Data Protection**: Secure storage and transmission of analytics data
- **Access Controls**: Restricted access to sensitive usage and performance data
- **Audit Trails**: Comprehensive logging of data access and modification
- **Incident Response**: Procedures for data security incident management

## Open Data and Research Sharing

### Public Analytics and Insights
- **Aggregated Statistics**: Public sharing of anonymized usage and effectiveness data
- **Research Datasets**: Educational datasets for security research community
- **Best Practices Documentation**: Shared insights on security training effectiveness
- **Community Benchmarks**: Industry standards for security education and training

### Research Collaboration
- **Academic Data Sharing**: Structured data sharing for educational research
- **Industry Partnerships**: Corporate research collaboration and data exchange
- **Open Source Analytics**: Public availability of project analytics and insights
- **Innovation Support**: Data support for security education innovation and development

## Continuous Improvement Framework

### Data-Driven Development
- **User Feedback Integration**: Systematic collection and analysis of user feedback
- **Challenge Effectiveness**: Data-driven assessment of educational challenge quality
- **Feature Usage Analysis**: Analysis of feature adoption and effectiveness
- **Community Input**: Integration of community suggestions and requirements

### Quality Assurance
- **Performance Monitoring**: Continuous monitoring of application and educational effectiveness
- **Error Tracking**: Systematic identification and resolution of issues
- **User Experience Optimization**: Data-driven improvements to user interface and experience
- **Educational Outcome Enhancement**: Continuous improvement of learning outcomes and effectiveness'

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
    contributors = EXCLUDED.contributors,
    github_stars = EXCLUDED.github_stars,
    features = EXCLUDED.features,
    requirements = EXCLUDED.requirements,
    getting_started = EXCLUDED.getting_started,
    tags = EXCLUDED.tags,
    maintainers = EXCLUDED.maintainers,
    project_links = EXCLUDED.project_links,
    tab_main_content = EXCLUDED.tab_main_content,
    tab_translation_content = EXCLUDED.tab_translation_content,
    tab_sponsors_content = EXCLUDED.tab_sponsors_content,
    tab_data_content = EXCLUDED.tab_data_content,
    updated_at = NOW();

-- Verify the project was added successfully
SELECT 
    title, 
    slug, 
    project_type, 
    is_featured, 
    contributors,
    github_stars,
    LEFT(description, 100) as description_preview 
FROM projects 
WHERE slug = 'juice-shop';
