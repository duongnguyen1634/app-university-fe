import type { Config } from "tailwindcss";

const config: Config = {
  module: "jit",
  darkMode: "selector",
  content: [
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-login-main":
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      },
      spacing: {
        35: "35px",
        "main-size": "100vh",
      },
      fontSize: {},
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        dosis: ["Dosis", "sans-serif"],
      },
      colors: {
        mau1: "rgb(61, 141, 122)",
        mau2: 'rgb(179, 216, 168)',
        mau3: "rgb(251, 255, 228)",
        mau4: "rgb(163, 209, 198)",
        textPink: "rgb(255 120 120)",
      },
    },
  },
  plugins: [],
};

export default config;
