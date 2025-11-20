/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'synergia': {
          green: '#00715D',
          light: '#588461',
          dark: '#005a49'
        }
      }
    },
  },
  plugins: [],
}