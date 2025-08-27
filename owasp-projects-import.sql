-- OWASP Projects Database Import
-- Based on official OWASP projects from https://owasp.org/projects/
-- This includes all flagship, production, and notable projects

-- Flagship Projects (15 major projects)
INSERT INTO projects (
  title, slug, description, category, project_type, status, is_featured, website_url
) VALUES 
(
  'OWASP Top Ten',
  'top-ten', 
  'The OWASP Top 10 is the reference standard for the most critical web application security risks. Adopting the OWASP Top 10 is perhaps the most effective first step towards changing your software development culture focused on producing secure code.',
  'Standards',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-top-ten/'
),
(
  'OWASP Application Security Verification Standard (ASVS)',
  'asvs',
  'The OWASP Application Security Verification Standard (ASVS) Project is a framework of security requirements that focus on defining the security controls required when designing, developing and testing modern web applications and web services.',
  'Standards', 
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-application-security-verification-standard/'
),
(
  'OWASP Juice Shop',
  'juice-shop',
  'Probably the most modern and sophisticated insecure web application for security trainings, awareness demos and CTFs. Also great voluntary guinea pig for your security tools and DevSecOps pipelines!',
  'Training',
  'flagship', 
  'active',
  true,
  'https://owasp.org/www-project-juice-shop/'
),
(
  'OWASP Dependency-Check',
  'dependency-check',
  'Dependency-Check is a Software Composition Analysis (SCA) tool suite that identifies project dependencies and checks if there are any known, publicly disclosed, vulnerabilities.',
  'Tool',
  'flagship',
  'active', 
  true,
  'https://owasp.org/www-project-dependency-check/'
),
(
  'OWASP Cheat Sheet Series',
  'cheat-sheets',
  'The OWASP Cheat Sheet Series project provides a set of concise good practice guides for application developers and defenders to follow.',
  'Documentation',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-cheat-sheets/'
),
(
  'OWASP Web Security Testing Guide',
  'wstg',
  'The Web Security Testing Guide (WSTG) Project produces the premier cybersecurity testing resource for web application developers and security professionals.',
  'Documentation',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-web-security-testing-guide/'
),
(
  'OWASP Mobile Application Security',
  'mobile-application-security',
  'The OWASP Mobile Application Security (MAS) project consists of a series of documents that establish a security and privacy standard for mobile apps and a comprehensive testing guide.',
  'Standards',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-mobile-app-security/'
),
(
  'OWASP SAMM',
  'samm',
  'A Software Assurance Maturity Model (SAMM) that provides an effective and measurable way for all types of organizations to analyse and improve their software security posture.',
  'Framework',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-samm/'
),
(
  'OWASP Dependency-Track',
  'dependency-track',
  'Intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain.',
  'Tool',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-dependency-track/'
),
(
  'OWASP DefectDojo',
  'defectdojo',
  'The leading open source application vulnerability management tool built for DevOps and continuous security integration.',
  'Tool',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-defectdojo/'
),
(
  'OWASP Amass',
  'amass',
  'An open source framework that helps information security professionals perform network mapping of attack surfaces and external asset discovery using open source intelligence gathering and reconnaissance techniques.',
  'Tool',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-amass/'
),
(
  'OWASP CRS',
  'crs',
  'The OWASP CRS is a set of generic attack detection rules for use with ModSecurity or compatible web application firewalls. The CRS aims to protect web applications from a wide range of attacks.',
  'Framework',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-modsecurity-core-rule-set/'
),
(
  'OWASP OWTF',
  'owtf',
  'Offensive Web Testing Framework (OWTF), is an OWASP+PTES focused try to unite great tools and make pen testing more efficient, written mostly in Python.',
  'Tool',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-owtf/'
),
(
  'OWASP Security Shepherd',
  'security-shepherd',
  'OWASP Security Shepherd is a web and mobile application security training platform designed to foster and improve security awareness among a varied skill-set demographic.',
  'Training',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-security-shepherd/'
),
(
  'OWASP CycloneDX',
  'cyclonedx',
  'OWASP CycloneDX is a full-stack Bill of Materials (BOM) standard that provides advanced supply chain capabilities for cyber risk reduction.',
  'Standards',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-cyclonedx/'
);

