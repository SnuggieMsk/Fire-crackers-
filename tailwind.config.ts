import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep night-sky base
        night: {
          950: "#06060f",
          900: "#0a0a1f",
          800: "#11112e",
          700: "#191845",
          600: "#23215f",
        },
        // Vivid firework burst accents
        gold: "#ffce5c",
        amber: "#ff9d3c",
        magenta: "#ff4f9a",
        teal: "#39e0d0",
        violet: "#a779ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        tamil: ["var(--font-tamil)", "var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(255,206,92,0.45)",
        "glow-magenta": "0 0 40px -8px rgba(255,79,154,0.45)",
        "glow-teal": "0 0 40px -8px rgba(57,224,208,0.4)",
      },
      backgroundImage: {
        "night-radial":
          "radial-gradient(ellipse at top, #191845 0%, #0a0a1f 45%, #06060f 100%)",
        "gold-magenta": "linear-gradient(135deg,#ffce5c 0%,#ff9d3c 35%,#ff4f9a 100%)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
