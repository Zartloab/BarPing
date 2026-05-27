import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        venue: {
          ink: "var(--bp-canvas)",
          raised: "var(--bp-surface-2)",
          card: "var(--bp-surface-1)",
          soft: "var(--bp-surface-4)",
          cream: "var(--bp-ink)",
          muted: "var(--bp-ink-muted)",
          dim: "var(--bp-ink-subtle)",
          amber: "var(--bp-primary)",
          amberSoft: "var(--bp-primary-hover)",
          olive: "var(--bp-olive)",
          blue: "var(--bp-cobalt)",
          danger: "var(--bp-danger)"
        }
      },
      boxShadow: {
        amber: "0 12px 34px rgba(24,29,38,0.12)",
        soft: "0 18px 54px rgba(24,29,38,0.08)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
