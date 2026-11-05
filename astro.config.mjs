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
  // Fuera del sitemap: la raíz (solo redirige al idioma) y las páginas de impresión del CV.
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://paumassales.dev/' && !page.includes('/cv-print'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});