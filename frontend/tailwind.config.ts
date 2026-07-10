import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        primary: { DEFAULT: "#C8102E", dark: "#A30822" },
        ink: "#1E1E1E",
        muted: "#6B7280",
        line: "#E5E7EB",
        bg: "#F8F8F8",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: { sans: ["var(--font-cairo)", "Tajawal", "system-ui", "sans-serif"] },
      boxShadow: {
        card: "0 1px 3px rgba(16,24,40,.06), 0 1px 2px rgba(16,24,40,.04)",
        hover: "0 18px 40px -12px rgba(16,24,40,.18)",
        soft: "0 8px 30px rgba(16,24,40,.06)",
      },
      borderRadius: { xl: "0.9rem", "2xl": "1.25rem" },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: { shimmer: "shimmer 1.4s infinite" },
    },
  },
  plugins: [],
};
export default config;
