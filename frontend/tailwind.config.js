/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        
    './components/**/*.{js,ts,jsx,tsx}',  
    './context/**/*.{js,ts,jsx,tsx}',     
    './lib/**/*.{js,ts,jsx,tsx}',         
    './interfaces/**/*.{js,ts,jsx,tsx}',  
    './public/**/*.html',               
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 PRIMARY — Midnight Blue
        primary: {
          50:  "#e6ebf2",
          100: "#cdd7e5",
          200: "#9bb0cb",
          300: "#6a88b1",
          400: "#386197",
          500: "#0B1F3A", // base
          600: "#091a31",
          700: "#071528",
          800: "#05101f",
          900: "#030b16",
        },

        // 🔴 SECONDARY — Crimson
        secondary: {
          50:  "#fee2e2",
          100: "#fecaca",
          200: "#fca5a5",
          300: "#f87171",
          400: "#ef4444",
          500: "#DC2626", // base
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#661616",
        },

        // ⚪ NEUTRALS
        neutral: {
          brown: "#600505",
          dark: "#222222",
          light: "#ffffff",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
