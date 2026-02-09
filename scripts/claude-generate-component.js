import { askClaude } from "../lib/claudeService.js";

const spec = process.argv.slice(2).join(" ");
if (!spec) {
  console.error("Bruk: npm run claude:gen 'Kort spes på komponenten'");
  process.exit(1);
}

const prompt = `
Lag et Astro-komponentskjelett ut fra denne spesifikasjonen:

${spec}

Krav:
- Bruk Astro-syntaks (.astro)
- Tailwind for styling (enkel, ryddig)
- Minimal, men klar til å utvide
- Ikke dummy lorem ipsum, men nøytral tekst
`;

const code = await askClaude({ prompt, maxTokens: 1200 });
console.log("\n=== KOMPONENT ===\n");
console.log(code);
