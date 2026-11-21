// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
     locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      // Desactivamos la redirección automática de "/" porque
      // la haremos nosotros según el idioma del navegador.
      redirectToDefaultLocale: false,
    },
  }
});
