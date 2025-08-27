-- Update existing OWASP Dependency-Track project with complete content

UPDATE projects SET
  title = 'OWASP Dependency-Track',
  description = 'Intelligent Component Analysis platform for software supply chain security using SBOM.',
  long_description = 'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain using Software Bill of Materials (SBOM).',
  category = 'Code',
  status = 'active',
  project_url = 'https://owasp.org/www-project-dependency-track/',
  github_url = 'https://github.com/DependencyTrack/dependency-track',
  website_url = 'https://dependencytrack.org',
  documentation_url = 'https://docs.dependencytrack.org/',
  is_featured = true,
  project_type = 'flagship',
  version = 'v4.5.0',
  license = 'Apache 2.0',
  language = 'Java',
  maintainers = ARRAY['Steve Springett', 'Niklas Düster'],
  difficulty_level = 'intermediate',
  
  project_overview = 'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. The platform leverages Software Bill of Materials (SBOM) capabilities and provides an API-first design ideal for CI/CD environments.',
  
  key_features = ARRAY[
    'CycloneDX SBOM consumption and production',
    'Vulnerability intelligence from multiple sources',
    'Component usage tracking across portfolios',
    'Policy engine for security and compliance',
    'API-first design for CI/CD integration',
    'Docker container distribution',
    'Enterprise authentication support',
    'Exploit Prediction Scoring System (EPSS) support',
    'Private vulnerability database maintenance',
    'Configurable notifications (Slack, Teams, WebEx, Webhooks, Email)'
  ],
  
  installation_guide = 'Install with Docker Compose: curl -LO https://dependencytrack.org/docker-compose.yml && docker-compose up -d. Access at http://localhost:8080 with default credentials admin/admin.',

  -- Main Tab Content
  tab_main_content = 'OWASP Dependency-Track provides intelligent component analysis for software supply chain security. The platform monitors component usage across application portfolios and identifies security risks using SBOM analysis.

## Key Capabilities
- Software Bill of Materials (SBOM) analysis
- Vulnerability intelligence integration
- Component risk assessment
- Policy enforcement
- CI/CD integration support',

  -- Features Tab Content (mapped to documentation)
  tab_documentation_content = '## Core Features

### SBOM Management
- Consumes and produces CycloneDX Software Bill of Materials
- Upload capabilities through UI or automation
- Vulnerability analysis using multiple intelligence sources
- Comprehensive reporting for all identified vulnerabilities

### Risk Assessment
- VEX Integration for vulnerability exploitability exchange
- Impact analysis for component and vulnerability tracking
- Prioritization using Exploit Prediction Scoring System (EPSS)
- Policy evaluation against security and compliance standards

### For Software Consumers
- Portfolio monitoring and risk visibility
- Automated vulnerability detection
- License compliance tracking
- Supply chain risk management',

  -- Integrations Tab Content (mapped to community)
  tab_community_content = '## Integrations

### CI/CD Integration
- Jenkins plugin available
- GitHub Actions support
- GitLab CI integration
- Azure DevOps compatibility

### Security Platform Integration
- Fortify Software Security Center
- ThreadFix integration
- DefectDojo compatibility
- Kenna Security connector

### Notification Systems
- Slack integration
- Microsoft Teams support
- WebEx notifications
- Custom webhook support
- Email notifications

### Repository Support
- Maven Central
- NPM Registry
- NuGet Gallery
- PyPI
- RubyGems
- Cargo Registry',

  -- Installation Tab Content (mapped to downloads)
  tab_downloads_content = '## Installation Methods

### Docker (Recommended)
```bash
# Download Docker Compose file
curl -LO https://dependencytrack.org/docker-compose.yml

# Start Dependency-Track
docker-compose up -d

# Access web interface
# URL: http://localhost:8080
# Default credentials: admin/admin
```

### WAR Deployment
- Download WAR file from GitHub releases
- Deploy to servlet container (Tomcat, Jetty)
- Configure database connection
- Set up vulnerability data sources

### Kubernetes
- Helm charts available
- Official container images
- Scalable deployment options
- Production-ready configurations

