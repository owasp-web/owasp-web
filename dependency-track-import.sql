-- OWASP Dependency-Track Project Import
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
  tab_main_content,
  tab_overview_content,
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

Dependency-Track monitors component usage across all versions of every application in its portfolio in order to proactively identify risk across an organization. The platform has an API-first design and is ideal for use in CI/CD environments.

## Project Information

### Classification
- **Project Type**: Flagship Project
- **Categories**: Tool
- **Audience**: Builder, Defender

### Key Capabilities

**Component Analysis**: Comprehensive analysis of software components across your entire application portfolio with support for multiple package ecosystems and component types.

**SBOM Management**: Native support for CycloneDX Software Bill of Materials, enabling organizations to operationalize SBOM in conformance with U.S. Executive Order 14028.

**Vulnerability Intelligence**: Integration with multiple sources including National Vulnerability Database (NVD), GitHub Advisories, Sonatype OSS Index, and VulnDB from Risk Based Security.

**Risk Assessment**: Advanced risk assessment capabilities including Exploit Prediction Scoring System (EPSS) support and comprehensive policy engine for security, license, and operational compliance.

**Enterprise Integration**: API-first design with native support for popular security platforms including Kenna Security, Fortify SSC, ThreadFix, and DefectDojo.',
  
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
```

### Kubernetes Deployment
```bash
# Use Helm charts for Kubernetes deployment
helm repo add dependency-track https://dependencytrack.github.io/helm-charts
helm install dependency-track dependency-track/dependency-track
```

## Initial Configuration

### First-Time Setup
1. **Access Web Interface**: Navigate to http://localhost:8080
2. **Login**: Use default credentials (admin/admin)
3. **Change Default Password**: Immediately change the default admin password
4. **Configure Data Sources**: Set up vulnerability intelligence feeds
5. **Create Projects**: Start organizing your applications into projects
6. **Upload SBOMs**: Begin uploading Software Bill of Materials

### Database Configuration
- **Default**: Embedded H2 database (development only)
- **Production**: PostgreSQL recommended for production deployments
- **High Availability**: Configure database clustering for enterprise use

### Integration Setup
- **CI/CD Integration**: Configure API keys for automated SBOM uploads
- **Notification Channels**: Set up Slack, Teams, or webhook notifications
- **SSO Configuration**: Configure OAuth 2.0/OIDC for enterprise authentication',

  -- Tab main content
  'OWASP Dependency-Track

For more details about Dependency-Track see the projects website at dependencytrack.org

Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain. Dependency-Track takes a unique and highly beneficial approach by leveraging the capabilities of Software Bill of Materials (SBOM). This approach provides capabilities that traditional Software Composition Analysis (SCA) solutions cannot achieve.

Dependency-Track monitors component usage across all versions of every application in its portfolio in order to proactively identify risk across an organization. The platform has an API-first design and is ideal for use in CI/CD environments.

## Features

* Consumes and produces CycloneDX Software Bill of Materials (SBOM)
* Consumes and produces CycloneDX Vulnerability Exploitability Exchange (VEX)
* Full-stack component support for:
  * Applications
  * Libraries
  * Frameworks
  * Operating systems
  * Containers
  * Firmware
  * Files
  * Hardware
  * Services
* Tracks component usage across every application in an organizations portfolio
* Quickly identify what is affected, and where
* Identifies multiple forms of risk including
  * Components with known vulnerabilities
  * Out-of-date components
  * Modified components
  * License risk
* Integrates with multiple sources of vulnerability intelligence including:
  * National Vulnerability Database (NVD)
  * GitHub Advisories
  * Sonatype OSS Index
  * VulnDB from Risk Based Security
* Helps to prioritize mitigation by incorporating support for the Exploit Prediction Scoring System (EPSS)
* Maintain a private vulnerability database of vulnerability components
* Robust policy engine with support for global and per-project policies
  * Security risk and compliance
  * License risk and compliance
  * Operational risk and compliance
* Ecosystem agnostic with built-in repository support for:
  * Cargo (Rust)
  * Composer (PHP)
  * Gems (Ruby)
  * Hex (Erlang/Elixir)
  * Maven (Java)
  * NPM (Javascript)
  * NuGet (.NET)
  * Pypi (Python)
* Identifies APIs and external service components including:
  * Service provider
  * Endpoint URIs
  * Data classification
  * Directional flow of data
  * Trust boundary traversal
  * Authentication requirements
* Includes a comprehensive auditing workflow for triaging results
* Configurable notifications supporting Slack, Microsoft Teams, WebEx, Webhooks, and Email
* Supports standardized SPDX license ID''s and tracks license use by component
* Easy to read metrics for components, projects, and portfolio
* Native support for Kenna Security, Fortify SSC, ThreadFix, and DefectDojo
* API-first design facilitates easy integration with other systems
* API documentation available in OpenAPI format
* OAuth 2.0 + OpenID Connect (OIDC) support for single sign-on (authN/authZ)
* Supports internally managed users, Active Directory/LDAP, and API Keys
* Simple to install and configure. Get up and running in just a few minutes

## Installation

Dependency-Track is distributed as Docker containers.

### Docker Compose

```
curl -LO https://dependencytrack.org/docker-compose.yml
docker-compose up -d
```

### Docker Swarm

```
curl -LO https://dependencytrack.org/docker-compose.yml
docker swarm init
docker stack deploy -c docker-compose.yml dtrack
```

## News

* 2022/05/18 v4.5.0 Released
* 2022/02/18 v4.4.1 Released
* 2022/02/17 v4.4.0 Released
* 2021/09/20 v4.3.6 Released
* 2021/09/20 v4.3.5 Released

Recent releases focus on enhanced SBOM support, improved vulnerability intelligence integration, and expanded ecosystem support.

## Supporters

Dependency-Track is developed by a worldwide team of volunteers.

But we have also been helped by many organizations, either financially or by encouraging their employees to work on Dependency-Track:

* Risk Based Security
* KPMG

## U.S. Executive Order 14028

Since its inception in 2013, OWASP Dependency-Track has been at the forefront of analyzing bill of materials for cybersecurity risk identification and reduction. Dependency-Track allows organizations and governments to operationalize SBOM in conformance with U.S. Executive Order 14028.

### For Software Consumers

* Tracks all systems and applications that have SBOMs
* Upload SBOMs through the user interface or via automation
* Components defined in SBOMs will be analyzed for known vulnerabilities using multiple sources of vulnerability intelligence, including the NVD
* Displays all identified vulnerabilities and vulnerable components for every SBOM analyzed
* Upload CycloneDX VEX obtained from suppliers to gain insight into the vulnerable components that pose risk, and the ones that don''t
* Quickly identify all systems and applications that have a specific component or are affected by a specific vulnerability
* Helps to prioritize mitigation by incorporating support for the Exploit Prediction Scoring System (EPSS)
* Evaluate the portfolio of systems and applications against user-configurable security, operational, and license policies

### For Software Producers

* Create and consume CycloneDX SBOMs in development pipelines
* SBOMs will be analyzed for known security, operational, and license risk
* Evaluates the portfolio of applications against user-configurable security, operational, and license policies
* Inspect security findings and make audit decisions about the relevance and exploitability of each vulnerability
* CycloneDX BOMs can be dynamically generated from current inventory for any application
* CycloneDX VEX is dynamically generated from audit decisions for each application
* An API-first design allows software producers to extract SBOMs for released products, produce VEX whenever updated audit decisions are made, and make data available to internal systems responsible for SBOM and VEX distribution.',

  -- Tab overview content
  'OWASP Dependency-Track is a flagship project providing intelligent component analysis for software supply chain security.

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
- **Niklas Düster**: Core contributor and maintainer

## Technical Overview

### Architecture
- **Frontend**: Modern web application with responsive design
- **Backend**: Java-based REST API with comprehensive OpenAPI documentation
- **Database**: Support for PostgreSQL (recommended) and embedded H2
- **Deployment**: Docker containers with Docker Compose and Kubernetes support
- **Integration**: API-first design with extensive integration capabilities

### Supported Ecosystems
- **Cargo** (Rust packages)
- **Composer** (PHP packages)
- **Gems** (Ruby packages)
- **Hex** (Erlang/Elixir packages)
- **Maven** (Java packages)
- **NPM** (JavaScript packages)
- **NuGet** (.NET packages)
- **PyPI** (Python packages)

### Enterprise Features
- **Single Sign-On**: OAuth 2.0 and OpenID Connect support
- **User Management**: Internal users, Active Directory/LDAP integration
- **API Security**: Comprehensive API key management
- **Audit Trail**: Complete audit logging for compliance
- **High Availability**: Clustering and load balancing support
- **Backup/Recovery**: Database backup and disaster recovery procedures

## Community and Support

The project maintains an active global community of security professionals, developers, and organizations committed to improving software supply chain security through open source collaboration.',

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
