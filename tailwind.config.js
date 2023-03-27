/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      screens: {
        "-2xl": { max: "1535px" },
        "-xl": { max: "1279px" },
        "-lg": { max: "1023px" },
        "-md": { max: "767px" },
        "-sm": { max: "639px" },
      },
      colors: {
        "radix-gray": {
          1: "#fcfcfc",
          2: "#f8f8f8",
          3: "#f3f3f3",
          4: "#ededed",
          5: "#e8e8e8",
          6: "#e2e2e2",
          7: "#dbdbdb",
          8: "#c7c7c7",
          9: "#8f8f8f",
          10: "#858585",
          11: "#6f6f6f",
          12: "#171717",
        },
        "radix-grayDark": {
          1: "#161616",
          2: "#1c1c1c",
          3: "#232323",
          4: "#282828",
          5: "#2e2e2e",
          6: "#343434",
          7: "#3e3e3e",
          8: "#505050",
          9: "#707070",
          10: "#7e7e7e",
          11: "#a0a0a0",
          12: "#ededed",
        },
      },
    },
  },
  plugins: [],
}
