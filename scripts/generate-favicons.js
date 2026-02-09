#!/usr/bin/env node

/**
 * Script for å generere favicon i forskjellige format og størrelser
 * Krever sharp: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateFavicons() {
  const publicDir = path.join(process.cwd(), 'public');
  const faviconSvg = path.join(publicDir, 'favicon.svg');

  // Sjekk om SVG eksisterer
  if (!fs.existsSync(faviconSvg)) {
    console.error('❌ favicon.svg ikke funnet i public/');
    return;
  }

  console.log('🎨 Genererer favicons...');

  try {
    // 16x16 PNG
    await sharp(faviconSvg)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ favicon-16x16.png');

    // 32x32 PNG
    await sharp(faviconSvg)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png');

    // Apple Touch Icon 180x180
    await sharp(faviconSvg)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png');

    console.log('🎉 Alle favicons generert!');

  } catch (error) {
    console.error('❌ Feil ved generering av favicons:', error.message);
    console.log('\n💡 Installer sharp: npm install --save-dev sharp');
  }
}

// Kjør scriptet
generateFavicons();
