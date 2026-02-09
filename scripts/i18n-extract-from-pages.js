#!/usr/bin/env node
/**
 * i18n extractor
 * - Skanner src/pages/no/**, src/pages/en/** og src/components/**
 * - Finner synlig tekst (basert på regex) og foreslår nøkler
 * - Skriver ut ./.i18n/extract.json med { file, key, noText?, enText? }
 */

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prosjektrot: en mappe opp fra /scripts
const projectRoot = path.resolve(__dirname, "..");

// Kataloger vi skanner
const pagesDir = path.join(projectRoot, "src", "pages");
const noDir = path.join(pagesDir, "no");
const enDir = path.join(pagesDir, "en");
const componentsDir = path.join(projectRoot, "src", "components");

// Output (matcher resten av pipeline'n vår)
const outDir = path.join(projectRoot, ".i18n");
const outFile = path.join(outDir, "extract.json");

// Filendelser vi bryr oss om
const FILE_EXTS = [".astro", ".md", ".mdx", ".jsx", ".tsx"];

// === Regex-mønstre (renset) ===
const textPatterns = [
  />[^<>{}\n]*[a-zA-ZæøåÆØÅ][^<>{}\n]*</g,                // tekst mellom HTML-tags
  /\{`([^`]+)`\}/g,                                       // template literals {`tekst`}
  /\{"([^"]+)"\}/g,                                       // uttrykk {"tekst"}
  /alt="([^"]+)"/g,                                       // alt-attr
  /title="([^"]+)"/g,                                     // title-attr
  /placeholder="([^"]+)"/g,                               // placeholder-attr
  /<option[^>]*>([^<]+)</g,
  /<button[^>]*>([^<]+)</g,
  /<label[^>]*>([^<]+)</g,
  /<span[^>]*>([^<]+)</g,
  /<div[^>]*>([^<>{}\n]*[a-zA-ZæøåÆØÅ][^<>{}\n]*)</g
];

const skipPatterns = [
  /^\s*$/,                                     // tom/whitespace
  /^[0-9\s\-_.,:;!?()\[\]{}"'`~@#$%^&*+=|\\/]+$/,
  /^[a-zA-Z0-9._-]+$/,                         // identifikatorer, klassenavn
  /^https?:\/\//, /^mailto:/, /^tel:/, /^#/,   // URL'er, anchors
  /^[A-Z_]+$/,                                 // konstante-lignende
  /^[0-9]+$/,                                  // rene tall
  /^[0-9]+\.[0-9]+$/,                          // desimaler
  /^[0-9]+:[0-9]+$/,                           // klokkeslett
  /^[0-9]{4}$/,                                // år
  /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}$/         // dato
];

// === Utils ===
function log(...args) {
  console.log(...args);
}

function shouldSkipText(text) {
  const trimmed = text.trim();
  if (trimmed.length < 2) return true;        // veldig kort
  if (trimmed.length > 2000) return true;     // ekstremt langt (fornuftig sperre)
  return skipPatterns.some((re) => re.test(trimmed));
}

function cleanBracketCapture(s) {
  // Hvis matchen er fra >tekst<, fjern vinkeltegn
  let t = s;
  if (t.startsWith(">")) t = t.slice(1);
  if (t.endsWith("<")) t = t.slice(0, -1);
  return t.trim();
}

function extractTextsFromSource(src) {
  const texts = new Set();
  for (const re of textPatterns) {
    const matches = src.matchAll(re);
    for (const m of matches) {
      const raw = m[1] ?? m[0]; // noen regexer har gruppe 1, andre bruker hele matchen
      const text = cleanBracketCapture(raw);
      if (!shouldSkipText(text)) texts.add(text.replace(/\s+/g, " ").trim());
    }
  }
  return Array.from(texts);
}

function suggestKeyFrom(text, relPath) {
  // Enkel, stabil nøkkel basert på filnavn + kort slug fra teksten
  const base = path.basename(relPath, path.extname(relPath)); // ex: index
  const slug =
    text
      .toLowerCase()
      .replace(/[æ]/g, "ae")
      .replace(/[ø]/g, "oe")
      .replace(/[å]/g, "aa")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 5) // første 5 ord
      .join("_") || "text";
  return `${base}.${slug}`; // ex: index.sign_up_now
}

