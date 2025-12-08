const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hoverColor: "#0288D1",
        brightColor: "#29B6F6",
        backgroundColor: "#0288D1",
      },
    },
  },
  plugins: [],
});
