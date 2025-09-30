/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeText: "#233323",
        greenTheme: "#0e291a",
        creamBg: "#e9e4d1",
        mainText: "#cc9a64",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        poppins: ["Poppins", "sans-serif"],
        athena: ["Athena"],
      },
      screens: {
        1050: "1050px", // Custom breakpoint for 1050px
        450: "450px", // Custom breakpoint for 450px
      },

    },
  },
  plugins: [],
};
