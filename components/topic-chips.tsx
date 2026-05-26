"use client";

import { Check } from "lucide-react";

export function TopicChips({
  topics,
  selected,
  onToggle
}: {
  topics: string[];
  selected: string[];
  onToggle: (topic: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => {
        const active = selected.includes(topic);
        return (
          <button
            key={topic}
            onClick={() => onToggle(topic)}
            className={`tap-highlight inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm transition ${
              active
                ? "border-venue-amber/60 bg-venue-amber/15 text-venue-amberSoft"
                : "border-white/[0.08] bg-white/[0.035] text-venue-muted hover:border-venue-amber/35"
            }`}
            type="button"
          >
            {active ? <Check size={14} /> : null}
            {topic}
          </button>
        );
      })}
    </div>
  );
}
