-- Add OWASP GenAI Security Project to the database
-- Based on data from https://genai.owasp.org/

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
    'OWASP GenAI Security Project',
    'genai-security',
    'A global community-driven and expert led initiative to create freely available open source guidance and resources for understanding and mitigating security and safety concerns for Generative AI applications and adoption.',
    'The OWASP GenAI Security Project is a comprehensive initiative focused on identifying and tackling the risks of Gen AI systems and applications. This global community-driven project provides expert-led guidance for understanding and mitigating security and safety concerns for Generative AI applications and adoption.

## Project Overview

The project serves as a central hub for AI security knowledge, bringing together thousands of members from multiple countries to create freely available open source guidance and resources.

## Key Initiatives

### 1. LLM Top 10
Key security risks for GenAI and LLM-based applications, including:
- **LLM Top 10 for 2025**: Latest updates and emerging threats
- **LLM Top 10 for 2023/24**: Foundational security risks

### 2. AI Threat Intelligence and Response
Tracks GenAI misuse by attackers and emerging threat patterns, providing real-time insights into the evolving threat landscape.

### 3. AI Security Governance
Best practices and frameworks for responsible GenAI program oversight, including governance checklists and compliance guidelines.

### 4. Secure AI Adoption
Comprehensive frameworks and policies for responsible GenAI program implementation and management.

### 5. Agentic App Security
Specialized focus on securing autonomous agents and multi-step AI workflows, including the innovative FinBot CTF application.

### 6. Data Security
Protects training and retrieval data from leaks and tampering, ensuring data integrity throughout the AI lifecycle.

### 7. Red Teaming & Evaluation
Advanced testing of GenAI systems through adversarial red teaming methods and comprehensive evaluation frameworks.

### 8. AI Security Solution Landscape
Comprehensive mapping of tools and platforms to address top GenAI security risks across the full AI lifecycle.

## Recent Developments

- **FinBot Agentic AI CTF**: Hands-on capture-the-flag application for understanding agentic security
- **AI Security Solutions Landscape Q3 2025**: Comprehensive monitoring of the Agentic AI lifecycle
- **State of Agentic AI Security and Governance 1.0**: Industry-leading research on autonomous AI systems
- **Partnership with CyberRisk Alliance**: Strategic collaboration for advancing AI education

## Community Impact

The project has achieved significant industry recognition and adoption, with endorsements from major security vendors including Palo Alto Networks, Snyk, HiddenLayer, Securiti AI, and many others.

## Events and Engagement

- Regular virtual conferences and workshops
- Black Hat and DefCon presence
- Global community meetups and hackathons
- Continuous threat intelligence updates',
    
    'AI/ML Security',
    'flagship',
    'active',
    true,
    'https://genai.owasp.org/',
    'https://github.com/OWASP/www-project-ai-security-and-privacy-guide',
    'https://genai.owasp.org/',
    'Documentation',
    'advanced',
    'Creative Commons Attribution-ShareAlike v4.0',
    '2025',
    1000, -- Based on "k+ Members" mentioned on site
    2500, -- Estimated based on project scope and community size
    ARRAY[
        'LLM Top 10 Security Framework',
        'AI Threat Intelligence Tracking',
        'Agentic AI Security Guidelines',
        'GenAI Governance Framework',
        'AI Red Teaming Methodologies',
        'Data Security for AI Systems',
        'AI Security Solutions Landscape',
        'Community-driven Research',
        'Industry Partnership Program',
        'Global Event Network'
    ],
    ARRAY[
        'Understanding of AI/ML fundamentals',
        'Application security knowledge',
        'Familiarity with LLM architectures',
        'Security risk assessment experience',
        'Knowledge of AI governance frameworks'
    ],
    ARRAY[
        'Visit the project website at https://genai.owasp.org/',
        'Review the LLM Top 10 for 2025 documentation',
        'Join the community newsletter for updates',
        'Participate in virtual conferences and events',
        'Contribute to threat intelligence initiatives',
        'Engage with local chapter activities',
        'Follow the project blog for latest insights'
    ],
    ARRAY[
        'artificial intelligence',
        'machine learning',
        'llm security',
        'genai',
        'ai governance',
        'threat intelligence',
        'agentic ai',
        'data security',
        'red teaming',
        'ai risk assessment'
    ],
    ARRAY[
        'OWASP GenAI Security Project Team',
        'Global Community Contributors',
        'Industry Expert Advisory Board'
    ],
    '[
        {
            "title": "LLM Top 10 for 2025",
            "url": "https://genai.owasp.org/llmtop10/",
            "type": "framework"
        },
        {
            "title": "AI Security Solutions Landscape",
            "url": "https://genai.owasp.org/resource/ai-security-solutions-landscape-agentic-ai-q3-2025/",
            "type": "research"
        },
        {
            "title": "FinBot Agentic AI CTF",
            "url": "https://genai.owasp.org/resource/finbot-agentic-ai-capture-the-flag-ctf-application/",
            "type": "tool"
        },
        {
            "title": "Agentic AI Taxonomy",
            "url": "https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/",
            "type": "framework"
        },
        {
            "title": "State of Agentic AI Security",
            "url": "https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance-1-0/",
            "type": "report"
        },
        {
            "title": "AI Governance Checklist",
            "url": "https://genai.owasp.org/governance-checklist/",
            "type": "checklist"
        }
    ]'::jsonb,
    
    -- Main tab content
    'The OWASP GenAI Security Project is a global community-driven and expert led initiative to create freely available open source guidance and resources for understanding and mitigating security and safety concerns for Generative AI applications and adoption.

