/**
 * OWASP Projects Import Script
 * 
 * This script helps import projects from the official OWASP projects list.
 * You can run this in your browser console on the OWASP projects page to extract data,
 * then format it for bulk import into Supabase.
 * 
 * Instructions:
 * 1. Go to https://owasp.org/projects/
 * 2. Open browser console (F12)
 * 3. Paste and run this script
 * 4. Copy the generated SQL statements
 * 5. Run them in your Supabase SQL editor
 */

// Helper function to create a slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/owasp\s+/gi, '') // Remove OWASP prefix
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
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

// Sample OWASP projects data based on the official projects page
const owaspProjects = [
  // Flagship Projects
  {
    title: "OWASP Top Ten",
    description: "The OWASP Top 10 is the reference standard for the most critical web application security risks.",
    category: "Standards",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/Top10",
    website_url: "https://owasp.org/www-project-top-ten/",
    documentation_url: "https://owasp.org/Top10/",
    tags: ["top-10", "web-security", "vulnerabilities", "awareness"],
    language: "Documentation",
    difficulty_level: "beginner",
    is_featured: true
  },
  {
    title: "OWASP Application Security Verification Standard (ASVS)",
    description: "The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls.",
    category: "Standards",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/ASVS",
    website_url: "https://owasp.org/www-project-application-security-verification-standard/",
    documentation_url: "https://github.com/OWASP/ASVS/tree/master/4.0",
    tags: ["verification", "standard", "security-testing", "web-application"],
    language: "Documentation",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP Juice Shop",
    description: "Probably the most modern and sophisticated insecure web application for security trainings, awareness demos and CTFs.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/bkimminich/juice-shop",
    website_url: "https://owasp-juice.shop",
    documentation_url: "https://pwning.owasp-juice.shop",
    tags: ["training", "vulnerable-app", "ctf", "education", "javascript"],
    language: "JavaScript",
    difficulty_level: "beginner",
    is_featured: true
  },
  {
    title: "OWASP Dependency-Check",
    description: "Software Composition Analysis (SCA) tool that identifies project dependencies and checks for known vulnerabilities.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/jeremylong/DependencyCheck",
    website_url: "https://owasp.org/www-project-dependency-check/",
    documentation_url: "https://jeremylong.github.io/DependencyCheck/",
    tags: ["sca", "vulnerability-scanning", "dependencies", "security", "java"],
    language: "Java",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP Dependency-Track",
    description: "Intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/DependencyTrack/dependency-track",
    website_url: "https://dependencytrack.org/",
    documentation_url: "https://docs.dependencytrack.org/",
    tags: ["sbom", "supply-chain", "vulnerability-management", "java"],
    language: "Java",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP ModSecurity Core Rule Set",
    description: "Generic attack detection rules for use with ModSecurity or compatible web application firewalls.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/coreruleset/coreruleset",
    website_url: "https://coreruleset.org/",
    documentation_url: "https://coreruleset.org/docs/",
    tags: ["waf", "web-application-firewall", "modsecurity", "security-rules"],
    language: "Configuration",
    difficulty_level: "advanced",
    is_featured: true
  },
  {
    title: "OWASP Amass",
    description: "In-depth attack surface mapping and asset discovery platform for security professionals.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/Amass",
    website_url: "https://github.com/OWASP/Amass",
    documentation_url: "https://github.com/OWASP/Amass/wiki",
    tags: ["asset-discovery", "reconnaissance", "osint", "go"],
    language: "Go",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP DefectDojo",
    description: "The leading open source application vulnerability management tool built for DevOps and continuous security integration.",
    category: "Tool",
    project_type: "flagship",
    github_url: "https://github.com/DefectDojo/django-DefectDojo",
    website_url: "https://defectdojo.org/",
    documentation_url: "https://defectdojo.github.io/django-DefectDojo/",
    tags: ["vulnerability-management", "devsecops", "python", "django"],
    language: "Python",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP Cheat Sheet Series",
    description: "The OWASP Cheat Sheet Series project provides a set of concise good practice guides for application developers and defenders.",
    category: "Documentation",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/CheatSheetSeries",
    website_url: "https://cheatsheetseries.owasp.org/",
    documentation_url: "https://cheatsheetseries.owasp.org/",
    tags: ["cheat-sheets", "best-practices", "guides", "security"],
    language: "Documentation",
    difficulty_level: "beginner",
    is_featured: true
  },
  {
    title: "OWASP Web Security Testing Guide",
    description: "The Web Security Testing Guide (WSTG) Project produces the premier cybersecurity testing resource for web application developers and security professionals.",
    category: "Documentation",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/wstg",
    website_url: "https://owasp.org/www-project-web-security-testing-guide/",
    documentation_url: "https://owasp.org/www-project-web-security-testing-guide/latest/",
    tags: ["testing", "web-security", "penetration-testing", "guide"],
    language: "Documentation",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP Mobile Application Security",
    description: "The OWASP Mobile Application Security (MAS) project consists of security and privacy standards for mobile apps.",
    category: "Standards",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/owasp-mas",
    website_url: "https://mas.owasp.org/",
    documentation_url: "https://mas.owasp.org/",
    tags: ["mobile-security", "android", "ios", "testing"],
    language: "Documentation",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP SAMM",
    description: "A Software Assurance Maturity Model (SAMM) that provides an effective and measurable way for organizations to analyze and improve their software security posture.",
    category: "Framework",
    project_type: "flagship",
    github_url: "https://github.com/owaspsamm/core",
    website_url: "https://owaspsamm.org/",
    documentation_url: "https://owaspsamm.org/model/",
    tags: ["maturity-model", "assessment", "governance", "framework"],
    language: "Documentation",
    difficulty_level: "intermediate",
    is_featured: true
  },
  {
    title: "OWASP Security Shepherd",
    description: "A web and mobile application security training platform designed to foster and improve security awareness.",
    category: "Training",
    project_type: "flagship",
    github_url: "https://github.com/OWASP/SecurityShepherd",
    website_url: "https://owasp.org/www-project-security-shepherd/",
    documentation_url: "https://github.com/OWASP/SecurityShepherd/wiki",
    tags: ["training", "education", "security-awareness", "java"],
    language: "Java",
    difficulty_level: "beginner",
    is_featured: true
  },
  {
    title: "OWASP CycloneDX",
    description: "OWASP CycloneDX is a full-stack Bill of Materials (BOM) standard that provides advanced supply chain capabilities.",
    category: "Standards",
    project_type: "flagship",
    github_url: "https://github.com/CycloneDX",
    website_url: "https://cyclonedx.org/",
    documentation_url: "https://cyclonedx.org/docs/",
    tags: ["sbom", "supply-chain", "standard", "security"],
    language: "Various",
    difficulty_level: "intermediate",
    is_featured: true
  },

  // Production Projects
  {
    title: "OWASP OWTF",
    description: "Offensive Web Testing Framework (OWTF), is an OWASP+PTES focused try to unite great tools and make pen testing more efficient.",
    category: "Tool",
    project_type: "production",
    github_url: "https://github.com/owtf/owtf",
    website_url: "https://owasp.org/www-project-owtf/",
    documentation_url: "https://docs.owtf.org/",
    tags: ["penetration-testing", "automation", "web-security", "python"],
    language: "Python",
    difficulty_level: "advanced",
    is_featured: false
  },
  {
    title: "OWASP ModSecurity",
    description: "ModSecurity is the standard open-source web application firewall (WAF) engine.",
    category: "Tool",
    project_type: "production",
    github_url: "https://github.com/SpiderLabs/ModSecurity",
    website_url: "https://modsecurity.org/",
    documentation_url: "https://github.com/SpiderLabs/ModSecurity/wiki",
    tags: ["waf", "web-application-firewall", "security", "c"],
    language: "C",
    difficulty_level: "advanced",
    is_featured: false
  },
  {
    title: "OWASP Coraza Web Application Firewall",
    description: "OWASP Coraza is a golang enterprise-grade WAF framework compatible with ModSecurity and OWASP Core Ruleset.",
    category: "Tool",
    project_type: "production",
    github_url: "https://github.com/corazawaf/coraza",
    website_url: "https://coraza.io/",
    documentation_url: "https://coraza.io/docs/",
    tags: ["waf", "golang", "security", "modsecurity"],
    language: "Go",
    difficulty_level: "advanced",
    is_featured: false
  },
  {
    title: "OWASP CSRFGuard",
    description: "OWASP CSRFGuard is a library that implements a variant of the synchronizer token pattern to mitigate CSRF attacks.",
    category: "Tool",
    project_type: "production",
    github_url: "https://github.com/aramrami/OWASP-CSRFGuard",
    website_url: "https://owasp.org/www-project-csrfguard/",
    documentation_url: "https://github.com/aramrami/OWASP-CSRFGuard/wiki",
    tags: ["csrf", "security", "java", "protection"],
    language: "Java",
    difficulty_level: "intermediate",
    is_featured: false
  },
  {
    title: "OWASP Bug Logging Tool",
    description: "OWASP BLT enables internet users to report issues, improving security with rewards for bug reporting.",
    category: "Tool",
    project_type: "production",
    github_url: "https://github.com/OWASP/BLT",
    website_url: "https://owasp.org/www-project-bug-logging-tool/",
    documentation_url: "https://github.com/OWASP/BLT/wiki",
    tags: ["bug-bounty", "reporting", "security", "django"],
    language: "Python",
    difficulty_level: "intermediate",
    is_featured: false
  }
];

