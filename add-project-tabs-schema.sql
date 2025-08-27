-- Add tab content fields to projects table
-- This will support: Main, Translation Efforts, Sponsors, Data 2025

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS tab_main_content TEXT,
ADD COLUMN IF NOT EXISTS tab_translation_content TEXT,
ADD COLUMN IF NOT EXISTS tab_sponsors_content TEXT,
ADD COLUMN IF NOT EXISTS tab_data_content TEXT;

-- Update OWASP Top 10 with proper tab content
UPDATE projects SET 
    tab_main_content = 'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

Globally recognized by developers as the first step towards more secure coding.

Companies should adopt this document and start the process of ensuring that their web applications minimize these risks. Using the OWASP Top 10 is perhaps the most effective first step towards changing the software development culture within your organization into one that produces more secure code.

## Current Status (2025)
We are on track to announce the release of the OWASP Top 10:2025 in the late summer/early fall 2025. Stay Tuned!

## Top 10 Web Application Security Risks (2021)

There are three new categories, four categories with naming and scoping changes, and some consolidation in the Top 10 for 2021:

1. **A01:2021-Broken Access Control** - Moves up from fifth position; 94% of applications tested for some form of broken access control. The 34 Common Weakness Enumerations (CWEs) mapped to Broken Access Control had more occurrences in applications than any other category.

2. **A02:2021-Cryptographic Failures** - Shifts up one position to #2, previously known as Sensitive Data Exposure, which was broad symptom rather than a root cause. The renewed focus here is on failures related to cryptography which often leads to sensitive data exposure or system compromise.

3. **A03:2021-Injection** - Slides down to the third position. 94% of the applications were tested for some form of injection, and the 33 CWEs mapped into this category have the second most occurrences in applications. Cross-site Scripting is now part of this category in this edition.

4. **A04:2021-Insecure Design** - New category for 2021, with a focus on risks related to design flaws. If we genuinely want to "move left" as an industry, it calls for more use of threat modeling, secure design patterns and principles, and reference architectures.

5. **A05:2021-Security Misconfiguration** - Moves up from #6 in the previous edition; 90% of applications were tested for some form of misconfiguration. With more shifts into highly configurable software, it''s not surprising to see this category move up.

6. **A06:2021-Vulnerable and Outdated Components** - Previously titled Using Components with Known Vulnerabilities and is #2 in the Top 10 community survey. This category moves up from #9 in 2017 and is a known issue that we struggle to test and assess risk.

7. **A07:2021-Identification and Authentication Failures** - Previously Broken Authentication and is sliding down from the second position, and now includes CWEs that are more related to identification failures. This category is still an integral part of the Top 10.

8. **A08:2021-Software and Data Integrity Failures** - New category for 2021, focusing on making assumptions related to software updates, critical data, and CI/CD pipelines without verifying integrity.