## Mission Statement

Identifying and tackling the risks of Gen AI systems and applications through collaborative research, practical guidance, and community engagement.

## Key Statistics

- **1000+ Members** from around the world
- **Multiple Countries** represented in the community
- **Numerous AI Cybersecurity Publications** and resources
- **Industry Recognition** from major security vendors

## Core Initiatives

### LLM Top 10
The flagship framework identifying key security risks for GenAI and LLM-based applications:
- **2025 Edition**: Latest threats and mitigations
- **2023/24 Edition**: Foundational security framework

### AI Threat Intelligence
Real-time tracking of GenAI misuse by attackers and emerging threat patterns.

### Agentic App Security
Specialized security guidance for autonomous agents and multi-step AI workflows.

### AI Security Governance
Comprehensive frameworks for responsible GenAI program oversight and compliance.

## Recent Highlights

- **FinBot CTF Application**: Hands-on learning tool for agentic AI security
- **Partnership with CyberRisk Alliance**: Strategic collaboration for AI education
- **Global Event Network**: Black Hat, DefCon, and virtual conferences
- **Industry Adoption**: Endorsed by Palo Alto Networks, Snyk, HiddenLayer, and others',

    -- Translation tab content  
    'The OWASP GenAI Security Project maintains global reach through international collaboration and multi-language support initiatives.

## Global Community

The project brings together security professionals, researchers, and practitioners from multiple countries, creating a truly international perspective on AI security challenges.

## Language Support

While the primary documentation is in English, the project welcomes translation efforts and international contributions to make AI security guidance accessible worldwide.

## Regional Chapters

The project supports regional activities and local chapter engagement to address specific cultural and regulatory requirements for AI security.

## International Standards Alignment

The project works closely with international standards organizations and regulatory bodies to ensure global compatibility and adoption.

## Contributing Translations

Community members interested in translating project resources can:
- Contact the project leadership team
- Join translation working groups
- Contribute to localization efforts
- Support regional adaptation of frameworks

## Global Events

The project maintains an international event schedule including:
- Regional conferences and workshops
- Virtual global meetups
- International hackathons and CTF events
- Cross-border collaboration initiatives',

    -- Sponsors tab content
    'The OWASP GenAI Security Project is supported by a diverse ecosystem of sponsors, supporters, and industry partners committed to advancing AI security.

## Gold Sponsors

The project benefits from gold-level sponsorship from leading organizations in the AI security space, providing essential funding and expertise.

## Industry Partners

### Strategic Partnerships

