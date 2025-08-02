/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FF7043",
          50: "#FFF3F0",
          100: "#FFE7E0",
          200: "#FFD0C2",
          300: "#FFB8A3",
          400: "#FF9F85",
          500: "#FF7043",
          600: "#E55A35",
          700: "#CC4427",
          800: "#B32E19",
          900: "#99180B",
        },
      },
    },
  },
  plugins: [],
};