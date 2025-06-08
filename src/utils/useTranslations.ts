import { i18n } from "../config/i18n"; // NB: ikke defaultLang

type Translations = Record<string, any>;

export function useTranslations(url: URL) {
  const [, lang] = url.pathname.split("/");

  const urlLang = lang === "en" ? "en" : "no";
  const i18nLang = urlLang === "no" ? "nb" : "en";

  const t = (key: string): string | undefined => {
    const parts = key.split(".");
    let value: any = (i18n as Record<string, Translations>)[i18nLang];

    for (const part of parts) {
      if (value?.[part] === undefined) return undefined;
      value = value[part];
    }

    return value;
  };

  return { t, currentLang: urlLang };
}