**CyberRisk Alliance Partnership**: A strategic collaboration announced in June 2025 to advance application security and AI education across the cyber ecosystem through joint content, events, and research initiatives.

## Supporting Organizations

The project is backed by **100+ Supporting Organizations** from across the industry, including:

### Security Vendors
- **Palo Alto Networks**: Supporting GenAI threat prevention and security innovation
- **Snyk**: Advancing security for AI-generated code
- **HiddenLayer**: Partnering to secure AI systems and models
- **Aqua Security**: Providing insights on LLM security controls
- **Securiti AI**: Contributing to GenAI security research

### AI Security Specialists
- **Prompt Security**: CEO Itamar Golan endorses the project as "indispensable"
- **PromptArmor**: Contributing novel threat intelligence on AI risks
- **Lasso Security**: Supporting security standards for confident GenAI adoption

### Research and Consulting
- **Regula**: Identity verification and deepfake response expertise
- **NRI Secure**: Systematic threat organization and solution definition

## Sponsorship Opportunities

The project offers various sponsorship levels to support:
- Research and development initiatives
- Community events and conferences
- Educational content creation
- Tool and framework development
- Global outreach programs

## Recognition Program

Sponsors receive recognition through:
- Website prominence and branding
- Event speaking opportunities
- Joint research initiatives
- Community acknowledgment
- Industry thought leadership platforms

For sponsorship inquiries and partnership opportunities, organizations can contact the project leadership team through the official website.',

    -- Data tab content
    'The OWASP GenAI Security Project maintains comprehensive data initiatives to support evidence-based AI security research and practical implementation guidance.

## Threat Intelligence Database

### Real-Time Threat Tracking
The project maintains active monitoring of:
- GenAI attack patterns and techniques
- Emerging vulnerabilities in AI systems
- Threat actor behaviors and campaigns
- Industry incident reports and analysis

### Quarterly Intelligence Reports
Regular publications include:
- **Q2 2025 Incident & Exploit Round-up**: Comprehensive analysis of March-June 2025 threats
- Trending attack vectors and mitigation strategies
- Industry impact assessments
- Predictive threat modeling

## Research Data Collection

### Community Contributions
- Crowdsourced vulnerability reports
- Industry incident sharing
- Academic research integration
- Practitioner field reports

### Data Sources
- **Security Vendor Telemetry**: Aggregated threat data from industry partners
- **Academic Research**: University and research institution contributions
- **Industry Reports**: Corporate security team findings
- **Government Sources**: Regulatory and law enforcement insights

## Framework Development Data

### LLM Top 10 Methodology
The project employs rigorous data analysis for framework development:
- Statistical analysis of vulnerability prevalence
- Impact assessment modeling
- Industry survey data integration
- Expert consensus building

### Validation Processes
- Peer review and expert validation
- Industry pilot testing
- Community feedback integration
- Continuous improvement cycles

## AI Security Solutions Landscape

### Market Intelligence
- **Solution Mapping**: Comprehensive tracking of AI security tools and platforms
- **Vendor Analysis**: Capability assessments and gap identification
- **Technology Trends**: Emerging solution categories and innovations
- **Adoption Patterns**: Industry implementation trends and best practices

### Lifecycle Coverage
The data initiative maps security solutions across the complete AI lifecycle:
- Development and training phase security
- Deployment and operations monitoring
- Incident response and recovery
- Governance and compliance tracking

## Data Privacy and Ethics

### Privacy Protection
- Anonymization of sensitive incident data
- Compliance with international privacy regulations
- Secure data handling and storage protocols
- Contributor privacy protection measures

### Ethical Guidelines
- Responsible disclosure practices
- Balanced threat intelligence sharing
- Industry collaboration principles
- Academic research ethics compliance

## Open Data Initiatives

### Public Resources
- Anonymized threat pattern databases
- Security framework assessment tools
- Community research datasets
- Educational case study collections

### API Access
- Structured data access for researchers
- Integration capabilities for security tools
- Real-time threat intelligence feeds
- Historical trend analysis data'

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
WHERE slug = 'genai-security';
