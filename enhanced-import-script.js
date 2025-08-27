/**
 * Enhanced OWASP Projects Import Script
 * 
 * This script can be used in two ways:
 * 1. Run on the main projects page to extract basic project info
 * 2. Run on individual project pages to extract detailed information
 * 
 * Instructions:
 * 1. Go to https://owasp.org/projects/ and run this script to get the project list
 * 2. Then visit individual project pages and run the script to get detailed info
 * 3. Combine the data and import into your database
 */

// Helper function to create a slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/owasp\s+/gi, '') // Remove OWASP prefix
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to escape SQL strings
function escapeSql(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Helper function to format array for PostgreSQL
function formatArray(arr) {
  if (!arr || arr.length === 0) return 'NULL';
  const escaped = arr.map(item => `"${item.replace(/"/g, '\\"')}"`);
  return `ARRAY[${escaped.join(', ')}]`;
}

// Function to extract project data from main projects page
function extractFromProjectsPage() {
  console.log('=== EXTRACTING FROM MAIN PROJECTS PAGE ===');
  
  const projects = [];
  
  // Extract Flagship Projects
  const flagshipSection = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Flagship Projects'));
  
  if (flagshipSection) {
    let currentElement = flagshipSection.nextElementSibling;
    while (currentElement && !currentElement.querySelector('h3')) {
      const projectLinks = currentElement.querySelectorAll('a[href*="www-project"]');
      projectLinks.forEach(link => {
        const title = link.textContent.trim();
        const url = link.href;
        const slug = createSlug(title);
        
        projects.push({
          title,
          slug,
          project_url: url,
          project_type: 'flagship',
          status: 'active',
          is_featured: true
        });
      });
      currentElement = currentElement.nextElementSibling;
    }
  }
  
  // Extract Production Projects
  const productionSection = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Production Projects'));
  
  if (productionSection) {
    let currentElement = productionSection.nextElementSibling;
    while (currentElement && !currentElement.querySelector('h3')) {
      const projectLinks = currentElement.querySelectorAll('a[href*="www-project"]');
      projectLinks.forEach(link => {
        const title = link.textContent.trim();
        const url = link.href;
        const slug = createSlug(title);
        
        projects.push({
          title,
          slug,
          project_url: url,
          project_type: 'production',
          status: 'active',
          is_featured: false
        });
      });
      currentElement = currentElement.nextElementSibling;
    }
  }
  
  console.log(`Found ${projects.length} projects on main page`);
  console.log('Project URLs to visit for detailed info:');
  projects.forEach(p => console.log(`- ${p.project_url}`));
  
  // Store in localStorage for later use
  localStorage.setItem('owaspProjectsList', JSON.stringify(projects));
  
  return projects;
}

// Function to extract detailed data from individual project page
function extractFromProjectPage() {
  console.log('=== EXTRACTING FROM INDIVIDUAL PROJECT PAGE ===');
  
  const url = window.location.href;
  const title = document.title.replace(' | OWASP Foundation', '').trim();
  const slug = createSlug(title);
  
  // Extract description from meta tag or page content
  const metaDescription = document.querySelector('meta[name="description"]')?.content;
  const description = metaDescription || 
                     document.querySelector('.project-description')?.textContent?.trim() ||
                     document.querySelector('p')?.textContent?.trim()?.substring(0, 200);
  
  // Extract GitHub URL
  const githubLink = Array.from(document.querySelectorAll('a[href*="github.com"]')).find(a => 
    a.href.includes('github.com/OWASP') || a.href.includes('github.com/owasp')
  );
  const github_url = githubLink?.href;
  
  // Extract other links
  const documentationLink = Array.from(document.querySelectorAll('a')).find(a => 
    a.textContent.toLowerCase().includes('documentation') ||
    a.textContent.toLowerCase().includes('docs') ||
    a.href.includes('docs.')
  );
  const documentation_url = documentationLink?.href;
  
  // Try to determine project type based on URL or content
  let project_type = 'other';
  if (document.textContent.includes('flagship') || url.includes('flagship')) {
    project_type = 'flagship';
  } else if (document.textContent.includes('production') || url.includes('production')) {
    project_type = 'production';
  }
  
  // Try to determine category
  let category = 'Tool';
  const content = document.textContent.toLowerCase();
  if (content.includes('standard') || content.includes('verification') || title.toLowerCase().includes('standard')) {
    category = 'Standards';
  } else if (content.includes('documentation') || content.includes('guide') || content.includes('cheat sheet')) {
    category = 'Documentation';
  } else if (content.includes('framework') || content.includes('model')) {
    category = 'Framework';
  } else if (content.includes('training') || content.includes('education') || content.includes('learning')) {
    category = 'Training';
  }
  
  // Extract language from GitHub link or content
  let language = '';
  if (github_url) {
    // Common language indicators
    if (content.includes('python')) language = 'Python';
    else if (content.includes('java')) language = 'Java';
    else if (content.includes('javascript') || content.includes('node.js')) language = 'JavaScript';
    else if (content.includes('golang') || content.includes('go ')) language = 'Go';
    else if (content.includes('c++') || content.includes('cpp')) language = 'C++';
    else if (content.includes('c#') || content.includes('csharp')) language = 'C#';
  }
  if (!language && category === 'Documentation') language = 'Documentation';
  
  const projectData = {
    title,
    slug,
    description: description?.substring(0, 500), // Limit description length
    website_url: url,
    github_url,
    documentation_url,
    category,
    project_type,
    language,
    status: 'active',
    is_featured: project_type === 'flagship'
  };
  
  console.log('Extracted project data:', projectData);
  
  // Generate SQL for this project
  const sql = `INSERT INTO projects (
    title, slug, description, website_url, github_url, documentation_url,
    category, project_type, language, status, is_featured
  ) VALUES (
    ${escapeSql(projectData.title)},
    ${escapeSql(projectData.slug)},
    ${escapeSql(projectData.description)},
    ${escapeSql(projectData.website_url)},
    ${escapeSql(projectData.github_url)},
    ${escapeSql(projectData.documentation_url)},
    ${escapeSql(projectData.category)},
    ${escapeSql(projectData.project_type)},
    ${escapeSql(projectData.language)},
    'active',
    ${projectData.is_featured}
  ) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    website_url = EXCLUDED.website_url,
    github_url = EXCLUDED.github_url,
    documentation_url = EXCLUDED.documentation_url,
    updated_at = NOW();`;
  
  console.log('SQL for this project:');
  console.log(sql);
  
  return projectData;
}

// Function to generate bulk SQL from collected data
function generateBulkSQL() {
  const storedProjects = localStorage.getItem('owaspProjectsList');
  if (!storedProjects) {
    console.log('No projects found in localStorage. Run extractFromProjectsPage() first.');
    return;
  }
  
  const projects = JSON.parse(storedProjects);
  const statements = projects.map(project => {
    return `INSERT INTO projects (
      title, slug, project_url, project_type, status, is_featured
    ) VALUES (
      ${escapeSql(project.title)},
      ${escapeSql(project.slug)},
      ${escapeSql(project.project_url)},
      ${escapeSql(project.project_type)},
      'active',
      ${project.is_featured}
    ) ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      project_url = EXCLUDED.project_url,
      updated_at = NOW();`;
  });
  
  console.log('=== BULK SQL STATEMENTS ===');
  console.log(statements.join('\n\n'));
  
  return statements;
}

// Main execution logic
function main() {
  const currentUrl = window.location.href;
  
  if (currentUrl.includes('owasp.org/projects/') && !currentUrl.includes('www-project')) {
    // We're on the main projects page
    console.log('Detected main projects page');
    return extractFromProjectsPage();
  } else if (currentUrl.includes('www-project')) {
    // We're on an individual project page
    console.log('Detected individual project page');
    return extractFromProjectPage();
  } else {
    console.log('Unknown page type. Please run this script on:');
    console.log('1. https://owasp.org/projects/ - to extract project list');
    console.log('2. Individual project pages (www-project URLs) - to extract detailed info');
  }
}

// Available functions
window.owaspExtractor = {
  main,
  extractFromProjectsPage,
  extractFromProjectPage,
  generateBulkSQL,
  createSlug,
  escapeSql,
  formatArray
};

// Auto-run main function
console.log('=== OWASP Projects Enhanced Extractor ===');
console.log('Available functions: window.owaspExtractor');
console.log('Running auto-detection...');
main();