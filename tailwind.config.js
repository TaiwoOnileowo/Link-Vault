import { list } from "postcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: " #5CE4E4",
          2: "#2B4CF4",
          3: " #40E8F0",
        },
        hoverBlue: "#1A3A8A ",
        lightGray: "#F0F4F8",
        mediumGray: "#495057",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        inputBg: "#CED4DA",
        hoverInputBg: "rgba(206, 212, 218, 0.5)",
        darkGray: "#212529",
        dark: "#12073d",
        d: {
          lightGray: "#E0E0E0",
          mediumGray: "#121212",
          darkGray: "#1E1E1E",
        },
      },
      backgroundImage: (theme) => ({
        "gradient-radial": `radial-gradient(ellipse at center, ${theme(
          "colors.primary.1"
        )} 0%, ${theme("colors.primary.2")} 100%)`,
        "gradient-1": " linear-gradient(45deg, #2B4CF4, #40E8F0)",
        "gradient-2": "linear-gradient(45deg, #5CE4E4, #40E8F0)",
        "gradient-3": "linear-gradient(45deg, #1A3A8A, #1A3A8A)",
      }),
    },
    keyframes: {
      move: {
        "0%": { left: "16.5%", opacity: 1 },
        "50%": { left: "50%", opacity: 1 },
        "100%": { left: "80%", opacity: 0 },
      },
    },
    animation: {
      move: "move 2s linear infinite",
    },
  },
  plugins: [],
};
