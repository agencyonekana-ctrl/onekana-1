import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'images', 'payments');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const logos = [
  { name: 'visa.png', url: 'https://logo.clearbit.com/visa.com' },
  { name: 'mastercard.png', url: 'https://logo.clearbit.com/mastercard.com' },
  { name: 'airtel.png', url: 'https://logo.clearbit.com/airtel.com' },
  { name: 'orange.png', url: 'https://logo.clearbit.com/orange.com' },
  { name: 'mpesa.png', url: 'https://logo.clearbit.com/vodacom.com' }, // Vodacom uses M-Pesa
  { name: 'africell.png', url: 'https://logo.clearbit.com/africell.com' }
];

console.log('Downloading payment logos...');

logos.forEach(logo => {
  const filePath = path.join(dir, logo.name);
  const file = fs.createWriteStream(filePath);
  
  https.get(logo.url, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
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
