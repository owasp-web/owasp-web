const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { parseSidebarContent, cleanSidebarData } = require('./sidebar-parser');
const { migrateContentImages } = require('./image-migration-helper');

/**
 * Migrate a single image (helper function)
 */
async function migrateImage(imageUrl, chapterId, filename, supabase) {
  try {
    const { migrateImage: migrateImageHelper } = require('./image-migration-helper');
    return await migrateImageHelper(imageUrl, chapterId, filename, supabase);
  } catch (error) {
    console.error(`   ❌ Image migration error: ${error.message}`);
    return imageUrl; // Return original URL on error
  }
}

/**
 * Scrape chapter content using Puppeteer to handle JavaScript-rendered tabs
 */
async function scrapeChapterTabsWithPuppeteer(chapterId, chapterUrl, chapterName, supabase) {
  console.log(`\n📄 Scraping content with Puppeteer for: ${chapterName}`);
  console.log(`   URL: ${chapterUrl}`);
  
  let browser = null;
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Navigate to page
    console.log(`   🌐 Loading page...`);
    await page.goto(chapterUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a bit for any dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get the full HTML after JavaScript execution
    const html = await page.content();
    
    // Parse sidebar content first
    console.log(`   🔍 Parsing sidebar content...`);
    const sidebar = parseSidebarContent(html);
    const cleanedSidebar = cleanSidebarData(sidebar);
    
    // Detect and extract tabs
    console.log(`   🔍 Detecting navigation tabs...`);
    const tabs = await detectAndExtractTabs(page, chapterId, supabase);
    
    return {
      tabs,
      sidebar: cleanedSidebar
    };
    
  } catch (error) {
    console.error(`   ❌ Error scraping content:`, error.message);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Detect navigation tabs and extract content for each
 */
async function detectAndExtractTabs(page, chapterId, supabase) {
  const tabs = [];
  
  try {
    // Look for chapter-specific tab patterns (not global navigation)
    const chapterSelectors = [
      // Chapter-specific tab navigation patterns - prioritize these
      'a[href*="#div-main"]',
      'a[href*="#div-meetings"]',
      'a[href*="#div-archive"]',
      'a[href*="#div-sponsors"]'
    ];
    
    let tabElements = [];
    
    // Try chapter-specific selectors first
    for (const selector of chapterSelectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        tabElements = tabElements.concat(elements);
        console.log(`   📋 Found ${elements.length} tab elements with selector: ${selector}`);
      }
    }
    
    console.log(`   📋 Total chapter tab elements found: ${tabElements.length}`);
    
    // If no specific tab elements found, look for navigation patterns
    if (tabElements.length === 0) {
      console.log(`   🔍 No specific tab elements found, looking for navigation patterns...`);
      
      // Look for text patterns that might be tabs (chapter-specific)
      const tabTexts = await page.evaluate(() => {
        const possibleTabs = [];
        const elements = document.querySelectorAll('a, button, span, div');
        
        elements.forEach(el => {
          const text = el.textContent?.trim();
          const lowerText = text?.toLowerCase();
          
          // Skip global navigation elements
          if (el.closest('nav.global-nav') || 
              el.closest('.global-nav') || 
              el.closest('header') ||
              el.closest('.navbar') ||
              el.closest('.main-nav')) {
            return;
          }
          
          // Skip elements that are clearly not chapter tabs
          if (lowerText && (
            lowerText.includes('africa') ||
            lowerText.includes('asia') ||
            lowerText.includes('europe') ||
            lowerText.includes('america') ||
            lowerText.includes('oceania') ||
            lowerText.includes('projects') ||
            lowerText.includes('events') ||
            lowerText.includes('about')
          )) {
            return;
          }
          
          // Look for exact matches first
          if (text && (
            text === 'Main' || 
            text === 'Chapter Meetings' || 
            text === 'Archived meetings' || 
            text === 'Chapter sponsors' ||
            text === 'Chapter Meetings' ||
            text === 'Archived meetings' ||
            text === 'Chapter sponsors'
          )) {
            possibleTabs.push({
              element: el.outerHTML,
              text: text,
              tagName: el.tagName,
              href: el.href || null
            });
          }
          // Then look for partial matches that are likely chapter tabs
          else if (text && (
            (lowerText === 'main' && el.tagName === 'A') ||
            (lowerText.includes('chapter meetings') && el.tagName === 'A') ||
            (lowerText.includes('archived meetings') && el.tagName === 'A') ||
            (lowerText.includes('chapter sponsors') && el.tagName === 'A')
          )) {
            possibleTabs.push({
              element: el.outerHTML,
              text: text,
              tagName: el.tagName,
              href: el.href || null
            });
          }
        });
        
        return possibleTabs;
      });
      
      console.log(`   📋 Found ${tabTexts.length} potential tab elements by text`);
      
      if (tabTexts.length > 0) {
        // Try to click on these elements
        for (let i = 0; i < Math.min(tabTexts.length, 4); i++) {
          const tabText = tabTexts[i];
          console.log(`   🖱️  Attempting to click tab: ${tabText.text}`);
          
          try {
            // Try to find and click the element
            const clicked = await page.evaluate((index) => {
              const elements = document.querySelectorAll('a, button, span, div');
              let clickedElement = null;
              
              elements.forEach(el => {
                const text = el.textContent?.trim().toLowerCase();
                if (text && (
                  text === 'main' || 
                  text === 'chapter meetings' || 
                  text === 'archived meetings' || 
                  text === 'chapter sponsors'
                )) {
                  if (el.click) {
                    el.click();
                    clickedElement = el;
                  }
                }
              });
              
              return clickedElement ? clickedElement.textContent : null;
            }, i);
            
            if (clicked) {
              console.log(`   ✅ Clicked tab: ${clicked}`);
              
              // Wait for content to load
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Extract content for this tab
              const tabContent = await extractTabContent(page, clicked, chapterId, supabase);
              if (tabContent) {
                tabs.push(tabContent);
              }
            }
          } catch (error) {
            console.log(`   ⚠️  Could not click tab ${tabText.text}: ${error.message}`);
          }
        }
      }
    } else {
    // Process found tab elements - only process chapter-specific tabs
    console.log(`   🔍 Processing ${tabElements.length} chapter tab elements...`);
    
    // Get all tab information first to avoid re-querying
    const allTabInfo = await page.evaluate(() => {
      const elements = document.querySelectorAll('a[href*="#div-main"], a[href*="#div-meetings"], a[href*="#div-archive"], a[href*="#div-sponsors"]');
      return Array.from(elements).map(el => ({
        text: el.textContent?.trim(),
        href: el.href,
        tagName: el.tagName
      }));
    });
    
    console.log(`   📋 Found ${allTabInfo.length} tab elements in DOM`);
    
    // Create a map to track unique tabs by their href
    const uniqueTabs = new Map();
    
    for (let i = 0; i < allTabInfo.length; i++) {
      const tabInfo = allTabInfo[i];
      
      if (tabInfo && tabInfo.text && tabInfo.href) {
        // Only process chapter-specific tabs
        if (tabInfo.href?.includes('#div-main') ||
            tabInfo.href?.includes('#div-meetings') ||
            tabInfo.href?.includes('#div-archive') ||
            tabInfo.href?.includes('#div-sponsors')) {
          
          // Use href as key to avoid duplicates
          if (!uniqueTabs.has(tabInfo.href)) {
            uniqueTabs.set(tabInfo.href, tabInfo);
            console.log(`   🔍 Found unique chapter tab: "${tabInfo.text}" (href: ${tabInfo.href})`);
          }
        }
      }
    }
    
    console.log(`   📋 Processing ${uniqueTabs.size} unique chapter tabs...`);
    
    // Process each unique tab
    for (const [href, tabInfo] of uniqueTabs) {
      try {
        console.log(`   🖱️  Clicking tab: ${tabInfo.text}`);
        
        // Click the tab using a more robust method
        try {
          await page.evaluate((targetHref) => {
            const elements = document.querySelectorAll('a[href*="#div-main"], a[href*="#div-meetings"], a[href*="#div-archive"], a[href*="#div-sponsors"]');
            const element = Array.from(elements).find(el => el.href === targetHref);
            if (element) {
              element.click();
            }
          }, href);
          
          // Wait for content to load
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.log(`   ⚠️  Error clicking tab: ${error.message}`);
          continue;
        }
        
        // Normalize tab name for better organization
        let normalizedTabName = tabInfo.text;
        if (tabInfo.href?.includes('#div-main')) {
          normalizedTabName = 'Main';
        } else if (tabInfo.href?.includes('#div-meetings')) {
          normalizedTabName = 'Chapter Meetings';
        } else if (tabInfo.href?.includes('#div-archive')) {
          normalizedTabName = 'Archived meetings';
        } else if (tabInfo.href?.includes('#div-sponsors')) {
          normalizedTabName = 'Chapter sponsors';
        }
        
        // Extract content for this tab
        const tabContent = await extractTabContent(page, normalizedTabName, chapterId, supabase);
        if (tabContent) {
          tabs.push(tabContent);
        }
      } catch (error) {
        console.log(`   ⚠️  Error processing tab ${tabInfo.text}: ${error.message}`);
      }
    }
    }
    
    // If no tabs found, create a default "Main" tab with all content
    if (tabs.length === 0) {
      console.log(`   📄 No tabs detected, creating default "Main" tab with all content`);
      const mainTab = await extractTabContent(page, 'Main', chapterId, supabase);
      if (mainTab) {
        tabs.push(mainTab);
      }
    }
    
    // Sort tabs by order
    tabs.sort((a, b) => a.order - b.order);
    
    console.log(`   ✅ Extracted ${tabs.length} tabs with content`);
    return tabs;
    
  } catch (error) {
    console.error(`   ❌ Error detecting tabs:`, error.message);
    return [];
  }
}

/**
 * Extract content for a specific tab
 */
async function extractTabContent(page, tabName, chapterId, supabase) {
  try {
    // Get the current page content
    const content = await page.evaluate(() => {
      // Remove navigation, header, footer elements
      const elementsToRemove = document.querySelectorAll('nav, header, footer, .navbar, .sidebar, #sidebar, .toc, #toc, .cookie-banner, .cookie-consent');
      elementsToRemove.forEach(el => el.remove());
      
      // Get main content area
      const mainContent = document.querySelector('.main-content, main, #main, .content, #content, article, .chapter-content') || document.body;
      
      return mainContent.innerHTML;
    });
    
    // Parse content with Cheerio
    const $ = cheerio.load(content);
    
    // Extract sections from the content
    const sections = [];
    
    // Look for major headings (h1, h2, h3) and their content
    const headings = $('h1, h2, h3').filter(function() {
      const text = $(this).text().trim();
      return text && text.length > 0 && !text.toLowerCase().includes('owasp') && !text.toLowerCase().includes('chapter');
    });
    
    if (headings.length > 0) {
      headings.each(async (i, heading) => {
        const $heading = $(heading);
        const title = $heading.text().trim();
        
        if (!title) return;
        
        // Get content until next heading
        const content = [];
        const images = [];
        const links = [];
        
        let $next = $heading.next();
        while ($next.length && !$next.is('h1, h2, h3')) {
          const tagName = $next.prop('tagName')?.toLowerCase();
          
          if (tagName === 'p') {
            const text = $next.text().trim();
            if (text) content.push(text);
            
            // Extract links from paragraph
            $next.find('a').each((j, link) => {
              const href = $(link).attr('href');
              const linkText = $(link).text().trim();
              if (href && linkText && !href.startsWith('#')) {
                // Skip "Official Chapter Page" button - never link to old OWASP site
                if (linkText === 'Official Chapter Page') {
                  console.log(`   🚫 Skipping "Official Chapter Page" button in tab content`);
                  return;
                }
                const fullUrl = href.startsWith('http') ? href : `https://owasp.org${href}`;
                links.push({ label: linkText, url: fullUrl });
              }
            });
          } else if (tagName === 'ul' || tagName === 'ol') {
            $next.find('li').each((j, li) => {
              const text = $(li).text().trim();
              if (text) content.push(`• ${text}`);
              
              // Extract links from list items, but skip "Official Chapter Page"
              $(li).find('a').each((k, link) => {
                const href = $(link).attr('href');
                const linkText = $(link).text().trim();
                if (href && linkText && !href.startsWith('#')) {
                  // Skip "Official Chapter Page" button - never link to old OWASP site
                  if (linkText === 'Official Chapter Page') {
                    console.log(`   🚫 Skipping "Official Chapter Page" button in list item`);
                    return;
                  }
                  const fullUrl = href.startsWith('http') ? href : `https://owasp.org${href}`;
                  links.push({ label: linkText, url: fullUrl });
                }
              });
            });
          } else if (tagName === 'img') {
            // Skip images for now
            console.log(`   🖼️  Skipping image: ${$next.attr('src')}`);
          }
          
          $next = $next.next();
        }
        
        if (content.length > 0 || links.length > 0) {
          sections.push({
            title,
            content: content.join('\n\n'),
            imageUrl: null, // Ignore images for now
            imageAlt: null,
            imageCaption: null,
            imageSize: 'medium',
            videoUrl: null,
            buttons: links.slice(0, 5).map(link => ({
              label: link.label,
              url: link.url,
              style: 'link'
            }))
          });
        }
      });
    }
    
    // If no sections found, create a general content section
    if (sections.length === 0) {
      const paragraphs = [];
      $('p').each((i, p) => {
        const text = $(p).text().trim();
        if (text && text.length > 20) {
          paragraphs.push(text);
        }
      });
      
      if (paragraphs.length > 0) {
        sections.push({
          title: 'Content',
          content: paragraphs.join('\n\n'),
          imageUrl: null,
          imageAlt: null,
          imageCaption: null,
          imageSize: 'medium',
          videoUrl: null,
          buttons: []
        });
      }
    }
    
    if (sections.length > 0) {
      return {
        id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: tabName,
        order: getTabOrder(tabName),
        sections
      };
    }
    
    return null;
    
  } catch (error) {
    console.error(`   ❌ Error extracting tab content:`, error.message);
    return null;
  }
}

/**
 * Get tab order based on common tab names
 */
function getTabOrder(tabName) {
  const orderMap = {
    'main': 1,
    'home': 1,
    'overview': 1,
    'chapter meetings': 2,
    'meetings': 2,
    'archived meetings': 3,
    'archive': 3,
    'chapter sponsors': 4,
    'sponsors': 4,
    'supporters': 4
  };
  
  const lowerName = tabName.toLowerCase();
  for (const [key, order] of Object.entries(orderMap)) {
    if (lowerName.includes(key)) {
      return order;
    }
  }
  
  return 5; // Default order for unknown tabs
}

module.exports = {
  scrapeChapterTabsWithPuppeteer
};
