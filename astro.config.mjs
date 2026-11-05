// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paumassales.dev',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/cv-print') })],
  vite: {
    plugins: [tailwindcss()]
  }
});