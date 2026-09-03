import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#0A0A0A",
        surface: "#141414",
        raised: "#1C1C1C",
        bone: "#F5F2E8",
        muted: "#9C9890",
        amber: {
          DEFAULT: "#FFC300",
          dim: "#B38900",
          glow: "#FFD84D",
        },
        spark: "#EAF4FF",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hazard-stripe":
          "repeating-linear-gradient(135deg, #FFC300 0 14px, #0A0A0A 14px 28px)",
      },
      keyframes: {
        flicker: {
          "0%, 96%, 100%": { opacity: "1" },
          "97%": { opacity: "0.4" },
          "98%": { opacity: "1" },
          "99%": { opacity: "0.6" },
        },
      },
      animation: {
        flicker: "flicker 6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
