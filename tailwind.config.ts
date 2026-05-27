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
          ink: "#FFFFFF",
          raised: "#F7F7F2",
          card: "#FFFFFF",
          soft: "#E5E1D8",
          cream: "#181D26",
          muted: "#454A54",
          dim: "#767B84",
          amber: "#181D26",
          amberSoft: "#2A303A",
          olive: "#16381F",
          blue: "#3167B8",
          danger: "#AA2D00"
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
