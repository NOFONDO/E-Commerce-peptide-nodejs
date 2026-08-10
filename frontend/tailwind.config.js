/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1857D0',
          blueDark: '#0F3A94',
          dark: '#111827',
          gray: '#4B5563',
          green: '#16A34A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(17, 24, 39, 0.06)',
      },
    },
  },
  plugins: [],
};
