// ======================================================================
// Torghatten Maraton website (astro)
// Utviklet av TonyG (github.com/tonygrimstad) siden 2014
// ======================================================================




//src/config/siteConfig.ts

export const siteMeta = {
  phone: "", // hvis du ikke ønsker å vise telefon, sett denne til ""
};


// Hvilke nøkler som er gyldige i toggles
export type FeatureToggleKey =
  | "infoSection"
  | "videoSection"
  | "recordsSection"
  | "signupHint"
  | "programSection"
  | "liveScroll"
  | "raceYear"
  | "raceDate"
  | "signupButton"

  | "Distanser"
  | "Resultater"
  | "Øyeblikk"
  | "Overnatting"
  | "OmOss"
  | "SponsorerMeny"
  | "SponsorerForsiden"
  | "SponsorerAlleSider"
  | "Helgelandslopene";

// Toggle-typen støtter nå også `text`
export type FeatureToggle = {
  enabled?: boolean;
  from?: string; // datoformat: YYYY-MM-DD
  to?: string;
  text?: string;
  url?: string; //
};

// Selve togglene
export const featureToggles: Record<FeatureToggleKey, FeatureToggle> = {
  // Informasjon til deltagere på distansesidene
  infoSection: {
    enabled: false,
    from: "2026-02-01",
    to: "2026-04-26",
  },
  videoSection: {
    enabled: true,
  },
  recordsSection: {
    enabled: true,
  },
  signupHint: {
    enabled: false,
    from: "2026-04-20",
    to: "2026-04-26"
  },
  programSection: {
    enabled: false,
    from: "2026-04-21T08:00:00",
    to: "2026-04-25T16:00:00",
  },
  liveScroll: {
    enabled: true,
    // Oppdatert dato og tid for live scroll
    from: "2026-04-25T09:55:00",
    to: "2026-04-25T16:00:00",
    // Oppdatert URL for live scroll
    url: "https://live.eqtiming.com/80036#livescroll",
  },
  raceYear: {
    enabled: true,
    from: "2026-01-01T00:00:00",
    to: "2026-04-25T15:00:00",
    text: "2026",
  },
  raceDate: {
    enabled: true,
    from: "2026-01-01T00:00:00",
    to: "2026-04-25T15:00:00",
    text: "25. april 2026",
  },
  signupButton: {
    enabled: true,
    from: "2026-01-01T00:00:00",
    to: "2026-04-25T15:00:00",

    url: "https://signup.eqtiming.com/?Event=Torghatten&lang=norwegian",
  },

  Øyeblikk: {
    enabled: true,
    from: "2026-01-01",
    to: "2030-12-31"
  },
  Distanser: {
    enabled: true,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  Resultater: {
    enabled: true,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  Overnatting: {
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  OmOss: {
    enabled: true,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  Helgelandslopene: {
    enabled: false,
    from: "2025-01-01",
    to: "2025-12-31",
    text: undefined,
    url: undefined
  },
  SponsorerMeny: {
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  SponsorerForsiden: {
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  SponsorerAlleSider: {
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  }
};

// Tidssone for nettstedet – sett én gang, brukes for alle datoer uten eksplisitt tidssone
const SITE_TIMEZONE = "Europe/Oslo";

// Intern hjelper: finn UTC-offset-streng (f.eks. "+02:00") for en dato i gitt tidssone
function getUtcOffsetStr(date: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = /GMT([+-])(\d+)(?::(\d+))?/.exec(tzName);
  if (!match) return "+00:00";
  const [, sign, h, m = "00"] = match;
  return `${sign}${String(Number.parseInt(h)).padStart(2, "0")}:${m.padStart(2, "0")}`;
}

// Intern hjelper: tolker datostreng som lokal tid i SITE_TIMEZONE (håndterer sommertid/vintertid)
// Datoer som allerede har tidssone (f.eks. +02:00 eller Z) brukes direkte.
function parseToggleDate(dateStr: string): Date {
  if ((/(?:Z|[+-]\d{2}:\d{2})$/).test(dateStr)) {
    return new Date(dateStr);
  }
  const approxUtc = new Date(dateStr + "Z");
  return new Date(dateStr + getUtcOffsetStr(approxUtc, SITE_TIMEZONE));
}

// Hjelpefunksjon for å sjekke om en feature er aktiv
export function isFeatureActive(key: FeatureToggleKey): boolean {
  const toggle = featureToggles[key];

  if (!toggle || toggle.enabled === false) return false;

  const today = new Date();
  const from = toggle.from ? parseToggleDate(toggle.from) : null;
  const to = toggle.to ? parseToggleDate(toggle.to) : null;

  if (from && today < from) return false;
  if (to && today > to) return false;

  return true;
}

// Ny hjelpefunksjon for å hente tekst (hvis togglen er aktiv)
export function getFeatureText(key: FeatureToggleKey): string | undefined {
  return isFeatureActive(key) ? featureToggles[key].text : undefined;
}
export function getFeatureUrl(key: FeatureToggleKey): string | undefined {
  return isFeatureActive(key) ? featureToggles[key]?.url : undefined;
}

export function isValidToggleKey(key: string): key is FeatureToggleKey {
  return key in featureToggles;
}
