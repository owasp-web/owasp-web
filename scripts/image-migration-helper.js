const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

/**
 * Download image from any URL with retry logic
 */
async function downloadImage(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`   📥 Downloading image (attempt ${attempt}/${retries}): ${url}`);
      
      const response = await axios.get(url, { 
        responseType: 'arraybuffer',
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const buffer = Buffer.from(response.data);
      const contentType = response.headers['content-type'] || 'image/jpeg';
      
      console.log(`   ✅ Downloaded ${buffer.length} bytes (${contentType})`);
      return { buffer, contentType };
      
    } catch (error) {
      console.log(`   ❌ Download attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.log(`   ⚠️  Failed to download after ${retries} attempts: ${url}`);
        return null;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
}

/**
 * Upload image to Supabase storage
 */
async function uploadToSupabase(buffer, chapterId, filename, supabase) {
  try {
    // Determine file extension from content type or filename
    const contentType = buffer.contentType || 'image/jpeg';
    const ext = contentType.split('/')[1] || 'jpg';
    const cleanFilename = filename.replace(/[^a-z0-9.-]/gi, '-').toLowerCase();
    const finalFilename = cleanFilename.endsWith(`.${ext}`) ? cleanFilename : `${cleanFilename}.${ext}`;
    
    const storagePath = `chapters/${chapterId}/images/${finalFilename}`;
    
    console.log(`   📤 Uploading to Supabase: ${storagePath}`);
    
    const { data, error } = await supabase.storage
      .from('public-assets')
      .upload(storagePath, buffer.buffer, {
        contentType: buffer.contentType,
        upsert: true
      });
    
    if (error) {
      console.error(`   ❌ Upload failed: ${error.message}`);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('public-assets')
      .getPublicUrl(storagePath);
    
    console.log(`   ✅ Uploaded successfully: ${publicUrl}`);
    return publicUrl;
    
  } catch (error) {
    console.error(`   ❌ Upload error: ${error.message}`);
    return null;
  }
}

/**
 * Download and upload image, returning new URL
 */
async function migrateImage(imageUrl, chapterId, imageName, supabase) {
  try {
    // Skip if already a Supabase URL
    if (imageUrl.includes('supabase') || imageUrl.includes('storage.googleapis.com')) {
      console.log(`   ⏭️  Skipping already migrated image: ${imageUrl}`);
      return imageUrl;
    }
    
    // Download image
    const imageData = await downloadImage(imageUrl);
    if (!imageData) {
      return imageUrl; // Return original URL if download failed
    }
    
    // Upload to Supabase
    const newUrl = await uploadToSupabase(imageData, chapterId, imageName, supabase);
    if (!newUrl) {
      return imageUrl; // Return original URL if upload failed
    }
    
    return newUrl;
    
  } catch (error) {
    console.error(`   ❌ Image migration error: ${error.message}`);
    return imageUrl; // Return original URL on error
  }
}

/**
 * Replace image URLs in content with new Supabase URLs
 */
function replaceImageUrls(content, imageMap) {
  if (!content || !imageMap) return content;
  
  let updatedContent = content;
  for (const [oldUrl, newUrl] of Object.entries(imageMap)) {
    if (oldUrl !== newUrl) {
      updatedContent = updatedContent.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
    }
  }
  return updatedContent;
}

/**
 * Extract all image URLs from content
 */
function extractImageUrls(content) {
  if (!content) return [];
  
  const imageUrls = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const markdownRegex = /!\[.*?\]\(([^)]+)\)/gi;
  
  let match;
  
  // Extract from HTML img tags
  while ((match = imgRegex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  
  // Extract from markdown images
  while ((match = markdownRegex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  
  return [...new Set(imageUrls)]; // Remove duplicates
}

/**
 * Migrate all images in content and return updated content with new URLs
 */
async function migrateContentImages(content, chapterId, supabase) {
  if (!content) return { content, imageCount: 0 };
  
  const imageUrls = extractImageUrls(content);
  if (imageUrls.length === 0) {
    return { content, imageCount: 0 };
  }
  
  console.log(`   🖼️  Found ${imageUrls.length} images to migrate`);
  
  const imageMap = {};
  let migratedCount = 0;
  
  for (const imageUrl of imageUrls) {
    try {
      // Generate a filename from the URL
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1] || `image-${Date.now()}`;
      
      const newUrl = await migrateImage(imageUrl, chapterId, filename, supabase);
      imageMap[imageUrl] = newUrl;
      
      if (newUrl !== imageUrl) {
        migratedCount++;
      }
      
      // Add delay to avoid overwhelming servers
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`   ❌ Failed to migrate image ${imageUrl}: ${error.message}`);
      imageMap[imageUrl] = imageUrl; // Keep original URL
    }
  }
  
  const updatedContent = replaceImageUrls(content, imageMap);
  
  console.log(`   ✅ Migrated ${migratedCount}/${imageUrls.length} images`);
  
  return { content: updatedContent, imageCount: migratedCount };
}

module.exports = {
  downloadImage,
  uploadToSupabase,
  migrateImage,
  replaceImageUrls,
  extractImageUrls,
  migrateContentImages
};
