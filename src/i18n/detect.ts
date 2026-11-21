import { defaultLocale, isLocale, LOCALE_STORAGE_KEY, type Locale } from "./config";

/** Prioridad: 1) preferencia guardada, 2) idioma del navegador, 3) idioma por defecto. */
export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && isLocale(saved)) return saved;
  } catch {
    // localStorage puede estar bloqueado (modo privado, políticas): lo ignoramos.
  }

  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0] ?? "";
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}
