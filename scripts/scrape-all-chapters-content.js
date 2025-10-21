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
  const limitArg = args.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
  const regionArg = args.find(arg => arg.startsWith('--region='));
  const region = regionArg ? regionArg.split('=')[1] : null;
  
  console.log('🚀 OWASP Chapter Content Batch Scraper');
  console.log('='.repeat(50));
  
  // Get chapters from database
  let query = supabase
    .from('chapters')
    .select('id, name, slug, website_url, region')
    .eq('is_active', true)
    .not('website_url', 'is', null);
  
  if (region) {
    query = query.eq('region', region);
    console.log(`🌍 Filtering for region: ${region}`);
  }
  
  const { data: chapters, error } = await query;
  
  if (error || !chapters) {
    console.error(`❌ Failed to fetch chapters:`, error);
    process.exit(1);
  }
  
  let chaptersToScrape = chapters;
  
  if (limit && limit > 0) {
    console.log(`⚠️  Limiting to ${limit} chapter(s)\n`);
    chaptersToScrape = chapters.slice(0, limit);
  }
  
  console.log(`📋 Found ${chapters.length} chapters with website URLs`);
  console.log(`📥 Scraping content for ${chaptersToScrape.length} chapters\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const chapter of chaptersToScrape) {
    try {
      const content = await scrapeChapterContent(chapter.id, chapter.website_url, chapter.name, supabase);
      
      if (content && content.tabs && content.tabs.length > 0) {
        const updated = await updateChapterContent(chapter.id, content, supabase);
        if (updated) {
          successCount++;
        } else {
          errorCount++;
        }
      } else {
        console.log(`   ⚠️  No content extracted for ${chapter.name}`);
        errorCount++;
      }
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`   ❌ Error processing ${chapter.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n🎉 Batch scraping complete!');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
}

main();
