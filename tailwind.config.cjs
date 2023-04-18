/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/tailwind-datepicker-react/dist/**/*.js", "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontWeight: {
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
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
      sm: "500px",
      md: "700px",
      lg: "1050px",
      xl: "1281px",
      "2xl": "1536px",
      print: { raw: "print" },
    },
  },
  plugins: [],
};
