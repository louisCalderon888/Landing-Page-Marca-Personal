/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A8A',
          secondary: '#059669',
          accent: '#EA580C',
          dark: '#0B1224',
        },
      },
    },
  },
  plugins: [],
};