// Generate SQL INSERT statements
function generateInsertStatements() {
  const statements = owaspProjects.map(project => {
    const slug = createSlug(project.title);
    
    return `INSERT INTO projects (
      title, slug, description, long_description, image, category, 
      project_type, github_url, website_url, documentation_url,
      tags, language, difficulty_level, is_featured, status
    ) VALUES (
      ${escapeSql(project.title)},
      ${escapeSql(slug)},
      ${escapeSql(project.description)},
      ${escapeSql(project.long_description || project.description)},
      ${escapeSql(project.image || `/images/icons/project-${slug}.png`)},
      ${escapeSql(project.category)},
      ${escapeSql(project.project_type)},
      ${escapeSql(project.github_url)},
      ${escapeSql(project.website_url)},
      ${escapeSql(project.documentation_url)},
      ${formatArray(project.tags)},
      ${escapeSql(project.language)},
      ${escapeSql(project.difficulty_level)},
      ${project.is_featured || false},
      'active'
    ) ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      github_url = EXCLUDED.github_url,
      website_url = EXCLUDED.website_url,
      documentation_url = EXCLUDED.documentation_url,
      tags = EXCLUDED.tags,
      updated_at = NOW();`;
  });
  
  return statements.join('\n\n');
}

// Output the SQL
console.log('=== OWASP Projects Import SQL ===');
console.log('Copy the following SQL statements and run them in your Supabase SQL editor:\n');
console.log(generateInsertStatements());
console.log('\n=== End of SQL ===');
console.log(`\nGenerated ${owaspProjects.length} project insert statements.`);

// Also output as JSON for manual import
console.log('\n=== JSON Format (for manual import) ===');
console.log(JSON.stringify(owaspProjects, null, 2));