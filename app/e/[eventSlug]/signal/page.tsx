"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { GhostButton, GuestPrimaryButton, GuestShell, TopBar } from "@/components/guest-v7";
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
    <GuestShell>
      <TopBar />
      <section className="flex min-h-[calc(100dvh-48px)] flex-col justify-center px-5 py-6 text-center">
        <p className="guest-label stagger-in text-[var(--text-muted)]" style={{ animationDelay: "100ms" }}>Tonight you&apos;re...</p>

        <div className={`${revealed ? "signal-reveal" : "opacity-0"} mt-5`}>
          <h1 className="font-display text-[64px] leading-[0.95] text-[var(--text-main)]">{signal.name}</h1>
        </div>
        <p className="stagger-in mt-5 text-[16px] text-[var(--text-muted)]" style={{ animationDelay: "300ms" }}>{signal.vibe}</p>

        <div className="stagger-in mt-6 flex flex-wrap justify-center gap-2" style={{ animationDelay: "550ms" }}>
          {signal.suggestedCircles.map((circle) => (
            <span key={circle} className="guest-micro rounded-[4px] border border-[var(--border-default)] bg-transparent px-2 py-1 uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {circle}
            </span>
          ))}
        </div>

        <p className="stagger-in mt-7 text-[14px] italic text-[var(--secondary)]" style={{ animationDelay: "750ms" }}>
          - {signal.helloTemplates[0]} <span className="text-[var(--text-muted)]">suggested for {signal.name}</span>
        </p>

      <div className="stagger-in mt-9 grid gap-4" style={{ animationDelay: "900ms" }}>
        <GuestPrimaryButton disabled={!confirmed} onClick={enterRoom}>
          That&apos;s me - I&apos;m in
        </GuestPrimaryButton>
        <GhostButton className="w-full" disabled={signal.redrawUsed} onClick={redrawOnce}>
          {signal.redrawUsed ? "Redraw (used)" : "Not me - redraw once"}
        </GhostButton>
      </div>

      <button
        className={`mt-7 inline-flex justify-center gap-2 text-[13px] ${confirmed ? "text-[var(--live)]" : "text-[var(--text-muted)]"}`}
        onClick={() => setConfirmed(true)}
        type="button"
      >
        {confirmed ? <Check size={16} /> : null}
        I&apos;m 18+ and I&apos;m here tonight
      </button>

        <p className="guest-micro mt-12 text-[var(--text-muted)]">No names. No photos. Everything fades tonight.</p>
      </section>
    </GuestShell>
  );
}
