import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("Mangler ANTHROPIC_API_KEY i .env (på prosjektrot).");
  process.exit(1);
}

const client = new Anthropic({ apiKey });

async function main() {
  try {
    const res = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        { role: "user", content: "Hei Claude! Fungerer du i mitt Astro-prosjekt?" }
      ],
    });
    console.log("\nSvar fra Claude:\n");
    console.log(res?.content?.[0]?.text ?? JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Feil ved kall til Claude:", err?.response?.data ?? err?.message ?? err);
    process.exit(1);
  }
}

main();
