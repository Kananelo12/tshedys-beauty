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
          50: '#FFF0F8',
          100: '#FFE0F0',
          200: '#FFC0E0',
          300: '#FF99D1',
          400: '#FF70C2',
          500: '#FF47B3',
          600: '#E02896',
          700: '#C01E7A',
          800: '#8F1659',
          900: '#5E0F3B',
        },
        blush: {
          50: '#FFF5F7',
          100: '#FFE8ED',
          200: '#FFD1DC',
          300: '#FFB4C6',
          400: '#FF8FB0',
          500: '#FF6A99',
          600: '#E64980',
          700: '#CC3366',
          800: '#B3264D',
          900: '#801A36',
        },
        rose: {
          50: '#FFF0F5',
          100: '#FFD6E8',
          200: '#FFB3D6',
          300: '#FF8FC4',
          400: '#FF66B0',
          500: '#F72585',
          600: '#D41E6F',
          700: '#B11859',
          800: '#8E1244',
          900: '#6B0D33',
        },
        purple: {
          50: '#FAF5FF',
          100: '#F3E7FF',
          200: '#E7CFFF',
          300: '#D4A5FF',
          400: '#C280FF',
          500: '#B05CFF',
          600: '#9333EA',
          700: '#7C2DC7',
          800: '#6525A3',
          900: '#4E1D80',
        },
        charcoal: {
          50: '#F8F8FA',
          100: '#F0F0F5',
          200: '#E0E0EB',
          300: '#B8B8CC',
          400: '#8F8FAA',
          500: '#666688',
          600: '#4D4D66',
          700: '#333344',
          800: '#1A1A2E',
          900: '#0D0D1A',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-fantasy': 'linear-gradient(135deg, var(--color-pink-400) 0%, var(--color-purple-500) 50%, var(--color-rose-500) 100%)',
        'gradient-pink': 'linear-gradient(135deg, var(--color-pink-500) 0%, var(--color-rose-500) 100%)',
        'gradient-blush': 'linear-gradient(135deg, var(--color-blush-300) 0%, var(--color-pink-400) 100%)',
        'pink-glow': 'radial-gradient(ellipse at center, rgba(255, 71, 179, 0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'pink-glow': '0 0 20px rgba(255, 71, 179, 0.5), 0 0 40px rgba(255, 71, 179, 0.3)',
        'pink-glow-lg': '0 0 40px rgba(255, 71, 179, 0.6), 0 0 80px rgba(255, 71, 179, 0.4)',
        'purple-glow': '0 0 20px rgba(176, 92, 255, 0.5), 0 0 40px rgba(176, 92, 255, 0.3)',
        'elevated': '0 10px 40px rgba(255, 71, 179, 0.2), 0 4px 12px rgba(247, 37, 133, 0.15)',
        'elevated-hover': '0 20px 60px rgba(255, 71, 179, 0.3), 0 8px 24px rgba(247, 37, 133, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 71, 179, 0.5), 0 0 40px rgba(255, 71, 179, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 71, 179, 0.8), 0 0 60px rgba(255, 71, 179, 0.5)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.7', transform: 'scale(1.2) rotate(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