### Requirements
- Java 11+ runtime environment
- PostgreSQL database (recommended)
- Minimum 4GB RAM
- Network connectivity for vulnerability feeds',

  -- News Tab Content (mapped to contribute)
  tab_contribute_content = '## Latest News and Updates

### Recent Releases
- **v4.5.0**: Enhanced VEX support and policy improvements
- **v4.4.0**: New vulnerability intelligence sources
- **v4.3.0**: Improved SBOM processing capabilities
- **v4.2.0**: Enhanced reporting and analytics

### Development Updates
- Active development on GitHub
- Regular security updates
- Community-driven feature requests
- Continuous integration improvements

### Community Highlights
- Growing adoption in enterprise environments
- Integration with major CI/CD platforms
- Contribution from security researchers
- Educational content and workshops

### Upcoming Features
- Enhanced machine learning capabilities
- Improved policy engine
- Additional SBOM format support
- Advanced analytics and reporting',

  -- Sponsors Tab Content
  tab_sponsors_content = '## Our Supporters

### Project Leadership
- **Steve Springett**: Project Leader and Creator
- **Niklas Düster**: Core Contributor and Maintainer

### Contributing Organizations
- Various organizations contribute to development
- Enterprise users provide feedback and testing
- Security community involvement
- Open source ecosystem support

### How to Support
- Contribute code and documentation
- Report issues and feature requests
- Share usage experiences
- Provide funding for development
- Sponsor infrastructure and resources

### Recognition
- OWASP Flagship Project status
- Industry recognition for supply chain security
- Academic research citations
- Conference presentations and workshops

For more information about supporting the OWASP Dependency-Track project, please contact the project leaders or the OWASP Foundation.',

  -- Executive Order Content (mapped to data)
  tab_data_content = '## U.S. Executive Order 14028 Compliance

### Executive Order Requirements
The U.S. Executive Order on Improving the Nations Cybersecurity requires organizations to enhance software supply chain security.

### Dependency-Track Compliance Features
- **SBOM Generation**: Automated creation of software bills of materials
- **Vulnerability Tracking**: Continuous monitoring of component vulnerabilities
- **Risk Assessment**: Quantified risk scoring and prioritization
- **Compliance Reporting**: Detailed reports for regulatory requirements

### Implementation Guidelines
- Establish SBOM practices across development lifecycle
- Implement continuous vulnerability monitoring
- Create risk-based prioritization processes
- Maintain audit trails and compliance documentation

### Best Practices
- Integrate SBOM generation into CI/CD pipelines
- Regular vulnerability assessment and remediation
- Policy enforcement for security standards
- Continuous monitoring and reporting processes

### Compliance Benefits
- Meet federal software supply chain requirements
- Improve organizational security posture
- Enable proactive risk management
- Support audit and compliance activities',

  -- Overview tab content
  tab_overview_content = 'Dependency-Track is a flagship OWASP project providing component analysis capabilities for modern software development and security teams. The platform enables organizations to identify and reduce software supply chain risks through intelligent analysis of Software Bill of Materials (SBOM).

## Why Dependency-Track?
- **Comprehensive Coverage**: Full-stack component support
- **Intelligence Integration**: Multiple vulnerability data sources
- **Policy-Driven**: Configurable security and compliance policies
- **API-First**: Designed for automation and integration
- **Enterprise-Ready**: Scalable, secure, and production-proven',

  screenshots = '[
    {
      "url": "/images/dependency-track-dashboard.png",
      "caption": "Main Dashboard",
      "alt_text": "Dependency-Track main dashboard interface"
    },
    {
      "url": "/images/dependency-track-vulnerabilities.png", 
      "caption": "Vulnerability Analysis",
      "alt_text": "Vulnerability analysis and reporting interface"
    }
  ]'::jsonb,

  meta_title = 'OWASP Dependency-Track - Software Supply Chain Security',
  meta_description = 'Intelligent component analysis platform for identifying software supply chain risks using SBOM and vulnerability intelligence.',
  
  related_projects = ARRAY['OWASP CycloneDX', 'OWASP DefectDojo', 'OWASP Software Component Verification Standard'],
  
  content_status = 'published',
  content_last_updated = NOW()

WHERE slug = 'dependency-track';

