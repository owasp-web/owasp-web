-- Complete OWASP Top 10 project links matching the official site exactly
-- This includes all the A01-A10 individual links plus other project resources

UPDATE projects SET 
    project_links = '[
        {
            "title": "OWASP Top 10:2021",
            "url": "https://owasp.org/Top10/",
            "type": "document"
        },
        {
            "title": "Making of OWASP Top 10",
            "url": "https://owasp.org/www-project-top-ten/2021/Making_of_OWASP_Top_10_2021",
            "type": "documentation"
        },
        {
            "title": "OWASP Top 10:2021 - 20th Anniversary Presentation (PPTX)",
            "url": "https://github.com/OWASP/Top10/blob/master/2021/docs/OWASP%20Top%2010-2021%20-%2020th%20Anniversary%20Presentation.pptx",
            "type": "presentation"
        },
        {
            "title": "A01:2021-Broken Access Control",
            "url": "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
            "type": "vulnerability"
        },
        {
            "title": "A02:2021-Cryptographic Failures",
            "url": "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
            "type": "vulnerability"
        },
        {
            "title": "A03:2021-Injection",
            "url": "https://owasp.org/Top10/A03_2021-Injection/",
            "type": "vulnerability"
        },
        {
            "title": "A04:2021-Insecure Design",
            "url": "https://owasp.org/Top10/A04_2021-Insecure_Design/",
            "type": "vulnerability"
        },
        {
            "title": "A05:2021-Security Misconfiguration",
            "url": "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
            "type": "vulnerability"
        },
        {
            "title": "A06:2021-Vulnerable and Outdated Components",
            "url": "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/",
            "type": "vulnerability"
        },
        {
            "title": "A07:2021-Identification and Authentication Failures",
            "url": "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/",
            "type": "vulnerability"
        },
        {
            "title": "A08:2021-Software and Data Integrity Failures",
            "url": "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/",
            "type": "vulnerability"
        },
        {
            "title": "A09:2021-Security Logging and Monitoring Failures",
            "url": "https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/",
            "type": "vulnerability"
        },
        {
            "title": "A10:2021-Server-Side Request Forgery",
            "url": "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/",
            "type": "vulnerability"
        },
        {
            "title": "Previous Version (2017)",
            "url": "https://owasp.org/www-project-top-ten/2017/",
            "type": "document"
        },
        {
            "title": "OWASP Top 10 2017",
            "url": "https://owasp.org/www-project-top-ten/2017/",
            "type": "download"
        }
    ]'::jsonb,
    
    project_leaders = '[
        {
            "name": "Andrew van der Stock",
            "role": "Project Leader"
        },
        {
            "name": "Brian Glas", 
            "role": "Project Leader"
        },
        {
            "name": "Neil Smithline",
            "role": "Project Leader"
        },
        {
            "name": "Torsten Gigler",
            "role": "Project Leader"
        }
    ]'::jsonb,
    
    social_links = '[
        {
            "platform": "OWASP Top 10 2017",
            "url": "https://owasp.org/www-project-top-ten/2017/"
        },
        {
            "platform": "Other languages → tab Translation Efforts",
            "url": "#"
        },
        {
            "platform": "Twitter",
            "url": "https://twitter.com/owasp"
        },
        {
            "platform": "GitHub Repository", 
            "url": "https://github.com/OWASP/Top10"
        }
    ]'::jsonb
    
WHERE slug = 'owasp-top-10';
