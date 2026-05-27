"use client";

import { Check } from "lucide-react";
import type { Vibe } from "@/lib/types";
import { vibeDescriptions, vibes } from "@/lib/constants";

export function VibeSelector({ value, onChange }: { value: Vibe; onChange: (vibe: Vibe) => void }) {
  return (
    <div className="grid gap-3">
      {vibes.map((vibe) => {
        const active = value === vibe;
        return (
          <button
            key={vibe}
            onClick={() => onChange(vibe)}
            type="button"
            className={`tap-highlight flex min-h-[74px] items-center justify-between rounded-[24px] border p-4 text-left transition ${
              active
                ? "border-venue-amber/65 bg-venue-amber/12 shadow-[0_0_34px_rgba(255,122,107,0.16)]"
                : "border-white/[0.08] bg-venue-card hover:border-venue-amber/35"
            }`}
          >
            <span>
              <span className="block font-semibold text-venue-cream">{vibe}</span>
              <span className="mt-1 block text-sm text-venue-muted">{vibeDescriptions[vibe]}</span>
            </span>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${active ? "bg-venue-amber text-venue-ink" : "border border-white/[0.12]"}`}>
              {active ? <Check size={14} /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
