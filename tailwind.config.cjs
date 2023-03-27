/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontWeight: {
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      "extra-bold": "800",
      black: "900",
    },

    extend: {
      width: {
        authxlw: "600px",
      },
      height: {
        authxlh: "550px",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "704px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      print: { raw: "print" },
    },
  },
  plugins: [],
};
