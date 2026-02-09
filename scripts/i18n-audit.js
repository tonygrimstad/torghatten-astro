// scripts/i18n-audit.js
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TRANS_DIR = path.join(ROOT, "src", "translations");
const CODE_DIRS = [path.join(ROOT, "src")];

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf-8"));
}

async function listFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".git" || e.name === ".astro" || e.name === "dist") continue;
      out.push(...(await listFiles(p)));
    } else if (/\.(astro|tsx?|jsx?)$/.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}

function collectKeys(obj, prefix = "", bag = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") collectKeys(v, full, bag);
    else bag.add(full);
  }
  return bag;
}

function extractTCalls(source) {
  // Finn t('...') eller t("...") – enkel, men funker bra
  const keys = [];
  const re = /\bt\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(source))) keys.push(m[1]);
  return keys;
}

async function main() {
  // last språkfiler
  const noPath = path.join(TRANS_DIR, "no.json");
  const enPath = path.join(TRANS_DIR, "en.json");
  const hasNo = await fs.access(noPath).then(() => true).catch(() => false);
  const hasEn = await fs.access(enPath).then(() => true).catch(() => false);

  if (!hasNo || !hasEn) {
    console.error("Fant ikke no.json eller en.json under src/translations");
    process.exit(1);
  }
  const NO = await readJson(noPath);
  const EN = await readJson(enPath);
  const noKeys = collectKeys(NO);
  const enKeys = collectKeys(EN);

  // scan kode og trekk ut t('key')
  const files = (await Promise.all(CODE_DIRS.map(listFiles))).flat();
  const used = new Set();
  for (const f of files) {
    const src = await fs.readFile(f, "utf-8");
    extractTCalls(src).forEach(k => used.add(k));
  }

  // manglende og ubrukte
  const missingNO = [...used].filter(k => !noKeys.has(k)).sort();
  const missingEN = [...used].filter(k => !enKeys.has(k)).sort();
  const unusedNO = [...noKeys].filter(k => !used.has(k)).sort();
  const unusedEN = [...enKeys].filter(k => !used.has(k)).sort();

  const report = {
    summary: {
      usedKeys: used.size,
      noKeys: noKeys.size,
      enKeys: enKeys.size,
      missingNO: missingNO.length,
      missingEN: missingEN.length,
      unusedNO: unusedNO.length,
      unusedEN: unusedEN.length
    },
    missing: { no: missingNO, en: missingEN },
    unused: { no: unusedNO, en: unusedEN }
  };

  console.log(JSON.stringify(report, null, 2));
  if (missingNO.length || missingEN.length) process.exitCode = 2;
}
main();
