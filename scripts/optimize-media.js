const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  images: {
    inputDir: './public/images',
    outputDir: './public/images/optimized',
    formats: ['webp', 'jpg'],
    sizes: [
      { suffix: '-sm', width: 400, quality: 80 },
      { suffix: '-md', width: 800, quality: 85 },
      { suffix: '-lg', width: 1200, quality: 90 },
      { suffix: '-xl', width: 1920, quality: 95 }
    ]
  }
};

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  // Create output directory
  if (!fs.existsSync(config.images.outputDir)) {
    fs.mkdirSync(config.images.outputDir, { recursive: true });
  }

  const files = fs.readdirSync(config.images.inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && 
    !file.includes('-sm') && 
    !file.includes('-md') && 
    !file.includes('-lg') && 
    !file.includes('-xl')
  );

  console.log(`Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(config.images.inputDir, file);
    const baseName = path.parse(file).name;
    const extension = path.parse(file).ext.toLowerCase();

    console.log(`\n📸 Processing: ${file}`);
    
    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    for (const size of config.images.sizes) {
      for (const format of config.images.formats) {
        const outputFileName = `${baseName}${size.suffix}.${format}`;
        const outputPath = path.join(config.images.outputDir, outputFileName);

        try {
          let pipeline = sharp(inputPath)
            .resize(size.width, null, { 
              withoutEnlargement: true,
              fit: 'inside'
            });

          if (format === 'webp') {
            pipeline = pipeline.webp({ quality: size.quality });
          } else {
            pipeline = pipeline.jpeg({ quality: size.quality });
          }

          await pipeline.toFile(outputPath);
          
          const newSize = fs.statSync(outputPath).size;
          const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          
          console.log(`   ✅ ${outputFileName}: ${(newSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`);
        } catch (error) {
          console.error(`   ❌ Error processing ${outputFileName}:`, error.message);
        }
      }
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

async function generateImageManifest() {
  console.log('\n📋 Generating image manifest...');
  
  const manifest = {};
  const files = fs.readdirSync(config.images.outputDir);
  
  files.forEach(file => {
    const baseName = file.split('-')[0];
    if (!manifest[baseName]) {
      manifest[baseName] = {};
    }
    
    const parts = file.split('.');
    const suffix = parts[0].includes('-') ? parts[0].split('-').slice(1).join('-') : 'original';
    const format = parts[1];
    
    if (!manifest[baseName][suffix]) {
      manifest[baseName][suffix] = {};
    }
    
    manifest[baseName][suffix][format] = `/images/optimized/${file}`;
  });
  
  fs.writeFileSync(
    './public/images/manifest.json', 
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ Image manifest generated at /public/images/manifest.json');
}

// Video optimization instructions
function printVideoOptimizationInstructions() {
  console.log('\n🎥 VIDEO OPTIMIZATION INSTRUCTIONS:');
  console.log('=====================================');
  console.log('Your current videos are too large for web:');
  console.log('• hero.mp4: 80.5 MB');
  console.log('• meeting.mp4: 20.6 MB');
  console.log('');
  console.log('RECOMMENDED ACTIONS:');
  console.log('');
  console.log('1. Install FFmpeg (https://ffmpeg.org/download.html)');
  console.log('');
  console.log('2. Create optimized versions:');
  console.log('');
  console.log('   # Create mobile-optimized version (2-3 MB)');
  console.log('   ffmpeg -i public/videos/hero.mp4 -vf "scale=720:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k public/videos/hero-mobile.mp4');
  console.log('');
  console.log('   # Create desktop-optimized version (8-12 MB)');
  console.log('   ffmpeg -i public/videos/hero.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k public/videos/hero-optimized.mp4');
  console.log('');
  console.log('   # Create WebM version for better compression (4-6 MB)');
  console.log('   ffmpeg -i public/videos/hero.mp4 -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k public/videos/hero.webm');
  console.log('');
  console.log('   # Create poster image for loading');
  console.log('   ffmpeg -i public/videos/hero.mp4 -ss 00:00:02 -vframes 1 -vf "scale=1280:-2" public/images/hero-poster.jpg');
  console.log('');
  console.log('3. Replace your current hero component with the optimized version');
  console.log('');
}

// Main execution
async function main() {
  try {
    await optimizeImages();
    await generateImageManifest();
    printVideoOptimizationInstructions();
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeImages, generateImageManifest };
