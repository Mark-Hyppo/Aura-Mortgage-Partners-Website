import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Canonical host is www; apex redirects to it. Mirrored by site.url in
// src/data/site.ts, which drives canonical, og:url, and twitter:url.
const SITE = 'https://www.auramortgagepartners.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'file' },
});
