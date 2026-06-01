import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  "#00ff87",
          purple: "#7c3aed",
          dark:   "#0a0a0f",
          card:   "#111118",
          border: "#1e1e2e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-up":     "fadeUp 0.6s ease forwards",
        "fade-in":     "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        "pulse-glow":  "pulseGlow 2s ease-in-out infinite",
        "ticker":      "ticker 30s linear infinite",
        "scan":        "scan 2s linear infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: "0" },                                 "100%": { opacity: "1" } },
        slideRight:{ "0%": { opacity: "0", transform: "translateX(-20px)" },"100%": { opacity: "1", transform: "translateX(0)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 20px rgba(0,255,135,0.3)" }, "50%": { boxShadow: "0 0 40px rgba(0,255,135,0.6)" } },
        ticker:    { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        scan:      { "0%": { top: "0%" }, "100%": { top: "100%" } },
      },
    },
  },
  plugins: [],
}

export default config
