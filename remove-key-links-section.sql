-- Remove the "Key Links and Resources" section from the main tab content
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

10. **A10:2021-Server-Side Request Forgery** - Added from the Top 10 community survey (#1). The data shows a relatively low incidence rate with above average testing coverage, along with above-average ratings for Exploit and Impact potential.'

WHERE slug = 'owasp-top-10';

