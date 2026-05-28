"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { demoEvent } from "@/lib/demo-data";
import { persistDropResponse } from "@/lib/signal-night-client";
import {
  drawSignal,
  dropResponseStorageKey,
  oldSignalStorageKey,
  signalStorageKey,
  writeJsonStorage,
  type SignalIdentity
} from "@/lib/signal-night";
import type { DropResponse } from "@/lib/types";

export default function SignalPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const firstSignal = useMemo(() => drawSignal(false), []);
  const [signal, setSignal] = useState<SignalIdentity>(firstSignal);
  const [confirmed, setConfirmed] = useState(false);
  const [queryDrop, setQueryDrop] = useState<{ dropId: string; response: DropResponse } | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
    const paramsFromUrl = new URLSearchParams(window.location.search);
    const dropId = paramsFromUrl.get("drop");
    const response = paramsFromUrl.get("response") as DropResponse | null;
    if (dropId && response) setQueryDrop({ dropId, response });

    const oldSignal = window.localStorage.getItem(oldSignalStorageKey(eventSlug));
    const newSignal = window.localStorage.getItem(signalStorageKey(eventSlug));
    if (oldSignal && !newSignal) {
      window.localStorage.setItem(signalStorageKey(eventSlug), oldSignal);
    }
  }, [eventSlug]);

  function redrawOnce() {
    if (signal.redrawUsed) return;
    setRevealed(false);
    window.setTimeout(() => {
      setSignal(drawSignal(true));
      setRevealed(true);
    }, 200);
  }

  function enterRoom() {
    if (!confirmed) return;
    writeJsonStorage(signalStorageKey(eventSlug), signal);
    if (queryDrop) {
      writeJsonStorage(dropResponseStorageKey(eventSlug), queryDrop);
      persistDropResponse({
        eventId: demoEvent.id,
        eventSlug,
        dropId: queryDrop.dropId,
        response: queryDrop.response,
        signalName: signal.name
      });
    }
    router.push(`/e/${eventSlug}/room`);
  }

  return (
    <main className="guest-stage flex min-h-dvh flex-col justify-center px-5 py-6 text-center">
      <p className="text-sm text-[var(--text-soft)]">Tonight you&apos;re...</p>

      <section className={`${revealed ? "signal-reveal" : "opacity-0"} mt-5`}>
        <h1 className="font-display text-[64px] leading-[0.95] text-[var(--text-main)]">{signal.name}</h1>
        <p className="mt-5 text-base text-[var(--text-muted)]">{signal.vibe}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {signal.suggestedCircles.map((circle) => (
            <span key={circle} className="rounded-[4px] border border-white/25 bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--text-soft)]">
              {circle}
            </span>
          ))}
        </div>

        <p className="mt-7 text-sm italic text-[var(--secondary)]">
          - {signal.helloTemplates[0]} <span className="text-[var(--text-muted)]">suggested for {signal.name}</span>
        </p>
      </section>

      <div className="mt-9 grid gap-3">
        <PrimaryButton className="w-full" disabled={!confirmed} onClick={enterRoom}>
          That&apos;s me - I&apos;m in
        </PrimaryButton>
        <SecondaryButton className={`w-full ${signal.redrawUsed ? "line-through" : ""}`} disabled={signal.redrawUsed} onClick={redrawOnce}>
          {signal.redrawUsed ? "Redraw (used)" : "Not me - redraw once"}
        </SecondaryButton>
      </div>

      <button
        className={`mt-6 inline-flex justify-center gap-2 text-sm ${confirmed ? "text-[var(--text-soft)]" : "text-[var(--text-muted)]"}`}
        onClick={() => setConfirmed(true)}
        type="button"
      >
        {confirmed ? <Check size={16} /> : null}
        I&apos;m 18+ and I&apos;m here tonight
      </button>

      <p className="mt-12 text-xs text-[var(--text-muted)]">No names. No photos. Everything fades tonight.</p>
    </main>
  );
}
