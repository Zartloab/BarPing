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
        bp: {
          bg: {
            main: "#080B16",
            soft: "#101527"
          },
          surface: {
            DEFAULT: "#171D32",
            raised: "#222A42"
          },
          text: {
            main: "#FFF3E8",
            soft: "#CFC3B6",
            muted: "#8B8178"
          },
          accent: {
            primary: "#FF7A6B",
            live: "#7CFFCB",
            secondary: "#8EA7FF",
            warning: "#FFD166",
            danger: "#FF5C7A"
          }
        },
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
        amber: "0 16px 36px rgba(255,122,107,0.18)",
        soft: "0 24px 80px rgba(0,0,0,0.24)"
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
