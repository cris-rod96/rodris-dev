import type { Locale } from "./config";
import { es, type Dictionary } from "./es";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];
