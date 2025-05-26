// src/pages/api/feature-toggles.json.ts

import type { APIRoute } from "astro";
import { featureToggles, isFeatureActive } from "../../config/siteConfig.ts";

export const GET: APIRoute = async () => {
  const toggles = Object.entries(featureToggles).map(([key, toggle]) => ({
    key,
    ...toggle,
    active: isFeatureActive(key as keyof typeof featureToggles),
  }));

  return new Response(JSON.stringify(toggles, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
