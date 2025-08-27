-- OWASP Amass Project Import
-- Generated from: https://owasp.org/www-project-amass/

-- Insert OWASP Amass project
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
  'OWASP Amass',
  'amass',
  'In-depth attack surface management for everyone! A framework for network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques.',
  'The OWASP Amass Project has developed a framework to help information security professionals perform network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques. The framework includes a collection engine for asset discovery, an asset database for storage of findings, and the Open Asset Model, used by various tooling to help understand attack surfaces.',
  'Code',
  'active',
  'https://owasp.org/www-project-amass/',
  'https://github.com/owasp-amass/amass',
  'https://github.com/owasp-amass/amass',
  'https://github.com/owasp-amass/amass/wiki',
  true,
  'flagship',
  11000,
  'Latest Release',
  'Official Binary Images, Docker Images',
  50,
  ARRAY[
    'Network mapping of attack surfaces',
    'External asset discovery using OSINT',
    'Collection engine for asset discovery',
    'Asset database for storage of findings',
    'Open Asset Model framework',
    'Reconnaissance techniques integration',
    'Attack surface management',
    'Open source intelligence gathering',
    'Subdomain enumeration',
    'DNS reconnaissance',
    'Network infrastructure mapping',
    'Asset discovery automation'
  ],
  ARRAY[
    'Go programming language runtime',
    'Network connectivity',
    'DNS resolution capabilities',
    'Basic understanding of network reconnaissance'
  ],
  ARRAY[
    'Download official binary images',
    'Use Docker: docker pull caffix/amass',
    'Build from source: go install -v github.com/owasp-amass/amass/v4/...@master',
    'Run: amass enum -d example.com',
    'View results and analyze attack surface'
  ],
  ARRAY[
    'attack-surface-management',
    'reconnaissance',
    'osint',
    'subdomain-enumeration',
    'dns-reconnaissance',
    'network-mapping',
    'asset-discovery',
    'information-gathering',
    'security-testing',
    'penetration-testing',
    'go-language',
    'cyber-security'
  ],
  'Apache 2.0',
  'Go',
  ARRAY['Jeff Foley'],
  'intermediate',
  
  -- Project overview
  'In-depth attack surface management for everyone!

The OWASP Amass Project has developed a framework to help information security professionals perform network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques.

The framework includes a collection engine for asset discovery, an asset database for storage of findings, and the Open Asset Model, used by various tooling to help understand attack surfaces.

## Our Goal

The primary goal of OWASP Amass is to provide comprehensive attack surface management capabilities that enable security professionals to:

- **Discover Assets**: Identify all external-facing assets belonging to an organization
- **Map Attack Surfaces**: Create detailed maps of network infrastructure and potential entry points
- **Gather Intelligence**: Utilize open source intelligence (OSINT) techniques for reconnaissance
- **Analyze Findings**: Store and analyze discovered assets for security assessment
- **Understand Risk**: Help organizations understand their external attack surface

## Project Components

### Collection Engine
The core component responsible for asset discovery using various data sources and techniques including:
- DNS enumeration and resolution
- Certificate transparency logs
- Search engine scraping
- Third-party API integrations
- Passive reconnaissance methods

### Asset Database
Centralized storage system for discovered assets with capabilities for:
- Asset categorization and tagging
- Historical tracking of changes
- Relationship mapping between assets
- Export and reporting functionality

### Open Asset Model
A standardized framework for representing and understanding attack surfaces, enabling:
- Consistent asset representation across tools
- Integration with other security tools
- Extensible data models for various asset types
- Community-driven development of asset understanding',
  
  -- Key features
  ARRAY[
    'Comprehensive subdomain enumeration using multiple techniques',
    'DNS reconnaissance and resolution analysis',
    'Certificate transparency log mining',
    'Search engine and social media reconnaissance',
    'Third-party API integrations for enhanced data gathering',
    'Passive reconnaissance to avoid detection',
    'Asset database for centralized storage and analysis',
    'Open Asset Model for standardized asset representation',
    'Multiple output formats (JSON, CSV, XML, etc.)',
    'Integration capabilities with other security tools',
    'Automated discovery workflows',
    'Historical tracking and change detection',
    'Visual network mapping and graphing',
    'Extensive configuration options',
    'Command-line and programmatic interfaces',
    'Docker containerization support'
  ],
  
  -- Installation guide
  '## Installation Options

### Binary Downloads
Download pre-compiled binaries for your operating system:
- **Linux**: Download from GitHub releases
- **Windows**: Download Windows executable
- **macOS**: Download macOS binary

### Docker Installation
```bash
# Pull the official Docker image
docker pull caffix/amass

# Run Amass in Docker
docker run -v OUTPUT_DIR_PATH:/.config/amass/ caffix/amass enum -d example.com
```

### Build from Source
```bash
# Prerequisites: Go 1.19 or later
go install -v github.com/owasp-amass/amass/v4/...@master
```

### Package Managers
```bash
# Homebrew (macOS/Linux)
brew install amass

# Snap (Linux)
sudo snap install amass

# Arch Linux
pacman -S amass
```

## Configuration

### Basic Configuration
Create a configuration file to customize Amass behavior:
```yaml
# ~/.config/amass/config.ini
[settings]
output_directory = /path/to/output
```

