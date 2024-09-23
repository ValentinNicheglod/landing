/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
