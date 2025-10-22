const puppeteer = require('puppeteer');

async function debugCambridgeTabs() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('🌐 Navigating to Cambridge chapter...');
    await page.goto('https://owasp.org/www-chapter-cambridge/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get detailed tab structure
    const tabInfo = await page.evaluate(() => {
      const results = {
        allTabs: [],
        tabContent: [],
        navigationElements: []
      };

      // Find all possible tab elements
      const tabSelectors = [
        'a[href*="#"]',
        'button[onclick*="tab"]',
        '.tab',
        '.nav-tab',
        '[role="tab"]',
        'a[data-tab]'
      ];

      tabSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const text = el.textContent?.trim();
          const href = el.getAttribute('href');
          const onclick = el.getAttribute('onclick');
          const classes = el.className;
          
          if (text && text.length < 50) { // Reasonable tab text length
            results.allTabs.push({
              selector,
              text,
              href,
              onclick,
              classes,
              tagName: el.tagName
            });
          }
        });
      });

      // Look for content divs that might be tab panels
      const contentSelectors = [
        'div[id*="content"]',
        'div[id*="tab"]',
        'div[class*="tab"]',
        'div[class*="panel"]',
        'div[class*="section"]'
      ];

      contentSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const id = el.id;
          const classes = el.className;
          const visible = el.offsetParent !== null;
          const content = el.textContent?.trim().substring(0, 200);
          
          if (content && content.length > 50) {
            results.tabContent.push({
              selector,
              id,
              classes,
              visible,
              content: content + '...'
            });
          }
        });
      });

      // Look for navigation elements that might be tabs
      const navElements = document.querySelectorAll('a, button, span, div');
      navElements.forEach(el => {
        const text = el.textContent?.trim();
        if (text && (
          text.toLowerCase().includes('main') ||
          text.toLowerCase().includes('event') ||
          text.toLowerCase().includes('meeting') ||
          text.toLowerCase().includes('previous') ||
          text.toLowerCase().includes('archive')
        )) {
          results.navigationElements.push({
            tag: el.tagName,
            text: text,
            href: el.getAttribute('href'),
            classes: el.className,
            parent: el.parentElement?.tagName
          });
        }
      });

      return results;
    });

    console.log('\n🔍 All Tab Elements Found:');
    console.log(JSON.stringify(tabInfo.allTabs, null, 2));

    console.log('\n📦 Tab Content Areas:');
    console.log(JSON.stringify(tabInfo.tabContent, null, 2));

    console.log('\n🔗 Navigation Elements:');
    console.log(JSON.stringify(tabInfo.navigationElements, null, 2));

    // Keep browser open for manual inspection
    console.log('\n🔍 Browser is open for manual inspection...');
    console.log('Press Ctrl+C to close');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugCambridgeTabs();
