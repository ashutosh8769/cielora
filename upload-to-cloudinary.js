require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Check if credentials exist
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_API_KEY === "your_api_key_here") {
  console.error("❌ ERROR: Please add your actual Cloudinary credentials to .env.local before running this script.");
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const imagesDir = path.join(__dirname, 'public', 'images');

async function uploadImages() {
  try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    
    if (imageFiles.length === 0) {
      console.log("No images found in public/images folder.");
      return;
    }

    console.log(`Found ${imageFiles.length} images to upload...`);

    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const publicId = `cielora_products/${path.parse(file).name}`;
      
      console.log(`Uploading ${file}...`);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          overwrite: true,
          folder: 'cielora'
        });
        console.log(`✅ Uploaded ${file} -> ${result.secure_url}`);
      } catch (uploadError) {
        console.error(`❌ Failed to upload ${file}:`, uploadError.message);
      }
    }
    
    console.log("🎉 All uploads finished!");
    
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

uploadImages();
