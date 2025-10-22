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
    
    // Wait a bit for any dynamic content to load and set up console logging
    await page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`   📋 Browser: ${msg.text()}`);
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get the full HTML after JavaScript execution
    const html = await page.content();
    
    // Parse sidebar content first
    console.log(`   🔍 Parsing sidebar content...`);
    const sidebar = parseSidebarContent(html);
    const cleanedSidebar = cleanSidebarData(sidebar);
    
    // Get all tab content by mapping href attributes to content divs
    const tabContentDivs = await page.evaluate(() => {
      const found = [];
      
      
      // Comprehensive debugging of the page structure
      console.log('=== PAGE STRUCTURE DEBUG ===');
      
      // 1. Check for tab navigation structure
      const navElements = document.querySelectorAll('nav, .nav, .tabs, .tab-nav, [role="tablist"]');
      console.log(`Found ${navElements.length} navigation elements`);
      
      // 2. Check for tab links
      const tabLinks = document.querySelectorAll('a[role="tab"], .tab-link, a[href*="#"]');
      console.log(`Found ${tabLinks.length} tab links`);
      
      // 3. Check for content areas
      const contentAreas = document.querySelectorAll('div[id*="div"], div[class*="content"], div[class*="tab"], div[class*="panel"]');
      console.log(`Found ${contentAreas.length} potential content areas`);
      
      // 4. Log all elements with IDs containing "div"
      const divElements = Array.from(document.querySelectorAll('div[id*="div"]')).map(el => ({
        id: el.id,
        classes: el.className,
        visible: el.offsetParent !== null,
        textLength: el.textContent?.trim().length || 0
      }));
      console.log('Div elements with "div" in ID:', divElements);
      
      // 5. Log all elements with classes containing "tab" or "content"
      const tabContentElements = Array.from(document.querySelectorAll('div[class*="tab"], div[class*="content"]')).map(el => ({
        id: el.id,
        classes: el.className,
        visible: el.offsetParent !== null,
        textLength: el.textContent?.trim().length || 0
      }));
      console.log('Tab/Content elements:', tabContentElements);
      
      // 6. Look for tab navigation elements with href attributes pointing to content divs
      const tabElements = document.querySelectorAll('a[href^="#div-"], a[href^="#main"], a[href^="#futureevents"], a[href^="#pastevents"], a[href*="#div"], a[href*="div-"]');
      
      console.log(`   🔍 Found ${tabElements.length} tab elements with selectors`);
      
      // Also try a broader search
      const allTabElements = document.querySelectorAll('a[href*="#"]');
      console.log(`   🔍 Found ${allTabElements.length} total elements with href="#..."`);
      
      // Log all tab elements for debugging
      Array.from(allTabElements).forEach((el, i) => {
        const text = el.textContent?.trim();
        const href = el.getAttribute('href');
        if (text && href && (text.includes('Main') || text.includes('Chapter') || text.includes('Events'))) {
          console.log(`   🔍 Tab ${i}: "${text}" -> ${href}`);
        }
      });
      
      tabElements.forEach(el => {
        const text = el.textContent?.trim();
        const href = el.getAttribute('href');
        
        if (text && href && text.length < 100) {
          console.log(`   🔍 Processing tab: "${text}" -> ${href}`);
          // Map href to content div ID
          const contentDivId = href.replace('#', '');
          let contentDiv = document.getElementById(contentDivId);
          
          // If direct ID lookup fails, try alternative selectors
          if (!contentDiv) {
            // Try different variations of the ID
            const alternativeIds = [
              contentDivId,
              contentDivId.replace('div-', ''),
              contentDivId.replace('div-', 'div-'),
              contentDivId + '-content',
              contentDivId + '-panel'
            ];
            
            for (const altId of alternativeIds) {
              contentDiv = document.getElementById(altId);
              if (contentDiv) break;
            }
          }
          
          // If still no content div found, try to find by class or other attributes
          if (!contentDiv) {
            const possibleSelectors = [
              `div[class*="${contentDivId}"]`,
              `div[class*="${contentDivId.replace('div-', '')}"]`,
              `div[data-tab="${contentDivId}"]`,
              `div[aria-labelledby="${contentDivId}"]`
            ];
            
            for (const selector of possibleSelectors) {
              contentDiv = document.querySelector(selector);
              if (contentDiv) break;
            }
          }
          
          // If still no content div found, try common patterns for OWASP chapters
          if (!contentDiv) {
            const commonPatterns = [
              'div[id*="events"]',
              'div[id*="future"]',
              'div[id*="past"]',
              'div[id*="ch_events"]',
              'div[class*="events"]',
              'div[class*="future"]',
              'div[class*="past"]'
            ];
            
            for (const pattern of commonPatterns) {
              contentDiv = document.querySelector(pattern);
              if (contentDiv && contentDiv.textContent?.trim().length > 100) {
                console.log(`   ✅ Found content using pattern: ${pattern}`);
                break;
              }
            }
          }
          
          // Special handling for specific tab types
          if (!contentDiv) {
            if (text.toLowerCase().includes('events') || text.toLowerCase().includes('chapter events')) {
              // Look for events-related content
              const eventsDiv = document.querySelector('div[id*="ch_events"], div[id*="events"], div[class*="events"]');
              if (eventsDiv && eventsDiv.textContent?.trim().length > 100) {
                contentDiv = eventsDiv;
                console.log(`   ✅ Found events content for: ${text}`);
              }
            } else if (text.toLowerCase().includes('previous') || text.toLowerCase().includes('past')) {
              // Look for past events content
              const pastDiv = document.querySelector('div[id*="past"], div[class*="past"], div[id*="archive"]');
              if (pastDiv && pastDiv.textContent?.trim().length > 100) {
                contentDiv = pastDiv;
                console.log(`   ✅ Found past events content for: ${text}`);
              }
            }
          }
          
          // Final fallback: try to find any content div with substantial text
          if (!contentDiv) {
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
              const divText = div.textContent?.trim();
              if (divText && divText.length > 200) {
                // Check if this div contains content related to the tab
                const isRelevant = (
                  (text.toLowerCase().includes('events') && (divText.toLowerCase().includes('event') || divText.toLowerCase().includes('meeting'))) ||
                  (text.toLowerCase().includes('previous') && (divText.toLowerCase().includes('past') || divText.toLowerCase().includes('archive'))) ||
                  (text.toLowerCase().includes('main') && !divText.toLowerCase().includes('event'))
                );
                
                if (isRelevant) {
                  contentDiv = div;
                  console.log(`   ✅ Found relevant content for: ${text} (${div.id || 'no-id'})`);
                  break;
                }
              }
            }
          }
          
          // If still no content div found, try to find content based on original tab name patterns
          if (!contentDiv) {
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
              const divText = div.textContent?.trim();
              if (divText && divText.length > 200) {
                // Check if this div contains content related to the original tab name
                const isRelevant = (
                  (text.toLowerCase().includes('events') && (divText.toLowerCase().includes('event') || divText.toLowerCase().includes('meeting'))) ||
                  (text.toLowerCase().includes('meetings') && (divText.toLowerCase().includes('meeting') || divText.toLowerCase().includes('event'))) ||
                  (text.toLowerCase().includes('sponsor') && (divText.toLowerCase().includes('sponsor') || divText.toLowerCase().includes('support'))) ||
                  (text.toLowerCase().includes('member') && (divText.toLowerCase().includes('member') || divText.toLowerCase().includes('join'))) ||
                  (text.toLowerCase().includes('conduct') && (divText.toLowerCase().includes('conduct') || divText.toLowerCase().includes('code'))) ||
                  (text.toLowerCase().includes('leadership') && (divText.toLowerCase().includes('leadership') || divText.toLowerCase().includes('team'))) ||
                  (text.toLowerCase().includes('about') && (divText.toLowerCase().includes('about') || divText.toLowerCase().includes('mission'))) ||
                  (text.toLowerCase().includes('contact') && (divText.toLowerCase().includes('contact') || divText.toLowerCase().includes('reach'))) ||
                  (text.toLowerCase().includes('resource') && (divText.toLowerCase().includes('resource') || divText.toLowerCase().includes('material'))) ||
                  (text.toLowerCase().includes('news') && (divText.toLowerCase().includes('news') || divText.toLowerCase().includes('update'))) ||
                  (text.toLowerCase().includes('archive') && (divText.toLowerCase().includes('archive') || divText.toLowerCase().includes('past'))) ||
                  (text.toLowerCase().includes('previous') && (divText.toLowerCase().includes('previous') || divText.toLowerCase().includes('past'))) ||
                  (text.toLowerCase().includes('future') && (divText.toLowerCase().includes('future') || divText.toLowerCase().includes('upcoming')))
                );
                
                if (isRelevant) {
                  contentDiv = div;
                  console.log(`   ✅ Found content for original tab: ${text} (${div.id || 'no-id'})`);
                  break;
                }
              }
            }
          }
          
          if (contentDiv) {
            // Keep original tab names to preserve OWASP site naming convention
            found.push({
              name: text, // Keep original name
              href: href,
              contentDivId: contentDivId,
              content: contentDiv.innerHTML,
              textLength: contentDiv.textContent?.trim().length || 0
            });
          } else {
            console.log(`   ⚠️  Could not find content div for: ${contentDivId}`);
            // Debug: check what divs actually exist
            const allDivs = Array.from(document.querySelectorAll('div[id]')).map(div => div.id);
            console.log(`   🔍 Available div IDs: ${allDivs.slice(0, 10).join(', ')}...`);
          }
        }
      });
      
      return found;
    });
    
    console.log(`   📋 Found ${tabContentDivs.length} tab content divs`);
    
    // Debug: log what we found
    if (tabContentDivs.length === 0) {
      console.log(`   🔍 Debug: No tab divs found, checking for any tab elements...`);
      const debugInfo = await page.evaluate(() => {
        const allTabs = document.querySelectorAll('a[href*="#"]');
        return Array.from(allTabs).map(el => ({
          text: el.textContent?.trim(),
          href: el.getAttribute('href'),
          classes: el.className
        })).filter(tab => tab.text && tab.href);
      });
      console.log(`   🔍 Debug: Found ${debugInfo.length} tab elements:`, debugInfo);
    }
    
    // Process each tab's content directly
    const extractedTabs = [];
    
    for (const tabInfo of tabContentDivs) {
      console.log(`   🔍 Processing tab: ${tabInfo.name} (${tabInfo.contentDivId})`);
      
      if (tabInfo.content && tabInfo.textLength > 50) {
        extractedTabs.push({
          name: tabInfo.name,
          content: tabInfo.content,
          contentDivId: tabInfo.contentDivId
        });
      }
    }
    
    console.log(`   📋 Successfully extracted ${extractedTabs.length} tabs`);
    
    const tabs = [];
    
    // Extract content from each extracted tab
    for (const tabDiv of extractedTabs) {
      console.log(`   🔍 Processing tab: ${tabDiv.name}`);
      
      // Extract content for this tab
      const tabContent = await extractTabContentFromHTML(tabDiv.content, tabDiv.name, chapterId, supabase);
      if (tabContent) {
        tabs.push(tabContent);
      }
    }
    
    // If no specific tabs found, create a default "Main" tab
    if (tabs.length === 0) {
      console.log(`   📄 No specific tab divs found, creating default "Main" tab`);
      const defaultContent = await extractTabContent(page, 'Main', chapterId, supabase);
      if (defaultContent) {
        tabs.push(defaultContent);
      }
    }
    
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
        
        // Click the tab using a simpler, more direct method
        try {
          console.log(`   🔍 Attempting to click tab with href: ${href}`);
          
          // Try multiple click methods
          const clicked = await page.evaluate((targetHref) => {
            // Method 1: Direct href match
            let element = document.querySelector(`a[href="${targetHref}"]`);
            if (element) {
              element.click();
              return true;
            }
            
            // Method 2: Partial href match
            element = document.querySelector(`a[href*="${targetHref.split('#')[1]}"]`);
            if (element) {
              element.click();
              return true;
            }
            
            // Method 3: Find by text content
            const links = Array.from(document.querySelectorAll('a'));
            element = links.find(link => link.href === targetHref);
            if (element) {
              element.click();
              return true;
            }
            
            return false;
          }, href);
          
          if (clicked) {
            console.log(`   ✅ Tab clicked successfully`);
            // Wait for any JavaScript to execute
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.log(`   ⚠️  Could not find tab element to click`);
          }
        } catch (error) {
          console.log(`   ⚠️  Error clicking tab: ${error.message}`);
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
 * Extract content from HTML directly (for CSS show/hide tabs)
 */
async function extractTabContentFromHTML(htmlContent, tabName, chapterId, supabase) {
  try {
    // Parse content with Cheerio
    const $ = cheerio.load(htmlContent);
    
    // Extract sections from the content
    const sections = [];
    
    // Look for major headings (h1, h2, h3) and their content
    const headings = $('h1, h2, h3').filter(function() {
      const text = $(this).text().trim();
      return text && text.length > 0 && !text.toLowerCase().includes('owasp') && !text.toLowerCase().includes('chapter');
    });
    
    if (headings.length > 0) {
      headings.each((i, heading) => {
        const $heading = $(heading);
        const title = $heading.text().trim();
        
        if (!title) return;
        
        // Get content until next heading
        const content = [];
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
    
    // If no sections found, create a general content section with better link parsing
    if (sections.length === 0) {
      const paragraphs = [];
      const allLinks = [];
      
      // Extract all links from the content
      $('a').each((i, link) => {
        const href = $(link).attr('href');
        const linkText = $(link).text().trim();
        if (href && linkText && !href.startsWith('#')) {
          // Skip "Official Chapter Page" button - never link to old OWASP site
          if (linkText === 'Official Chapter Page') {
            console.log(`   🚫 Skipping "Official Chapter Page" button in general content`);
            return;
          }
          const fullUrl = href.startsWith('http') ? href : `https://owasp.org${href}`;
          allLinks.push({ label: linkText, url: fullUrl });
        }
      });
      
      // Extract text content
      $('p, div, span').each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 20 && !$(el).find('a').length) {
          paragraphs.push(text);
        }
      });
      
      if (paragraphs.length > 0 || allLinks.length > 0) {
        sections.push({
          title: 'Content',
          content: paragraphs.join('\n\n'),
          imageUrl: null,
          imageAlt: null,
          imageCaption: null,
          imageSize: 'medium',
          videoUrl: null,
          buttons: allLinks.slice(0, 10).map(link => ({
            label: link.label,
            url: link.url,
            style: 'link'
          }))
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
    console.error(`   ❌ Error extracting tab content from HTML:`, error.message);
    return null;
  }
}

/**
 * Extract content for a specific tab
 */
async function extractTabContent(page, tabName, chapterId, supabase) {
  try {
    // Get the current page content - look for tab-specific content
    const content = await page.evaluate((tabName) => {
      console.log(`   🔍 Extracting content for tab: ${tabName}`);
      
      // Remove navigation, header, footer elements
      const elementsToRemove = document.querySelectorAll('nav, header, footer, .navbar, .sidebar, #sidebar, .toc, #toc, .cookie-banner, .cookie-consent');
      elementsToRemove.forEach(el => el.remove());
      
      // Look for tab-specific content areas first
      let mainContent = null;
      
      // Try to find content specific to the current tab
      if (tabName.toLowerCase().includes('main')) {
        mainContent = document.querySelector('#div-main, .main-content, main, #main');
        console.log(`   📍 Looking for main content, found:`, mainContent ? 'Yes' : 'No');
      } else if (tabName.toLowerCase().includes('meeting')) {
        mainContent = document.querySelector('#div-meetings, .meetings-content, .chapter-meetings');
        console.log(`   📍 Looking for meetings content, found:`, mainContent ? 'Yes' : 'No');
      } else if (tabName.toLowerCase().includes('archive')) {
        mainContent = document.querySelector('#div-archive, .archive-content, .archived-meetings');
        console.log(`   📍 Looking for archive content, found:`, mainContent ? 'Yes' : 'No');
      } else if (tabName.toLowerCase().includes('sponsor')) {
        mainContent = document.querySelector('#div-sponsors, .sponsors-content, .chapter-sponsors');
        console.log(`   📍 Looking for sponsors content, found:`, mainContent ? 'Yes' : 'No');
      }
      
      // Fallback to general content areas
      if (!mainContent) {
        mainContent = document.querySelector('.main-content, main, #main, .content, #content, article, .chapter-content') || document.body;
        console.log(`   📍 Using fallback content area`);
      }
      
      const contentLength = mainContent ? mainContent.innerHTML.length : 0;
      console.log(`   📊 Content length: ${contentLength} characters`);
      
      return mainContent ? mainContent.innerHTML : '';
    }, tabName);
    
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
