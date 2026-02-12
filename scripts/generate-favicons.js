#!/usr/bin/env node

/**
 * Script for å generere favicon i forskjellige format og størrelser
 * Krever sharp: npm install sharp
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateFavicons() {
  const publicDir = path.join(process.cwd(), 'public');
  const faviconJpg = path.join(publicDir, 'favicon.jpg');
  const faviconSvg = path.join(publicDir, 'favicon.svg');

  // Finn hvilken source-fil som skal brukes
  let sourceFile;
  if (fs.existsSync(faviconJpg)) {
    sourceFile = faviconJpg;
    console.log('📸 Bruker favicon.jpg som source');
  } else if (fs.existsSync(faviconSvg)) {
    sourceFile = faviconSvg;
    console.log('🎨 Bruker favicon.svg som source');
  } else {
    console.error('❌ Ingen favicon source funnet (favicon.jpg eller favicon.svg)');
    return;
  }

  console.log('🎨 Genererer favicons...');

  try {
    // favicon.ico (32x32 ICO format)
    const icoBuffer = await sharp(sourceFile)
      .resize(32, 32)
      .png()
      .toBuffer();

    // Skriv ICO fil (Sharp kan ikke direkte lage ICO, så vi lager PNG som ICO)
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('✅ favicon.ico');

    // 16x16 PNG
    await sharp(sourceFile)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ favicon-16x16.png');

    // 32x32 PNG
    await sharp(sourceFile)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png');

    // Apple Touch Icon 180x180
    await sharp(sourceFile)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png');

    // 192x192 for manifest.json
    await sharp(sourceFile)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'favicon-192x192.png'));
    console.log('✅ favicon-192x192.png');

    // 512x512 for manifest.json
    await sharp(sourceFile)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'favicon-512x512.png'));
    console.log('✅ favicon-512x512.png');

    console.log('🎉 Alle favicons generert!');

  } catch (error) {
    console.error('❌ Feil ved generering av favicons:', error.message);
    console.log('\n💡 Installer sharp: npm install --save-dev sharp');
  }
}

// Kjør scriptet med top-level await
await generateFavicons();
