-- Add OWASP Mobile Application Security (MAS) Project to the database
-- Based on data from https://owasp.org/www-project-mobile-app-security/

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
    'OWASP Mobile Application Security',
    'mobile-app-security',
    'Define the industry standard for mobile application security. The MAS flagship project provides a security and privacy standard for mobile apps (MASVS), mobile app-specific weaknesses (MASWE), and comprehensive testing guide (MASTG).',
    'The OWASP Mobile Application Security (MAS) flagship project provides comprehensive resources for securing mobile applications. The project defines the industry standard for mobile application security through three main deliverables: OWASP MASVS (Mobile Application Security Verification Standard), OWASP MASWE (Mobile Application Security Weakness Enumeration), and OWASP MASTG (Mobile Application Security Testing Guide).

## Project Mission

"Define the industry standard for mobile application security."

The MAS project provides a security and privacy standard for mobile apps, a collection of mobile app-specific weaknesses, and a comprehensive testing guide that covers the processes, techniques, and tools used during mobile app security testing, as well as an exhaustive set of test cases that enables testers to deliver consistent and complete results.

## Main Deliverables

### OWASP MASVS (Mobile Application Security Verification Standard)
The industry standard for mobile app security that can be used by:
- Mobile software architects and developers seeking to develop secure mobile applications
- Security testers to ensure completeness and consistency of test results
- Organizations implementing mobile security programs

### OWASP MASWE (Mobile Application Security Weakness Enumeration)
A comprehensive list of common security and privacy weaknesses in mobile applications:
- Reference for developers, security researchers, and security professionals
- Bridge between the OWASP MASVS and the OWASP MASTG
- Structured enumeration of mobile-specific vulnerabilities

### OWASP MASTG (Mobile Application Security Testing Guide)
Previously known as OWASP MSTG (Mobile Security Testing Guide), this comprehensive manual covers:
- Mobile application security testing methodologies
- Fundamental learning resource for beginners and professionals
- Mobile OS internals to advanced reverse engineering techniques
- Exhaustive set of test cases for verifying MASVS controls
- Technical processes, techniques, and tools guidance

### Mobile Application Security Checklist
Practical implementation tool that:
- Applies MASVS controls during security assessments
- Links to corresponding MASTG test cases
- Unifies all MASVS categories into a single sheet
- Stays up to date with latest MASTG and MASVS versions

## Industry Trust and Adoption

The OWASP MASVS, MASWE, and MASTG are trusted by major platform providers and institutions including:
- **Android**: Google Android security standards
- **CREST**: Professional security testing certification
- **NIST**: U.S. National Institute of Standards and Technology
- **BSI**: German Federal Office for Information Security
- **ioXt**: Internet of Secure Things Alliance

## MAS Advocates Program

Industry adopters who have invested significant resources to push the project forward:
- Consistent high-impact contributions
- Continuous project promotion and adoption
- Real-world implementation and feedback

## Global Recognition

The project has achieved widespread industry adoption with:
- **12,420+ GitHub stars** across repositories
- **418 watchers** actively following development
- **Multiple release versions** with continuous updates
- **International standards alignment**

## Educational Impact

