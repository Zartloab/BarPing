"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, Shuffle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryButton, SecondaryButton, SecondaryLink } from "@/components/ui/buttons";
import { demoEvent } from "@/lib/demo-data";
import { drawSignal, signalStorageKey, type SignalIdentity } from "@/lib/signal-night";

export default function SignalPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const firstSignal = useMemo(() => drawSignal(false), []);
  const [signal, setSignal] = useState<SignalIdentity>(firstSignal);
  const [accepted, setAccepted] = useState(false);

  function redrawOnce() {
    if (signal.redrawUsed) return;
    setSignal(drawSignal(true));
  }

  function keepSignal() {
    if (!accepted) return;
    window.localStorage.setItem(signalStorageKey(eventSlug), JSON.stringify(signal));
    router.push(`/e/${eventSlug}/room`);
  }

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-center py-4">
        <p className="text-sm font-medium text-venue-muted">Draw a Signal</p>
        <h1 className="mt-4 font-serif text-4xl leading-none">You&apos;re {signal.name} tonight.</h1>
        <section className="mt-6 rounded-[20px] border border-venue-amber/35 bg-[linear-gradient(180deg,rgba(255,122,107,0.08),transparent_52%),#171D32] p-5">
          <div className="grid h-16 w-16 place-items-center rounded-[18px] border border-venue-soft bg-venue-raised text-3xl text-venue-amber">
            {signal.symbol}
          </div>
          <p className="mt-4 text-xs font-medium text-venue-dim">Temporary Signal</p>
          <h2 className="mt-1 text-2xl font-medium text-venue-cream">{signal.name}</h2>
          <p className="mt-1 text-sm text-venue-muted">{signal.vibe}</p>
          <div className="mt-4 grid gap-2">
            <p className="text-xs font-medium text-venue-dim">Good for</p>
            <div className="flex flex-wrap gap-2">
              {signal.suggestedCircles.map((circle) => (
                <span key={circle} className="rounded-full bg-venue-blue/10 px-3 py-1 text-xs text-[#B9C7FF]">{circle}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <p className="text-xs font-medium text-venue-dim">Easy Hellos</p>
            {signal.helloTemplates.slice(0, 3).map((hello) => (
              <p key={hello} className="rounded-[12px] bg-venue-raised px-3 py-2 text-sm text-venue-muted">{hello}</p>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setAccepted((value) => !value)}
          className="tap-highlight mt-5 flex w-full items-center gap-3 rounded-[12px] border border-venue-soft bg-venue-card p-4 text-left"
        >
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] border ${accepted ? "border-venue-olive bg-venue-olive text-venue-ink" : "border-venue-soft"}`}>
            {accepted ? <Check size={16} /> : null}
          </span>
          <span className="text-sm leading-6 text-venue-muted">
            I&apos;m 18+, at this venue, and I agree to the room rules.
          </span>
        </button>

        <div className="mt-5 grid gap-3">
          <PrimaryButton disabled={!accepted} onClick={keepSignal}>Keep this Signal</PrimaryButton>
          <SecondaryButton disabled={signal.redrawUsed} onClick={redrawOnce}>
            <Shuffle size={16} />
            {signal.redrawUsed ? "Redraw used" : "Redraw once"}
          </SecondaryButton>
          <SecondaryLink href="/rules">Room rules</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
