/**
 * Type utilities for i18n translation keys
 * Auto-generates type-safe keys from Norwegian translation file
 */

import type noTranslations from "../translations/no.json";

/**
 * Recursively generates dot-notation keys from nested object
 * Example: { nav: { about: "..." } } => "nav.about"
 */
type DotNestedKeys<T> = (T extends object
  ? {
      [K in Exclude<keyof T, symbol>]: K extends string
        ? T[K] extends object
          ? `${K}.${DotNestedKeys<T[K]>}`
          : K
        : never;
    }[Exclude<keyof T, symbol>]
  : "") extends infer D
  ? Extract<D, string>
  : never;

/**
 * Type-safe translation key
 * Auto-completed in IDE based on actual translation structure
 *
 * @example
 * const key: TranslationKey = "hero.title"; // ✅ Valid
 * const key: TranslationKey = "hero.invalid"; // ❌ Type error
 */
export type TranslationKey = DotNestedKeys<typeof noTranslations>;

/**
 * Type for the complete translation object structure
 */
export type Translations = typeof noTranslations;
