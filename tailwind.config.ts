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
          ink: "#080807",
          raised: "#11100D",
          card: "#171510",
          soft: "#1F1C15",
          cream: "#F7F0E3",
          muted: "#B8AA92",
          dim: "#776D5E",
          amber: "#D98F45",
          amberSoft: "#F0B46A",
          olive: "#7C8061",
          blue: "#4D6AAA",
          danger: "#D96B5F"
        }
      },
      boxShadow: {
        amber: "0 18px 60px rgba(217,143,69,0.16)",
        soft: "0 22px 80px rgba(0,0,0,0.36)"
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
