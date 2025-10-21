require('dotenv').config({ path: '.env.local' });

const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Allow dry-run without env vars
const dryRunMode = process.argv.includes('--dry-run');

if (!dryRunMode && (!supabaseUrl || !supabaseKey)) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nTo test without importing, use: npm run scrape:chapters:dry-run');
  process.exit(1);
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Country to flag emoji mapping
const countryFlags = {
  'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦', 'India': '🇮🇳',
  'Nigeria': '🇳🇬', 'Tunisia': '🇹🇳', 'Egypt': '🇪🇬', 'South Africa': '🇿🇦',
  'Kenya': '🇰🇪', 'Germany': '🇩🇪', 'France': '🇫🇷', 'Spain': '🇪🇸',
  'Italy': '🇮🇹', 'Netherlands': '🇳🇱', 'Belgium': '🇧🇪', 'Switzerland': '🇨🇭',
  'Austria': '🇦🇹', 'Poland': '🇵🇱', 'Sweden': '🇸🇪', 'Norway': '🇳🇴',
  'Denmark': '🇩🇰', 'Finland': '🇫🇮', 'Ireland': '🇮🇪', 'Portugal': '🇵🇹',
  'Greece': '🇬🇷', 'Turkey': '🇹🇷', 'Israel': '🇮🇱', 'UAE': '🇦🇪',
  'Saudi Arabia': '🇸🇦', 'Japan': '🇯🇵', 'China': '🇨🇳', 'South Korea': '🇰🇷',
  'Singapore': '🇸🇬', 'Australia': '🇦🇺', 'New Zealand': '🇳🇿', 'Brazil': '🇧🇷',
  'Argentina': '🇦🇷', 'Mexico': '🇲🇽', 'Chile': '🇨🇱', 'Colombia': '🇨🇴',
  'Peru': '🇵🇪', 'Hong Kong': '🇭🇰', 'Pakistan': '🇵🇰', 'Bangladesh': '🇧🇩',
  'Philippines': '🇵🇭', 'Indonesia': '🇮🇩', 'Malaysia': '🇲🇾', 'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳', 'Morocco': '🇲🇦', 'Ghana': '🇬🇭', 'Ethiopia': '🇪🇹',
  'Uganda': '🇺🇬', 'Tanzania': '🇹🇿', 'Zambia': '🇿🇲', 'Zimbabwe': '🇿🇼',
  'Botswana': '🇧🇼', 'Namibia': '🇳🇦', 'Mozambique': '🇲🇿', 'Rwanda': '🇷🇼',
  'Senegal': '🇸🇳', 'Ivory Coast': '🇨🇮', 'Cameroon': '🇨🇲', 'Algeria': '🇩🇿',
  'Libya': '🇱🇾', 'Sudan': '🇸🇩', 'Azerbaijan': '🇦🇿', 'Armenia': '🇦🇲',
  'Georgia': '🇬🇪', 'Kazakhstan': '🇰🇿', 'Uzbekistan': '🇺🇿', 'Ukraine': '🇺🇦',
  'Russia': '🇷🇺', 'Czech Republic': '🇨🇿', 'Romania': '🇷🇴', 'Hungary': '🇭🇺',
  'Bulgaria': '🇧🇬', 'Croatia': '🇭🇷', 'Serbia': '🇷🇸', 'Slovenia': '🇸🇮',
  'Slovakia': '🇸🇰', 'Lithuania': '🇱🇹', 'Latvia': '🇱🇻', 'Estonia': '🇪🇪'
};

