import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'images', 'partners');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const logos = [
  { name: 'vodacom.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodacom_logo.svg' },
  { name: 'airtel.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Airtel_logo.svg' },
  { name: 'orange.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg' },
  { name: 'canalplus.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Canal%2B_logo.svg' },
  { name: 'rawbank.png', url: 'https://logo.clearbit.com/rawbank.com' },
  { name: 'equity-bcdc.png', url: 'https://logo.clearbit.com/equitybcdc.cd' }
];

console.log('Downloading partner logos...');

logos.forEach(logo => {
  const filePath = path.join(dir, logo.name);
  const file = fs.createWriteStream(filePath);
  
  https.get(logo.url, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      // Handle redirect
      https.get(response.headers.location, (res) => {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${logo.name}`);
        });
      });
    } else {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${logo.name}`);
      });
    }
  }).on('error', (err) => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${logo.name}:`, err.message);
  });
});
