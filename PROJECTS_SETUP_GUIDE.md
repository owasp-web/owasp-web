# OWASP Projects Database Setup Guide

This guide will help you set up a complete database-driven project system for your OWASP website.

## Overview

I've converted your hardcoded project system into a dynamic database-driven system that:
- Fetches projects from Supabase database
- Displays them dynamically on the projects page
- Creates individual project pages automatically
- Matches the official OWASP projects from https://owasp.org/projects/

## Files Created/Modified

### New Files:
1. `src/lib/projects.ts` - Database functions for project operations
2. `update-projects-schema.sql` - Database schema updates
3. `import-owasp-projects.js` - Script to generate project import data
4. `PROJECTS_SETUP_GUIDE.md` - This guide

### Modified Files:
1. `src/components/ProjectInventorySection.tsx` - Now fetches from database
2. `src/app/projects/[slug]/page.tsx` - Now dynamic, fetches individual projects

## Step-by-Step Setup

### Step 1: Update Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `update-projects-schema.sql`
4. Run the SQL to update your projects table with new columns

### Step 2: Import OWASP Projects Data

#### Option A: Run the JavaScript Script
1. Open your browser and go to any page
2. Open Developer Console (F12)
3. Copy and paste the contents of `import-owasp-projects.js`
4. Run the script - it will output SQL INSERT statements
5. Copy the generated SQL
6. Go back to Supabase SQL Editor
7. Paste and run the SQL statements

#### Option B: Manual Import via Supabase Dashboard
1. Go to Supabase → Table Editor → projects table
2. Use the "Insert" button to manually add projects
3. Use the JSON output from the script as reference

### Step 3: Test the System

1. Deploy your changes to Vercel
2. Visit your projects page: `https://your-site.vercel.app/projects`
3. You should see projects loaded from the database
4. Click on individual projects to test dynamic pages
5. Test the ASVS project: `https://your-site.vercel.app/projects/asvs`

## Database Schema

The updated projects table includes these new fields:

```sql
- project_type: 'flagship' | 'production' | 'other'
- github_stars: INTEGER
- last_updated: DATE
- version: TEXT
- downloads: TEXT
- contributors: INTEGER
- documentation_url: TEXT
- website_url: TEXT
- features: TEXT[] (array)
- requirements: TEXT[] (array)
- getting_started: TEXT[] (array)
- tags: TEXT[] (array)
- license: TEXT
- language: TEXT
- maintainers: TEXT[] (array)
- difficulty_level: 'beginner' | 'intermediate' | 'advanced'
```

## Key Features

### Dynamic Project Loading
- Projects page loads from database
- Shows total project count
- Displays featured projects in grid
- Responsive design maintained

### Individual Project Pages
- Dynamic routes: `/projects/[slug]`
- Fetches project details from database
- Rich project information display
- Links to GitHub, website, documentation

### Project Categories
- Flagship Projects (most important)
- Production Projects (stable, ready-to-use)
- Other Projects (lab, incubator)

### Search and Filtering
- Built-in search functionality
- Category filtering
- Project type filtering
- Tag-based organization

## Admin Management

Since you have admin access to Supabase, you can:
1. Add new projects via Supabase dashboard
2. Edit existing project information
3. Feature/unfeature projects
4. Update project status (active/inactive)

## Sample Projects Included

The import script includes these flagship projects:
- OWASP Top Ten
- OWASP ASVS
- OWASP Juice Shop
- OWASP Dependency-Check
- OWASP Dependency-Track
- OWASP ModSecurity Core Rule Set
- OWASP Amass
- OWASP DefectDojo
- OWASP Cheat Sheet Series
- OWASP Web Security Testing Guide
- OWASP Mobile Application Security
- OWASP SAMM
- OWASP Security Shepherd
- OWASP CycloneDX

Plus several production projects.

## Next Steps

1. **Run the database update script**
2. **Import the projects data**
3. **Test the system**
4. **Add more projects as needed**
5. **Customize project images** (currently using placeholder paths)

## Troubleshooting

### Projects not loading?
- Check Supabase connection in `src/lib/supabase.ts`
- Verify RLS policies allow public read access
- Check browser console for errors

### Individual project pages showing 404?
- Verify project slug exists in database
- Check that project status is 'active'
- Ensure the `getProjectBySlug` function is working

### Missing project images?
- Add actual project images to `public/images/icons/`
- Update image paths in database
- Use placeholder if images not available

## Adding New Projects

To add a new project:

1. **Via Supabase Dashboard:**
   - Go to projects table
   - Click "Insert row"
   - Fill in required fields (title, slug, description, category)
   - Set status to 'active'

2. **Via SQL:**
   ```sql
   INSERT INTO projects (title, slug, description, category, status)
   VALUES ('New Project', 'new-project', 'Description here', 'Tool', 'active');
   ```

## Performance Notes

- Projects are fetched server-side for SEO
- Client-side caching for better performance
- Pagination support built-in
- Efficient database queries with proper indexes

Your OWASP website now has a complete, scalable project management system! 🎉