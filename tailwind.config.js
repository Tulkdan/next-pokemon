/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokemon-hero': 'url("/images/pokemon-hero.jpg")'
      }
    },
  },
  plugins: [],
}

