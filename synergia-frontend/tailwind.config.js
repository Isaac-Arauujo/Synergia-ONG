/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*/.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "synergia-green": "#008779",
        "synergia-dark": "#006c5f",
      },
    },
  },
  plugins: [],
};