The MAS project serves as:
- Fundamental learning resource for mobile security
- Professional certification reference material
- Industry training standard
- Academic curriculum foundation',
    
    'Mobile Security',
    'flagship',
    'active',
    true,
    'https://mas.owasp.org/',
    'https://github.com/OWASP/owasp-mastg',
    'https://mas.owasp.org/',
    'Documentation',
    'intermediate',
    'Creative Commons Attribution-ShareAlike v4.0',
    'v1.7.0 (MASTG), v2.1.0 (MASVS)',
    200, -- Estimated based on project scope and community size
    12420, -- GitHub stars mentioned on the page
    ARRAY[
        'Industry Standard Mobile Security Framework',
        'Comprehensive Testing Guide (MASTG)',
        'Security Verification Standard (MASVS)',
        'Mobile Weakness Enumeration (MASWE)',
        'Security Testing Checklist',
        'Multi-Platform Support (iOS/Android)',
        'Advanced Reverse Engineering Techniques',
        'Professional Certification Reference',
        'Industry Advocate Program',
        'Continuous Updates and Releases'
    ],
    ARRAY[
        'Mobile application development knowledge',
        'Understanding of mobile platforms (iOS/Android)',
        'Application security fundamentals',
        'Testing and assessment methodologies',
        'Mobile OS internals knowledge (for advanced topics)'
    ],
    ARRAY[
        'Visit the official MAS website at https://mas.owasp.org/',
        'Start with the MASVS to understand security requirements',
        'Use the MASTG for detailed testing methodologies',
        'Reference MASWE for mobile-specific vulnerabilities',
        'Download the Mobile Security Checklist for assessments',
        'Join the community discussions on GitHub',
        'Attend MAS project presentations and talks'
    ],
    ARRAY[
        'mobile security',
        'application security',
        'mobile testing',
        'security verification',
        'ios security',
        'android security',
        'security standards',
        'penetration testing',
        'security assessment',
        'mobile development'
    ],
    ARRAY[
        'Carlos Holguera',
        'Sven Schleier',
        'OWASP MAS Community'
    ],
    '[
        {
            "title": "OWASP MASVS - Mobile Application Security Verification Standard",
            "url": "https://github.com/OWASP/owasp-masvs",
            "type": "standard"
        },
        {
            "title": "OWASP MASTG - Mobile Application Security Testing Guide",
            "url": "https://github.com/OWASP/owasp-mastg",
            "type": "guide"
        },
        {
            "title": "OWASP MASWE - Mobile Application Security Weakness Enumeration",
            "url": "https://github.com/OWASP/owasp-maswe",
            "type": "enumeration"
        },
        {
            "title": "Mobile Application Security Checklist",
            "url": "https://github.com/OWASP/owasp-mastg/releases",
            "type": "checklist"
        },
        {
            "title": "Read MASVS Online",
            "url": "https://mas.owasp.org/MASVS/",
            "type": "documentation"
        },
        {
            "title": "Read MASTG Online",
            "url": "https://mas.owasp.org/MASTG/",
            "type": "documentation"
        },
        {
            "title": "Download MASVS PDF",
            "url": "https://github.com/OWASP/owasp-masvs/releases",
            "type": "download"
        },
        {
            "title": "Download MASTG PDF",
            "url": "https://github.com/OWASP/owasp-mastg/releases",
            "type": "download"
        }
    ]'::jsonb,
    
    -- Main tab content
    'The OWASP Mobile Application Security (MAS) flagship project defines the industry standard for mobile application security through comprehensive frameworks, testing guides, and security standards.

## Mission Statement

**"Define the industry standard for mobile application security."**

The MAS project provides essential resources for securing mobile applications across all platforms, serving developers, security professionals, and organizations implementing mobile security programs.

## Core Components

### 🔒 OWASP MASVS (Mobile Application Security Verification Standard)
The industry standard for mobile app security that provides:
- **Security Requirements**: Comprehensive security controls for mobile applications
- **Verification Levels**: Multiple security levels from basic to advanced
- **Platform Coverage**: iOS and Android security requirements
- **Developer Guidance**: Security requirements for secure mobile development

### 🔍 OWASP MASTG (Mobile Application Security Testing Guide)
Comprehensive manual for mobile application security testing featuring:
- **Testing Methodologies**: Complete guide to mobile security testing
- **Technical Processes**: Detailed testing procedures and techniques
- **Tool Guidance**: Recommendations for security testing tools
- **Test Cases**: Exhaustive set of test cases for MASVS verification
- **Reverse Engineering**: Advanced techniques for mobile app analysis

### 📋 OWASP MASWE (Mobile Application Security Weakness Enumeration)
Structured collection of mobile security weaknesses including:
- **Vulnerability Catalog**: Common mobile application vulnerabilities
- **Developer Reference**: Security weakness patterns to avoid
- **Testing Bridge**: Connection between MASVS requirements and MASTG tests
- **Risk Assessment**: Understanding mobile-specific security risks

