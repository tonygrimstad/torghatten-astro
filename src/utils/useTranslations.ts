import noTranslations from "../translations/no.json";
import enTranslations from "../translations/en.json";

type Translations = Record<string, any>;

export function useTranslations(url: URL) {
  const [, lang] = url.pathname.split("/");

  const urlLang = lang === "en" ? "en" : "no";

  // Use only JSON translations
  const jsonTranslations = urlLang === "no" ? noTranslations : enTranslations;

  const t = (key: string, fallback?: string): string | undefined => {
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
