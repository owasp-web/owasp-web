const cheerio = require('cheerio');

/**
 * Parse sidebar content from OWASP chapter pages
 */
function parseSidebarContent(html) {
  const $ = cheerio.load(html);
  
  const sidebar = {
    leadership_team: [],
    volunteers: [],
    contact_email: null,
    meetup_url: null,
    linkedin_url: null,
    twitter_url: null,
    facebook_url: null,
    youtube_url: null,
    slack_url: null,
    additional_links: []
  };
  
  // Look for sidebar elements - common selectors
  const sidebarSelectors = [
    '.sidebar',
    '#sidebar', 
    '.right-sidebar',
    '.chapter-sidebar',
    '.info-sidebar',
    'aside',
    '.col-md-3', // Bootstrap sidebar
    '.col-lg-3'
  ];
  
  let sidebarElement = null;
  for (const selector of sidebarSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      sidebarElement = element;
      break;
    }
  }
  
  if (!sidebarElement || sidebarElement.length === 0) {
    console.log('   ⚠️  No sidebar found, trying to parse from main content');
    sidebarElement = $('body'); // Fallback to entire page
  }
  
  // Parse leadership section
  parseLeadershipSection(sidebarElement, $, sidebar);
  
  // Parse volunteers section
  parseVolunteersSection(sidebarElement, $, sidebar);
  
  // Parse social links
  parseSocialLinks(sidebarElement, $, sidebar);
  
  // Parse additional information
  parseAdditionalInfo(sidebarElement, $, sidebar);
  
  return sidebar;
}

/**
 * Parse leadership team from sidebar
 */
function parseLeadershipSection(element, $, sidebar) {
  const leadershipKeywords = ['leadership', 'leaders', 'board', 'team', 'organizers'];
  
  for (const keyword of leadershipKeywords) {
    const section = element.find(`*:contains("${keyword}")`).filter(function() {
      return $(this).text().toLowerCase().includes(keyword.toLowerCase());
    }).first();
    
    if (section.length > 0) {
      console.log(`   👥 Found leadership section: ${keyword}`);
      
      // Look for names in the same section or nearby
      const names = [];
      
      // Try different patterns for names
      section.find('li, p, div').each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 2 && text.length < 100) {
          // Skip if it contains common non-name words
          if (!text.toLowerCase().includes('leadership') && 
              !text.toLowerCase().includes('team') &&
              !text.toLowerCase().includes('board') &&
              !text.toLowerCase().includes('chapter') &&
              !text.toLowerCase().includes('owasp')) {
            names.push(text);
          }
        }
      });
      
      // Also look for linked names
      section.find('a').each((i, el) => {
        const linkText = $(el).text().trim();
        const href = $(el).attr('href');
        if (linkText && linkText.length > 2 && linkText.length < 100) {
          names.push(linkText);
        }
      });
      
      // Clean up names and add to leadership team
      names.forEach(name => {
        const cleanName = name.replace(/^\d+\.\s*/, '').trim(); // Remove numbering
        if (cleanName && cleanName.length > 2) {
          sidebar.leadership_team.push({
            name: cleanName,
            role: null, // Could be enhanced to detect roles
            email: null,
            image: null
          });
        }
      });
      
      break; // Found leadership section, stop looking
    }
  }
}

/**
 * Parse volunteers section
 */
function parseVolunteersSection(element, $, sidebar) {
  const volunteerKeywords = ['volunteers', 'volunteer', 'helpers', 'contributors'];
  
  for (const keyword of volunteerKeywords) {
    const section = element.find(`*:contains("${keyword}")`).filter(function() {
      return $(this).text().toLowerCase().includes(keyword.toLowerCase());
    }).first();
    
    if (section.length > 0) {
      console.log(`   🤝 Found volunteers section: ${keyword}`);
      
      const volunteers = [];
      
      // Look for volunteer names
      section.find('li, p, div').each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 2 && text.length < 100) {
          // Skip if it contains section headers
          if (!text.toLowerCase().includes('volunteer') && 
              !text.toLowerCase().includes('helper') &&
              !text.toLowerCase().includes('contributor')) {
            volunteers.push(text);
          }
        }
      });
      
      // Clean up and add volunteers
      volunteers.forEach(volunteer => {
        const cleanName = volunteer.replace(/^\d+\.\s*/, '').trim();
        if (cleanName && cleanName.length > 2) {
          sidebar.volunteers.push(cleanName);
        }
      });
      
      break;
    }
  }
}

/**
 * Parse social links from sidebar
 */
