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
        pink: {
          50: '#FFF5F6',
          100: '#FFE8EB',
          200: '#FDD5DA',
          300: '#F9B0BA',
          400: '#F08A9A',
          500: '#E0657A',
          600: '#C94D63',
          700: '#A93B4F',
          800: '#862E3E',
          900: '#6B2433',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F0',
          200: '#FFF3E3',
          300: '#FFE8CC',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4A04A',
          600: '#B8862F',
          700: '#92681E',
          800: '#6B4B14',
          900: '#45300D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.04)',
        'soft-md': '0 4px 25px rgba(0,0,0,0.06)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.08)',
        'pink-sm': '0 2px 12px rgba(224, 101, 122, 0.12)',
        'pink-md': '0 4px 20px rgba(224, 101, 122, 0.16)',
        'gold-sm': '0 2px 12px rgba(212, 160, 74, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