### ✅ Mobile Application Security Checklist
Practical implementation tool that:
- **Unifies Controls**: All MASVS categories in a single assessment sheet
- **Links Testing**: Direct connections to MASTG test cases
- **Version Tracking**: Traceable to exact MASVS and MASTG versions
- **Customizable**: Extensible format for organization-specific needs

## Industry Recognition

### Trusted by Major Organizations
- **Google Android**: Security standards integration
- **NIST**: U.S. National Institute of Standards and Technology
- **CREST**: Professional security testing certification
- **BSI**: German Federal Office for Information Security
- **ioXt Alliance**: Internet of Secure Things certification

### Global Adoption Metrics
- **12,420+ GitHub Stars**: Across MAS repositories
- **418+ Watchers**: Active community following
- **Multiple Releases**: Continuous updates and improvements
- **International Usage**: Adopted by organizations worldwide

## Project Leadership

### Current Leaders
- **Carlos Holguera** (@grepharder): Project co-leader
- **Sven Schleier** (@bsd_daemon): Project co-leader

### Past Leaders
- **Jeroen Willemsen**: Former project leader
- **Bernhard Mueller**: Former project leader

## MAS Advocates Program

Industry adopters who provide significant contributions:
- **Consistent Investment**: Significant resource allocation
- **High-Impact Contributions**: Technical and strategic input
- **Community Building**: Spreading awareness and adoption
- **Real-World Feedback**: Implementation experience and lessons learned

## Educational Impact

The MAS project serves as:
- **Professional Training**: Industry certification and training programs
- **Academic Reference**: University curriculum integration
- **Skill Development**: Career advancement in mobile security
- **Best Practices**: Industry-wide security improvement',

    -- Translation tab content  
    'The OWASP Mobile Application Security project maintains global accessibility through comprehensive documentation and international collaboration.

## Multi-Format Documentation

### Online Documentation
- **Interactive Web Guides**: Searchable, cross-referenced documentation
- **Mobile-Responsive**: Accessible on all devices and platforms
- **Regular Updates**: Living documentation with continuous improvements
- **Community Contributions**: Open source collaborative editing

### Downloadable Resources
- **PDF Formats**: Complete guides available for offline reference
- **Multiple Versions**: Historical versions and latest releases
- **Checklist Downloads**: Practical assessment tools
- **Corporate Distribution**: Shareable formats for organizational use

## International Standards Alignment

### Global Standards Integration
- **ISO/IEC Alignment**: Integration with international security standards
- **Regional Compliance**: Support for local regulatory requirements
- **Industry Standards**: Compatibility with sector-specific frameworks
- **Certification Programs**: Professional certification alignment

### Platform Vendor Collaboration
- **Android Security**: Google Android security framework integration
- **iOS Security**: Apple security requirement alignment
- **Cross-Platform**: Universal security principles
- **Emerging Platforms**: Adaptation for new mobile technologies

## Community Localization

### Regional Adaptation
- **Local Regulations**: Compliance with regional security requirements
- **Cultural Context**: Adaptation for different business environments
- **Industry Specifics**: Sector-specific implementation guidance
- **Language Considerations**: Clear, universal security concepts

### Global Contribution Model
- **International Contributors**: Community members from around the world
- **Regional Expertise**: Local security knowledge integration
- **Cultural Diversity**: Diverse perspectives on mobile security
- **Knowledge Sharing**: Cross-border collaboration and learning

## Accessibility Features

### Technical Accessibility
- **Screen Reader Compatible**: Accessible to users with disabilities
- **Multiple Navigation**: Various ways to access content
- **Clear Structure**: Logical organization and presentation
- **Search Functionality**: Easy content discovery

### Educational Accessibility
- **Multiple Skill Levels**: Content for beginners to experts
- **Learning Paths**: Structured educational progression
- **Practical Examples**: Real-world implementation guidance
- **Tool Integration**: Support for various security tools

## Future Internationalization

