/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#366eff',
        secondary: '#9155f6',
        gray: '#5b698b',
        black: '#000e33',
      },
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
