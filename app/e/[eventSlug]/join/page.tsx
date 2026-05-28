"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryButton, SecondaryLink } from "@/components/ui/buttons";
import { demoEvent } from "@/lib/demo-data";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const [accepted, setAccepted] = useState(false);

  function seeTables() {
    if (!accepted) return;
    window.localStorage.setItem(
      "barping-profile",
      JSON.stringify({
        topics: ["Music", "Random"],
        note: "Reading the tables first.",
        entryChoice: "Join a table",
        isVisibleToPings: false,
        hasJoinedTable: false,
        pingsAllowedTableIds: []
      })
    );
    router.push(`/e/${eventSlug}/signal`);
  }

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-center py-4">
        <p className="text-sm font-medium text-venue-muted">Signal Night</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">The room is live.</h1>
        <p className="mt-4 text-base leading-6 text-venue-muted">
          Draw a Signal first. Everything fades tonight.
        </p>

        <button
          type="button"
          onClick={() => setAccepted((value) => !value)}
          className="tap-highlight mt-7 flex w-full items-center gap-3 rounded-[12px] border border-venue-soft bg-venue-card p-4 text-left"
        >
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] border ${accepted ? "border-venue-cream bg-venue-amber text-venue-ink" : "border-venue-soft"}`}>
            {accepted ? <Check size={16} /> : null}
          </span>
          <span className="text-sm leading-6 text-venue-muted">
            I&apos;m 18+, at this venue, and I agree to the room rules.
          </span>
        </button>

        <div className="mt-5 grid gap-3">
          <PrimaryButton disabled={!accepted} onClick={seeTables}>
            Draw my Signal
          </PrimaryButton>
          <SecondaryLink href="/rules">Read safety rules</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
