-- OWASP Dependency-Track - COMPLETE Project Import with ALL TABS
-- Generated from: https://owasp.org/www-project-dependency-track/

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
  
  -- ALL TAB CONTENT FIELDS
  tab_main_content,
  tab_overview_content,
  tab_documentation_content,
  tab_downloads_content,
  tab_community_content,
  tab_contribute_content,
  tab_support_content,
  
  -- Custom tabs for Dependency-Track
  tab_translation_content, -- Using for Features tab
  tab_sponsors_content,     -- Using for Our Supporters tab  
  tab_data_content,         -- Using for Executive Order 14028 tab
  
  screenshots,
  meta_title,
  meta_description,
  related_projects,
  content_status
) VALUES (
  'OWASP Dependency-Track',
  'dependency-track',
  'An intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain using Software Bill of Materials (SBOM).',
  'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. Dependency-Track takes a unique and highly beneficial approach by leveraging the capabilities of Software Bill of Materials (SBOM). This approach provides capabilities that traditional Software Composition Analysis (SCA) solutions cannot achieve.',
  'Code',
  'active',
  'https://owasp.org/www-project-dependency-track/',
  'https://github.com/DependencyTrack/dependency-track',
  'https://dependencytrack.org',
  'https://docs.dependencytrack.org/',
  true,
  'flagship',
  3500,
  'v4.5.0',
  'Docker containers available',
  75,
  ARRAY[
    'Consumes and produces CycloneDX Software Bill of Materials (SBOM)',
    'Consumes and produces CycloneDX Vulnerability Exploitability Exchange (VEX)',
    'Full-stack component support for applications, libraries, frameworks, OS, containers, firmware',
    'Tracks component usage across every application in portfolio',
    'Identifies components with known vulnerabilities',
    'Out-of-date component detection',
    'Modified component identification',
    'License risk management',
    'Multiple vulnerability intelligence sources integration',
    'Exploit Prediction Scoring System (EPSS) support',
    'Private vulnerability database maintenance',
    'Robust policy engine with global and per-project policies',
    'Ecosystem agnostic with built-in repository support',
    'API and external service component identification',
    'Comprehensive auditing workflow',
    'Configurable notifications (Slack, Teams, WebEx, Webhooks, Email)',
    'SPDX license ID support',
    'Native integration with security platforms',
    'API-first design',
    'OAuth 2.0 + OpenID Connect support',
    'Docker container distribution'
  ],
  ARRAY[
    'Docker environment',
    'Java runtime environment',
    'PostgreSQL database (recommended)',
    'Network connectivity for vulnerability feeds',
    'Adequate storage for component data'
  ],
  ARRAY[
    'Download Docker Compose file: curl -LO https://dependencytrack.org/docker-compose.yml',
    'Start with Docker Compose: docker-compose up -d',
    'Access web interface at http://localhost:8080',
    'Default credentials: admin/admin',
    'Configure vulnerability data sources',
    'Upload your first SBOM'
  ],
  ARRAY[
    'software-composition-analysis',
    'sbom',
    'cyclone-dx',
    'vulnerability-management',
    'supply-chain-security',
    'component-analysis',
    'security-scanning',
    'license-management',
    'docker',
    'api-first',
    'ci-cd',
    'devops',
    'compliance',
    'risk-assessment'
  ],
  'Apache 2.0',
  'Java',
  ARRAY['Steve Springett', 'Niklas Düster'],
  'intermediate',
  
  -- Project overview
  'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. Dependency-Track takes a unique and highly beneficial approach by leveraging the capabilities of Software Bill of Materials (SBOM). This approach provides capabilities that traditional Software Composition Analysis (SCA) solutions cannot achieve.

Dependency-Track monitors component usage across all versions of every application in its portfolio in order to proactively identify risk across an organization. The platform has an API-first design and is ideal for use in CI/CD environments.',
  
  -- Key features
  ARRAY[
    'CycloneDX SBOM consumption and production for comprehensive bill of materials management',
    'CycloneDX VEX support for vulnerability exploitability exchange',
    'Full-stack component support including applications, libraries, frameworks, operating systems, containers, firmware, files, hardware, and services',
    'Portfolio-wide component usage tracking across all application versions',
    'Multi-source vulnerability intelligence integration (NVD, GitHub Advisories, Sonatype OSS Index, VulnDB)',
    'Exploit Prediction Scoring System (EPSS) integration for vulnerability prioritization',
    'Private vulnerability database for custom vulnerability management',
    'Comprehensive policy engine supporting security, license, and operational risk policies',
    'Ecosystem-agnostic design with built-in support for Cargo, Composer, Gems, Hex, Maven, NPM, NuGet, PyPI',
    'API and external service component identification with data flow analysis',
    'Advanced auditing workflow for security finding triage and management',
    'Configurable notification system supporting Slack, Microsoft Teams, WebEx, Webhooks, and Email',
    'SPDX license identification and compliance tracking',
    'Native integration with enterprise security platforms',
    'OAuth 2.0 and OpenID Connect support for enterprise authentication',
    'API-first architecture with comprehensive OpenAPI documentation'
  ],
  
  -- Installation guide
  '## Installation Methods

### Docker Compose (Recommended)
```bash
# Download the official Docker Compose configuration
curl -LO https://dependencytrack.org/docker-compose.yml

# Start Dependency-Track
docker-compose up -d

# Access the web interface
# URL: http://localhost:8080
# Default credentials: admin/admin
```

### Docker Swarm
```bash
# Download Docker Compose file
curl -LO https://dependencytrack.org/docker-compose.yml

# Initialize Docker Swarm
docker swarm init

# Deploy as a stack
docker stack deploy -c docker-compose.yml dtrack
```',

  -- MAIN TAB CONTENT
  'OWASP Dependency-Track

For more details about Dependency-Track see the projects website at dependencytrack.org

Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. Dependency-Track takes a unique and highly beneficial approach by leveraging the capabilities of Software Bill of Materials (SBOM). This approach provides capabilities that traditional Software Composition Analysis (SCA) solutions cannot achieve.

Dependency-Track monitors component usage across all versions of every application in its portfolio in order to proactively identify risk across an organization. The platform has an API-first design and is ideal for use in CI/CD environments.',

  -- OVERVIEW TAB CONTENT  
  'The OWASP Dependency-Track project provides intelligent component analysis for software supply chain security.

## Project Information

### Classification
- **Project Type**: Flagship Project
- **Categories**: Tool
- **Audience**: Builder, Defender

### External Resources
- **Documentation**: Comprehensive documentation available at docs.dependencytrack.org
- **GitHub**: Source code and issue tracking
- **Slack**: Active community support channel
- **Twitter**: Project updates and announcements
- **Website**: Official project website at dependencytrack.org
- **YouTube**: Video tutorials and demonstrations

### Licensing
Apache 2.0 License - Free and open source

### Project Leaders
- **Steve Springett**: Project founder and lead maintainer
- **Niklas Düster**: Core contributor and maintainer',

  -- DOCUMENTATION TAB CONTENT (Using for Features)
  '## Features

* **SBOM Support**: Consumes and produces CycloneDX Software Bill of Materials (SBOM)
* **VEX Support**: Consumes and produces CycloneDX Vulnerability Exploitability Exchange (VEX)
* **Full-stack component support** for:
  * Applications
  * Libraries
  * Frameworks
  * Operating systems
  * Containers
  * Firmware
  * Files
  * Hardware
  * Services

### Risk Identification
* Tracks component usage across every application in an organizations portfolio
* Quickly identify what is affected, and where
* Identifies multiple forms of risk including:
  * Components with known vulnerabilities
  * Out-of-date components
  * Modified components
  * License risk

### Vulnerability Intelligence
* Integrates with multiple sources of vulnerability intelligence including:
  * National Vulnerability Database (NVD)
  * GitHub Advisories
  * Sonatype OSS Index
  * VulnDB from Risk Based Security
* Helps to prioritize mitigation by incorporating support for the Exploit Prediction Scoring System (EPSS)
* Maintain a private vulnerability database of vulnerability components

### Policy Engine
* Robust policy engine with support for global and per-project policies
  * Security risk and compliance
  * License risk and compliance
  * Operational risk and compliance

### Ecosystem Support
* Ecosystem agnostic with built-in repository support for:
  * Cargo (Rust)
  * Composer (PHP)
  * Gems (Ruby)
  * Hex (Erlang/Elixir)
  * Maven (Java)
  * NPM (Javascript)
  * NuGet (.NET)
  * Pypi (Python)

### API and Service Analysis
* Identifies APIs and external service components including:
  * Service provider
  * Endpoint URIs
  * Data classification
  * Directional flow of data
  * Trust boundary traversal
  * Authentication requirements

### Workflow and Integration
* Includes a comprehensive auditing workflow for triaging results
* Configurable notifications supporting Slack, Microsoft Teams, WebEx, Webhooks, and Email
* Supports standardized SPDX license ID''s and tracks license use by component
* Easy to read metrics for components, projects, and portfolio
* Native support for Kenna Security, Fortify SSC, ThreadFix, and DefectDojo
* API-first design facilitates easy integration with other systems
* API documentation available in OpenAPI format
* OAuth 2.0 + OpenID Connect (OIDC) support for single sign-on (authN/authZ)
* Supports internally managed users, Active Directory/LDAP, and API Keys
* Simple to install and configure. Get up and running in just a few minutes',

  -- DOWNLOADS TAB CONTENT (Using for Installation)
  '## Installation

Dependency-Track is distributed as Docker containers.

### Docker Compose

```bash
curl -LO https://dependencytrack.org/docker-compose.yml
docker-compose up -d
```

### Docker Swarm

```bash
curl -LO https://dependencytrack.org/docker-compose.yml
docker swarm init
docker stack deploy -c docker-compose.yml dtrack
```

### System Requirements

* **Docker Environment**: Docker and Docker Compose
* **Database**: PostgreSQL (recommended for production)
* **Memory**: Minimum 4GB RAM recommended
* **Storage**: Adequate disk space for component data
* **Network**: Internet connectivity for vulnerability feeds

### Initial Configuration

1. **Access Web Interface**: Navigate to http://localhost:8080
2. **Default Credentials**: admin/admin
3. **Change Password**: Immediately update default credentials
4. **Configure Data Sources**: Set up vulnerability intelligence feeds
5. **Create Projects**: Organize applications into projects
6. **Upload SBOMs**: Begin component analysis

### Production Deployment

* **Database**: Configure PostgreSQL for production use
* **Load Balancing**: Set up multiple instances for high availability
* **SSL/TLS**: Configure HTTPS for secure communications
* **Backup**: Implement regular database backups
* **Monitoring**: Set up application and infrastructure monitoring',

  -- COMMUNITY TAB CONTENT (Using for Integrations)
  '## Integrations

Dependency-Track integrates with numerous security and development tools to provide comprehensive software supply chain analysis.

### Vulnerability Data Sources
* **National Vulnerability Database (NVD)**: Primary source for CVE data
* **GitHub Advisories**: Community-driven vulnerability database
* **Sonatype OSS Index**: Open source vulnerability intelligence
* **VulnDB from Risk Based Security**: Commercial vulnerability database
* **Custom Sources**: Support for private vulnerability databases

### CI/CD Integration
* **Jenkins**: Plugin available for automated SBOM uploads
* **GitHub Actions**: Workflow integration for continuous monitoring
* **GitLab CI**: Pipeline integration for DevOps workflows
* **Azure DevOps**: Build pipeline integration
* **CircleCI**: Continuous integration support

### Security Platform Integration
* **Kenna Security**: Native integration for vulnerability management
* **Fortify SSC**: Software Security Center integration
* **ThreadFix**: Application vulnerability management
* **DefectDojo**: Security testing orchestration platform

### Notification Systems
* **Slack**: Real-time vulnerability notifications
* **Microsoft Teams**: Team collaboration notifications
* **WebEx**: Enterprise communication integration
* **Webhooks**: Custom integration endpoints
* **Email**: Traditional email notifications

### Package Ecosystem Support
* **Maven Central**: Java ecosystem integration
* **NPM Registry**: JavaScript/Node.js packages
* **PyPI**: Python package index
* **RubyGems**: Ruby package repository
* **NuGet**: .NET package management
* **Cargo**: Rust package registry
* **Composer**: PHP dependency manager
* **Hex**: Erlang/Elixir package manager

### API Integration
* **REST API**: Comprehensive API for all operations
* **OpenAPI Documentation**: Complete API specification
* **Authentication**: API key and OAuth 2.0 support
* **Rate Limiting**: Built-in API rate limiting
* **Webhooks**: Event-driven integration support',

  -- CONTRIBUTE TAB CONTENT (Using for News)
  '## News

### Recent Releases

* **2022/05/18**: v4.5.0 Released
  * Enhanced SBOM support
  * Improved vulnerability intelligence
  * New API endpoints
  * Performance optimizations

* **2022/02/18**: v4.4.1 Released
  * Bug fixes and stability improvements
  * Security enhancements
  * Database optimizations

* **2022/02/17**: v4.4.0 Released
  * CycloneDX VEX support
  * Enhanced policy engine
  * New integrations
  * UI/UX improvements

* **2021/09/20**: v4.3.6 Released
  * Critical security fixes
  * Performance improvements
  * Bug fixes

* **2021/09/20**: v4.3.5 Released
  * Stability improvements
  * Enhanced reporting
  * API enhancements

### Development Milestones

* **2021/08/31**: v4.3.4 Released
* **2021/08/20**: v4.3.3 Released
* **2021/08/07**: v4.3.2 Released
* **2021/08/03**: v4.3.1 Released
* **2021/08/02**: v4.3.0 Released
* **2021/05/07**: v4.2.2 Released
* **2021/03/20**: v4.2.1 Released
* **2021/03/17**: v4.2.0 Released
* **2021/02/09**: v4.1.0 Released
* **2021/01/12**: v4.0.1 Released
* **2021/01/03**: v4.0.0 Released

### Historical Releases

* **2020/03/22**: v3.8.0 Released
* **2020/01/07**: v3.7.1 Released
* **2019/12/16**: v3.7.0 Released
* **2019/10/01**: v3.6.1 Released
* **2019/09/28**: v3.6.0 Released
* **2019/07/17**: v3.5.1 Released
* **2019/06/07**: v3.5.0 Released
* **2019/04/16**: v3.4.1 Released
* **2018/12/22**: v3.4.0 Released

### Community Updates

* **2017/10/08**: v3.0 Updates to community
* **2017/06/16**: Presentation at OWASP Summit 2017

The project maintains an active release cycle with regular updates focusing on security, performance, and new features to address evolving software supply chain security challenges.',

  -- SUPPORT TAB CONTENT (This would be a custom tab)
  'Get comprehensive support for OWASP Dependency-Track through multiple channels and resources.

## Documentation and Resources

### Official Documentation
* **User Guide**: Complete documentation at docs.dependencytrack.org
* **API Documentation**: OpenAPI specification with examples
* **Installation Guide**: Step-by-step deployment instructions
* **Best Practices**: Security and operational recommendations

### Video Resources
* **YouTube Channel**: Tutorial videos and demonstrations
* **Webinars**: Regular community webinars and training sessions
* **Conference Talks**: Presentations from security conferences

## Community Support

### Communication Channels
* **Slack Workspace**: Real-time community support and discussions
* **GitHub Discussions**: Technical questions and feature requests
* **Mailing Lists**: Announcements and community updates

### Getting Help
* **Issue Reporting**: GitHub issue tracker for bugs and feature requests
* **Security Issues**: Responsible disclosure process for security vulnerabilities
* **Feature Requests**: Community-driven feature development process

## Professional Support

### Enterprise Support
* **Commercial Support**: Available through certified partners
* **Training Services**: Professional training and onboarding
* **Consulting**: Implementation and integration consulting

### Community Contributions
* **Bug Reports**: Help improve the platform by reporting issues
* **Feature Development**: Contribute code and new capabilities
* **Documentation**: Help improve user guides and documentation
* **Testing**: Participate in beta testing and quality assurance',

  -- FEATURES TAB CONTENT (Using tab_translation_content)
  '## Comprehensive Feature Set

### Software Bill of Materials (SBOM)
* **CycloneDX Support**: Native support for the leading SBOM standard
* **SBOM Generation**: Automatically generate SBOMs from existing projects
* **SBOM Analysis**: Deep analysis of imported SBOMs for security and compliance
* **Version Tracking**: Track SBOM changes across application versions

### Vulnerability Management
* **Multi-Source Intelligence**: Aggregate vulnerability data from multiple sources
* **Real-Time Updates**: Continuous updates from vulnerability databases
* **Risk Scoring**: Advanced risk scoring using CVSS and EPSS
* **False Positive Management**: Comprehensive auditing workflow for vulnerability triage

### Policy Enforcement
* **Global Policies**: Organization-wide security and compliance policies
* **Project-Specific Policies**: Customized policies for specific applications
* **License Compliance**: Automated license risk assessment and policy enforcement
* **Violation Reporting**: Detailed reporting on policy violations

### Enterprise Features
* **Single Sign-On**: OAuth 2.0 and OpenID Connect integration
* **Role-Based Access**: Granular permissions and access control
* **Audit Logging**: Comprehensive audit trail for compliance
* **High Availability**: Clustering and load balancing support
* **API Security**: Comprehensive API key management and rate limiting',

  -- OUR SUPPORTERS TAB CONTENT (Using tab_sponsors_content)
  '## Our Supporters

Dependency-Track is developed by a worldwide team of volunteers. But we have also been helped by many organizations, either financially or by encouraging their employees to work on Dependency-Track.

### Major Supporters

#### Risk Based Security
Risk Based Security has been a significant supporter of the OWASP Dependency-Track project, providing vulnerability intelligence data through their VulnDB service and supporting the development of enhanced vulnerability management capabilities.

#### KPMG
KPMG has supported the project through employee contributions and by promoting the adoption of software supply chain security practices using Dependency-Track in enterprise environments.

### Corporate Support Benefits

Organizations supporting OWASP Dependency-Track gain:
* **Recognition**: Public acknowledgment of support for open source security
* **Influence**: Input on project roadmap and feature development
* **Access**: Early access to new features and capabilities
* **Community**: Connection with the global software security community

### How to Support

#### Financial Support
* **OWASP Foundation**: Donate through the OWASP Foundation with attribution to Dependency-Track
* **Sponsorship**: Corporate sponsorship opportunities available
* **Grants**: Research and development grants for specific features

#### Contribution Support
* **Employee Time**: Allow employees to contribute during work hours
* **Code Contributions**: Submit bug fixes, features, and improvements
* **Documentation**: Help improve user guides and technical documentation
* **Testing**: Participate in beta testing and quality assurance

#### Community Support
* **Promotion**: Help promote the project within your organization and industry
* **Use Cases**: Share success stories and implementation case studies
* **Feedback**: Provide feedback on features and user experience
* **Training**: Participate in community training and knowledge sharing

### Recognition

All supporters are recognized in project documentation, the project website, and during community presentations. Corporate supporters receive additional recognition through:
* **Logo Display**: Corporate logos displayed on project materials
* **Case Studies**: Opportunities to share implementation success stories
* **Speaking Opportunities**: Presentation opportunities at conferences and events
* **Advisory Role**: Input on project governance and strategic direction

For more information about supporting the OWASP Dependency-Track project, please contact the project leaders or the OWASP Foundation.',

  -- EXECUTIVE ORDER 14028 TAB CONTENT (Using tab_data_content)
  '## U.S. Executive Order 14028

Since its inception in 2013, OWASP Dependency-Track has been at the forefront of analyzing bill of materials for cybersecurity risk identification and reduction. Dependency-Track allows organizations and governments to operationalize SBOM in conformance with U.S. Executive Order 14028.

### Executive Order Compliance

* **SBOM Requirements**: Supports the OWASP CycloneDX BOM format specifically defined in the NTIA Minimum Elements For a Software Bill of Materials (SBOM)
* **Risk Analysis**: Consumes and analyzes SBOMs for known security, operational, and license risk
* **Procurement Support**: Ideal for use in procurement and continuous integration and delivery environments
* **VEX Support**: Supports the OWASP CycloneDX VEX format exceeding the Vulnerability Exploitability Exchange requirements defined by CISA

### For Software Consumers

#### SBOM Management
* **Inventory Tracking**: Tracks all systems and applications that have SBOMs
* **Upload Capabilities**: Upload SBOMs through the user interface or via automation
* **Vulnerability Analysis**: Components defined in SBOMs will be analyzed for known vulnerabilities using multiple sources of vulnerability intelligence, including the NVD
* **Comprehensive Reporting**: Displays all identified vulnerabilities and vulnerable components for every SBOM analyzed

#### Risk Assessment
* **VEX Integration**: Upload CycloneDX VEX obtained from suppliers to gain insight into the vulnerable components that pose risk, and the ones that don''t
* **Impact Analysis**: Quickly identify all systems and applications that have a specific component or are affected by a specific vulnerability
* **Prioritization**: Helps to prioritize mitigation by incorporating support for the Exploit Prediction Scoring System (EPSS)
* **Policy Evaluation**: Evaluate the portfolio of systems and applications against user-configurable security, operational, and license policies

### For Software Producers

#### SBOM Generation
* **Pipeline Integration**: Create and consume CycloneDX SBOMs in development pipelines
* **Risk Analysis**: SBOMs will be analyzed for known security, operational, and license risk
* **Policy Compliance**: Evaluates the portfolio of applications against user-configurable security, operational, and license policies
* **Audit Workflow**: Inspect security findings and make audit decisions about the relevance and exploitability of each vulnerability

#### VEX Production
* **Dynamic Generation**: CycloneDX BOMs can be dynamically generated from current inventory for any application
* **VEX Creation**: CycloneDX VEX is dynamically generated from audit decisions for each application
* **API Access**: An API-first design allows software producers to extract SBOMs for released products, produce VEX whenever updated audit decisions are made, and make data available to internal systems responsible for SBOM and VEX distribution

### Enhanced Capabilities

#### Full-Stack Support
* **Comprehensive Coverage**: Both CycloneDX and Dependency-Track are full-stack solutions supporting software, hardware, and services
* **Beyond SBOM**: The CycloneDX standard and use with Dependency-Track is not limited to SBOM use cases
* **Scalable Architecture**: Designed to handle enterprise-scale SBOM management and analysis

#### Bi-Directional Exchange
* **Consumer Auditing**: Software consumers may optionally audit security findings from vendor SBOMs
* **Discrepancy Resolution**: If consumers discover discrepancies in vendor supplied VEX, consumers can share their own auto-generated VEX with suppliers
* **Information Sharing**: Completing a bi-directional exchange of vulnerability and exploitability information between suppliers and consumers

### Implementation Guidance

#### Getting Started
1. **Deploy Dependency-Track**: Install using Docker containers
2. **Configure Data Sources**: Set up vulnerability intelligence feeds
3. **Upload SBOMs**: Begin with pilot applications
4. **Establish Policies**: Define security and compliance requirements
5. **Train Teams**: Educate staff on SBOM and VEX processes

#### Best Practices
* **Automation**: Integrate SBOM generation into CI/CD pipelines
* **Regular Updates**: Maintain current vulnerability intelligence
* **Policy Enforcement**: Implement and enforce security policies
* **Stakeholder Training**: Ensure all stakeholders understand SBOM requirements
* **Continuous Monitoring**: Establish ongoing monitoring and reporting processes',

  -- Screenshots
  '[
    {
      "url": "/images/dependency-track-screenshot-1.png",
      "caption": "Main Dashboard",
      "alt_text": "Screenshot of Dependency-Track main dashboard showing portfolio overview"
    },
    {
      "url": "/images/dependency-track-screenshot-2.png",
      "caption": "Component Analysis",
      "alt_text": "Screenshot showing detailed component analysis with vulnerability information"
    },
    {
      "url": "/images/dependency-track-screenshot-3.png",
      "caption": "Policy Management",
      "alt_text": "Screenshot of policy engine configuration for security and license compliance"
    },
    {
      "url": "/images/dependency-track-screenshot-4.png",
      "caption": "SBOM Upload Interface",
      "alt_text": "Screenshot of SBOM upload and management interface"
    }
  ]'::jsonb,

  -- Meta fields
  'OWASP Dependency-Track - Software Supply Chain Security Platform',
  'Intelligent Component Analysis platform for identifying and reducing software supply chain risk using Software Bill of Materials (SBOM) and vulnerability intelligence.',
  
  -- Related projects
  ARRAY['OWASP CycloneDX', 'OWASP DefectDojo', 'OWASP ZAP', 'OWASP Software Component Verification Standard'],
  
  -- Content status
  'published'
);
