// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://valentin-nicheglod.is-a.dev',
  build: {
    format: 'preserve',
  },
  integrations: [icon(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true
    }
  }
});