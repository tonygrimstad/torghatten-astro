import fs from "node:fs/promises";
import { askClaude } from "../lib/claudeService.js";

const file = process.argv[2];
if (!file) {
  console.error("Bruk: npm run claude:review <sti/til/fil>");
  process.exit(1);
}

const code = await fs.readFile(file, "utf-8");
const prompt = `
Du er en streng, praktisk seniorutvikler. Gjør en kort, punktvis review:
- Lesbarhet og struktur
- Potensielle feil/edge cases
- Ytelse og vedlikehold
- Konkrete, minimale forbedringsforslag med kode

Fil: ${file}

Kode:
\`\`\`
${code}
\`\`\`
`;

const out = await askClaude({ prompt, maxTokens: 1200 });
console.log("\n=== CODE REVIEW ===\n");
console.log(out);
