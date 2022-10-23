/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customblue: {
          100: '#252849',
          200: '#040833',
        },
        radiantgreen: '#2ef5ff',
      }
    },
  },
  plugins: [],
}
