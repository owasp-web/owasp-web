const axios = require('axios');
const cheerio = require('cheerio');
const { scrapeChapterTabsWithPuppeteer } = require('./scrape-chapter-tabs-puppeteer');

/**
 * Download image and upload to Supabase storage
 */
async function downloadAndUploadImage(imageUrl, chapterId, imageName, supabase) {
  try {
    // Download image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    
    // Determine file extension
    const contentType = response.headers['content-type'] || 'image/jpeg';
    const ext = contentType.split('/')[1] || 'jpg';
    const filename = `${imageName.replace(/[^a-z0-9]/gi, '-')}.${ext}`;
    const storagePath = `chapters/${chapterId}/images/${filename}`;
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('public-assets')
      .upload(storagePath, buffer, {
        contentType,
        upsert: true
      });
    
    if (error) {
      console.error(`❌ Failed to upload ${filename}:`, error.message);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('public-assets')
      .getPublicUrl(storagePath);
    
    return publicUrl;
  } catch (error) {
    console.error(`❌ Error downloading/uploading image:`, error.message);
    return null;
  }
}

/**
 * Scrape content from a chapter's OWASP page using Puppeteer for proper tab detection
 */
async function scrapeChapterContent(chapterId, chapterUrl, chapterName, supabase) {
  console.log(`\n📄 Scraping content for: ${chapterName}`);
  console.log(`   URL: ${chapterUrl}`);
  
  try {
    // Use Puppeteer-based scraper for proper tab detection
    const result = await scrapeChapterTabsWithPuppeteer(chapterId, chapterUrl, chapterName, supabase);
    
    if (!result) {
      console.log(`   ⚠️  Puppeteer scraping failed, falling back to basic scraping`);
      return await scrapeChapterContentBasic(chapterId, chapterUrl, chapterName, supabase);
    }
    
    // Extract sidebar data
    const sidebar = result.sidebar || {};
    
    return {
      tabs: result.tabs || [],
      contact_email: sidebar.contact_email || null,
      meetup_url: sidebar.meetup_url || null,
      linkedin_url: sidebar.linkedin_url || null,
      twitter_url: sidebar.twitter_url || null,
      facebook_url: sidebar.facebook_url || null,
      youtube_url: sidebar.youtube_url || null,
      leadership_team: sidebar.leadership_team || [],
      volunteers: sidebar.volunteers || []
    };
    
  } catch (error) {
    console.error(`   ❌ Error scraping content:`, error.message);
    console.log(`   🔄 Falling back to basic scraping...`);
    return await scrapeChapterContentBasic(chapterId, chapterUrl, chapterName, supabase);
  }
}

/**
 * Fallback basic scraping method (original implementation)
 */
async function scrapeChapterContentBasic(chapterId, chapterUrl, chapterName, supabase) {
  try {
    const response = await axios.get(chapterUrl);
    const $ = cheerio.load(response.data);
    
    // Remove navigation, footer, and other non-content elements
    $('nav, header, footer, .navbar, .sidebar, #sidebar, .toc, #toc').remove();
    
    // Find main content area
    const mainContent = $('.main-content, main, #main, .content, #content, article').first();
    const contentArea = mainContent.length ? mainContent : $('body');
    
    // Extract tabs/sections
    const tabs = [];
    let tabOrder = 1;
    
    // Look for main sections (only h2 for major sections)
    const sections = [];
    const majorHeadings = contentArea.find('h2');
    
    // If no h2 headings, fall back to h3
    const headings = majorHeadings.length > 0 ? majorHeadings : contentArea.find('h3');
    
    headings.each((i, heading) => {
      const $heading = $(heading);
      const headingText = $heading.text().trim();
      
      if (!headingText || (headingText.toLowerCase().includes('owasp') && headingText.toLowerCase().includes('chapter'))) {
        return; // Skip generic OWASP chapter headings
      }
      
      // Get all content until next same-level heading
      const headingLevel = $heading.prop('tagName').toLowerCase();
      const content = [];
      let images = [];
      let links = [];
      let subsections = [];
      
      let $next = $heading.next();
      while ($next.length && !$next.is(headingLevel)) {
        const tagName = $next.prop('tagName')?.toLowerCase();
        
        // Check if it's a subsection heading (h3 when main is h2, or h4 when main is h3)
        if ((headingLevel === 'h2' && tagName === 'h3') || (headingLevel === 'h3' && tagName === 'h4')) {
          const subsectionTitle = $next.text().trim();
          if (subsectionTitle) {
            subsections.push(`## ${subsectionTitle}`);
          }
        } else if (tagName === 'p') {
          const text = $next.text().trim();
          if (text) content.push(text);
          
          // Extract links from paragraph
          $next.find('a').each((j, link) => {
            const href = $(link).attr('href');
            const linkText = $(link).text().trim();
            if (href && linkText && !href.startsWith('#')) {
              const fullUrl = href.startsWith('http') ? href : `https://owasp.org${href}`;
              links.push({ label: linkText, url: fullUrl });
            }
          });
        } else if (tagName === 'ul' || tagName === 'ol') {
          $next.find('li').each((j, li) => {
            const text = $(li).text().trim();
            if (text) content.push(`• ${text}`);
          });
        } else if (tagName === 'img') {
          const src = $next.attr('src');
          const alt = $next.attr('alt') || '';
          if (src) {
            const fullUrl = src.startsWith('http') ? src : (src.startsWith('/') ? `https://owasp.org${src}` : `https://owasp.org/${src}`);
            images.push({ url: fullUrl, alt });
          }
        }
        
        // Check for images within the element
        $next.find('img').each((j, img) => {
          const src = $(img).attr('src');
          const alt = $(img).attr('alt') || '';
          if (src) {
            const fullUrl = src.startsWith('http') ? src : (src.startsWith('/') ? `https://owasp.org${src}` : `https://owasp.org/${src}`);
            images.push({ url: fullUrl, alt });
          }
        });
        
        $next = $next.next();
      }
      
      if (content.length > 0 || images.length > 0 || links.length > 0) {
        // Combine subsections with content
        const finalContent = [...subsections, ...content];
        sections.push({
          title: headingText,
          content: finalContent,
          images,
          links
        });
      }
    });
    
    // If no clear sections found, try to get general content
    if (sections.length === 0) {
      const paragraphs = [];
      contentArea.find('p').each((i, p) => {
        const text = $(p).text().trim();
        if (text && text.length > 20) {
          paragraphs.push(text);
        }
      });
      
      if (paragraphs.length > 0) {
        sections.push({
          title: 'About',
          content: paragraphs,
          images: [],
          links: []
        });
      }
    }
    
    // Limit to max 10 tabs
    if (sections.length > 10) {
      console.log(`   ⚠️  Found ${sections.length} sections, limiting to 10 most content-rich sections`);
      sections.sort((a, b) => {
        const scoreA = a.content.length + (a.images.length * 2) + a.links.length;
        const scoreB = b.content.length + (b.images.length * 2) + b.links.length;
        return scoreB - scoreA;
      });
      sections.splice(10);
    }
    
    // Create tabs from sections
    for (const section of sections) {
      const tabSections = [];
      
      // Create main content section
      if (section.content.length > 0) {
        tabSections.push({
          title: section.title,
          content: section.content.join('\n\n'),
          imageUrl: null,
          imageAlt: null,
          imageCaption: null,
          imageSize: 'medium',
          videoUrl: null,
          buttons: section.links.slice(0, 3).map(link => ({
            label: link.label,
            url: link.url,
            style: 'link'
          }))
        });
      }
      
      // Add images as separate sections (skip for batch import to save time)
      // Images can be added manually later if needed
      
      if (tabSections.length > 0) {
        tabs.push({
          id: `tab-${Date.now()}-${tabOrder}`,
          name: section.title,
          order: tabOrder++,
          sections: tabSections
        });
      }
    }
    
    console.log(`   ✅ Extracted ${tabs.length} tabs with content`);
    
    // Extract contact info
    const contactEmail = contentArea.find('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '') || null;
    const meetupUrl = contentArea.find('a[href*="meetup.com"]').first().attr('href') || null;
    const linkedinUrl = contentArea.find('a[href*="linkedin.com"]').first().attr('href') || null;
    const twitterUrl = contentArea.find('a[href*="twitter.com"], a[href*="x.com"]').first().attr('href') || null;
    const facebookUrl = contentArea.find('a[href*="facebook.com"]').first().attr('href') || null;
    const youtubeUrl = contentArea.find('a[href*="youtube.com"]').first().attr('href') || null;
    
    return {
      tabs,
      contact_email: contactEmail,
      meetup_url: meetupUrl,
      linkedin_url: linkedinUrl,
      twitter_url: twitterUrl,
      facebook_url: facebookUrl,
      youtube_url: youtubeUrl,
      leadership_team: [],
      volunteers: []
    };
    
  } catch (error) {
    console.error(`   ❌ Error in basic scraping:`, error.message);
    return null;
  }
}

/**
 * Update chapter with scraped content
 */
async function updateChapterContent(chapterId, content, supabase) {
  try {
    const updateData = {
      tabs: content.tabs,
      contact_email: content.contact_email,
      meetup_url: content.meetup_url,
      linkedin_url: content.linkedin_url,
      twitter_url: content.twitter_url,
      facebook_url: content.facebook_url,
      youtube_url: content.youtube_url,
      updated_at: new Date().toISOString()
    };
    
    // Add leadership team if available
    if (content.leadership_team && content.leadership_team.length > 0) {
      updateData.leadership_team = content.leadership_team;
    }
    
    // Add volunteers if available (check if column exists)
    if (content.volunteers && content.volunteers.length > 0) {
      try {
        updateData.volunteers = content.volunteers;
      } catch (error) {
        console.log(`   ⚠️  Volunteers field not available in schema, skipping`);
      }
    }
    
    const { error } = await supabase
      .from('chapters')
      .update(updateData)
      .eq('id', chapterId);
    
    if (error) {
      console.error(`   ❌ Failed to update chapter:`, error.message);
      return false;
    }
    
    console.log(`   ✅ Updated chapter with content`);
    if (content.leadership_team && content.leadership_team.length > 0) {
      console.log(`   👥 Added ${content.leadership_team.length} leadership team members`);
    }
    if (content.volunteers && content.volunteers.length > 0) {
      console.log(`   🤝 Added ${content.volunteers.length} volunteers`);
    }
    return true;
  } catch (error) {
    console.error(`   ❌ Error updating chapter:`, error.message);
    return false;
  }
}

module.exports = {
  downloadAndUploadImage,
  scrapeChapterContent,
  updateChapterContent
};
