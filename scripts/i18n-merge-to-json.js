#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

function loadJsonFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
    return {};
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return {};
  }
}

function saveJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved: ${filePath}`);
  } catch (error) {
    console.error(`Error saving ${filePath}:`, error.message);
  }
}

function setNestedValue(obj, key, value) {
  const parts = key.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
}

function getNestedValue(obj, key) {
  const parts = key.split('.');
  let current = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
}

function mergeTranslations(extractedData) {
  console.log('🔄 Merging translations...\n');

  const noTranslationsPath = path.join(projectRoot, 'src', 'translations', 'no.json');
  const enTranslationsPath = path.join(projectRoot, 'src', 'translations', 'en.json');

  // Load existing translations
  const noTranslations = loadJsonFile(noTranslationsPath);
  const enTranslations = loadJsonFile(enTranslationsPath);

  let addedCount = 0;
  let skippedCount = 0;

  for (const entry of extractedData) {
    const { suggestedKey, noText, enText } = entry;

    // Check if key already exists in both files
    const existingNo = getNestedValue(noTranslations, suggestedKey);
    const existingEn = getNestedValue(enTranslations, suggestedKey);

    if (existingNo && existingEn) {
      console.log(`⏭️  Skipped (already exists): ${suggestedKey}`);
      skippedCount++;
      continue;
    }

    // Add new translations
    setNestedValue(noTranslations, suggestedKey, noText);
    setNestedValue(enTranslations, suggestedKey, enText);

    console.log(`➕ Added: ${suggestedKey}`);
    console.log(`   🇳🇴 ${noText}`);
    console.log(`   🇬🇧 ${enText}`);
    console.log('');

    addedCount++;
  }

  // Save updated files
  saveJsonFile(noTranslationsPath, noTranslations);
  saveJsonFile(enTranslationsPath, enTranslations);

  console.log(`📊 Summary:`);
  console.log(`   ➕ Added: ${addedCount} new translations`);
  console.log(`   ⏭️  Skipped: ${skippedCount} existing translations`);
  console.log(`\n✅ Merge complete!`);
}

function main() {
  const extractOutputPath = path.join(projectRoot, 'scripts', 'i18n-extract-output.json');

  if (!fs.existsSync(extractOutputPath)) {
    console.error('❌ Extract output file not found. Run "npm run i18n:extract" first.');
    process.exit(1);
  }

  try {
    const extractedData = JSON.parse(fs.readFileSync(extractOutputPath, 'utf8'));
    console.log(`📖 Loading ${extractedData.length} extracted translations...\n`);

    mergeTranslations(extractedData);
  } catch (error) {
    console.error('❌ Error reading extract output:', error.message);
    process.exit(1);
  }
}

main();
