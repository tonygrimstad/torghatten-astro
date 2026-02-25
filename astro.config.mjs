// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'no',
    locales: ['no', 'en'],
    routing: {
      prefixDefaultLocale: true,
      fallbackType: 'redirect'
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
