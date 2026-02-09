#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const NO_JSON = path.join(ROOT, "src", "translations", "no.json");
const EN_JSON = path.join(ROOT, "src", "translations", "en.json");
const EXTRACT = path.join(ROOT, ".i18n", "extract.json");

function collectKeys(obj, prefix = "", bag = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") collectKeys(v, full, bag);
    else bag.add(full);
  }
  return bag;
}
function setNested(obj, keyPath, value) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] ||= {};
    cur = cur[parts[i]];
  }
  const last = parts[parts.length - 1];
  if (cur[last] == null) cur[last] = value;
}

async function listFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listFiles(p)));
    else if (/\.(astro|tsx?|jsx?)$/.test(e.name)) out.push(p);
  }
  return out;
}
function extractTCalls(src) {
  const keys = [];
  const re = /\bt\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(src))) keys.push(m[1]);
  return keys;
}

async function main() {
  // 1) Les brukte nøkler fra kode
  const files = await listFiles(SRC);
  const used = new Set();
  for (const f of files) {
    const s = await fs.readFile(f, "utf8");
    extractTCalls(s).forEach(k => used.add(k));
  }

  // 2) Les eksisterende oversettelser
  const NO = JSON.parse(await fs.readFile(NO_JSON, "utf8"));
  const EN = JSON.parse(await fs.readFile(EN_JSON, "utf8"));
  const noKeys = collectKeys(NO);
  const enKeys = collectKeys(EN);

  // 3) Les extract for å hente norsk/engelsk tekst om tilgjengelig
  let extractRows = [];
  try {
    extractRows = JSON.parse(await fs.readFile(EXTRACT, "utf8"));
  } catch {}
  const byKey = new Map();
  for (const r of extractRows) byKey.set(r.key, r);

  // 4) Fyll manglende i NO/EN
  let addedNO = 0, addedEN = 0;
  for (const key of used) {
    if (!noKeys.has(key)) {
      const txt = byKey.get(key)?.noText ?? key; // bruk noText hvis vi fant, ellers nøkkelnavnet som plassholder
      setNested(NO, key, txt);
      addedNO++;
    }
    if (!enKeys.has(key)) {
      const txt = byKey.get(key)?.enText ?? ""; // tom str -> lettere å se hva som mangler oversettelse
      setNested(EN, key, txt);
      addedEN++;
    }
  }

  await fs.writeFile(NO_JSON, JSON.stringify(NO, null, 2), "utf8");
  await fs.writeFile(EN_JSON, JSON.stringify(EN, null, 2), "utf8");

  console.log(`✅ Filled missing keys. Added NO: ${addedNO}, EN: ${addedEN}`);
  console.log("Hint: Kjør npm run i18n:audit på nytt, så oversetter du tomme EN-verdier etter behov.");
}
main().catch(e => { console.error(e); process.exit(1); });
