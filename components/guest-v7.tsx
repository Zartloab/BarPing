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
import {
  isRealSupabaseMode,
  persistCircleJoin,
  persistHelloSend
} from "@/lib/signal-night-client";

const circleAccents = ["var(--secondary)", "var(--live)", "var(--warning)"];

export function guestPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/BarPing" || normalized.startsWith("/BarPing/")) return normalized;
  if (typeof window !== "undefined") {
    return `${window.location.pathname.startsWith("/BarPing") ? "/BarPing" : ""}${normalized}`;
  }
  return `${process.env.NODE_ENV === "production" ? "/BarPing" : ""}${normalized}`;
}

export function GuestShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="guest-stage">
      <div className="guest-shell">{children}</div>
    </main>
  );
}

export function TopBar({
  signalCount = 18,
  realMode = false,
  showBorder = true,
  leftAction
}: {
  signalCount?: number;
  realMode?: boolean;
  showBorder?: boolean;
  leftAction?: React.ReactNode;
}) {
  return (
    <header className={`guest-top-bar ${showBorder ? "" : "border-b-0"}`}>
      <div className="flex min-w-0 items-center gap-3">
        {leftAction}
        <p className="guest-label truncate text-[var(--text-muted)]">{demoVenue.name}</p>
      </div>
      <p className="guest-label flex items-center gap-2 text-[var(--live)]">
        <span className="live-dot rounded-full" />
        {realMode ? signalCount : 18} signals
      </p>
    </header>
  );
}

export const LiveBar = TopBar;

export function GuestPrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button className={`guest-primary ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button className={`guest-ghost ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

export function DropText({ children, room = false }: { children: React.ReactNode; room?: boolean }) {
  return <h1 className={`${room ? "room-drop-text" : "drop-text"} text-center`}>{children}</h1>;
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
            className={`response-pill ${isSelected ? "response-pill-selected" : ""} ${selected && !isSelected ? "response-pill-muted" : ""}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function BottomSheet({
  children,
  onClose
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="bottom-sheet-backdrop" onClick={onClose}>
      <section className="bottom-sheet-panel" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex justify-end">
          <button
            className="guest-icon-button"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function CircleCard({
  circle,
  index,
  count,
  onClick
}: {
  circle: EventTable;
  index: number;
  count: number;
  onClick: () => void;
}) {
  const accent = circleAccents[index % circleAccents.length];
  const initials = circle.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <button className="circle-card w-full" onClick={onClick} type="button">
      <span className="flex items-start gap-3">
        <span className="accent-dot shrink-0" style={{ borderColor: accent, color: accent }}>
          {initials}
        </span>
        <span className="min-w-0">
          <span className="font-display block text-[24px] leading-[1.05] text-[var(--text-main)]">{circle.name}</span>
          <span className="mt-2 block text-[13px] leading-5 text-[var(--text-soft)]">{circle.prompt}</span>
          <span className="guest-label mt-4 block text-[var(--text-muted)]">{count} signals</span>
        </span>
      </span>
    </button>
  );
}

export function StatsStrip({
  signals,
  circles,
  hellos
}: {
  signals: number;
  circles: number;
  hellos: number;
}) {
  return (
    <div className="stats-strip">
      {[
        ["Signals", signals],
        ["Circles", circles],
        ["Hellos", hellos]
      ].map(([label, value]) => (
        <div key={label} className="px-3 py-3 text-center">
          <p className="font-display text-[28px] leading-none text-[var(--text-main)]">{value}</p>
          <p className="guest-micro mt-2 uppercase tracking-[0.1em] text-[var(--text-muted)]">{label}</p>
        </div>
      ))}
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
    window.location.href = guestPath(`/e/${eventSlug}/circle/${circle.id}`);
  }

  return (
    <BottomSheet onClose={onClose}>
      <p className="guest-label text-[var(--secondary)]">Peek Circle</p>
      <h2 className="font-display mt-3 text-[28px] leading-[1.05] text-[var(--text-main)]">{circle.name}</h2>
      <p className="mt-3 text-[15px] leading-6 text-[var(--text-soft)]">{circle.prompt}</p>
      <div className="relative mt-5 grid gap-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(to_bottom,var(--surface),rgba(23,29,50,0))]" />
        {messages.slice(0, 3).map((message) => (
          <p key={`${message.signal}-${message.body}`} className="rounded-[8px] bg-[var(--surface-raised)] px-3 py-2 text-[13px] leading-5 text-[var(--text-soft)]">
            <span className="font-medium text-[var(--text-main)]">{message.signal}:</span> {message.body}
          </p>
        ))}
      </div>
      <GuestPrimaryButton className="mt-6" onClick={joinCircle}>Join this Circle</GuestPrimaryButton>
      <GhostButton className="mt-4 w-full" onClick={onClose}>Maybe later</GhostButton>
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

  return (
    <section className="px-5 pb-8 pt-6">
      <p className="guest-label mb-3 text-[var(--text-muted)]">Room traces</p>
      <p key={index} className="activity-item text-[13px] leading-5 text-[var(--text-muted)]">
        {realMode ? "The room is warming up." : activityFeedItems[index]}
      </p>
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
    <BottomSheet onClose={onClose}>
      <div className="rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <p className="text-[16px] italic leading-7 text-[var(--secondary)]">&quot;{starters[0]}&quot;</p>
        <p className="guest-micro mt-2 uppercase tracking-[0.1em] text-[var(--text-muted)]">Suggested for {signal.name}</p>
      </div>
      <h3 className="mt-5 text-[14px] font-medium text-[var(--text-soft)]">Or pick a different one:</h3>
      <div className="mt-3 grid gap-2">
        {starters.slice(1).map((starter) => (
          <button
            key={starter}
            className={`rounded-[8px] border p-3 text-left text-[13px] leading-5 transition ${
              selected === starter
                ? "border-[var(--primary)] bg-[rgba(255,122,107,0.1)] text-[var(--text-main)]"
                : "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-soft)]"
            }`}
            onClick={() => setSelected(starter)}
            type="button"
          >
            {starter}
          </button>
        ))}
      </div>
      <GuestPrimaryButton className="mt-5" onClick={sendHello} disabled={sent}>
        {sent ? <span className="hello-check inline-flex items-center gap-2">Sent <Check size={17} /></span> : "Send Hello"}
      </GuestPrimaryButton>
    </BottomSheet>
  );
}

export function BackLink({ href }: { href: string }) {
  return (
    <a className="guest-icon-button" href={guestPath(href)} aria-label="Back">
      <ArrowLeft size={18} />
    </a>
  );
}

export function HelloUnlockHint({ unlocked, onInfo }: { unlocked: boolean; onInfo: () => void }) {
  if (unlocked) return null;
  return (
    <p className="flex items-center justify-center gap-2 py-4 text-[13px] text-[var(--text-muted)]">
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
    <p className="guest-label mt-4 text-center text-[var(--text-muted)]">
      {response ? `${selectedResponseLabel(drop, response)} got you in.` : `${responseCount(drop)} people responded`}
    </p>
  );
}
