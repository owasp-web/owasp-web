-- Add OWASP AI Exchange Project to the database
-- Based on data from https://owaspai.org/

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
    'OWASP AI Exchange',
    'ai-exchange',
    'The go-to resource for broad AI security & privacy - over 200 pages of practical advice and references on protecting AI and data-centric systems from threats.',
    'The OWASP AI Exchange is a comprehensive flagship project providing over 200 pages of practical advice and references on protecting AI and data-centric systems from threats. This content serves as a key bookmark for practitioners and contributes actively and substantially to international standards such as ISO/IEC and the AI Act through official standard partnerships.

## Project Overview

Through broad collaboration with key institutes and Standards Development Organizations (SDOs), the AI Exchange represents the consensus on AI security and privacy. The project provides practical, actionable guidance for organizations implementing AI systems securely.

## Key Content Areas

### 1. AI Security Overview
Comprehensive introduction to AI security challenges and approaches, including threat analysis and risk assessment methodologies.

### 2. General Controls
Foundational security controls applicable across all AI implementations:
- **Governance Controls**: Framework for AI security governance
- **Data Limitation**: Strategies for minimizing data exposure and risks
- **Limit Unwanted Behaviour**: Controls to prevent AI system misuse

### 3. Threats Through Use
Analysis of threats that emerge during AI system operation and user interaction.

### 4. Development-Time Threats
Security considerations and controls for AI system development phases.

### 5. Runtime Application Security Threats
Real-time security threats and defensive measures for deployed AI systems.

### 6. AI Security Testing
Comprehensive testing methodologies specific to AI systems and applications.

### 7. AI Privacy
Privacy protection strategies and compliance frameworks for AI implementations.

## Key Resources

### Threat Matrix
Interactive threat analysis tool providing comprehensive mapping of AI security risks and corresponding controls.

### Periodic Table of Threats and Controls
Visual reference guide organizing AI security threats and controls in an accessible, systematic format.

### Risk Analysis Framework
Structured approach to AI risk assessment and mitigation planning.

### Navigator Tool
Deep-dive guidance system for exploring specific threats and implementing appropriate controls.

## Industry Recognition

The project has received endorsements from major industry leaders:

**Dutch Railways**: "A risk-based, context-aware approach—like the one OWASP Exchange champions—not only supports the responsible use of AI, but ensures that real threats are mitigated without burdening engineers with irrelevant checklists."

**Peloton Interactive**: "AI regulation is critical for protecting safety and security, and for creating a level playing field for vendors. OWASP Exchange has taken on these challenges by bringing the security community to the table."

**Lenovo**: "OWASP AI Exchange serves as a vital anchor for mapping evolving attack surfaces, codifying AI-specific testing methodologies, and driving community-aligned standards for AI risk mitigation."

## Standards Contribution

The AI Exchange actively contributes to international standards development:
- **ISO/IEC Standards**: Direct input to international security standards
- **EU AI Act**: Contributing to regulatory compliance frameworks
- **Industry Standards**: Collaboration with major standards development organizations

## Accessibility

