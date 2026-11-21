export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
export const LOCALE_STORAGE_KEY = "rodris-locale";

/** Type guard: confirma que un string cualquiera es un Locale válido. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