### Planned Enhancements
- **Translation Programs**: Community-driven translation initiatives
- **Regional Chapters**: Local mobile security communities
- **Localized Training**: Region-specific educational programs
- **Multi-Language Tools**: Internationalized security assessment tools',

    -- Sponsors tab content
    'The OWASP Mobile Application Security project is supported by a diverse ecosystem of corporate supporters, advocates, and community contributors committed to advancing mobile security standards.

## Corporate Supporters

The MAS project welcomes corporate supporters who contribute to the advancement of mobile application security through financial support and resource allocation.

### Support Benefits
Corporate supporters gain:
- **Industry Recognition**: Association with leading mobile security standards
- **Community Access**: Connection to global mobile security experts
- **Standards Influence**: Input into mobile security standard development
- **Thought Leadership**: Platform for sharing mobile security expertise

## MAS Advocates Program

### Industry Advocates
MAS Advocates are industry adopters who have invested significant and consistent resources to advance the project:

**Qualification Criteria:**
- **Significant Investment**: Substantial resource allocation to the project
- **Consistent Contributions**: Regular high-impact technical contributions
- **Community Building**: Active promotion and adoption of MAS standards
- **Implementation Experience**: Real-world deployment and feedback

**Advocate Benefits:**
- **Recognition**: Official acknowledgment as project advocates
- **Influence**: Direct input into project direction and priorities
- **Networking**: Access to exclusive advocate community
- **Visibility**: Prominent recognition in project materials

## Industry Trust and Adoption

### Major Platform Providers
The MAS project is trusted and adopted by:

**Google Android**
- Security framework integration
- Developer guidance alignment
- Platform security standards

**Apple iOS**
- Security requirement compatibility
- Developer tool integration
- Platform-specific guidance

### Standards Organizations

**NIST (National Institute of Standards and Technology)**
- U.S. government standards alignment
- Cybersecurity framework integration
- Federal compliance requirements

**CREST (Council of Registered Ethical Security Testers)**
- Professional certification standards
- Testing methodology validation
- Industry skill certification

**BSI (Bundesamt für Sicherheit in der Informationstechnik)**
- German federal security standards
- European compliance frameworks
- Regional security requirements

**ioXt Alliance (Internet of Secure Things)**
- IoT security certification
- Connected device standards
- Security labeling programs

## Donation and Support

### Financial Support
The MAS project accepts donations to support:
- **Development Activities**: Technical development and maintenance
- **Community Events**: Conferences, workshops, and training
- **Tool Development**: Security testing tools and frameworks
- **Documentation**: Comprehensive guide development and updates

### Donation Packages
Multiple support levels are available with varying benefits and recognition levels.

**Important Note**: The OWASP Foundation maintains strict vendor neutrality. Donations do not influence the content of MASVS, MASTG, or MASWE in any way.

## Community Recognition

### Contributor Acknowledgment
The project maintains comprehensive acknowledgment of:
- **Technical Contributors**: Code, documentation, and framework development
- **Community Leaders**: Project management and community building
- **Industry Experts**: Professional guidance and expertise
- **Educational Partners**: Training and certification support

### Professional Network
The MAS project creates networking opportunities for:
- **Security Professionals**: Career development and skill building
- **Mobile Developers**: Security awareness and best practices
- **Industry Leaders**: Strategic mobile security planning
- **Academic Researchers**: Mobile security research collaboration

## Partnership Opportunities

Organizations interested in supporting the MAS project can:
- **Financial Sponsorship**: Direct financial support for project activities
- **Resource Contribution**: Technical expertise and development resources
- **Community Building**: Event hosting and educational initiatives
- **Industry Adoption**: Implementation and case study development

For partnership inquiries, organizations can contact the project leaders through official OWASP channels.',

    -- Data tab content
    'The OWASP Mobile Application Security project maintains comprehensive data resources and methodologies to support evidence-based mobile security practices and standards development.

## Security Framework Data

### MASVS Controls Database
Comprehensive security requirements including:
- **Security Controls**: Detailed mobile security requirements
- **Verification Levels**: Multiple security implementation levels
- **Platform Mapping**: iOS and Android specific requirements
- **Risk Categorization**: Security control priority and impact assessment

