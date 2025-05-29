// src/utils/useTranslations.ts
import { translations, defaultLang } from "../config/i18n";

export function useTranslations(url: URL) {
  const langParam = url.searchParams.get("lang") ?? defaultLang;
  type LangKey = keyof typeof translations;
  const lang = (langParam in translations ? langParam : defaultLang) as LangKey;

  function t(path: string): string {
    const keys = path.split(".");
    let result: any = translations[lang];
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) return path; // fallback
    }
    return result;
  }

  return { t, lang };
}
