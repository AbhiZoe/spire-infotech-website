import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1FC7C7",
          50: "#e8fafa",
          100: "#c5f2f2",
          200: "#8de8e8",
          300: "#55dddd",
          400: "#2ed2d2",
          500: "#1FC7C7",
          600: "#18a8a8",
          700: "#138585",
          800: "#0e6262",
          900: "#083f3f",
        },
        secondary: {
          DEFAULT: "#1F2A30",
          50: "#eaecee",
          100: "#c4ccd1",
          200: "#9aabb0",
          300: "#6f8990",
          400: "#4d6e77",
          500: "#2c535e",
          600: "#264958",
          700: "#1e3942",
          800: "#1F2A30",
          900: "#121a1e",
        },
        accent: {
          DEFAULT: "#7FE6E6",
          50: "#f0fdfd",
          100: "#d5f8f8",
          200: "#b0f1f1",
          300: "#7FE6E6",
          400: "#4edada",
          500: "#26c7c7",
          600: "#1ba5a5",
          700: "#158282",
          800: "#116060",
          900: "#0b3e3e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
