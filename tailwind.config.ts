import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          red: "#B83232",
          redDark: "#9A2828",
          redLight: "#FEF2F2",
          dark: "#1E293B",
        },
      },
    },
  },
  plugins: [],
});

export default config;
