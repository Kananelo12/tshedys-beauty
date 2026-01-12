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
        gold: {
          50: '#fdfbf7',
          100: '#fbf6ee',
          200: '#f6ebd4',
          300: '#f0ddb9',
          400: '#e5c285',
          500: '#d4a853',
          600: '#c89640',
          700: '#a67c35',
          800: '#84622a',
          900: '#6b5023',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-glow': 'radial-gradient(ellipse at center, rgba(212, 168, 83, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 168, 83, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(212, 168, 83, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
