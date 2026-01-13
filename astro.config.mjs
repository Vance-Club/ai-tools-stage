import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://sudhanshuverma550.github.io',
  base: '/aspora-design-system',
  outDir: './dist',
});
