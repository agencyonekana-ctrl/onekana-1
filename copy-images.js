import fs from 'fs';
import path from 'path';

const imagesToCopy = [
  {
    src: 'C:\\Users\\TERRA NET\\.gemini\\antigravity\\brain\\4524d473-f87a-48ee-8cb7-4718b566121d\\hero_bg_3d_1779185866735.png',
    dest: 'g:\\Users\\FAGHI CHOLA\\onekana\\public\\images\\hero_bg_3d.png'
  },
  {
    src: 'C:\\Users\\TERRA NET\\.gemini\\antigravity\\brain\\4524d473-f87a-48ee-8cb7-4718b566121d\\digistreet_3d_1779185901793.png',
    dest: 'g:\\Users\\FAGHI CHOLA\\onekana\\public\\images\\digistreet_3d.png'
  },
  {
    src: 'C:\\Users\\TERRA NET\\.gemini\\antigravity\\brain\\4524d473-f87a-48ee-8cb7-4718b566121d\\cta_banner_3d_1779186276773.png',
    dest: 'g:\\Users\\FAGHI CHOLA\\onekana\\public\\images\\cta_banner_3d.png'
  }
];

// Ensure public/images directory exists
const targetDir = 'g:\\Users\\FAGHI CHOLA\\onekana\\public\\images';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

imagesToCopy.forEach(img => {
  if (fs.existsSync(img.src)) {
    fs.copyFileSync(img.src, img.dest);
    console.log(`Copied ${img.src} to ${img.dest}`);
  } else {
    console.error(`Source image not found: ${img.src}`);
  }
});