9. **A09:2021-Security Logging and Monitoring Failures** - Previously Insufficient Logging & Monitoring and is added from the industry survey (#3), moving up from #10 previously. This category is expanded to include more types of failures.

10. **A10:2021-Server-Side Request Forgery** - Added from the Top 10 community survey (#1). The data shows a relatively low incidence rate with above average testing coverage, along with above-average ratings for Exploit and Impact potential.

',

    tab_translation_content = 'Efforts have been made in numerous languages to translate the OWASP Top 10 - 2021. If you are interested in helping, please contact the members of the team for the language you are interested in contributing to, or if you don''t see your language listed, please email [email protected] to let us know that you want to help and we''ll form a volunteer group for your language.

## Top 10:2021 Completed Translations

- **Arabic (ar)**: العربية
- **Spanish (es)**: Español  
- **French (fr)**: Français
- **Indonesian (id)**: Indonesian
- **Italian (it)**: Italiano
- **Japanese (ja)**: 日本語
- **Portuguese Brazil (pt_BR)**: Português (Brasil)
- **Chinese Simplified (zh_CN)**: 简体中文
- **Chinese Traditional (zh_TW)**: 繁體中文

## Historical Translations (Top 10:2017)

- **Chinese**: OWASP Top 10-2017 - 中文版 (PDF) - Led by 王颉 ([email protected])
- **French**: OWASP Top 10 2017 in French (Git/Markdown)
- **German**: OWASP Top 10 2017 in German V1.0 (PDF) - Compiled by Christian Dresen and team
- **Hebrew**: OWASP Top 10-2017 - Hebrew (PDF/PPTX) - Translated by Eyal Estrin (@eyalestrin) and Omer Levi Hevroni (@omerlh)
- **Japanese**: OWASP Top 10-2017 - 日本語版 (PDF) - Translated by Akitsugu ITO and team
- **Korean**: OWASP Top 10-2017 - 한글 (PDF/PPTX) - Led by 박형근 (Hyungkeun Park)
- **Portuguese**: OWASP Top 10 2017 - Portuguese (PDF/ODP) - Translated by Anabela Nogueira and team
- **Russian**: OWASP Top 10-2017 - на русском языке (PDF) - Translated by JZDLin (@JZDLin) and team
- **Spanish**: OWASP Top 10-2017 - Español (PDF) - Led by Gerardo Canedo

## How to Contribute

If you would like to contribute to translation efforts:

1. **Contact the language team** for your target language
2. **Email us** at [email protected] if your language isn''t listed
3. **Follow our translation guidelines** and templates
4. **Join our collaborative translation process**

## Translation Resources

- **Translation Guidelines**: Available on GitHub
- **Template Files**: Provided for consistency
- **Review Process**: Community-driven quality assurance
- **Recognition**: All translators credited in final publications',

    tab_sponsors_content = 'The OWASP Top 10 project has been supported by generous sponsors throughout its history. These organizations have made it possible to develop, maintain, and distribute this critical security resource to the global community.

## 2021 Project Sponsors

### Secure Code Warrior
The OWASP Top 10:2021 is proudly sponsored by **Secure Code Warrior**.

Secure Code Warrior is a leading provider of secure coding training platforms, helping developers build security skills through hands-on learning experiences. Their support has been instrumental in the development and distribution of the 2021 edition.

- **Website**: https://securecodewarrior.com/
- **Focus**: Developer security training and secure coding practices
- **Contribution**: Primary sponsor for OWASP Top 10:2021

## 2017 Project Sponsors  

### Autodesk
The OWASP Top 10 - 2017 project was sponsored by **Autodesk**.

- **Website**: https://www.autodesk.com/
- **Focus**: 3D design, engineering and entertainment software
- **Contribution**: Primary sponsor for OWASP Top 10:2017

### OWASP NoVA Chapter
Additional support was provided by the **OWASP Northern Virginia (NoVA) Chapter**.

- **Focus**: Local OWASP community engagement and events
- **Contribution**: Supporting sponsor and community coordination

## Historical Sponsors (2003-2013)

### Aspect Security
Thanks to **Aspect Security** for sponsoring earlier versions of the OWASP Top 10.

- **Years**: 2003-2013
- **Focus**: Application security consulting and tools
- **Contribution**: Long-term foundational support for multiple Top 10 editions

## Sponsorship Benefits

Our sponsors gain:

- **Global Recognition**: Visibility to the worldwide security community
- **Community Impact**: Support for open source security initiatives
- **Industry Leadership**: Association with the most widely adopted security standard
- **Developer Reach**: Access to millions of developers worldwide

## Become a Sponsor

If your organization is interested in sponsoring future OWASP Top 10 initiatives:

- **Contact**: [email protected]
- **Benefits**: Multiple sponsorship levels available
- **Impact**: Help shape the future of application security
- **Recognition**: Acknowledgment in all project materials and communications

## Thank You

We extend our sincere gratitude to all sponsors who have supported the OWASP Top 10 project over the years. Your contributions make it possible to provide this essential security resource free to the global community.',

    tab_data_content = 'The OWASP Top 10 2025 Data Analysis Plan represents our most comprehensive approach to collecting and analyzing application vulnerability data to date.

## Goals

To collect the most comprehensive dataset related to identified application vulnerabilities to enable analysis for the Top 10 and other future research. This data should come from a variety of sources: security vendors and consultancies, bug bounties, along with company/organizational contributions.

Data will be normalized to allow for level comparison between Human assisted Tooling and Tooling assisted Humans.

## Analysis Infrastructure

We plan to leverage the **OWASP Azure Cloud Infrastructure** to collect, analyze, and store the data contributed.

- **Platform**: Microsoft Azure Cloud
- **Capacity**: Scalable infrastructure for large dataset processing
- **Security**: Enterprise-grade data protection and privacy
- **Access**: Controlled access for authorized researchers

## Contribution Process

There are multiple ways that data can be contributed:

### Method 1: Email Submission
- **Email**: Send CSV/Excel files to [email protected]
- **Format**: Structured data files with required metadata
- **Size**: Support for large datasets

### Method 2: Online Upload
- **Portal**: https://bit.ly/OWASPTop10Data
- **Interface**: Web-based upload system
- **Validation**: Automated data format checking

### Template Examples
- **GitHub Repository**: https://github.com/OWASP/Top10/tree/master/2025/Data
- **Formats**: CSV and Excel templates available
- **Documentation**: Detailed contribution guidelines

## Contribution Period

- **Deadline**: July 31, 2025
- **Data Range**: 2021 to 2024
- **Acceptance**: Rolling submissions throughout the period
- **Processing**: Quarterly data analysis updates

## Data Requirements

### Required Elements
- **Time period**: 2024, 2023, 2022, 2021
- **Number of applications tested**: Total count in dataset
- **CWE List**: List of CWEs with count of applications containing each CWE

### Optional Metadata
- **Contributor information**: Organization or anonymous
- **Testing type**: TaH, HaT, Tools
- **Primary language**: Programming language focus
- **Geographic region**: Global, North America, EU, Asia, other
- **Primary industry**: Financial, Industrial, Software, etc.
- **Retest indicators**: Whether data contains multiple tests of same applications

## Contribution Types

### Verified Data Contribution
- **Scenario 1**: Known submitter, publicly identified
- **Scenario 2**: Known submitter, not publicly identified  
- **Scenario 3**: Known submitter, not recorded in dataset

### Unverified Data Contribution
- **Scenario 4**: Anonymous submission (under evaluation)

## Analysis Process

### Data Normalization
- **Raw Data Preservation**: Original submissions maintained
- **Standardization**: Common format for analysis
- **Documentation**: All transformations clearly documented

### CWE Analysis
- **Distribution Analysis**: Pattern identification across datasets
- **Reclassification**: Potential consolidation into larger buckets
- **Core CWEs**: Focus on specific weaknesses rather than categories

### Incidence Rate Calculation
- **Methodology**: Apps with at least one instance (not frequency)
- **Baseline**: Total applications tested vs. applications with specific CWE
- **Trending**: Year-over-year comparison capabilities

### Impact Assessment
- **CWSS Scores**: Development for top 20-30 CWEs
- **Weighting**: Impact integration into Top 10 ranking
- **Community Input**: Survey integration for emerging threats

## Survey Component

Similar to Top Ten 2021, we plan to conduct a community survey:

- **Timeline**: Early 2025
- **Platform**: Google Forms
- **Purpose**: Identify important categories not reflected in data
- **CWE Sources**: Trending findings, outside Top Ten, emerging threats
- **Integration**: Up to two categories from survey results

## Research Applications

Beyond the Top 10, this dataset will enable:

- **Trend Analysis**: Multi-year vulnerability patterns
- **Industry Insights**: Sector-specific security challenges  
- **Geographic Studies**: Regional vulnerability distributions
- **Technology Impact**: Programming language and framework analysis
- **Testing Effectiveness**: HaT vs TaH methodology comparison

## Privacy and Ethics

- **Data Protection**: All submissions handled according to privacy policies
- **Anonymization**: Personal and sensitive organizational data removed
- **Consent**: Clear contributor agreements
- **Usage Rights**: Data used only for stated research purposes

## Community Benefit

This comprehensive analysis will provide:

- **Evidence-Based Rankings**: Data-driven Top 10 categories
- **Industry Benchmarks**: Comparative security metrics
- **Research Foundation**: Open data for academic and industry research
- **Global Standards**: International vulnerability prioritization'

WHERE slug = 'owasp-top-10';