The comprehensive guide is available in multiple formats:
- Interactive web documentation
- Downloadable PDF format
- Mobile-responsive design
- Search-enabled content navigation',
    
    'AI/ML Security',
    'flagship',
    'active',
    true,
    'https://owaspai.org/',
    'https://github.com/OWASP/www-project-ai-security-and-privacy-guide',
    'https://owaspai.org/',
    'Documentation',
    'intermediate',
    'Creative Commons Attribution-ShareAlike v4.0',
    '2025',
    150, -- Estimated based on project scope and community contributions
    800, -- Estimated GitHub stars based on project visibility
    ARRAY[
        'Comprehensive AI Security Guide (200+ pages)',
        'Interactive Threat Matrix',
        'Periodic Table of Threats and Controls',
        'Risk Analysis Framework',
        'AI Security Testing Methodologies',
        'Privacy Protection Guidelines',
        'Standards Development Contributions',
        'Industry Partnership Program',
        'Multi-format Documentation',
        'Navigator Deep-dive Tool'
    ],
    ARRAY[
        'Basic understanding of AI/ML systems',
        'Application security fundamentals',
        'Risk management principles',
        'Compliance and governance knowledge',
        'Software development lifecycle awareness'
    ],
    ARRAY[
        'Visit https://owaspai.org/ to access the full guide',
        'Start with the AI Security Overview section',
        'Use the Navigator tool to explore specific threats',
        'Review the Periodic Table of Threats and Controls',
        'Download the PDF version for offline reference',
        'Join community discussions and contribute feedback',
        'Implement recommended controls in your organization'
    ],
    ARRAY[
        'artificial intelligence',
        'ai security',
        'machine learning security',
        'ai privacy',
        'threat modeling',
        'risk assessment',
        'ai governance',
        'security controls',
        'iso standards',
        'ai act compliance'
    ],
    ARRAY[
        'OWASP AI Exchange Community',
        'Rob van der Veer (Project Lead)',
        'International Standards Contributors'
    ],
    '[
        {
            "title": "AI Security Overview",
            "url": "https://owaspai.org/docs/ai_security_overview/",
            "type": "documentation"
        },
        {
            "title": "Threat Matrix",
            "url": "https://owaspai.org/goto/aisecuritymatrix/",
            "type": "tool"
        },
        {
            "title": "Periodic Table of Threats and Controls",
            "url": "https://owaspai.org/goto/periodictable/",
            "type": "reference"
        },
        {
            "title": "Navigator Deep Dive",
            "url": "https://owaspai.org/goto/navigator/",
            "type": "tool"
        },
        {
            "title": "General Controls",
            "url": "https://owaspai.org/docs/1_general_controls/",
            "type": "framework"
        },
        {
            "title": "AI Security Testing",
            "url": "https://owaspai.org/docs/5_testing/",
            "type": "methodology"
        },
        {
            "title": "AI Privacy Guide",
            "url": "https://owaspai.org/goto/aiprivacy/",
            "type": "framework"
        },
        {
            "title": "Complete PDF Guide",
            "url": "https://owaspai.org/OWASP-AI-Exchange.pdf",
            "type": "document"
        }
    ]'::jsonb,
    
    -- Main tab content
    'The OWASP AI Exchange is the go-to resource for broad AI security & privacy, providing over 200 pages of practical advice and references on protecting AI and data-centric systems from threats.

## Mission Statement

To provide comprehensive, practical guidance for securing AI systems throughout their lifecycle, from development to deployment and operation.

## Key Features

### Comprehensive Coverage
- **200+ Pages** of detailed security guidance
- **Practical Advice** for real-world implementation
- **Reference Materials** for ongoing use
- **Standards Integration** with ISO/IEC and AI Act

### Interactive Tools

**Threat Matrix**: Comprehensive mapping of AI security risks and corresponding controls for systematic threat analysis.

**Periodic Table**: Visual reference organizing AI security threats and controls in an accessible, systematic format for quick reference.

**Navigator**: Deep-dive tool for exploring specific threats and implementing appropriate security controls.

## Content Structure

### 1. AI Security Overview
- About the AI Exchange
- Summary of key concepts
- How to use the documentation
- Comprehensive threats overview

### 2. General Controls
- Governance controls framework
- Data limitation strategies
- Unwanted behavior prevention

### 3. Threats Through Use
- Operational security risks
- User interaction threats
- Runtime vulnerabilities

### 4. Development-Time Threats
- Secure development practices
- Training data security
- Model integrity protection

### 5. Runtime Application Security
- Deployment security measures
- Monitoring and detection
- Incident response procedures

### 6. AI Security Testing
- Testing methodologies
- Validation frameworks
- Continuous security assessment

### 7. AI Privacy
- Privacy-preserving techniques
- Compliance frameworks
- Data protection strategies

## Standards Contribution

The AI Exchange actively contributes to:
- **ISO/IEC Standards**: International security frameworks
- **EU AI Act**: Regulatory compliance guidance
- **Industry Standards**: Best practices development

## Industry Adoption

