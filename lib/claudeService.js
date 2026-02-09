import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function askClaude({ prompt, model = "claude-sonnet-4-20250514", maxTokens = 2000 }) {
  const res = await client.messages.create({
    model,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  });
  return res?.content?.[0]?.text ?? JSON.stringify(res, null, 2);
}
