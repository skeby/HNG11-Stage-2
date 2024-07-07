/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BF5700",
        secondary: "#58355E",
        accent: "#7F00FF",
      },
    },
    fontFamily: {
      sans: ["Public sans", "sans-serif"],
    },
  },
  plugins: [],
};
