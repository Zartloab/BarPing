"use client";

import { Lightbulb } from "lucide-react";
import type { Guest } from "@/lib/types";
import { DangerButton, PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function FindMeRequestModal({
  guest,
  onAccept,
  onDecline,
  onReport
}: {
  guest: Guest;
  onAccept: () => void;
  onDecline: () => void;
  onReport: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
      <section className="glass-card w-full max-w-[430px] rounded-[30px] p-5">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-venue-amber/14 text-venue-amberSoft">
          <Lightbulb size={22} />
        </div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Table hello</p>
        <h2 className="mt-3 font-serif text-3xl text-venue-cream">Light up screens?</h2>
        <p className="mt-3 text-sm leading-relaxed text-venue-muted">
          {guest.alias} wants to say hello from this table. If you accept, both phones show the same color for 90 seconds so you can spot each other in the room.
        </p>
        <p className="mt-3 rounded-2xl bg-white/[0.04] p-3 text-sm text-venue-muted">
          Only use this if you feel comfortable. It is mutual, short-lived, and you can end or report anytime.
        </p>
        <div className="mt-5 grid gap-2">
          <PrimaryButton onClick={onAccept}>Light up screens</PrimaryButton>
          <SecondaryButton onClick={onDecline}>Not now</SecondaryButton>
          <DangerButton onClick={onReport}>Report</DangerButton>
        </div>
      </section>
    </div>
  );
}
