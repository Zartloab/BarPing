"use client";

import { ArrowLeft, ArrowRight, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

type GuideStep = {
  title: string;
  body: string;
  action: string;
};

const guideSteps: GuideStep[] = [
  {
    title: "1. Pick a night recipe",
    body: "Templates are reusable venue formats. A template creates the event title, tables, prompts, QR copy, social window, host nudges, safety copy, and staff run sheet. Pick the closest format, then adjust vibe and Find Me before launch.",
    action: "Use Create night when you want a fresh event. Use the selected recipe preview when you only want to inspect what BarPing will generate."
  },
  {
    title: "2. Print the launch kit",
    body: "The launch kit contains the entrance poster, table QR card, bar counter sign, Instagram story, safety card, and staff run sheet. Guest-facing assets all point to the same event QR, so staff can print or share them without rebuilding anything.",
    action: "Open Print launch kit, choose the asset tab, then use Print, Download PNG, or Copy text."
  },
  {
    title: "3. Start Social Mode",
    body: "Guests should only join once the venue is ready. Start Social Mode after QR cards are visible and the host has announced the night. Guests then choose Join a table, Open to pings, or Just browsing.",
    action: "In Live mode, press Start. Pause if the room needs a reset. End when the activation is finished."
  },
  {
    title: "4. Host the room",
    body: "Live mode is the host control room. Send nudges to guide behavior, spotlight a table to steer conversation, watch active guests, and keep reports visible without turning the screen into analytics.",
    action: "Use quick nudges first. Use spotlight when a table needs energy. Use safety actions deliberately."
  },
  {
    title: "5. Read the after-report",
    body: "After mode is a plain-English debrief for the venue owner: scans, joins, pings, chats, feedback, and whether the format is worth repeating. It should answer: run again, change signage, or change format?",
    action: "Use Run this again for the next night once you know the format worked."
  }
];

export function VenueGuide({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const step = guideSteps[index];

  return (
    <>
      <button
        className={`inline-flex min-h-10 items-center gap-2 rounded-[12px] border border-venue-soft bg-venue-card px-3 text-sm font-medium text-venue-cream transition hover:border-venue-cream/25 ${compact ? "px-3" : ""}`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <HelpCircle size={16} />
        Guide
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/45 p-4 backdrop-blur-sm sm:items-center">
          <section className="w-full max-w-[620px] rounded-[16px] border border-venue-soft bg-venue-card p-5 text-venue-cream shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-venue-dim">BarPing handoff guide</p>
                <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">{step.title}</h2>
              </div>
              <button
                aria-label="Close guide"
                className="grid h-10 w-10 place-items-center rounded-[10px] border border-venue-soft text-venue-muted"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-venue-muted">{step.body}</p>
            <div className="mt-4 rounded-[12px] border border-venue-soft bg-venue-raised p-4">
              <p className="text-xs font-medium text-venue-dim">What to do</p>
              <p className="mt-2 text-sm leading-6 text-venue-muted">{step.action}</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-sm text-venue-dim">
                {index + 1} of {guideSteps.length}
              </p>
              <div className="flex gap-2">
                <SecondaryButton disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>
                  <ArrowLeft size={15} />
                  Back
                </SecondaryButton>
                {index === guideSteps.length - 1 ? (
                  <PrimaryButton onClick={() => setOpen(false)}>Done</PrimaryButton>
                ) : (
                  <PrimaryButton onClick={() => setIndex((value) => Math.min(guideSteps.length - 1, value + 1))}>
                    Next
                    <ArrowRight size={15} />
                  </PrimaryButton>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
