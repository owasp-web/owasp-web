/**
 * Complete OWASP Projects Extractor
 * 
 * This script extracts ALL projects from the OWASP projects page:
 * - Flagship Projects (15 major projects)
 * - Production Projects (9 current projects) 
 * - Other Projects (Lab/Incubator)
 * - Application Security Wayfinder links
 * 
 * Run this on https://owasp.org/projects/
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

// Function to extract ALL projects from the page
function extractAllProjects() {
  console.log('=== EXTRACTING ALL OWASP PROJECTS ===');
  
  const allProjects = [];

  // 1. Extract Flagship Projects
  console.log('Looking for Flagship Projects...');
  const flagshipProjects = [
    'OWASP Amass',
    'OWASP Application Security Verification Standard (ASVS)', 
    'OWASP Cheat Sheet Series',
    'OWASP CycloneDX (ECMA-424)',
    'OWASP Defectdojo',
    'OWASP Dependency-Check',
    'OWASP Dependency-Track', 
    'OWASP Juice Shop',
    'OWASP Mobile Application Security',
    'OWASP CRS',
    'OWASP OWTF',
    'OWASP SAMM',
    'OWASP Security Shepherd',
    'OWASP Top Ten',
    'OWASP Web Security Testing Guide'
  ];

  flagshipProjects.forEach(title => {
    const slug = createSlug(title);
    allProjects.push({
      title,
      slug,
      project_type: 'flagship',
      status: 'active',
      is_featured: true,
      category: getCategoryFromTitle(title)
    });
  });

  // 2. Extract Production Projects (we already got these)
  const productionLinks = document.querySelectorAll('a[href*="www-project"]');
  productionLinks.forEach(link => {
    const title = link.textContent.trim();
    if (title && !flagshipProjects.includes(title)) {
      const slug = createSlug(title);
      allProjects.push({
        title,
        slug,
        project_url: link.href,
        project_type: 'production',
        status: 'active',
        is_featured: false,
        category: getCategoryFromTitle(title)
      });
    }
  });

  // 3. Extract Application Security Wayfinder Projects
  console.log('Extracting Wayfinder projects...');
  const wayfinderProjects = extractWayfinderProjects();
  allProjects.push(...wayfinderProjects);

  // 4. Extract from the long lists (Code Projects, Documentation Projects, etc.)
  console.log('Extracting from project lists...');
  const listProjects = extractFromProjectLists();
  allProjects.push(...listProjects);

  console.log(`Total projects found: ${allProjects.length}`);
  
  // Remove duplicates based on slug
  const uniqueProjects = allProjects.filter((project, index, self) => 
    index === self.findIndex(p => p.slug === project.slug)
  );
  
  console.log(`Unique projects: ${uniqueProjects.length}`);
  
  // Store in localStorage
  localStorage.setItem('owaspAllProjects', JSON.stringify(uniqueProjects));
  
  return uniqueProjects;
}

// Helper function to determine category from title
function getCategoryFromTitle(title) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('standard') || lowerTitle.includes('verification') || 
      lowerTitle.includes('asvs') || lowerTitle.includes('top') || 
      lowerTitle.includes('samm')) {
    return 'Standards';
  } else if (lowerTitle.includes('guide') || lowerTitle.includes('cheat sheet') || 
             lowerTitle.includes('documentation') || lowerTitle.includes('testing')) {
    return 'Documentation';
  } else if (lowerTitle.includes('framework') || lowerTitle.includes('model') ||
             lowerTitle.includes('cyclone') || lowerTitle.includes('crs')) {
    return 'Framework';
  } else if (lowerTitle.includes('training') || lowerTitle.includes('education') || 
             lowerTitle.includes('shepherd') || lowerTitle.includes('juice shop')) {
    return 'Training';
  } else {
    return 'Tool';
  }
}

// Extract projects from the Application Security Wayfinder diagram
function extractWayfinderProjects() {
  console.log('Extracting from Application Security Wayfinder...');
  
  const wayfinderProjects = [];
  
  // Look for the wayfinder section
  const wayfinderSection = Array.from(document.querySelectorAll('*')).find(el => 
    el.textContent && el.textContent.includes('Application Security Wayfinder')
  );
  
  if (wayfinderSection) {
    // Find all links in the wayfinder area
    const wayfinderContainer = wayfinderSection.closest('section') || wayfinderSection.parentElement;
    const wayfinderLinks = wayfinderContainer.querySelectorAll('a');
    
    wayfinderLinks.forEach(link => {
      const text = link.textContent.trim();
      if (text && text.length > 2 && !text.includes('http')) {
        const title = text.startsWith('OWASP') ? text : `OWASP ${text}`;
        const slug = createSlug(title);
        
        wayfinderProjects.push({
          title,
          slug,
          project_url: link.href,
          project_type: 'other',
          status: 'active',
          is_featured: false,
          category: getCategoryFromTitle(title),
          source: 'wayfinder'
        });
      }
    });
  }
  
  console.log(`Found ${wayfinderProjects.length} wayfinder projects`);
  return wayfinderProjects;
}

// Extract projects from the text lists (Code Projects, Documentation Projects, etc.)
function extractFromProjectLists() {
  console.log('Extracting from project lists...');
  
  const listProjects = [];
  
  // Find sections like "Code Projects", "Documentation Projects", etc.
  const projectSections = ['Code Projects', 'Documentation Projects', 'Other Projects'];
  
  projectSections.forEach(sectionName => {
    const sectionHeading = Array.from(document.querySelectorAll('h2, h3')).find(h => 
      h.textContent.includes(sectionName)
    );
    
    if (sectionHeading) {
      // Find the list after this heading
      let currentElement = sectionHeading.nextElementSibling;
      
      while (currentElement && !currentElement.matches('h2, h3')) {
        // Look for list items or links
        const projectNames = currentElement.querySelectorAll('li, a');
        
        projectNames.forEach(item => {
          const text = item.textContent.trim();
          if (text && text.startsWith('OWASP') && text.length < 100) {
            const title = text;
            const slug = createSlug(title);
            
            listProjects.push({
              title,
              slug,
              project_type: sectionName.includes('Code') ? 'production' : 'other',
              status: 'active',
              is_featured: false,
              category: sectionName.includes('Documentation') ? 'Documentation' : 'Tool',
              source: sectionName.toLowerCase().replace(' ', '_')
            });
          }
        });
        
        currentElement = currentElement.nextElementSibling;
      }
    }
  });
  
  console.log(`Found ${listProjects.length} projects from lists`);
  return listProjects;
}

// Generate SQL for all projects
function generateAllProjectsSQL() {
  const storedProjects = localStorage.getItem('owaspAllProjects');
  if (!storedProjects) {
    console.log('No projects found. Run extractAllProjects() first.');
    return;
  }
  
  const projects = JSON.parse(storedProjects);
  
  const statements = projects.map(project => {
    return `INSERT INTO projects (
      title, slug, description, website_url, project_url, category, 
      project_type, status, is_featured
    ) VALUES (
      ${escapeSql(project.title)},
      ${escapeSql(project.slug)},
      ${escapeSql(project.description || '')},
      ${escapeSql(project.website_url || project.project_url || '')},
      ${escapeSql(project.project_url || '')},
      ${escapeSql(project.category)},
      ${escapeSql(project.project_type)},
      'active',
      ${project.is_featured}
    ) ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      category = EXCLUDED.category,
      project_type = EXCLUDED.project_type,
      is_featured = EXCLUDED.is_featured,
      updated_at = NOW();`;
  });
  
  console.log('=== ALL PROJECTS SQL STATEMENTS ===');
  console.log(`-- Total projects: ${projects.length}`);
  console.log(statements.join('\n\n'));
  
  return statements;
}

// Extract Wayfinder diagram structure for recreation
function extractWayfinderDiagram() {
  console.log('=== EXTRACTING WAYFINDER DIAGRAM STRUCTURE ===');
  
  const wayfinderData = {
    title: 'Application Security Wayfinder',
    description: 'OWASP Projects aligned with Software Development Life Cycle phases',
    sections: [],
    links: []
  };
  
  // Find wayfinder section
  const wayfinderSection = Array.from(document.querySelectorAll('*')).find(el => 
    el.textContent && el.textContent.includes('Application Security Wayfinder')
  );
  
  if (wayfinderSection) {
    const container = wayfinderSection.closest('section') || wayfinderSection.parentElement;
    
    // Extract all clickable elements and their positions
    const clickableElements = container.querySelectorAll('a, button, [onclick]');
    
    clickableElements.forEach((element, index) => {
      const text = element.textContent.trim();
      const href = element.href || '';
      const rect = element.getBoundingClientRect();
      
      if (text && text.length > 1) {
        wayfinderData.links.push({
          id: index,
          text: text,
          href: href,
          project_slug: createSlug(text.startsWith('OWASP') ? text : `OWASP ${text}`),
          position: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        });
      }
    });
    
    // Try to extract the SVG or image structure
    const svg = container.querySelector('svg');
    const img = container.querySelector('img');
    
    if (svg) {
      wayfinderData.diagram_type = 'svg';
      wayfinderData.diagram_content = svg.outerHTML;
    } else if (img) {
      wayfinderData.diagram_type = 'image';
      wayfinderData.diagram_src = img.src;
    }
  }
  
  console.log('Wayfinder diagram data:', wayfinderData);
  localStorage.setItem('owaspWayfinderDiagram', JSON.stringify(wayfinderData));
  
  return wayfinderData;
}

// Main execution
window.owaspCompleteExtractor = {
  extractAllProjects,
  generateAllProjectsSQL,
  extractWayfinderDiagram,
  createSlug,
  escapeSql
};

// Auto-run
console.log('=== OWASP Complete Projects Extractor ===');
console.log('Available functions: window.owaspCompleteExtractor');
console.log('Starting complete extraction...');

const projects = extractAllProjects();
console.log(`\n✅ Extracted ${projects.length} total projects`);
console.log('📊 Project breakdown by type:');
console.log('- Flagship:', projects.filter(p => p.project_type === 'flagship').length);
console.log('- Production:', projects.filter(p => p.project_type === 'production').length); 
console.log('- Other:', projects.filter(p => p.project_type === 'other').length);

console.log('\n🎯 Next steps:');
console.log('1. Run: window.owaspCompleteExtractor.generateAllProjectsSQL()');
console.log('2. Run: window.owaspCompleteExtractor.extractWayfinderDiagram()');
console.log('3. Copy SQL to your Supabase dashboard');