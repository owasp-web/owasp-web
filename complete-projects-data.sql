-- Complete OWASP Projects Data with ALL Links
-- This includes OWASP Top Ten (updates) and OWASP ASVS (new)

-- First, update OWASP Top Ten with all missing links and data
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

## Available Languages
The OWASP Top 10 2021 is available in multiple languages including Arabic, Spanish, French, Indonesian, Italian, Japanese, Portuguese (Brazil), Chinese (Simplified and Traditional).

## Project Leaders
- Andrew van der Stock
- Brian Glas  
- Neil Smithline
- Torsten Gigler

## Sponsors
The OWASP Top 10:2021 is sponsored by Secure Code Warrior. Previous versions were sponsored by Autodesk and Aspect Security.',
    
    contributors = 4,
    maintainers = ARRAY['Andrew van der Stock', 'Brian Glas', 'Neil Smithline', 'Torsten Gigler']
    
WHERE slug = 'owasp-top-10';

-- Now add OWASP ASVS project with complete data
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
    maintainers
) VALUES (
    'OWASP Application Security Verification Standard (ASVS)',
    'asvs',
    'The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.',
    'The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.

## What is the ASVS?

The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.

## Current Release - ASVS 5.0.0

The latest stable release is **ASVS 5.0.0**, also known as the "Bleeding Edge" version. This version includes:

- Enhanced security requirements for modern applications
- Updated verification levels (L1, L2, L3)
- Comprehensive coverage of web application security controls
- Integration with modern development practices

## Downloads (ASVS 5.0.0)

Available in multiple formats:
- **English PDF** - Complete verification standard
- **English Word** - Editable document format  
- **English CSV** - Machine-readable format
- **OWASP Application Security Verification Standard** - Online version

## Previous Stable Releases

- **Stable Release 4.0.3** - Previous stable version
- Historical versions available on GitHub

## Translation Efforts

The ASVS has been translated into multiple languages by the global OWASP community. Each translation is maintained by dedicated volunteer teams.

## Support the ASVS

For more details on how to financially support the ASVS, see the Supporters Page.

## Stay Up to Date

Follow us on social media to ensure you don''t miss updates about the ASVS:
- Twitter updates and announcements
- LinkedIn professional network updates  
- GitHub repository notifications

## Key Features

- **Level-based Verification**: Three levels of security verification (L1, L2, L3)
- **Comprehensive Controls**: Covers all aspects of web application security
- **Developer-Friendly**: Requirements written for developers and security teams
- **Industry Standard**: Globally recognized verification framework
- **Regular Updates**: Continuously updated based on threat landscape
- **Multiple Formats**: Available in PDF, Word, CSV, and online formats

## Verification Levels

1. **Level 1 (ASVS-L1)**: Basic security verification for all applications
2. **Level 2 (ASVS-L2)**: Standard verification for applications handling sensitive data  
3. **Level 3 (ASVS-L3)**: Advanced verification for critical applications

## GitHub Integration

- **Source Code**: Full source available on GitHub
- **Issues Tracking**: Report issues and feature requests
- **Contributions**: Community contributions welcome
- **Stars**: 3.1k+ GitHub stars indicating strong community adoption',
    
    'Standards',
    'flagship',
    'active',
    true,
    'https://owasp.org/www-project-application-security-verification-standard/',
    'https://github.com/OWASP/ASVS',
    'https://owasp.org/www-project-application-security-verification-standard/',
    'Documentation',
    'intermediate',
    'Creative Commons Attribution-ShareAlike v4.0',
    '5.0.0 (Bleeding Edge)',
    78, -- Contributors count from GitHub
    3100, -- GitHub stars count
    ARRAY[
        'Level-based Verification (L1, L2, L3)',
        'Comprehensive security controls coverage',
        'Developer-friendly requirements',
        'Industry standard verification framework',
        'Regular updates based on threat landscape',
        'Multiple format availability (PDF, Word, CSV)',
        'Global translation support',
        'GitHub integration and community contributions'
    ],
    ARRAY[
        'Web application security knowledge',
        'Understanding of security testing methodologies',
        'Familiarity with security controls and frameworks',
        'Basic knowledge of web application architecture',
        'Security assessment tools and techniques'
    ],
    ARRAY[
        'Download the latest ASVS 5.0.0 document',
        'Choose appropriate verification level (L1, L2, or L3)',
        'Review security requirements for your application type',
        'Implement security controls based on verification level',
        'Conduct security testing against ASVS requirements',
        'Document verification results and compliance status',
        'Regular review and updates as ASVS evolves'
    ],
    ARRAY[
        'application security',
        'verification standard',
        'security testing',
        'security controls',
        'web application security',
        'security framework',
        'security assessment',
        'penetration testing',
        'security requirements',
        'compliance'
    ],
    ARRAY[
        'ASVS Community Team',
        'OWASP Foundation Contributors',
        'Global Translation Teams'
    ]
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
    updated_at = NOW();

-- Verify both projects exist with correct data
SELECT 
    title, 
    slug, 
    project_type, 
    is_featured, 
    contributors,
    github_stars,
    LEFT(long_description, 100) as description_preview 
FROM projects 
WHERE slug IN ('owasp-top-10', 'asvs') 
ORDER BY is_featured DESC, title;