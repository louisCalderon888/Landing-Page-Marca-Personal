import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://example.com', // TODO: reemplaza con tu dominio real
  integrations: [tailwind({ config: { applyBaseStyles: false } })],
});
