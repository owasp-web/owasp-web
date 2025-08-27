-- Complete OWASP Top 10 update with ALL sections matching official website
-- This includes: Main, Translation Efforts, Sponsors, Data 2025

UPDATE projects SET 
    long_description = 'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

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

## Translation Efforts

Efforts have been made in numerous languages to translate the OWASP Top 10 - 2021. If you are interested in helping, please contact the members of the team for the language you are interested in contributing to.

### Top 10:2021 Completed Translations
- **Arabic (ar)**: العربية
- **Spanish (es)**: Español  
- **French (fr)**: Français
- **Indonesian (id)**: Indonesian
- **Italian (it)**: Italiano
- **Japanese (ja)**: 日本語
- **Portuguese Brazil (pt_BR)**: Português (Brasil)
- **Chinese Simplified (zh_CN)**: 简体中文
- **Chinese Traditional (zh_TW)**: 繁體中文

### Historical Translations (Top 10:2017)
- **Chinese**: OWASP Top 10-2017 - 中文版 (PDF) - Led by 王颉
- **French**: OWASP Top 10 2017 in French (Git/Markdown)
- **German**: OWASP Top 10 2017 in German V1.0 (PDF) - Compiled by Christian Dresen and team
- **Hebrew**: OWASP Top 10-2017 - Hebrew (PDF/PPTX) - Translated by Eyal Estrin and Omer Levi Hevroni
- **Japanese**: OWASP Top 10-2017 - 日本語版 (PDF) - Translated by Akitsugu ITO and team
- **Korean**: OWASP Top 10-2017 - 한글 (PDF/PPTX) - Led by 박형근 (Hyungkeun Park)
- **Portuguese**: OWASP Top 10 2017 - Portuguese (PDF/ODP) - Translated by Anabela Nogueira and team
- **Russian**: OWASP Top 10-2017 - на русском языке (PDF) - Translated by JZDLin and team
- **Spanish**: OWASP Top 10-2017 - Español (PDF) - Led by Gerardo Canedo

## Project Sponsors

### 2021 Project Sponsors
The OWASP Top 10:2021 is sponsored by **Secure Code Warrior**.

### 2017 Project Sponsors  
The OWASP Top 10 - 2017 project was sponsored by **Autodesk** and supported by the **OWASP NoVA Chapter**.

### Historical Sponsors (2003-2013)
Thanks to **Aspect Security** for sponsoring earlier versions of the OWASP Top 10.

## Data 2025 Analysis Plan

### Goals
To collect the most comprehensive dataset related to identified application vulnerabilities to-date to enable analysis for the Top 10 and other future research. This data should come from a variety of sources: security vendors and consultancies, bug bounties, along with company/organizational contributions.

### Analysis Infrastructure
Plan to leverage the OWASP Azure Cloud Infrastructure to collect, analyze, and store the data contributed.

### Contribution Process
- **Email**: Send CSV/Excel files to [email protected]
- **Upload**: Submit files via https://bit.ly/OWASPTop10Data
- **Templates**: Available at https://github.com/OWASP/Top10/tree/master/2025/Data

### Contribution Period
We plan to accept contributions to the new Top 10 until **July 31, 2025**, for data dating from 2021 to 2024.

### Data Requirements
**Required Elements:**
- Time period (2024, 2023, 2022, 2021)
- Number of applications tested
- List of CWEs with count of applications containing each CWE

**Optional Metadata:**
- Contributor information
- Type of testing (TaH, HaT, Tools)
- Primary programming language
- Geographic region
- Primary industry
- Retest indicators

### Survey Component
We plan to conduct a survey in early 2025 to identify up to two categories that the community believes are important but may not be reflected in the data yet.

### Analysis Process
- Data normalization while preserving raw data
- CWE distribution analysis and potential reclassification
- Incidence rate calculation (apps with at least one instance)
- Development of base CWSS scores for top 20-30 CWEs
- Impact weighting integration

## Available Languages
The OWASP Top 10 2021 is available in multiple languages including Arabic, Spanish, French, Indonesian, Italian, Japanese, Portuguese (Brazil), Chinese (Simplified and Traditional).

## Project Information
- **Classification**: Flagship Project, Documentation
- **Audience**: Builder, Defender
- **License**: Creative Commons Attribution-ShareAlike v4.0
- **Latest Version**: 2021 (2025 coming soon)

## Project Leaders
- **Andrew van der Stock**: Project Leader
- **Brian Glas**: Project Leader  
- **Neil Smithline**: Project Leader
- **Torsten Gigler**: Project Leader

## Social Media and Code
- **Twitter**: @OWASP_Top10
- **GitHub Repository**: https://github.com/OWASP/Top10
- **Watch/Star**: Available on GitHub for updates'

WHERE slug = 'owasp-top-10';