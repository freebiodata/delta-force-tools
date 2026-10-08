import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production domain. Update here + robots.txt if the domain changes.
export default defineConfig({
  site: 'https://deltaforcetools.top',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
