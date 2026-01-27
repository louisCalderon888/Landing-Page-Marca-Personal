/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0F4C81',  // Deep Tech Blue
            light: '#1E5A8E',
            dark: '#0A3A61',
          },
          green: {
            DEFAULT: '#10B981',  // Modern Growth Green
            light: '#34D399',
            dark: '#059669',
          },
          amber: {
            DEFAULT: '#F59E0B',  // Accessible Amber
            light: '#FBBF24',
            dark: '#D97706',
          },
        },
        dark: {
          950: '#0A0E1A',  // Background principal
          900: '#0F172A',  // Cards
          800: '#1E293B',  // Elevated
          700: '#334155',  // Borders
          600: '#475569',  // Disabled
          500: '#64748B',  // Placeholders
          400: '#94A3B8',  // Secondary text
          300: '#CBD5E1',  // Tertiary text
          200: '#E2E8F0',  // Light borders
          100: '#F1F5F9',  // Light backgrounds
        },
        electric: {
          blue: '#3B82F6',  // Electric Blue for links/highlights
        },
        semantic: {
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(15, 76, 129, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-blue-lg': '0 0 40px rgba(15, 76, 129, 0.4)',
        'glow-green-lg': '0 0 40px rgba(16, 185, 129, 0.4)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #0F4C81, #10B981)',
        'gradient-premium': 'linear-gradient(135deg, #0F4C81, #10B981, #F59E0B)',
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