async function listFilesRec(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    let entries = [];
    try {
      entries = await fsp.readdir(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = path.join(cur, e.name);
      if (e.isDirectory()) {
        stack.push(p);
      } else if (FILE_EXTS.some((ext) => e.name.endsWith(ext))) {
        out.push(p);
      }
    }
  }
  return out;
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

// === Hovedprosess ===
(async function main() {
  log("🔍 Starting i18n extraction...");
  log("Project root:", projectRoot);

  const noExists = exists(noDir);
  const enExists = exists(enDir);
  const compExists = exists(componentsDir);

  log("Pages NO dir:", noDir, "exists:", noExists);
  log("Pages EN dir:", enDir, "exists:", enExists);
  log("Components dir:", componentsDir, "exists:", compExists);

  if (!noExists && !enExists && !compExists) {
    console.error("❌ Ingen kilder å skanne. Forventet minst én av: src/pages/no, src/pages/en, src/components.");
    process.exit(1);
  }

  // Les filer
  const [noFiles, enFiles, compFiles] = await Promise.all([
    noExists ? listFilesRec(noDir) : Promise.resolve([]),
    enExists ? listFilesRec(enDir) : Promise.resolve([]),
    compExists ? listFilesRec(componentsDir) : Promise.resolve([])
  ]);

  log(`📁 NO files: ${noFiles.length}, EN files: ${enFiles.length}, COMPONENT files: ${compFiles.length}`);

  // Samle tekster pr relativ sti
  const mapNo = new Map();   // relPath from /no root -> [texts]
  const mapEn = new Map();   // relPath from /en root -> [texts]
  const compMap = new Map(); // absolute rel from projectRoot -> [texts]

  for (const f of noFiles) {
    const rel = path.relative(noDir, f).replaceAll("\\", "/"); // ex: index.astro
    const src = await fsp.readFile(f, "utf8");
    mapNo.set(rel, extractTextsFromSource(src));
  }

  for (const f of enFiles) {
    const rel = path.relative(enDir, f).replaceAll("\\", "/");
    const src = await fsp.readFile(f, "utf8");
    mapEn.set(rel, extractTextsFromSource(src));
  }

  for (const f of compFiles) {
    const rel = path.relative(projectRoot, f).replaceAll("\\", "/"); // ex: src/components/NavBar.astro
    const src = await fsp.readFile(f, "utf8");
    compMap.set(rel, extractTextsFromSource(src));
  }

  // Bygg rader
  const rows = [];

  // 1) Parvise sider: samme relative sti i /no og /en
  const allRelStis = new Set([...mapNo.keys(), ...mapEn.keys()]);
  for (const rel of allRelStis) {
    const noTexts = mapNo.get(rel) ?? [];
    const enTexts = mapEn.get(rel) ?? [];
    const maxLen = Math.max(noTexts.length, enTexts.length);
    for (let i = 0; i < maxLen; i++) {
      const noText = noTexts[i] ?? "";
      const enText = enTexts[i] ?? "";
      if (!noText && !enText) continue;

      const key = suggestKeyFrom(noText || enText, rel);
      rows.push({
        file: `pages/${rel}`, // kontekst
        key,
        noText: noText || null,
        enText: enText || null
      });
    }
  }

  // 2) Komponent-tekster (én kilde; ofte norsk først). Vi legger inn noText; enText fylles senere.
  for (const [rel, texts] of compMap.entries()) {
    for (const txt of texts) {
      const key = suggestKeyFrom(txt, rel);
      rows.push({
        file: rel,
        key,
        noText: txt,
        enText: null
      });
    }
  }

  // Rens dubletter (key + noText + enText)
  const seen = new Set();
  const deduped = [];
  for (const r of rows) {
    const sig = `${r.key}||${r.noText ?? ""}||${r.enText ?? ""}`;
    if (seen.has(sig)) continue;
    seen.add(sig);
    deduped.push(r);
  }

  // Sorter stabilt
  deduped.sort((a, b) => (a.key || "").localeCompare(b.key || ""));

  // Skriv ut
  await fsp.mkdir(outDir, { recursive: true });
  await fsp.writeFile(outFile, JSON.stringify(deduped, null, 2), "utf8");

  // Logg oppsummering
  const pairs = deduped.filter((r) => r.noText && r.enText).length;
  const onlyNo = deduped.filter((r) => r.noText && !r.enText).length;
  const onlyEn = deduped.filter((r) => !r.noText && r.enText).length;

  log(`\n💾 Skrevet: ${path.relative(projectRoot, outFile)}`);
  log(`🔑 Nøkler totalt: ${deduped.length} (parvise: ${pairs}, kun NO: ${onlyNo}, kun EN: ${onlyEn})`);
  log(`\n✅ Ferdig! Kjør 'npm run i18n:merge' for å merge til src/translations/no.json og en.json.`);
})();