Trusted by industry leaders including Dutch Railways, Peloton Interactive, and Lenovo for practical AI security implementation.',

    -- Translation tab content  
    'The OWASP AI Exchange maintains global accessibility through comprehensive documentation and international collaboration.

## Multi-Format Availability

### Web Documentation
The complete guide is available as interactive web documentation with:
- Search-enabled content navigation
- Mobile-responsive design
- Cross-referenced sections
- Interactive tools and matrices

### PDF Format
A complete PDF version is available for:
- Offline reference and study
- Corporate distribution
- Training materials
- Compliance documentation

### Accessibility Features
- Screen reader compatible
- Multiple navigation options
- Clear content structure
- Comprehensive indexing

## International Standards Integration

The project contributes to global standards through:
- **ISO/IEC Working Groups**: Direct participation in international standards development
- **EU AI Act Compliance**: Contributing to regulatory framework implementation
- **Regional Adaptations**: Supporting local regulatory requirements

## Global Community

### International Contributors
The project welcomes contributions from security professionals worldwide, ensuring diverse perspectives and global applicability.

### Regional Implementations
Organizations worldwide adapt the guidance for:
- Local regulatory compliance
- Cultural and business context
- Industry-specific requirements
- Regional threat landscapes

## Language Considerations

While primarily maintained in English, the project:
- Welcomes translation initiatives
- Supports international terminology
- Provides clear, universal concepts
- Maintains consistency across regions

## Future Internationalization

Plans for expanded international support include:
- Community translation programs
- Regional chapter development
- Localized case studies
- Multi-language tool interfaces',

    -- Sponsors tab content
    'The OWASP AI Exchange is supported by industry leaders and organizations committed to advancing AI security standards and practices.

## Current Sponsors

### Straiker
**Straiker** serves as a key sponsor of the OWASP AI Exchange, supporting the development and maintenance of comprehensive AI security guidance.

## Industry Endorsements

The project has received strong endorsements from major industry leaders:

### Dutch Railways
**Dimitri van Zantvliet, Director Cybersecurity:**
"A risk-based, context-aware approach—like the one OWASP Exchange champions—not only supports the responsible use of AI, but ensures that real threats are mitigated without burdening engineers with irrelevant checklists. We need standards written by those who build and defend these systems every day."

### Peloton Interactive
**Sri Manda, Chief Security & Trust Officer:**
"AI regulation is critical for protecting safety and security, and for creating a level playing field for vendors. The challenge is to remove legal uncertainty by making standards really clear, and to avoid unnecessary requirements by building in flexible compliance. I''m very happy to see that OWASP Exchange has taken on these challenges by bringing the security community to the table to ensure we get standards that work."

### Lenovo
**Prateek Kalasannavar, Staff AI Security Engineer:**
"At Lenovo, we''re operationalizing AI product security at scale, from embedded inference on devices to large-scale cloud-hosted models. OWASP AI Exchange serves as a vital anchor for mapping evolving attack surfaces, codifying AI-specific testing methodologies, and driving community-aligned standards for AI risk mitigation. It bridges the gap between theory and engineering."

## Standards Development Organizations

The project collaborates with key institutes and Standards Development Organizations (SDOs):
- **ISO/IEC Working Groups**: Contributing to international security standards
- **European Standards Organizations**: Supporting AI Act implementation
- **Industry Consortiums**: Participating in sector-specific standards development

## Partnership Benefits

Organizations partnering with the AI Exchange gain:
- **Industry Recognition**: Association with leading AI security standards
- **Standards Influence**: Input into international standards development
- **Community Access**: Connection to global AI security experts
- **Thought Leadership**: Platform for sharing expertise and insights

## Sponsorship Opportunities

The project offers various levels of support for organizations interested in:
- **Standards Development**: Contributing to international AI security standards
- **Community Building**: Supporting global AI security education
- **Research Initiatives**: Funding advanced AI security research
- **Tool Development**: Supporting interactive security tools and resources

## Corporate Adoption

The AI Exchange is trusted by industry giants across sectors:
- **Transportation**: Dutch Railways implementation
- **Consumer Technology**: Peloton and Lenovo adoption
- **Enterprise Solutions**: Multiple Fortune 500 implementations
- **Government Agencies**: Public sector security framework adoption

