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
    title: "1. Guests see tables",
    body: "A guest scans the QR and lands on tonight's conversation tables. Browsing is the default state, not a mode.",
    action: "If someone is unsure, tell them to read the tables first and join when one feels easy."
  },
  {
    title: "2. Review run sheet",
    body: "Before the night starts, the venue screen follows the run sheet: recipe, tables, launch kit, staff brief, and start.",
    action: "Print the launch kit, place QR signs, brief staff, then press Start Social Mode."
  },
  {
    title: "3. Host controls",
    body: "During the night, the host screen shows the next operational action: send a nudge, feature a table, final call, or close.",
    action: "Do the next action on the run sheet, then move on."
  },
  {
    title: "4. Guest link",
    body: "QR tools and printable assets stay in the guest link screen so the host controls remain clean while the night is live.",
    action: "Use the guest link if a sign goes missing or staff need the QR."
  },
  {
    title: "5. Night recap",
    body: "After the night closes, the screen becomes a simple recap: scans, table joins, optional hellos, reports, best table, and recommendation.",
    action: "Use Run this again when the format worked."
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
                <p className="text-xs font-medium text-venue-dim">BarPing run sheet guide</p>
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
