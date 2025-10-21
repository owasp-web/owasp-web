# OWASP Chapter Content Scraper

## Overview

This enhanced scraper system properly extracts content from OWASP chapter pages using Puppeteer to handle JavaScript-rendered navigation tabs, sidebar content, and image migration to Supabase storage.

## Key Features

- **Proper Tab Detection**: Uses Puppeteer to detect and extract actual navigation tabs (Main, Chapter Meetings, Archived meetings, Chapter sponsors)
- **Sidebar Content Extraction**: Parses leadership team, volunteers, and social links from sidebar
- **Image Migration**: Downloads and uploads images to Supabase storage
- **Fallback System**: Falls back to basic scraping if Puppeteer fails
- **Test Mode**: Test on single chapters before bulk migration

## Files Structure

```
scripts/
├── scrape-chapter-tabs-puppeteer.js    # Main Puppeteer-based scraper
├── image-migration-helper.js           # Image download/upload utilities
├── sidebar-parser.js                   # Sidebar content extraction
├── scrape-chapter-content-helpers.js   # Updated main scraper with fallback
├── test-scrape-single-chapter.js       # Single chapter test script
├── scrape-all-chapters-content.js      # Bulk scraper (existing)
└── add-volunteers-schema.sql           # Database schema update
```

## Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Test Single Chapter

Test the scraper on Belgium chapter (has all features):

```bash
# Dry run (no database update)
npm run scrape:chapter:test -- --slug=belgium --dry-run --save-output

# Live test (updates database)
npm run scrape:chapter:test -- --slug=belgium
```

### 3. Run Bulk Migration

```bash
# Test on limited chapters first
npm run scrape:chapters:tabs -- --limit=5

# Full migration
npm run scrape:chapters:tabs
```

## Expected Output Structure

For Belgium chapter, the scraper creates:

### Tab 1: Main (order: 1)
- Section 1: Welcome message (content + leadership links as buttons)
- Section 2: Chapter Activities (content)
- Section 3: Upcoming Events (content + event details)
- Section 4: Chapter Sponsors (content + sponsor logos as images)

### Tab 2: Chapter Meetings (order: 2)
- Section 1: Meeting Archive (links to different years as buttons)
- Section 2: Latest meeting details

### Tab 3: Archived meetings (order: 3)
- Sections: One per year with meeting details

### Tab 4: Chapter sponsors (order: 4)
- Sections: Sponsor information and logos

### Sidebar Data
- **Leadership Team**: [Lieven Desmet, Bart De Win, David Mathy, Stella Dineva, Maxim Baele]
- **Volunteers**: [Sebastien, Leander]
- **Social URLs**: Meetup, LinkedIn, Twitter, YouTube, Slack

## Database Schema

The scraper populates these fields:

```sql
-- Core chapter fields
tabs JSONB                    -- Array of tab objects with sections
leadership_team JSONB         -- Array of leadership members
volunteers JSONB             -- Array of volunteer names
contact_email VARCHAR         -- Primary contact email
meetup_url TEXT              -- Meetup group URL
linkedin_url TEXT            -- LinkedIn page URL
twitter_url TEXT             -- Twitter/X profile URL
facebook_url TEXT            -- Facebook page URL
youtube_url TEXT             -- YouTube channel URL
```

## Tab Structure

Each tab follows this structure:

```javascript
{
  id: "tab-1234567890-abc123",
  name: "Main",
  order: 1,
  sections: [
    {
      title: "Welcome",
      content: "Chapter welcome message...",
      imageUrl: "https://supabase.../image.jpg",
      imageAlt: "Chapter photo",
      imageCaption: "Optional caption",
      imageSize: "medium",
      videoUrl: null,
      buttons: [
        {
          label: "Join Meetup",
          url: "https://meetup.com/...",
          style: "primary"
        }
      ]
    }
  ]
}
```

## Image Migration

The scraper automatically:

1. **Detects images** in content and sidebar
2. **Downloads images** from any source (GitHub, owasp.org, etc.)
3. **Uploads to Supabase** storage bucket `public-assets/chapters/{chapterId}/images/`
4. **Updates content** with new Supabase URLs
5. **Handles retries** for failed downloads

## Error Handling

- **Puppeteer failures**: Falls back to basic scraping
- **Image download failures**: Keeps original URLs
- **Database errors**: Logs errors and continues
- **Network timeouts**: Retries with exponential backoff

## Testing Strategy

1. **Single Chapter Test**: Test on Belgium (has all features)
2. **Diverse Chapters**: Test on 5 different chapter structures
3. **Admin Verification**: Check output in admin CMS
4. **Image Verification**: Ensure images are uploaded and accessible
5. **Bulk Migration**: Run on all chapters

## Troubleshooting

### Common Issues

1. **Puppeteer fails to launch**
   - Ensure Chrome/Chromium is installed
   - Check system dependencies: `npm install puppeteer`

2. **Images not migrating**
   - Check Supabase storage permissions
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is correct

3. **Tabs not detected**
   - Scraper falls back to basic extraction
   - Check browser console for JavaScript errors

4. **Database errors**
   - Run `add-volunteers-schema.sql` if volunteers field missing
   - Check Supabase connection and permissions

### Debug Mode

Enable detailed logging:

```bash
DEBUG=* npm run scrape:chapter:test -- --slug=belgium
```

## Performance Notes

- **Puppeteer overhead**: ~2-3 seconds per chapter
- **Image migration**: ~1-2 seconds per image
- **Bulk processing**: ~30-60 seconds per chapter
- **Memory usage**: ~200MB per Puppeteer instance

## Next Steps

1. Test on Belgium chapter
2. Verify output in admin CMS
3. Test on diverse chapters
4. Run bulk migration
5. Monitor for issues and optimize

## Support

For issues or questions:
- Check logs for specific error messages
- Test with `--dry-run` first
- Use `--save-output` to inspect extracted data
- Verify Supabase permissions and storage setup
