-- Update OWASP Top Ten content for better formatting
UPDATE projects SET long_description = 'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

Globally recognized by developers as the first step towards more secure coding.

Companies should adopt this document and start the process of ensuring that their web applications minimize these risks. Using the OWASP Top 10 is perhaps the most effective first step towards changing the software development culture within your organization into one that produces more secure code.

## Current Status (2025)
We are on track to announce the release of the OWASP Top 10:2025 in the late summer/early fall 2025.

## Top 10 Web Application Security Risks (2021)

The current version includes three new categories, four categories with naming and scoping changes:

1. **A01:2021-Broken Access Control** - Moves up from fifth position; 94% of applications tested
2. **A02:2021-Cryptographic Failures** - Previously "Sensitive Data Exposure"
3. **A03:2021-Injection** - Slides down to third position, now includes XSS
4. **A04:2021-Insecure Design** - New category focusing on design flaws
5. **A05:2021-Security Misconfiguration** - Moves up from #6
6. **A06:2021-Vulnerable and Outdated Components** - Previously "Using Components with Known Vulnerabilities"
7. **A07:2021-Identification and Authentication Failures** - Previously "Broken Authentication"
8. **A08:2021-Software and Data Integrity Failures** - New category for 2021
9. **A09:2021-Security Logging and Monitoring Failures** - Previously "Insufficient Logging & Monitoring"
10. **A10:2021-Server-Side Request Forgery** - Added from community survey

## Available Languages
The OWASP Top 10 2021 is available in multiple languages including Arabic, Spanish, French, Indonesian, Italian, Japanese, Portuguese (Brazil), Chinese (Simplified and Traditional).'
WHERE slug = 'owasp-top-10';

-- Verify the update
SELECT title, slug, LEFT(long_description, 200) as description_preview FROM projects WHERE slug = 'owasp-top-10';