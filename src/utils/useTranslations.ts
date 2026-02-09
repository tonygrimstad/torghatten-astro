import { i18n } from "../config/i18n"; // NB: ikke defaultLang
import noTranslations from "../translations/no.json";
import enTranslations from "../translations/en.json";

type Translations = Record<string, any>;

export function useTranslations(url: URL) {
  const [, lang] = url.pathname.split("/");

  const urlLang = lang === "en" ? "en" : "no";
  const i18nLang = urlLang === "no" ? "nb" : "en";

  // Combine JSON translations with existing i18n config
  const jsonTranslations = urlLang === "no" ? noTranslations : enTranslations;
  const configTranslations = (i18n as Record<string, Translations>)[i18nLang];

  const t = (key: string, fallback?: string): string | undefined => {
    // First try JSON translations
    const parts = key.split(".");
    let value: any = jsonTranslations;

    for (const part of parts) {
      if (value?.[part] === undefined) {
        // Try config translations as fallback
        value = configTranslations;
        for (const configPart of parts) {
          if (value?.[configPart] === undefined) {
            return fallback || undefined;
          }
          value = value[configPart];
        }
        return value;
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
