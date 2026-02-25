import noTranslations from "../translations/no.json";
import enTranslations from "../translations/en.json";
import type { TranslationKey, Translations } from "../types/translations";

export function useTranslations(url: URL) {
  const [, lang] = url.pathname.split("/");

  const urlLang = lang === "en" ? "en" : "no";

  // Use only JSON translations
  const jsonTranslations: Translations =
    urlLang === "no" ? noTranslations : enTranslations;

  /**
   * Get translated text with type-safe keys
   * @param key - Dot-notation translation key (type-safe)
   * @param fallback - Fallback text if key not found
   * @returns Translated string or fallback
   */
  const t = (key: TranslationKey, fallback?: string): string | undefined => {
    // Navigate through the translation object using dot notation
    const parts = key.split(".");
    let value: any = jsonTranslations;

    for (const part of parts) {
      if (value?.[part] === undefined) {
        return fallback || undefined;
      }
      value = value[part];
    }

    return value || fallback;
  };

  /**
   * Get raw translation data (for objects/arrays)
   * @param key - Dot-notation translation key
   * @returns Raw data without string conversion
   */
  const getRaw = (key: string): any => {
    // Return raw data without string conversion
    const parts = key.split(".");
    let value: any = jsonTranslations;

    for (const part of parts) {
      if (value?.[part] === undefined) {
        return undefined;
      }
      value = value[part];
    }

    return value;
  };

  return { t, getRaw, currentLang: urlLang };
}