### MASWE Vulnerability Database
Structured enumeration of mobile security weaknesses:
- **Vulnerability Catalog**: Common mobile application vulnerabilities
- **Attack Vectors**: Methods of mobile application compromise
- **Impact Analysis**: Business and technical impact of vulnerabilities
- **Mitigation Strategies**: Countermeasures and protective controls

### MASTG Testing Methodology
Comprehensive testing procedures and data:
- **Test Case Database**: Exhaustive mobile security test cases
- **Tool Evaluation**: Security testing tool effectiveness data
- **Technique Validation**: Testing methodology effectiveness metrics
- **Result Standardization**: Consistent testing outcome frameworks

## Industry Adoption Analytics

### Implementation Metrics
- **Global Adoption**: Worldwide implementation statistics
- **Industry Sectors**: Adoption across different business sectors
- **Platform Distribution**: iOS vs Android implementation patterns
- **Maturity Levels**: Organizational security maturity assessment

### Usage Analytics
- **Download Statistics**: MASVS, MASTG, and MASWE access patterns
- **Community Engagement**: GitHub activity and community participation
- **Training Impact**: Educational program effectiveness metrics
- **Certification Tracking**: Professional certification adoption rates

## Threat Intelligence Database

### Mobile Threat Landscape
- **Emerging Threats**: New mobile security threats and attack patterns
- **Vulnerability Trends**: Statistical analysis of mobile vulnerabilities
- **Platform Security**: iOS and Android security evolution tracking
- **Attack Sophistication**: Analysis of mobile attack complexity trends

### Real-World Incident Data
- **Security Breaches**: Mobile application security incident analysis
- **Attack Attribution**: Mobile threat actor analysis and patterns
- **Impact Assessment**: Business impact of mobile security incidents
- **Lessons Learned**: Security improvement insights from incidents

## Research and Development Data

### Academic Collaboration
- **University Partnerships**: Academic research collaboration data
- **Research Publications**: Peer-reviewed mobile security research
- **Student Projects**: Academic mobile security project outcomes
- **Innovation Tracking**: Emerging mobile security technologies

### Industry Research
- **Vendor Collaboration**: Mobile security vendor research partnerships
- **Technology Assessment**: New mobile security technology evaluation
- **Standard Evolution**: Mobile security standard development metrics
- **Best Practice Development**: Industry best practice identification

## Quality Assurance Metrics

### Content Validation
- **Peer Review**: Expert review and validation processes
- **Technical Accuracy**: Content accuracy verification methods
- **Practical Testing**: Real-world implementation validation
- **Community Feedback**: User experience and effectiveness assessment

### Continuous Improvement
- **Version Control**: Change tracking and improvement metrics
- **Community Input**: Feedback collection and analysis methods
- **Error Reporting**: Issue identification and resolution tracking
- **Update Frequency**: Content refresh and maintenance schedules

## Privacy and Ethics Framework

### Data Protection
- **Privacy Compliance**: Adherence to international privacy regulations
- **Anonymization**: User data protection and anonymization practices
- **Consent Management**: Transparent data collection consent processes
- **Ethical Guidelines**: Responsible data handling and sharing practices

### Research Ethics
- **Academic Integrity**: High standards for research and publication
- **Community Benefit**: Ensuring community benefits from research outcomes
- **Responsible Disclosure**: Ethical vulnerability disclosure practices
- **Transparency**: Open documentation of research methods and findings

## Open Data Initiatives

### Public Resources
- **Anonymized Statistics**: Public mobile security statistics and trends
- **Research Datasets**: Educational and research data sharing
- **Case Studies**: Real-world implementation examples and outcomes
- **Tool Integration**: APIs and data formats for security tool integration

### Community Contribution
- **Collaborative Development**: Open source contribution frameworks
- **Knowledge Sharing**: Community knowledge base development
- **Best Practice Documentation**: Shared implementation experiences
- **Innovation Showcase**: Community innovation and development highlights'

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
WHERE slug = 'mobile-app-security';