### API Key Configuration
Configure API keys for enhanced data sources:
```yaml
[data_sources.AlienVault]
apikey = YOUR_API_KEY

[data_sources.Censys]
api_id = YOUR_API_ID
secret = YOUR_SECRET
```',

  -- Tab main content
  'OWASP Amass

## Our Goal

In-depth attack surface management for everyone!

The OWASP Amass Project has developed a framework to help information security professionals perform network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques.

The framework includes a collection engine for asset discovery, an asset database for storage of findings, and the Open Asset Model, used by various tooling to help understand attack surfaces.

If you have any questions about the OWASP Amass Project, please email the project leader Jeff Foley, or contact us on the project''s Discord server (**Discord is highly preferred**).

## Corporate Supporters

The OWASP Amass project is supported by leading cybersecurity organizations:

- **ZeroFox**: Providing enterprise threat intelligence and digital risk protection
- **IPinfo**: Offering comprehensive IP address data and geolocation services  
- **WhoisXML API**: Delivering domain and IP intelligence data services

## Participation

The Open Web Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. All of our projects, tools, documents, forums, and chapters are free and open to anyone interested in improving application security.

### How can I participate in the project?

All you have to do is make the Project Leader aware of your available time to contribute to the project. It is also important to let the leader know how you would like to contribute and pitch in to help the project meet its goals and milestones. There are many different ways you can contribute to an OWASP Project, but communication with the leader is key.

### If I am not a programmer can I participate in the project?

Yes, you can certainly participate in the project if you are not a programmer. The project needs different skills and expertise at different times during its development. Currently, we are looking for researchers, programmers, testers, writers, and graphic designers.

## Project Classification

- **Flagship Project**: Recognized as a mature, stable project with significant community adoption
- **Tool**: Provides practical security tooling for professionals
- **Breaker**: Helps identify security vulnerabilities and weaknesses  
- **Builder**: Assists in building secure systems and infrastructure

## Getting Involved

### Contributing to Amass

The project welcomes contributions from the community in various forms:

- **Code Contributions**: Enhance existing features or add new capabilities
- **Documentation**: Improve project documentation and user guides
- **Testing**: Help test new features and report bugs
- **Research**: Contribute new reconnaissance techniques and data sources
- **Community Support**: Help other users and answer questions

### Communication Channels

- **Discord Server**: Primary communication channel for real-time discussions
- **GitHub Issues**: Report bugs and request features
- **Email**: Contact project leader Jeff Foley directly
- **Twitter**: Follow [@amass_project](https://twitter.com/amass_project) for updates',

  -- Tab overview content
  'The OWASP Amass project provides comprehensive attack surface management and reconnaissance capabilities for cybersecurity professionals.

## Project Information

### Classification
- **Project Type**: Flagship Project
- **Categories**: Tool, Breaker, Builder
- **Audience**: Security professionals, penetration testers, researchers

### Technical Details
- **Language**: Go programming language
- **License**: Apache 2.0 License (free and open source)
- **Platform Support**: Cross-platform (Linux, Windows, macOS)
- **Architecture**: Modular framework with pluggable components

## Downloads and Resources

### Official Distributions
- **Binary Images**: Pre-compiled executables for all major platforms
- **Docker Images**: Containerized versions for easy deployment
- **Source Code**: Available on GitHub for building from source

### Documentation and Support
- **GitHub Repository**: Complete source code and documentation
- **Wiki Pages**: Comprehensive usage guides and tutorials
- **Discord Server**: Active community support and discussions
- **Twitter Account**: Project updates and announcements

## Key Capabilities

### Asset Discovery
- Subdomain enumeration using multiple techniques
- DNS reconnaissance and analysis
- Certificate transparency log mining
- Search engine and social media scraping
- API integrations with threat intelligence sources

### Data Management
- Centralized asset database storage
- Historical tracking and change detection
- Multiple export formats (JSON, CSV, XML)
- Integration with other security tools

### Analysis and Visualization
- Network mapping and relationship analysis
- Visual representations of discovered assets
- Risk assessment and prioritization
- Reporting and documentation generation

## Community and Support

The OWASP Amass project maintains an active community of security professionals, researchers, and developers who contribute to its ongoing development and provide support to users.

**Project Leader**: Jeff Foley
**Primary Communication**: Discord server (highly preferred)
**Secondary Contact**: Email to project leader',

  -- Screenshots
  '[
    {
      "url": "/images/amass-screenshot-1.png",
      "caption": "Amass Command Line Interface",
      "alt_text": "Screenshot of OWASP Amass running in terminal showing subdomain enumeration"
    },
    {
      "url": "/images/amass-screenshot-2.png", 
      "caption": "Asset Discovery Results",
      "alt_text": "Screenshot showing discovered assets and domains from Amass scan"
    },
    {
      "url": "/images/amass-screenshot-3.png",
      "caption": "Network Visualization",
      "alt_text": "Screenshot of network mapping visualization generated by Amass"
    }
  ]'::jsonb,

  -- Meta fields
  'OWASP Amass - Attack Surface Management and Asset Discovery Tool',
  'In-depth attack surface management framework for network mapping and external asset discovery using open source intelligence gathering and reconnaissance techniques.',
  
  -- Related projects
  ARRAY['OWASP Nettacker', 'OWASP ZAP', 'OWASP Nuclei', 'OWASP OWTF'],
  
  -- Content status
  'published'
);
