const puppeteer = require('puppeteer');

async function debugTabStructure() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('🌐 Navigating to Belgium chapter...');
    await page.goto('https://owasp.org/www-chapter-belgium/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get all possible tab-related elements
    const tabInfo = await page.evaluate(() => {
      const results = {
        tabContentDivs: [],
        navigationElements: [],
        allDivs: [],
        allLinks: []
      };

      // Check for specific tab content divs
      const contentDivs = [
        { selector: '#div-main', name: 'Main' },
        { selector: '#div-meetings', name: 'Chapter Meetings' },
        { selector: '#div-archive', name: 'Archived meetings' },
        { selector: '#div-sponsors', name: 'Chapter sponsors' }
      ];
      
      contentDivs.forEach(({ selector, name }) => {
        const element = document.querySelector(selector);
        if (element) {
          results.tabContentDivs.push({
            selector,
            name,
            content: element.innerHTML.substring(0, 200) + '...',
            visible: element.offsetParent !== null,
            classes: element.className
          });
        }
      });

      // Look for navigation elements
      const navElements = document.querySelectorAll('a, button, span, div');
      navElements.forEach(el => {
        const text = el.textContent?.trim();
        const href = el.getAttribute('href');
        if (text && (text.toLowerCase().includes('meeting') || text.toLowerCase().includes('main') || text.toLowerCase().includes('archive') || text.toLowerCase().includes('sponsor'))) {
          results.navigationElements.push({
            tag: el.tagName,
            text: text,
            href: href,
            classes: el.className
          });
        }
      });

      // Get all divs with IDs
      const allDivs = document.querySelectorAll('div[id]');
      allDivs.forEach(div => {
        results.allDivs.push({
          id: div.id,
          classes: div.className,
          visible: div.offsetParent !== null
        });
      });

      // Get all links
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        const text = link.textContent?.trim();
        const href = link.getAttribute('href');
        if (text && href) {
          results.allLinks.push({
            text: text,
            href: href
          });
        }
      });

      return results;
    });

    console.log('\n📋 Tab Content Divs Found:');
    console.log(tabInfo.tabContentDivs);

    console.log('\n🔗 Navigation Elements:');
    console.log(tabInfo.navigationElements.slice(0, 10)); // Show first 10

    console.log('\n📦 All Divs with IDs:');
    console.log(tabInfo.allDivs.slice(0, 20)); // Show first 20

    console.log('\n🔗 All Links:');
    console.log(tabInfo.allLinks.slice(0, 20)); // Show first 20

    // Keep browser open for manual inspection
    console.log('\n🔍 Browser is open for manual inspection...');
    console.log('Press Ctrl+C to close');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugTabStructure();