function parseSocialLinks(element, $, sidebar) {
  // Look for all links in sidebar
  element.find('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    const textLower = text.toLowerCase();
    
    if (!href) return;
    
    // Skip "Official Chapter Page" button
    if (text === 'Official Chapter Page') {
      console.log('   🚫 Skipping "Official Chapter Page" button');
      return;
    }
    
    // Email
    if (href.startsWith('mailto:')) {
      sidebar.contact_email = href.replace('mailto:', '');
      console.log(`   📧 Found contact email: ${sidebar.contact_email}`);
    }
    
    // Meetup
    else if (href.includes('meetup.com') || textLower.includes('meetup')) {
      sidebar.meetup_url = href;
      console.log(`   📅 Found Meetup URL: ${href}`);
    }
    
    // LinkedIn
    else if (href.includes('linkedin.com') || textLower.includes('linkedin')) {
      sidebar.linkedin_url = href;
      console.log(`   💼 Found LinkedIn URL: ${href}`);
    }
    
    // Twitter/X
    else if (href.includes('twitter.com') || href.includes('x.com') || textLower.includes('twitter')) {
      sidebar.twitter_url = href;
      console.log(`   🐦 Found Twitter URL: ${href}`);
    }
    
    // Facebook
    else if (href.includes('facebook.com') || textLower.includes('facebook')) {
      sidebar.facebook_url = href;
      console.log(`   📘 Found Facebook URL: ${href}`);
    }
    
    // YouTube
    else if (href.includes('youtube.com') || textLower.includes('youtube')) {
      sidebar.youtube_url = href;
      console.log(`   📺 Found YouTube URL: ${href}`);
    }
    
    // Slack
    else if (href.includes('slack.com') || textLower.includes('slack')) {
      sidebar.slack_url = href;
      console.log(`   💬 Found Slack URL: ${href}`);
    }
    
    // Other relevant links
    else if (href.startsWith('http') && (
      text.includes('join') || 
      text.includes('member') || 
      text.includes('sponsor') ||
      text.includes('contact') ||
      text.includes('mailing list') ||
      text.includes('group')
    )) {
      sidebar.additional_links.push({
        title: $(el).text().trim(),
        url: href
      });
    }
  });
}

/**
 * Parse additional information from sidebar
 */
function parseAdditionalInfo(element, $, sidebar) {
  // Look for information sections
  const infoKeywords = ['information', 'info', 'contact', 'support', 'community'];
  
  for (const keyword of infoKeywords) {
    const section = element.find(`*:contains("${keyword}")`).filter(function() {
      return $(this).text().toLowerCase().includes(keyword.toLowerCase());
    }).first();
    
    if (section.length > 0) {
      console.log(`   ℹ️  Found info section: ${keyword}`);
      
      // Look for additional links in this section
      section.find('a[href]').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        
        if (href && href.startsWith('http') && text) {
          // Skip if already captured as social link
          if (!href.includes('meetup.com') && 
              !href.includes('linkedin.com') && 
              !href.includes('twitter.com') && 
              !href.includes('facebook.com') && 
              !href.includes('youtube.com') && 
              !href.includes('slack.com')) {
            
            sidebar.additional_links.push({
              title: text,
              url: href
            });
          }
        }
      });
      
      break;
    }
  }
}

/**
 * Clean and validate parsed sidebar data
 */
function cleanSidebarData(sidebar) {
  // Remove duplicates from leadership team
  const uniqueLeadership = [];
  const seenNames = new Set();
  
  sidebar.leadership_team.forEach(leader => {
    if (leader.name && !seenNames.has(leader.name.toLowerCase())) {
      seenNames.add(leader.name.toLowerCase());
      uniqueLeadership.push(leader);
    }
  });
  sidebar.leadership_team = uniqueLeadership;
  
  // Remove duplicates from volunteers
  sidebar.volunteers = [...new Set(sidebar.volunteers)];
  
  // Remove duplicates from additional links
  const uniqueLinks = [];
  const seenUrls = new Set();
  
  sidebar.additional_links.forEach(link => {
    if (link.url && !seenUrls.has(link.url)) {
      seenUrls.add(link.url);
      uniqueLinks.push(link);
    }
  });
  sidebar.additional_links = uniqueLinks;
  
  // Log summary
  console.log(`   📊 Sidebar parsing summary:`);
  console.log(`      Leadership: ${sidebar.leadership_team.length} members`);
  console.log(`      Volunteers: ${sidebar.volunteers.length} members`);
  console.log(`      Social links: ${Object.values(sidebar).filter(v => v && typeof v === 'string' && v.startsWith('http')).length} found`);
  console.log(`      Additional links: ${sidebar.additional_links.length} found`);
  
  return sidebar;
}

module.exports = {
  parseSidebarContent,
  cleanSidebarData
};
