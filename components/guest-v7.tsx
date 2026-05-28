"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, HelpCircle, X } from "lucide-react";
import type { DropResponse, EventDrop, EventTable } from "@/lib/types";
import { demoVenue } from "@/lib/demo-data";
import {
  activityFeedItems,
  circlesStorageKey,
  demoCircleMessages,
  dropResponseStorageKey,
  helloStarters,
  helloUnlockStorageKey,
  readJsonStorage,
  responseCount,
  responseKeys,
  selectedResponseLabel,
  signalStorageKey,
  type SignalIdentity,
  writeJsonStorage
} from "@/lib/signal-night";
import { isRealSupabaseMode, persistCircleJoin, persistHelloDecision, persistHelloSend, persistTemporaryChatStart } from "@/lib/signal-night-client";
import { PrimaryButton } from "@/components/ui/buttons";

export function LiveBar({ signalCount = 18, realMode = false }: { signalCount?: number; realMode?: boolean }) {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-white/10 bg-[#080B16]/95 px-4 backdrop-blur">
      <p className="truncate text-sm text-[var(--text-soft)]">{demoVenue.name}</p>
      <p className="font-mono flex items-center gap-2 text-xs text-[var(--text-soft)]">
        <span className="live-dot h-2.5 w-2.5 rounded-full" />
        {realMode ? signalCount : 18} signals
      </p>
    </header>
  );
}

