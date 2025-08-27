# Manual OWASP Project Import Guide

Since the original script only had sample data, here's a streamlined process to import real OWASP projects into your database.

## Quick Start Options

### Option 1: Use Enhanced Script (Recommended)

1. **Extract Project List**:
   - Go to [https://owasp.org/projects/](https://owasp.org/projects/)
   - Open browser console (F12)
   - Paste the contents of `enhanced-import-script.js`
   - The script will extract all project URLs

2. **Extract Individual Project Details**:
   - Visit each project page (e.g., https://owasp.org/www-project-application-security-verification-standard/)
   - Run the script again - it will auto-detect and extract detailed info
   - Copy the generated SQL for each project

3. **Import to Database**:
   - Collect all SQL statements
   - Run them in your Supabase SQL Editor

### Option 2: Admin Interface (Easiest)

1. **Use Your New Admin Panel**:
   - Go to `https://your-site.vercel.app/admin`
   - Sign in with your admin credentials
   - Click "Manage Projects"
   - Click "Add New Project"

2. **Manually Add Key Projects**:
   - Start with the most important flagship projects
   - Use the official OWASP project pages as reference
   - Add projects one by one through the admin interface

## Priority Projects to Add First

Based on the [OWASP projects page](https://owasp.org/projects/), here are the flagship projects you should prioritize:

### Flagship Projects (Add These First)

1. **OWASP Top Ten**
   - URL: https://owasp.org/www-project-top-ten/
   - Category: Standards
   - Description: The reference standard for the most critical web application security risks

2. **OWASP Application Security Verification Standard (ASVS)**
   - URL: https://owasp.org/www-project-application-security-verification-standard/
   - Category: Standards
   - Description: Framework of security requirements for web applications

3. **OWASP Juice Shop**
   - URL: https://owasp.org/www-project-juice-shop/
   - Category: Tool
   - Description: Modern insecure web application for security training

4. **OWASP Dependency-Check**
   - URL: https://owasp.org/www-project-dependency-check/
   - Category: Tool
   - Description: SCA tool that identifies vulnerable dependencies

5. **OWASP Cheat Sheet Series**
   - URL: https://owasp.org/www-project-cheat-sheets/
   - Category: Documentation
   - Description: Concise good practice guides for developers

6. **OWASP Web Security Testing Guide**
   - URL: https://owasp.org/www-project-web-security-testing-guide/
   - Category: Documentation
   - Description: Premier cybersecurity testing resource

## Quick Admin Entry Template

For each project, use this template in your admin interface:

```
Title: [Project Name from official page]
Category: [Tool/Documentation/Standards/Framework/Training]
Project Type: flagship/production/other
Description: [Copy from official page]
GitHub URL: [Find on project page]
Website URL: [The official OWASP project page]
Documentation URL: [Usually docs.project.com or GitHub wiki]
Featured: ✓ (for flagship projects)
```

## Batch Import SQL Template

If you prefer SQL, here's a template for the key flagship projects:

```sql
INSERT INTO projects (title, slug, description, category, project_type, website_url, github_url, is_featured, status) VALUES
('OWASP Top Ten', 'top-ten', 'The reference standard for the most critical web application security risks.', 'Standards', 'flagship', 'https://owasp.org/www-project-top-ten/', 'https://github.com/OWASP/Top10', true, 'active'),
('OWASP Application Security Verification Standard (ASVS)', 'asvs', 'Framework of security requirements for web applications and services.', 'Standards', 'flagship', 'https://owasp.org/www-project-application-security-verification-standard/', 'https://github.com/OWASP/ASVS', true, 'active'),
('OWASP Juice Shop', 'juice-shop', 'Modern and sophisticated insecure web application for security training.', 'Tool', 'flagship', 'https://owasp.org/www-project-juice-shop/', 'https://github.com/bkimminich/juice-shop', true, 'active'),
('OWASP Dependency-Check', 'dependency-check', 'SCA tool that identifies project dependencies with known vulnerabilities.', 'Tool', 'flagship', 'https://owasp.org/www-project-dependency-check/', 'https://github.com/jeremylong/DependencyCheck', true, 'active'),
('OWASP Cheat Sheet Series', 'cheat-sheets', 'Concise good practice guides for application developers and defenders.', 'Documentation', 'flagship', 'https://owasp.org/www-project-cheat-sheets/', 'https://github.com/OWASP/CheatSheetSeries', true, 'active')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  website_url = EXCLUDED.website_url,
  github_url = EXCLUDED.github_url,
  updated_at = NOW();
```

## Recommended Approach

1. **Start Small**: Add 5-10 flagship projects manually through the admin interface
2. **Test the System**: Make sure everything works correctly
3. **Expand Gradually**: Add more projects as needed
4. **Use the Enhanced Script**: For bulk import if you want all 395+ projects

## Data Sources for Each Project

When adding projects, get information from:

1. **Official OWASP Project Page**: Primary source for description and links
2. **GitHub Repository**: For technical details, language, contributors
3. **Documentation Sites**: For documentation URLs and detailed features
4. **OWASP Project Classification**: For project type (flagship/production/other)

This approach ensures you have accurate, up-to-date information directly from OWASP's official sources.