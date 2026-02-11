import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Solid Pink Palette (Primary)
        pink: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899', // Primary pink
          600: '#DB2777', // Hover pink
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        // Solid Gold Palette (Brand)
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Primary gold
          600: '#D97706', // Hover gold
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Neutral Grays
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      boxShadow: {
        'pink-sm': '0 2px 8px rgba(236, 72, 153, 0.15)',
        'pink-md': '0 4px 12px rgba(236, 72, 153, 0.2)',
        'pink-lg': '0 8px 24px rgba(236, 72, 153, 0.25)',
        'gold-sm': '0 2px 8px rgba(245, 158, 11, 0.15)',
        'gold-md': '0 4px 12px rgba(245, 158, 11, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
