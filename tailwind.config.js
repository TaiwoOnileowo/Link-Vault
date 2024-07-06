/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2a4ff6",
        dark: "#12073d",
        darkAlt: "#1f1f2e", 
        light: "#ffffff",
        lightBg: "#c0d9ff", 
        lightHoverBg: "#d5ebff", 
      },
    },
    // screens: {
    //   ip: "200px",
    //   xs: "250px",
    //   ss: "380px",
    //   ts: "600px",
    //   xsm: "700px",
    //   sm: "800px",
    //   msm: "1020px",
    //   bsm: "1100px",
    //   md: "1280px",
    // },
  },
  plugins: [],
};
