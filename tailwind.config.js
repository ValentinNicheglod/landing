/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#366eff'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
