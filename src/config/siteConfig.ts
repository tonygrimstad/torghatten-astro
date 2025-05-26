// ======================================================================
// Torghatten Maraton website (astro)
// Utviklet av Tony Grimstad (github.com/tonygrimstad) siden 2014
// ======================================================================

// src/config/siteConfig.ts

export const siteMeta = {
  siteName: "Torghatten Maraton",
  email: "post@torghattenmaraton.no",
  phone: "", // hvis du ikke ønsker å vise telefon, sett denne til ""
  description:
    "Torghatten Maraton ble arrangert første gang i 2015 og arrangeres årlig siste helgen i april. Løpet går i naturskjønne omgivelser på Torgøyan i Brønnøy kommune.",
  orgName: "Sport Torghatten Idrettslag",
  orgUrl: "https://sporttorghatten.no",
};


// Hvilke nøkler som er gyldige i toggles
export type FeatureToggleKey =
  | "infoSection"
  | "videoSection"
  | "recordsSection"
  | "signupHint"
  | "promoBanner"
  | "raceYear"
  | "raceDate"
  | "signupButton"
  | "signupUrl"
  | "Distanser"
  | "Resultater"
  | "Bilder"
  | "Overnatting"
  | "OmOss"
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
  infoSection: {
    enabled: true,
    from: "2025-02-01",
    to: "2025-04-26",
  },
  videoSection: {
    enabled: false,
  },
  recordsSection: {
    enabled: true,
  },
  signupHint: {
    enabled: false,
    to: "2025-04-25",
    text: "📣 Påmelding er åpen frem til 25. april!",
  },
  promoBanner: {
    enabled: false,
  },
  raceYear: {
    enabled: true,
    from: "2025-01-01",
    to: "2025-12-31",
    text: "2026",
  },
  raceDate: {
    enabled: false,
    from: "2025-01-01",
    to: "2025-12-31",
    text: "25. april 2026",
  },
  signupButton: {
    enabled: false,
    from: "2025-01-01",
    to: "2025-12-31",
    text: "Meld deg på nå",
    url: "https://live.eqtiming.com/74867#dashboard",
  },
  signupUrl: {
    enabled: false,
    from: "2025-01-01",
    to: "2025-12-31",
    text: "https://live.eqtiming.com/74867#dashboard",
  },
  Bilder: {
    enabled: false,
    from: "2025-01-01",
    to: "2025-02-31"
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
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  },
  Helgelandslopene: {
    enabled: false,
    from: undefined,
    to: undefined,
    text: undefined,
    url: undefined
  }
};

// Hjelpefunksjon for å sjekke om en feature er aktiv
export function isFeatureActive(key: FeatureToggleKey): boolean {
  const toggle = featureToggles[key];

  if (!toggle || toggle.enabled === false) return false;

  const today = new Date();
  const from = toggle.from ? new Date(toggle.from) : null;
  const to = toggle.to ? new Date(toggle.to) : null;

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
