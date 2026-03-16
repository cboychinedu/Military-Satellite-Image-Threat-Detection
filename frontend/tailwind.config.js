/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'mil-dark': '#0d1117', // Darker background
        'mil-gray': '#161b22', // Panel background
        'mil-border': '#30363d', // Border color
        'mil-green': '#2ea043', // Green status/headers
        'mil-blue': '#1f6feb', // Primary blue
        'mil-blue-light': '#58a6ff', // Lighter blue
        'mil-text': '#c9d1d9', // Default text
        'mil-ship': '#e3b341', // Ship detection color
        'mil-aircraft': '#3fb950', // Aircraft detection color
        'mil-building': '#db61a2', // Building detection color
      },
    },
  },
  plugins: [],
}