-- Production Projects
INSERT INTO projects (
  title, slug, description, category, project_type, status, is_featured, website_url
) VALUES
(
  'OWASP API Security Project',
  'api-security',
  'OWASP API Security focuses on strategies and solutions to understand and mitigate the unique vulnerabilities and security risks of Application Programming Interfaces (APIs).',
  'Standards',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-api-security/'
),
(
  'OWASP Bug Logging Tool',
  'bug-logging-tool',
  'OWASP BLT is a tool enabling internet users to report all kinds of issues they encounter, thereby improving internet security, with a unique feature of rewarding users for bug reporting.',
  'Tool',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-bug-logging-tool/'
),
(
  'OWASP Coraza Web Application Firewall',
  'coraza',
  'OWASP Coraza is a golang enterprise-grade WAF framework compatible with Modsecurity and OWASP Core Ruleset.',
  'Tool',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-coraza-web-application-firewall/'
),
(
  'OWASP Cornucopia',
  'cornucopia',
  'OWASP Cornucopia provides card game decks to assist the whole software development team undertake threat modeling of applications.',
  'Training',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-cornucopia/'
),
(
  'OWASP CSRFGuard',
  'csrfguard',
  'OWASP CSRFGuard is a library that implements a variant of the synchronizer token pattern to mitigate the risk of Cross-Site Request Forgery (CSRF) attacks.',
  'Tool',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-csrfguard/'
),
(
  'OWASP ModSecurity',
  'modsecurity',
  'ModSecurity is the standard open-source web application firewall (WAF) engine.',
  'Tool',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-modsecurity/'
),
(
  'OWASP SamuraiWTF',
  'samuraiwtf',
  'SamuraiWTF (Web Training Framework) is a collection of tools and training bundled into a platform to provide a lab environment and training on web application testing.',
  'Training',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-samuraiwtf/'
),
(
  'OWASP Secure Headers Project',
  'secure-headers',
  'Provides technical information about HTTP security headers.',
  'Documentation',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-secure-headers/'
),
(
  'OWASP WrongSecrets',
  'wrongsecrets',
  'Examples with how to not use secrets',
  'Training',
  'production',
  'active',
  false,
  'https://owasp.org/www-project-wrongsecrets/'
);

-- Additional Important Projects
INSERT INTO projects (
  title, slug, description, category, project_type, status, is_featured, website_url
) VALUES
(
  'OWASP WebGoat',
  'webgoat',
  'WebGoat is a deliberately insecure web application maintained by OWASP designed to teach web application security lessons.',
  'Training',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-webgoat/'
),
(
  'OWASP ZAP',
  'zap',
  'The OWASP Zed Attack Proxy (ZAP) is one of the world''s most popular free security tools and is actively maintained by a dedicated international team of volunteers.',
  'Tool',
  'flagship',
  'active',
  true,
  'https://owasp.org/www-project-zap/'
),
(
  'OWASP Code Review Guide',
  'code-review-guide',
  'The OWASP Code Review Guide provides guidance on how to review code for security issues.',
  'Documentation',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-code-review-guide/'
),
(
  'OWASP Mobile Top 10',
  'mobile-top-10',
  'The OWASP Mobile Top 10 is a list of the most critical security risks for mobile applications.',
  'Standards',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-mobile-top-10/'
),
(
  'OWASP Docker Top 10',
  'docker-top-10',
  'The OWASP Docker Top 10 is a list of the most critical security risks for Docker containers.',
  'Standards',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-docker-top-10/'
),
(
  'OWASP IoT Top 10',
  'iot-top-10',
  'The OWASP Internet of Things (IoT) Top 10 is a list of the most critical security risks for IoT systems.',
  'Standards',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-internet-of-things/'
),
(
  'OWASP Threat Dragon',
  'threat-dragon',
  'OWASP Threat Dragon is a modeling tool used to create threat model diagrams as part of a secure development lifecycle.',
  'Tool',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-threat-dragon/'
),
(
  'OWASP Nettacker',
  'nettacker',
  'OWASP Nettacker project is created to automate information gathering, vulnerability scanning and eventually generating a report for networks.',
  'Tool',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-nettacker/'
),
(
  'OWASP OWASP Risk Rating Methodology',
  'risk-rating-methodology',
  'The OWASP Risk Rating Methodology provides a framework for rating the risk of security vulnerabilities.',
  'Framework',
  'other',
  'active',
  false,
  'https://owasp.org/www-community/OWASP_Risk_Rating_Methodology'
),
(
  'OWASP DevSecOps Top 10',
  'devsecops-top-10',
  'The OWASP DevSecOps Top 10 provides the ten most critical security risks in DevSecOps.',
  'Standards',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-devsecops-top-10/'
),
(
  'OWASP Cloud Security',
  'cloud-security',
  'OWASP Cloud Security provides guidance and best practices for securing cloud environments.',
  'Documentation',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-cloud-security/'
),
(
  'OWASP Software Component Verification Standard',
  'scvs',
  'The Software Component Verification Standard (SCVS) is a community-effort to establish a framework for identifying activities, controls, and best practices.',
  'Standards',
  'other',
  'active',
  false,
  'https://owasp.org/www-project-software-component-verification-standard/'
);

-- Update any conflicts and set timestamps
UPDATE projects SET updated_at = NOW() WHERE updated_at IS NULL;