export function DropResponsePills({
  drop,
  selected,
  onSelect,
  disabled = false
}: {
  drop: EventDrop;
  selected: DropResponse | null;
  onSelect: (response: DropResponse) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {drop.responseOptions.map((option, index) => {
        const key = responseKeys[index];
        const isSelected = selected === key;
        return (
          <button
            key={option}
            disabled={disabled}
            onClick={() => onSelect(key)}
            type="button"
            className={`min-h-11 rounded-full border px-4 py-2 text-sm transition active:scale-[0.96] ${
              isSelected
                ? "border-[var(--primary)] bg-[rgba(255,122,107,0.2)] text-[var(--text-main)]"
                : selected
                  ? "border-[var(--surface-raised)] text-[var(--text-muted)] opacity-55"
                  : "border-[var(--surface-raised)] text-[var(--text-soft)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function BottomSheet({ children, onClose, height = "65%" }: { children: React.ReactNode; onClose: () => void; height?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/45" onClick={onClose}>
      <section
        className="bottom-sheet w-full rounded-t-[18px] border border-white/10 bg-[var(--surface)] p-4 shadow-soft"
        style={{ minHeight: height }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex justify-end">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--text-muted)]" onClick={onClose} type="button" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function CirclePeekSheet({
  circle,
  eventId,
  eventSlug,
  signal,
  onClose
}: {
  circle: EventTable;
  eventId: string;
  eventSlug: string;
  signal: SignalIdentity | null;
  onClose: () => void;
}) {
  const messages = demoCircleMessages[circle.id] ?? [];

  function joinCircle() {
    const key = circlesStorageKey(eventSlug);
    const existing = readJsonStorage<string[]>(key, []);
    const next = Array.from(new Set([...existing, circle.id]));
    writeJsonStorage(key, next);
    persistCircleJoin({ eventId, circleId: circle.id, signalName: signal?.name });
    window.location.href = `/e/${eventSlug}/circle/${circle.id}`;
  }

  return (
    <BottomSheet onClose={onClose}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--secondary)]">Peek Circle</p>
      <h2 className="font-display mt-2 text-4xl leading-none">{circle.name}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">{circle.prompt}</p>
      <div className="relative mt-5 grid gap-3 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--surface)] to-transparent" />
        {messages.slice(0, 3).map((message) => (
          <p key={`${message.signal}-${message.body}`} className="rounded-[10px] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-soft)]">
            <span className="text-[var(--text-main)]">{message.signal}</span> {message.body}
          </p>
        ))}
      </div>
      <PrimaryButton className="mt-6 w-full" onClick={joinCircle}>Join this Circle</PrimaryButton>
      <button className="mt-4 w-full text-sm text-[var(--text-muted)]" onClick={onClose} type="button">Maybe later</button>
    </BottomSheet>
  );
}

export function ActivityFeed() {
  const realMode = isRealSupabaseMode();
  const [index, setIndex] = useState(0);
  const lastSwap = useRef(0);

  useEffect(() => {
    if (realMode) return;
    let frame = 0;
    function tick(time: number) {
      if (!lastSwap.current) lastSwap.current = time;
      if (time - lastSwap.current > 5000) {
        setIndex((value) => (value + 1) % activityFeedItems.length);
        lastSwap.current = time;
      }
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [realMode]);

  if (realMode) {
    return <p className="px-4 py-5 text-sm text-[var(--text-muted)]">The room is warming up.</p>;
  }

  return (
    <section className="px-4 py-5">
      <p className="font-mono mb-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Room traces</p>
      <p key={index} className="activity-item text-sm text-[var(--text-soft)]">{activityFeedItems[index]}</p>
    </section>
  );
}

export function HelloSheet({
  eventId,
  circleId,
  signal,
  onClose
}: {
  eventId: string;
  circleId: string;
  signal: SignalIdentity;
  onClose: () => void;
}) {
  const starters = helloStarters[signal.name] ?? helloStarters["The Matchbook"];
  const [selected, setSelected] = useState(starters[0]);
  const [sent, setSent] = useState(false);

  function sendHello() {
    persistHelloSend({ eventId, circleId, templateText: selected, signalName: signal.name });
    setSent(true);
    window.setTimeout(onClose, 1200);
  }

  return (
    <BottomSheet onClose={onClose} height="58%">
      <div className="rounded-[12px] border border-[var(--primary)]/40 bg-[rgba(255,122,107,0.08)] p-4">
        <p className="text-lg leading-7 text-[var(--text-main)]">&quot;{starters[0]}&quot;</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Suggested for {signal.name}</p>
      </div>
      <h3 className="mt-5 text-sm font-bold text-[var(--text-soft)]">Or pick a different one:</h3>
      <div className="mt-3 grid gap-2">
        {starters.slice(1).map((starter) => (
          <button
            key={starter}
            className={`rounded-[8px] border bg-[var(--surface-raised)] p-3 text-left text-sm transition ${
              selected === starter ? "border-[var(--primary)] bg-[rgba(255,122,107,0.1)]" : "border-white/10 text-[var(--text-soft)]"
            }`}
            onClick={() => setSelected(starter)}
            type="button"
          >
            {starter}
          </button>
        ))}
      </div>
      <PrimaryButton className="mt-5 w-full" onClick={sendHello} disabled={sent}>
        {sent ? <span className="hello-check inline-flex items-center gap-2">Sent <Check size={17} /></span> : "Send Hello"}
      </PrimaryButton>
    </BottomSheet>
  );
}

export function IncomingHelloBar({ eventId, eventSlug }: { eventId: string; eventSlug: string }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const helloId = "demo-incoming-hello";

  if (hidden) return null;

  function reply() {
    persistHelloDecision({ eventId, helloId, status: "accepted" });
    persistTemporaryChatStart({ eventId, helloId, otherSignal: "The Cassette" });
    window.location.href = `/e/${eventSlug}/chat/demo-chat`;
  }

  return (
    <>
      <div className="sticky top-12 z-30 border-b border-[var(--primary)] bg-[var(--surface-raised)] px-4 py-3">
        <p className="text-sm text-[var(--text-soft)]">The Cassette said hello in The B-Side</p>
        <div className="mt-2 flex gap-3 text-sm">
          <button className="font-bold text-[var(--primary)]" onClick={() => setOpen(true)} type="button">See it</button>
          <button className="text-[var(--text-muted)]" onClick={() => setHidden(true)} type="button">Maybe later</button>
        </div>
      </div>
      {open ? (
        <BottomSheet onClose={() => setOpen(false)} height="45%">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--secondary)]">The Cassette</p>
          <h2 className="mt-3 text-2xl leading-tight">&quot;What song saves this room?&quot;</h2>
          <PrimaryButton className="mt-6 w-full" onClick={reply}>Reply</PrimaryButton>
          <button className="mt-4 w-full text-sm text-[var(--text-muted)]" onClick={() => setOpen(false)} type="button">Not right now</button>
          <button className="mt-5 w-full text-xs text-[var(--danger)]" onClick={() => {
            persistHelloDecision({ eventId, helloId, status: "blocked" });
            setHidden(true);
          }} type="button">Block</button>
        </BottomSheet>
      ) : null}
    </>
  );
}

export function BackLink({ href }: { href: string }) {
  return (
    <a className="inline-grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--text-soft)]" href={href} aria-label="Back">
      <ArrowLeft size={18} />
    </a>
  );
}

export function HelloUnlockHint({ unlocked, onInfo }: { unlocked: boolean; onInfo: () => void }) {
  if (unlocked) return null;
  return (
    <p className="flex items-center justify-center gap-2 py-4 text-sm text-[var(--text-muted)]">
      You&apos;ve just arrived - look around.
      <button className="text-[var(--secondary)]" onClick={onInfo} type="button" aria-label="Hello info">
        <HelpCircle size={15} />
      </button>
    </p>
  );
}

export function useStoredSignal(eventSlug: string) {
  return useMemo(() => {
    if (typeof window === "undefined") return null;
    return readJsonStorage<SignalIdentity | null>(signalStorageKey(eventSlug), null);
  }, [eventSlug]);
}

export function readStoredDropResponse(eventSlug: string) {
  return readJsonStorage<{ dropId: string; response: DropResponse } | null>(dropResponseStorageKey(eventSlug), null);
}

export function markHelloUnlocked(eventSlug: string, circleId: string) {
  const key = helloUnlockStorageKey(eventSlug);
  const existing = readJsonStorage<Record<string, boolean>>(key, {});
  writeJsonStorage(key, { ...existing, [circleId]: true });
}

export function hasHelloUnlocked(eventSlug: string, circleId: string) {
  return Boolean(readJsonStorage<Record<string, boolean>>(helloUnlockStorageKey(eventSlug), {})[circleId]);
}

export function DropResponseSummary({ drop, response }: { drop: EventDrop; response: DropResponse | null }) {
  return (
    <p className="mt-3 text-center text-sm text-[var(--text-muted)]">
      {response ? `${selectedResponseLabel(drop, response)} got you in.` : `${responseCount(drop)} people responded`}
    </p>
  );
}
