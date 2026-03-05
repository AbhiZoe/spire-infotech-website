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
        "slide-down": "slideDown 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "bounce-in": "bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "gradient-shift": "gradientShift 6s ease infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
        "blur-in": "blurIn 0.6s ease-out",
        "text-reveal": "textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "morph-bg": "morphBg 8s ease-in-out infinite",
        "count-up": "countUp 0.6s ease-out",
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
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
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
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        blurIn: {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
        textReveal: {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          "100%": { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        morphBg: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
