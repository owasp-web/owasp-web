require('dotenv').config({ path: '.env.local' });

const puppeteer = require('puppeteer');

async function debugBelgiumPage() {
  console.log('🔍 Debugging Belgium chapter page structure...');
  
  let browser = null;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Show browser for debugging
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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('🌐 Loading Belgium chapter page...');
    await page.goto('https://owasp.org/www-chapter-belgium/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get all elements with role="tab"
    const tabElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('[role="tab"]');
      return Array.from(elements).map(el => ({
        text: el.textContent?.trim(),
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        href: el.href || null,
        parentElement: el.parentElement?.tagName,
        parentClassName: el.parentElement?.className
      }));
    });
    
    console.log('📋 Found tab elements:');
    tabElements.forEach((tab, i) => {
      console.log(`   ${i + 1}. "${tab.text}" (${tab.tagName}) - ${tab.className}`);
      console.log(`      Parent: ${tab.parentElement} (${tab.parentClassName})`);
      console.log(`      ID: ${tab.id}, Href: ${tab.href}`);
    });
    
    // Get all navigation elements
    const navElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('nav a, .nav a, .navigation a, .tabs a');
      return Array.from(elements).map(el => ({
        text: el.textContent?.trim(),
        tagName: el.tagName,
        className: el.className,
        href: el.href || null,
        parentElement: el.parentElement?.tagName,
        parentClassName: el.parentElement?.className
      }));
    });
    
    console.log('\n📋 Found navigation elements:');
    navElements.forEach((nav, i) => {
      console.log(`   ${i + 1}. "${nav.text}" (${nav.tagName}) - ${nav.className}`);
      console.log(`      Parent: ${nav.parentElement} (${nav.parentClassName})`);
      console.log(`      Href: ${nav.href}`);
    });
    
    // Look for specific Belgium chapter content
    const belgiumContent = await page.evaluate(() => {
      const mainContent = document.querySelector('.main-content, main, #main, .content, #content, article') || document.body;
      const headings = mainContent.querySelectorAll('h1, h2, h3');
      
      return Array.from(headings).map(h => ({
        text: h.textContent?.trim(),
        tagName: h.tagName,
        className: h.className
      }));
    });
    
    console.log('\n📋 Found content headings:');
    belgiumContent.forEach((heading, i) => {
      console.log(`   ${i + 1}. "${heading.text}" (${heading.tagName}) - ${heading.className}`);
    });
    
    // Look for any elements that might be chapter tabs
    const chapterTabs = await page.evaluate(() => {
      const elements = document.querySelectorAll('a, button, span, div');
      const possibleTabs = [];
      
      elements.forEach(el => {
        const text = el.textContent?.trim();
        if (text && (
          text.toLowerCase().includes('main') ||
          text.toLowerCase().includes('chapter meetings') ||
          text.toLowerCase().includes('archived meetings') ||
          text.toLowerCase().includes('chapter sponsors') ||
          text.toLowerCase().includes('meetings') ||
          text.toLowerCase().includes('sponsors')
        )) {
          possibleTabs.push({
            text: text,
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            href: el.href || null,
            parentElement: el.parentElement?.tagName,
            parentClassName: el.parentElement?.className
          });
        }
      });
      
      return possibleTabs;
    });
    
    console.log('\n📋 Found potential chapter tabs:');
    chapterTabs.forEach((tab, i) => {
      console.log(`   ${i + 1}. "${tab.text}" (${tab.tagName}) - ${tab.className}`);
      console.log(`      Parent: ${tab.parentElement} (${tab.parentClassName})`);
      console.log(`      ID: ${tab.id}, Href: ${tab.href}`);
    });
    
    console.log('\n⏸️  Browser will stay open for 30 seconds for manual inspection...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

debugBelgiumPage();
