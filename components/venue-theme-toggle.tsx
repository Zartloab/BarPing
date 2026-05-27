"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

export function VenueThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("barping:venue-theme") as ThemeMode | null;
    const nextMode = saved === "light" ? "light" : "dark";
    setMode(nextMode);
    document.documentElement.dataset.theme = nextMode;
  }, []);

  function toggleTheme() {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    window.localStorage.setItem("barping:venue-theme", nextMode);
    document.documentElement.dataset.theme = nextMode;
  }

  return (
    <button
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      className="inline-flex min-h-10 items-center gap-2 rounded-[12px] border border-venue-soft bg-venue-card px-3 text-sm font-medium text-venue-cream transition hover:border-venue-cream/25"
      onClick={toggleTheme}
      type="button"
    >
      {mode === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      {mode === "dark" ? "Dark" : "Light"}
    </button>
  );
}
