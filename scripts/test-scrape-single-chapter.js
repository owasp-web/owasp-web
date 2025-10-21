require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const { scrapeChapterContent, updateChapterContent } = require('./scrape-chapter-content-helpers');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Test scraper on a single chapter
 */
async function testSingleChapter() {
  const args = process.argv.slice(2);
  const slugArg = args.find(arg => arg.startsWith('--slug='));
  const slug = slugArg ? slugArg.split('=')[1] : 'belgium';
  const dryRun = args.includes('--dry-run');
  const saveOutput = args.includes('--save-output');
  
  console.log('🧪 OWASP Chapter Scraper Test');
  console.log('='.repeat(50));
  console.log(`📋 Testing chapter: ${slug}`);
  console.log(`🔧 Dry run: ${dryRun ? 'YES' : 'NO'}`);
  console.log(`💾 Save output: ${saveOutput ? 'YES' : 'NO'}`);
  console.log('');
  
  try {
    // Get chapter from database
    const { data: chapter, error } = await supabase
      .from('chapters')
      .select('id, name, slug, website_url, region')
      .eq('slug', slug)
      .single();
    
    if (error || !chapter) {
      console.error(`❌ Chapter not found: ${slug}`);
      console.error('Available chapters:');
      
      // List available chapters
      const { data: chapters } = await supabase
        .from('chapters')
        .select('slug, name')
        .limit(10);
      
      if (chapters) {
        chapters.forEach(c => console.log(`   - ${c.slug} (${c.name})`));
      }
      
      process.exit(1);
    }
    
    console.log(`📄 Found chapter: ${chapter.name}`);
    console.log(`🌐 URL: ${chapter.website_url}`);
    console.log(`🌍 Region: ${chapter.region}`);
    console.log('');
    
    // Test the scraper
    console.log('🚀 Starting content extraction...');
    const startTime = Date.now();
    
    const content = await scrapeChapterContent(chapter.id, chapter.website_url, chapter.name, supabase);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    if (!content) {
      console.error('❌ Content extraction failed');
      process.exit(1);
    }
    
    console.log(`⏱️  Extraction completed in ${duration}s`);
    console.log('');
    
    // Display results
    console.log('📊 EXTRACTION RESULTS');
    console.log('='.repeat(50));
    
    console.log(`📑 Tabs found: ${content.tabs ? content.tabs.length : 0}`);
    if (content.tabs && content.tabs.length > 0) {
      content.tabs.forEach((tab, index) => {
        console.log(`   ${index + 1}. ${tab.name} (${tab.sections ? tab.sections.length : 0} sections)`);
        if (tab.sections) {
          tab.sections.forEach((section, sIndex) => {
            const contentLength = section.content ? section.content.length : 0;
            const hasImage = section.imageUrl ? '🖼️' : '';
            const hasButtons = section.buttons && section.buttons.length > 0 ? `🔗${section.buttons.length}` : '';
            console.log(`      ${sIndex + 1}. ${section.title || 'Untitled'} (${contentLength} chars) ${hasImage} ${hasButtons}`);
          });
        }
      });
    }
    
    console.log('');
    console.log('👥 Leadership Team:');
    if (content.leadership_team && content.leadership_team.length > 0) {
      content.leadership_team.forEach((leader, index) => {
        console.log(`   ${index + 1}. ${leader.name}${leader.role ? ` (${leader.role})` : ''}`);
      });
    } else {
      console.log('   None found');
    }
    
    console.log('');
    console.log('🤝 Volunteers:');
    if (content.volunteers && content.volunteers.length > 0) {
      content.volunteers.forEach((volunteer, index) => {
        console.log(`   ${index + 1}. ${volunteer}`);
      });
    } else {
      console.log('   None found');
    }
    
    console.log('');
    console.log('🔗 Social Links:');
    const socialLinks = [
      { name: 'Email', url: content.contact_email },
      { name: 'Meetup', url: content.meetup_url },
      { name: 'LinkedIn', url: content.linkedin_url },
      { name: 'Twitter', url: content.twitter_url },
      { name: 'Facebook', url: content.facebook_url },
      { name: 'YouTube', url: content.youtube_url }
    ];
    
    socialLinks.forEach(link => {
      if (link.url) {
        console.log(`   ${link.name}: ${link.url}`);
      }
    });
    
    // Save output to file if requested
    if (saveOutput) {
      const outputDir = path.join(__dirname, 'test-outputs');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputFile = path.join(outputDir, `${slug}-scrape-test-${Date.now()}.json`);
      const outputData = {
        chapter: {
          id: chapter.id,
          name: chapter.name,
          slug: chapter.slug,
          website_url: chapter.website_url
        },
        extraction: {
          duration: duration,
          timestamp: new Date().toISOString(),
          content
        }
      };
      
      fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
      console.log(`💾 Output saved to: ${outputFile}`);
    }
    
    // Update database if not dry run
    if (!dryRun) {
      console.log('');
      console.log('💾 Updating database...');
      
      const updated = await updateChapterContent(chapter.id, content, supabase);
      
      if (updated) {
        console.log('✅ Database updated successfully');
        console.log('');
        console.log('🎉 Test completed successfully!');
        console.log(`📝 You can now view the chapter in the admin panel: /admin/chapters/${chapter.id}/edit`);
      } else {
        console.error('❌ Failed to update database');
        process.exit(1);
      }
    } else {
      console.log('');
      console.log('🎉 Test completed successfully (dry run)');
      console.log('💡 Run without --dry-run to update the database');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Main execution
testSingleChapter();
