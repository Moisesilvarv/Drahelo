import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#fbfaf7",
        ivory: "#f4efe7",
        linen: "#e8dccb",
        sand: "#d8c3aa",
        aureate: "#b59a62",
        clinic: "#1d5c73",
        ink: "#17212b",
        mist: "#eef3f3"
      },
      boxShadow: {
        glow: "0 28px 110px rgba(29, 92, 115, 0.18)",
        soft: "0 24px 80px rgba(23, 33, 43, 0.10)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
