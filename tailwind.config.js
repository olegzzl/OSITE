/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        scarlet: {
          DEFAULT: '#FF0033',
          50: '#FFF0F0',
          100: '#FFE0E0',
          200: '#FFC0C0',
          300: '#FFA0A0',
          400: '#FF6060',
          500: '#FF0033',
          600: '#CC0029',
          700: '#990020',
          800: '#660016',
          900: '#33000D',
        },
        dark: {
          900: '#000000',
          800: '#0A0A0A',
          700: '#111111',
          600: '#1A1A1A',
          500: '#222222',
          400: '#2A2A2A',
          300: '#333333',
          200: '#444444',
          100: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
