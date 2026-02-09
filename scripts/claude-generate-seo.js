// scripts/claude-generate-seo.js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { askClaude } from "../lib/claudeService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = process.argv[2];
if (!file) {
  console.error("Bruk: npm run claude:seo <sti/til/side.astro>");
  process.exit(1);
}

const abs = path.isAbsolute(file) ? file : path.join(process.cwd(), file);

// Les inn sideinnhold
let content;
try {
  content = await fs.readFile(abs, "utf8");
} catch (e) {
  console.error(`Fant ikke filen: ${abs}`);
  process.exit(1);
}

const prompt = `
Du skal generere SEO-metadata fra en Astro-side.
Gi KUN gyldig JSON (ingen forklaringstekst), med dette skjemaet:

{
  "title": "maks ~60 tegn",
  "description": "maks ~155 tegn",
  "keywords": ["3-8 relevante nøkkelord"],
  "og": {
    "title": "...",
    "description": "...",
    "type": "website",
    "image": "/assets/og-default.jpg"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "...",
    "description": "...",
    "image": "/assets/og-default.jpg"
  }
}

Bruk kort, tydelig norsk. Ikke overdriv. Ikke inkludér URL-er. Ikke skriv kodeblokker.
Her er sideinnholdet:

${content}
`;

let jsonText = await askClaude({ prompt, maxTokens: 800 });
try {
  // Noen plugins kan wrappe i ```json ... ```
  jsonText = jsonText.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  const data = JSON.parse(jsonText);

  const rel = path.relative(process.cwd(), abs);
  const dir = path.join(process.cwd(), "src", "seo");
  await fs.mkdir(dir, { recursive: true });

  const base = path.basename(rel).replace(/\.astro$/i, "");
  const outPath = path.join(dir, `${base}.json`);
  await fs.writeFile(outPath, JSON.stringify(data, null, 2), "utf8");

  console.log(`✅ SEO generert: ${path.relative(process.cwd(), outPath)}\n`);

  // Snippet til frontmatter/head
  console.log("=== Lim dette inn i layout/side ===\n");
  console.log(`---
// valgfritt: side-spesifikk seo lastet inn i komponenten
---`);
  console.log(`
<!-- Head (Astro) -->
<head>
  <title>${data.title}</title>
  <meta name="description" content="${data.description}" />
  <meta name="keywords" content="${(data.keywords || []).join(", ")}" />
  <meta property="og:title" content="${data.og?.title || data.title}" />
  <meta property="og:description" content="${data.og?.description || data.description}" />
  <meta property="og:type" content="${data.og?.type || "website"}" />
  <meta property="og:image" content="${data.og?.image || "/assets/og-default.jpg"}" />
  <meta name="twitter:card" content="${data.twitter?.card || "summary_large_image"}" />
  <meta name="twitter:title" content="${data.twitter?.title || data.title}" />
  <meta name="twitter:description" content="${data.twitter?.description || data.description}" />
  <meta name="twitter:image" content="${data.twitter?.image || "/assets/og-default.jpg"}" />
</head>`.trim());
} catch (e) {
  console.error("Kunne ikke parse JSON fra Claude. Rå output:\n", jsonText);
  console.error("\nFeil:", e.message);
  process.exit(1);
}
