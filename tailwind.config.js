/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(28, 13, 93)",
        alternate: "rgb(var(--alternate-color) / 1)",
        "back-white": "rgb(255 255 255 / 0.5)",
        "yellow-custom": "rgb(234, 217, 76)",
        "orange-dimmed": "rgba(221, 115, 115, 1)",
        "purple-dotlabs": "#F2F2F2",
        "gradient-purple": "rgb(28 13 93)",
        "gradient-red": "rgb(221 115 115)",
      },

      gridTemplateColumns: {
        // Complex site-specific column configuration
        header: "15rem  1fr 15rem",
      },
      fontFamily: {
        bitter: ["Bitter", "sans-serif"],
      },
    },
  },
  plugins: [],
};