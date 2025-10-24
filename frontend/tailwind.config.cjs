/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: { DEFAULT: "#6366F1", light: "#A5B4FC", dark: "#4338CA" },
        secondary: { DEFAULT: "#0EA5E9", light: "#7DD3FC", dark: "#0369A1" },
        accent: { DEFAULT: "#14B8A6", light: "#5EEAD4", dark: "#115E59" },
      },
    },
  },
  plugins: [],
};
