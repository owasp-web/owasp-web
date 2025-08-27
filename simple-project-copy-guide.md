# Simple Guide: Copy OWASP Projects One by One

## What You Want to Do
Copy each individual OWASP project page from https://owasp.org/projects/ and recreate it on your own site, preserving all the content, tabs, and structure.

## The Simple Process

### Step 1: Pick a Project to Copy
Let's start with **OWASP Juice Shop** as an example:
- Original page: https://owasp.org/www-project-juice-shop/

### Step 2: Copy the Content Structure

Each OWASP project page typically has:
- **Main content area** with description
- **Tab sections** (varies by project):
  - Main tab (overview/description)
  - Leaders tab (project leaders)
  - Roadmap tab (if available)
  - Releases tab (if available)
  - Related Projects tab (if available)

### Step 3: Simple Database Insert

```sql
-- Basic project insert (using Juice Shop as example)
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
    
    -- Tab content (copy from the actual OWASP page)
    tab_main_content,
    tab_leaders_content,
    tab_roadmap_content,
    
    -- Basic metadata
    tags,
    difficulty_level
) VALUES (
    'OWASP Juice Shop',
    'juice-shop',
    'Probably the most modern and sophisticated insecure web application for security trainings, awareness demos and CTFs.',
    
    -- Copy the full description from the OWASP page here
    'COPIED CONTENT FROM OWASP PAGE...',
    
    'Training',
    'flagship',
    'active',
    true,
    'https://owasp-juice.shop',
    'https://github.com/bkimminich/juice-shop',
    
    -- Copy content from each tab
    'MAIN TAB CONTENT FROM OWASP PAGE...',
    'LEADERS TAB CONTENT FROM OWASP PAGE...',  
    'ROADMAP TAB CONTENT FROM OWASP PAGE...',
    
    ARRAY['training', 'vulnerable-app', 'ctf', 'education'],
    'beginner'
);
```

## Manual Copy Process for Each Project

### For Each Project Page:

1. **Visit the OWASP project page** (e.g., https://owasp.org/www-project-juice-shop/)

2. **Copy the main description** from the overview section

3. **Check for tabs** on the page:
   - Click each tab
   - Copy the content from each tab
   - Note any special formatting or links

4. **Gather metadata**:
   - Project leaders (usually in a "Leaders" tab)
   - GitHub repository link
   - Website link (if different from OWASP page)
   - Any download links

5. **Insert into database** using the SQL template above

6. **Test the page** by visiting `/projects/[slug]` on your site

## Example: Step-by-Step for OWASP Juice Shop

Let me walk through copying the Juice Shop page:

### 1. Visit https://owasp.org/www-project-juice-shop/

### 2. Copy Main Content
```
Probably the most modern and sophisticated insecure web application! 
It can be used in security trainings, awareness demos, CTFs and as a 
guinea pig for security tools! Juice Shop encompasses vulnerabilities 
from the entire OWASP Top Ten along with many other security flaws 
found in real-world applications!
[... rest of the content ...]
```

### 3. Copy Tab Content
- **Main Tab**: The overview description
- **Leaders Tab**: Project leader information
- **Related Projects Tab**: Links to similar projects

### 4. Create Database Entry
```sql
UPDATE projects SET 
    tab_main_content = 'ACTUAL CONTENT FROM MAIN TAB...',
    tab_leaders_content = 'ACTUAL CONTENT FROM LEADERS TAB...',
    project_leaders = '[{"name": "Björn Kimminich", "role": "Project Leader"}]'::jsonb
WHERE slug = 'juice-shop';
```

## Simplified Template for Each Project

Use this SQL template for each project you copy:

```sql
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
    
    -- Copy content from OWASP page tabs
    tab_main_content,
    tab_leaders_content,
    
    -- Optional: if the project has these tabs
    tab_roadmap_content,
    tab_releases_content,
    
    -- Project leaders (from Leaders tab)
    project_leaders,
    
    -- Basic info
    tags,
    language,
    difficulty_level
) VALUES (
    'PROJECT NAME FROM OWASP PAGE',
    'project-slug',
    'SHORT DESCRIPTION FROM OWASP PAGE',
    'FULL DESCRIPTION FROM MAIN TAB',
    'Tool', -- or 'Documentation', 'Standards', etc.
    'flagship', -- or 'production', 'other'
    'active',
    true, -- if it's a flagship project
    'PROJECT WEBSITE URL',
    'GITHUB URL',
    'DOCUMENTATION URL',
    
    'CONTENT FROM MAIN TAB',
    'CONTENT FROM LEADERS TAB',
    
    -- Optional tabs
    'CONTENT FROM ROADMAP TAB',
    'CONTENT FROM RELEASES TAB',
    
    -- Leaders JSON
    '[{"name": "Leader Name", "role": "Project Leader"}]'::jsonb,
    
    ARRAY['tag1', 'tag2', 'tag3'],
    'Language (JavaScript, Python, etc.)',
    'beginner' -- or 'intermediate', 'advanced'
);
```

## Your Action Plan

1. **Start with 1 project** (I recommend Juice Shop as it's well-documented)
2. **Copy content manually** from the OWASP page
3. **Insert into database** using the SQL template
4. **Test the project page** on your site
5. **Repeat for the next project**

This way you can copy each project one by one, preserving their original content and structure, without getting overwhelmed by complex systems.

Would you like me to help you copy the first project (like Juice Shop) step by step?
