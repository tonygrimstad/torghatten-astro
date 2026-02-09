import fs from "node:fs/promises";
import path from "node:path";
import { askClaude } from "../lib/claudeService.js";

const ROOT = process.cwd();
const IGNORE_DIRS = ["node_modules", ".git", ".taskmaster/cache", "dist", ".astro"];
const KEY_FILES = [
  "package.json",
  "astro.config.*",
  "tailwind.config.*",
  "src/pages/index.astro",
  "src/layouts/BaseLayout.astro",
  "src/components/**",
  "public/**"
];

// enkel globs (uten lib) – går gjennom alt og filtrerer
async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (IGNORE_DIRS.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listFiles(p)));
    else out.push(p);
  }
  return out;
}

function matchKeyFiles(files) {
  // naive match (inneholder navnet)
  const wanted = [];
  for (const f of files) {
    const rel = path.relative(ROOT, f).replaceAll("\\", "/");
    if (
      KEY_FILES.some(k =>
        k.endsWith("/**")
          ? rel.startsWith(k.replace("/**",""))
          : rel.includes(k.replace("*", ""))
      )
    ) {
      wanted.push(rel);
    }
  }
  return wanted.slice(0, 60); // begrens volum
}

async function loadSamples(paths) {
  const items = [];
  for (const rel of paths) {
    try {
      const text = await fs.readFile(path.join(ROOT, rel), "utf8");
      items.push({ file: rel, content: text.slice(0, 6000) }); // cap pr fil
    } catch {}
  }
  return items;
}

function readExistingTasksSync() {
  // bruk eksisterende tasks (for å unngå duplikater)
  const candidates = [
    path.join(ROOT, ".taskmaster", "tasks", "tasks.json"),
    path.join(ROOT, ".taskmaster", "tasks", "tasks.generated.json")
  ];
  for (const p of candidates) {
    try {
      const data = require(p);
      return Array.isArray(data) ? data : data.tasks || [];
    } catch {}
  }
  return [];
}

const newNeeds = process.argv.slice(2).join(" "); // fritekst behov

const existing = readExistingTasksSync().map(t => (t.title || "").toLowerCase());
const allFiles = await listFiles(ROOT);
const keyFiles = matchKeyFiles(allFiles);
const samples = await loadSamples(keyFiles);

const prompt = `
Du er Task-planner. Les repo-konteksten og foreslå neste, konkrete oppgaver.

VIKTIG:
- Returner KUN gyldig JSON (ingen tekst utenom).
- Ikke dupliser eksisterende titler (case-insensitive): ${JSON.stringify(existing.slice(0,50))}
- Hold deg til dagens stack (Astro, Tailwind).
- Små, leverbare tasks (30–120 min).
- Hver task må ha tydelig "acceptanceCriteria".

Schema (array):
[
  {
    "title": "Kort, handlingsorientert",
    "why": "Hvorfor dette trengs nå",
    "status": "todo",
    "priority": "high|medium|low",
    "estimate": "30m|1h|2h",
    "labels": ["astro","frontend","infra"],
    "files": ["relativ/sti/om relevant"],
    "dependsOn": ["(valgfritt) annen task title"],
    "acceptanceCriteria": [
      "Sjekkpunkter som beviser at tasken er ferdig"
    ]
  }
]

Nye behov/krav fra eier (kan generere tasks):
${newNeeds || "(ingen nye behov eksplisitt oppgitt)"}

Repo-oversikt (utvalg filer):
${keyFiles.map(f => "- " + f).join("\n")}

Utdrag fra nøkkelfiler (trunkert):
${samples.map(s => `\n---\nFILE: ${s.file}\n${s.content}`).join("\n")}
`;

let raw = await askClaude({ prompt, maxTokens: 3000 });

// fjern ev. ```json-wrap
raw = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
let tasks;
try {
  tasks = JSON.parse(raw);
  if (!Array.isArray(tasks)) throw new Error("Claude returnerte ikke en array");
} catch (e) {
  console.error("Kunne ikke parse JSON fra Claude. Rå output:\n", raw);
  console.error("\nFeil:", e.message);
  process.exit(1);
}

// lagre separat slik at du kan merge manuelt
const outDir = path.join(ROOT, ".taskmaster", "tasks");
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, "tasks.generated.json");
await fs.writeFile(outPath, JSON.stringify(tasks, null, 2), "utf8");

console.log(`✅ Genererte forslag: ${path.relative(ROOT, outPath)}`);
console.log("Tips: Kopiér inn relevante tasks i tasks.json, eller behold begge og jobb parallelt.");
