// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://valentin-nicheglod.is-a.dev",
  build: {
    format: "preserve",
    inlineStylesheets: "always",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
        sass: {
          api: "modern",
        },
      },
    },
  },
  integrations: [
    icon(),
    sitemap({
      i18n: {
        locales: {
          en: "en",
          es: "es",
        },
        defaultLocale: "en",
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