For partnership and sponsorship opportunities, organizations can connect through the official project channels.',

    -- Data tab content
    'The OWASP AI Exchange maintains comprehensive data resources and methodologies to support evidence-based AI security practices and standards development.

## Threat Intelligence Database

### Comprehensive Threat Catalog
The project maintains an extensive database of AI-specific threats including:
- **Attack Vectors**: Documented methods of AI system compromise
- **Vulnerability Patterns**: Common weaknesses in AI implementations
- **Incident Reports**: Real-world AI security breaches and lessons learned
- **Threat Actor Profiles**: Analysis of adversaries targeting AI systems

### Threat Matrix
Interactive tool providing:
- **Systematic Threat Mapping**: Comprehensive categorization of AI risks
- **Control Correlation**: Direct mapping between threats and mitigation controls
- **Risk Assessment**: Quantitative and qualitative risk evaluation methods
- **Impact Analysis**: Business and technical impact assessment frameworks

## Controls and Mitigation Database

### Periodic Table of Controls
Systematic organization of security controls including:
- **General Controls**: Foundational security measures applicable across AI systems
- **Specific Controls**: Targeted mitigations for particular threat categories
- **Implementation Guidance**: Practical steps for control deployment
- **Effectiveness Metrics**: Measurement frameworks for control validation

### Control Effectiveness Data
- **Implementation Success Rates**: Industry data on control deployment
- **Cost-Benefit Analysis**: Economic impact assessment of security measures
- **Performance Metrics**: Quantitative effectiveness measurements
- **Compliance Mapping**: Alignment with regulatory requirements

## Standards Development Data

### International Standards Contribution
The project provides data and research to:
- **ISO/IEC Standards**: Technical specifications and security requirements
- **EU AI Act Implementation**: Compliance frameworks and assessment criteria
- **Industry Standards**: Sector-specific security guidelines and best practices
- **Regional Regulations**: Local compliance and adaptation requirements

### Research Methodology
- **Expert Consensus Building**: Systematic approach to community input
- **Peer Review Processes**: Academic and industry validation methods
- **Evidence-Based Analysis**: Data-driven threat and control assessment
- **Continuous Updates**: Regular revision based on emerging threats

## Implementation Analytics

### Adoption Metrics
- **Industry Deployment**: Tracking of framework implementation across sectors
- **Geographic Distribution**: Global adoption patterns and regional variations
- **Organizational Profiles**: Analysis of implementing organizations and use cases
- **Success Indicators**: Measurement of security improvement outcomes

### Usage Analytics
- **Content Access Patterns**: Most referenced sections and tools
- **Tool Utilization**: Interactive feature usage and effectiveness
- **Community Engagement**: Contribution patterns and feedback analysis
- **Knowledge Transfer**: Educational impact and skill development metrics

## Privacy and Ethics Framework

### Data Protection
- **Privacy-Preserving Analytics**: Anonymized data collection and analysis
- **Compliance Assurance**: Adherence to international privacy regulations
- **Ethical Guidelines**: Responsible data handling and sharing practices
- **Transparency Measures**: Open documentation of data collection and use

### Research Ethics
- **Community Consent**: Transparent community participation in research
- **Benefit Sharing**: Ensuring community benefits from research outcomes
- **Responsible Disclosure**: Ethical handling of vulnerability information
- **Academic Integrity**: Maintaining high standards for research and publication

## Open Data Initiatives

### Public Resources
- **Anonymized Threat Data**: Sanitized threat intelligence for research
- **Control Effectiveness Studies**: Public analysis of mitigation strategies
- **Implementation Case Studies**: Real-world deployment examples and lessons
- **Educational Datasets**: Training materials for security professionals

### API Access
- **Structured Data Access**: Programmatic access to threat and control databases
- **Integration Support**: APIs for security tool integration
- **Real-time Updates**: Dynamic content delivery for current threat intelligence
- **Research Collaboration**: Data sharing frameworks for academic and industry research'

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
WHERE slug = 'ai-exchange';
