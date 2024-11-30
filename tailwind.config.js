const colors = require("./src/style/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      fontSize: {
        xxs: "10px",
        sm: "12px",
      },
      colors: colors,
    },
  },
  plugins: [],
};