// Country to region mapping
const countryToRegion = {
  // Africa
  'Tunisia': 'Africa', 'Algeria': 'Africa', 'Benin': 'Africa', 'Cameroon': 'Africa',
  'Egypt': 'Africa', 'Kenya': 'Africa', 'Morocco': 'Africa', 'Nigeria': 'Africa',
  'South Africa': 'Africa', 'Togo': 'Africa', 'Uganda': 'Africa',
  
  // Asia
  'Armenia': 'Asia', 'Azerbaijan': 'Asia', 'Bangladesh': 'Asia', 'China': 'Asia',
  'Hong Kong': 'Asia', 'India': 'Asia', 'Indonesia': 'Asia', 'Japan': 'Asia',
  'Jordan': 'Asia', 'Saudi Arabia': 'Asia', 'South Korea': 'Asia', 'Korea': 'Asia',
  'Kuwait': 'Asia', 'Malaysia': 'Asia', 'Nepal': 'Asia', 'Pakistan': 'Asia',
  'Philippines': 'Asia', 'Singapore': 'Asia', 'Taiwan': 'Asia', 'Thailand': 'Asia',
  'Turkey': 'Asia', 'UAE': 'Asia', 'Uzbekistan': 'Asia',
  
  // Central America
  'El Salvador': 'Central America', 'Guatemala': 'Central America',
  'Honduras': 'Central America', 'Nicaragua': 'Central America', 'Panama': 'Central America',
  
  // Europe
  'Albania': 'Europe', 'Austria': 'Europe', 'Belgium': 'Europe', 'Bosnia': 'Europe',
  'Bulgaria': 'Europe', 'Croatia': 'Europe', 'Cyprus': 'Europe', 'Czech Republic': 'Europe',
  'Denmark': 'Europe', 'Estonia': 'Europe', 'Faroe Islands': 'Europe', 'Finland': 'Europe',
  'France': 'Europe', 'Germany': 'Europe', 'Greece': 'Europe', 'Hungary': 'Europe',
  'Ireland': 'Europe', 'Israel': 'Europe', 'Italy': 'Europe', 'Latvia': 'Europe',
  'Lithuania': 'Europe', 'Luxembourg': 'Europe', 'Netherlands': 'Europe', 'Macedonia': 'Europe',
  'Norway': 'Europe', 'Poland': 'Europe', 'Portugal': 'Europe', 'Romania': 'Europe',
  'Russia': 'Europe', 'Scotland': 'Europe', 'Slovenia': 'Europe', 'Spain': 'Europe',
  'Sweden': 'Europe', 'Switzerland': 'Europe', 'Ukraine': 'Europe', 'United Kingdom': 'Europe',
  'UK': 'Europe',
  
  // North America
  'Canada': 'North America', 'Mexico': 'North America', 'United States': 'North America',
  'USA': 'North America',
  
  // Oceania
  'Australia': 'Oceania', 'New Zealand': 'Oceania',
  
  // South America
  'Argentina': 'South America', 'Bolivia': 'South America', 'Brazil': 'South America',
  'Chile': 'South America', 'Colombia': 'South America', 'Ecuador': 'South America',
  'Paraguay': 'South America', 'Peru': 'South America', 'Uruguay': 'South America'
};

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/owasp\s+/gi, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractCityCountryFromName(chapterName) {
  // Remove "OWASP" prefix
  const clean = chapterName.replace(/^OWASP\s+/i, '').trim();
  
  let city = clean;
  let country = 'Unknown';
  let region = 'North America'; // default
  
  // Helper to match whole words or exact strings
  const matchesCountry = (text, countryName) => {
    const regex = new RegExp(`\\b${countryName}\\b`, 'i');
    return regex.test(text) || text.toLowerCase() === countryName.toLowerCase();
  };
  
  // Check if it matches any known country - longer names first to avoid partial matches
  const sortedCountries = [...Object.entries(countryFlags)].sort((a, b) => b[0].length - a[0].length);
  
  for (const [countryName, flag] of sortedCountries) {
    if (matchesCountry(clean, countryName)) {
      country = countryName;
      city = clean; // Keep full name as city for now
      region = countryToRegion[countryName] || 'North America';
      break;
    }
  }
  
  // Also check country-to-region mapping for countries without flags
  if (country === 'Unknown') {
    const sortedRegionCountries = [...Object.entries(countryToRegion)].sort((a, b) => b[0].length - a[0].length);
    for (const [countryName, mappedRegion] of sortedRegionCountries) {
      if (matchesCountry(clean, countryName)) {
        country = countryName;
        region = mappedRegion;
        break;
      }
    }
  }
  
  return { city, country, region };
}

async function scrapeChaptersPage() {
  console.log('🔍 Fetching OWASP chapters page...');
  
  try {
    const response = await axios.get('https://owasp.org/chapters/');
    const $ = cheerio.load(response.data);
    const chapters = [];
    
    // Find all chapter links
    $('li.chapterli a[href*="www-chapter"]').each((i, link) => {
      const $link = $(link);
      const name = `OWASP ${$link.text().trim()}`;
      const url = $link.attr('href');
      
      if (!name || !url) return;
      
      const slug = createSlug(name);
      const { city, country, region } = extractCityCountryFromName(name);
      const country_flag = countryFlags[country] || '';
      
      // Skip if we already have this slug
      if (chapters.find(c => c.slug === slug)) return;
      
      chapters.push({
        name,
        slug,
        city,
        country,
        country_flag,
        region,
        website_url: url.startsWith('http') ? url : `https://owasp.org${url}`,
        is_active: true,
        content_status: 'draft'
      });
      
      console.log(`  ✓ ${name} (${country || 'Unknown'}) -> ${region}`);
    });
    
    console.log(`\n✅ Found ${chapters.length} chapters total`);
    return chapters;
    
  } catch (error) {
    console.error('❌ Error scraping chapters:', error.message);
    throw error;
  }
}

async function importChaptersToSupabase(chapters, dryRun = false) {
  console.log(`\n📥 ${dryRun ? 'DRY RUN - ' : ''}Importing ${chapters.length} chapters to Supabase...`);
  
  if (dryRun) {
    console.log('\n📋 Chapters to be imported:');
    console.table(chapters.map(c => ({
      name: c.name,
      city: c.city,
      country: c.country,
      region: c.region,
      slug: c.slug
    })));
    return;
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const chapter of chapters) {
    try {
      const { error } = await supabase
        .from('chapters')
        .upsert(chapter, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`  ❌ Error importing ${chapter.name}:`, error.message);
        errorCount++;
      } else {
        console.log(`  ✅ Imported: ${chapter.name}`);
        successCount++;
      }
    } catch (err) {
      console.error(`  ❌ Exception importing ${chapter.name}:`, err.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Import complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
}

// Main execution
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
  const regionArg = process.argv.find(arg => arg.startsWith('--region='));
  const region = regionArg ? regionArg.split('=')[1] : null;
  
  console.log('🚀 OWASP Chapters Scraper');
  console.log('='.repeat(50));
  
  try {
    let chapters = await scrapeChaptersPage();
    
    if (region) {
      console.log(`\n🌍 Filtering for region: ${region}`);
      chapters = chapters.filter(c => c.region === region);
      console.log(`   Found ${chapters.length} chapters in ${region}`);
    }
    
    if (limit && limit > 0) {
      console.log(`\n⚠️  Limiting to ${limit} chapter(s) for testing`);
      chapters = chapters.slice(0, limit);
    }
    
    await importChaptersToSupabase(chapters, dryRun);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();

