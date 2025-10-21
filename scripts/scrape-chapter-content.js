require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const { scrapeChapterContent, updateChapterContent } = require('./scrape-chapter-content-helpers');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const chapterSlug = args.find(arg => !arg.startsWith('--'));
  
  if (!chapterSlug) {
    console.error('❌ Please provide a chapter slug');
    console.error('Usage: node scripts/scrape-chapter-content.js <chapter-slug>');
    console.error('Example: node scripts/scrape-chapter-content.js belgium');
    process.exit(1);
  }
  
  console.log('🚀 OWASP Chapter Content Scraper');
  console.log('='.repeat(50));
  
  // Get chapter from database
  const { data: chapter, error } = await supabase
    .from('chapters')
    .select('id, name, slug, website_url')
    .eq('slug', chapterSlug)
    .single();
  
  if (error || !chapter) {
    console.error(`❌ Chapter "${chapterSlug}" not found in database`);
    process.exit(1);
  }
  
  if (!chapter.website_url) {
    console.error(`❌ Chapter "${chapter.name}" has no website_url`);
    process.exit(1);
  }
  
  // Scrape content
  const content = await scrapeChapterContent(chapter.id, chapter.website_url, chapter.name, supabase);
  
  if (!content) {
    console.error('❌ Failed to scrape content');
    process.exit(1);
  }
  
  // Update chapter
  const success = await updateChapterContent(chapter.id, content, supabase);
  
  if (success) {
    console.log('\n🎉 Content scraping complete!');
    console.log(`   Visit: https://owasp-web-drab.vercel.app/chapters/${chapter.slug}`);
  } else {
    console.error('\n❌ Failed to update chapter');
    process.exit(1);
  }
}

main();
