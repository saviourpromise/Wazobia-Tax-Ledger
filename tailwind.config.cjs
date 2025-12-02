/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // All React components
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // A professional blue
          dark: "#1E40AF", // A slightly darker shade for buttons/hover states
        },
        secondary: "#6B7280", // A neutral gray
        accent: "#0b5cff", // Keeping the original accent if needed
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // A modern sans-serif font
      },
    },
  },
  plugins: [],
};
