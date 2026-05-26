"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function FeedbackSheet({ onClose }: { onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(4);

  if (submitted) {
    return (
      <section className="glass-card rounded-[28px] p-5 text-center">
        <h2 className="font-serif text-3xl">Thanks for helping tune the room.</h2>
        <p className="mt-3 text-sm text-venue-muted">Your feedback helps the venue decide whether to run another Social Mode night.</p>
        <SecondaryButton className="mt-5 w-full" onClick={onClose}>Done</SecondaryButton>
      </section>
    );
  }

  return (
    <section className="glass-card rounded-[28px] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Event feedback</p>
      <h2 className="mt-2 font-serif text-3xl">How did tonight feel?</h2>
      <div className="mt-5 grid gap-3">
        {["I felt safe", "I would use BarPing again", "I met someone", "A table felt easier than 1:1"].map((label) => (
          <label key={label} className="flex min-h-12 items-center gap-3 rounded-[20px] border border-white/[0.08] bg-white/[0.035] px-4 text-sm text-venue-muted">
            <input className="h-4 w-4 accent-venue-amber" type="checkbox" defaultChecked />
            {label}
          </label>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-3 text-sm text-venue-muted">Overall rating</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`grid h-10 w-10 place-items-center rounded-full border ${
                value <= rating ? "border-venue-amber bg-venue-amber text-venue-ink" : "border-white/[0.08] text-venue-muted"
              }`}
              onClick={() => setRating(value)}
              type="button"
            >
              <Star size={16} />
            </button>
          ))}
        </div>
      </div>
      <textarea
        className="mt-5 min-h-24 w-full resize-none rounded-[22px] border border-white/[0.08] bg-venue-soft p-4 text-sm text-venue-cream outline-none placeholder:text-venue-dim focus:border-venue-amber/60"
        placeholder="Optional comment"
      />
      <PrimaryButton className="mt-4 w-full" onClick={() => setSubmitted(true)}>Send feedback</PrimaryButton>
    </section>
  );
}
