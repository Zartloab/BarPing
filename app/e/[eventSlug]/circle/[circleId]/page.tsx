"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Flag, HelpCircle } from "lucide-react";
import { BackLink, GuestPrimaryButton, GuestShell, HelloSheet, HelloUnlockHint, TopBar, hasHelloUnlocked, markHelloUnlocked } from "@/components/guest-v7";
import { demoEvent, demoTables } from "@/lib/demo-data";
import {
  circlesStorageKey,
  demoCircleMessages,
  demoDrops,
  dropResponseStorageKey,
  readJsonStorage,
  signalStorageKey,
  type SignalIdentity,
  writeJsonStorage
} from "@/lib/signal-night";
import { persistCircleJoin } from "@/lib/signal-night-client";

export default function CirclePage() {
  const params = useParams<{ eventSlug: string; circleId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const circleId = params?.circleId ?? demoTables[0].id;
  const circle = demoTables.find((item) => item.id === circleId) ?? demoTables[0];
  const messages = demoCircleMessages[circle.id] ?? [];
  const [signal, setSignal] = useState<SignalIdentity | null>(null);
  const [openToHello, setOpenToHello] = useState(false);
  const [helloUnlocked, setHelloUnlocked] = useState(false);
  const [helloOpen, setHelloOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);
  const dropResponse = useMemo(() => readJsonStorage<{ dropId: string; response: string } | null>(dropResponseStorageKey(eventSlug), null), [eventSlug]);
  const currentDrop = demoDrops.find((drop) => drop.relatedCircleId === circle.id) ?? demoDrops[0];

  useEffect(() => {
    const storedSignal = readJsonStorage<SignalIdentity | null>(signalStorageKey(eventSlug), null);
    setSignal(storedSignal);
    const joined = readJsonStorage<string[]>(circlesStorageKey(eventSlug), []);
    if (!joined.includes(circle.id)) {
      writeJsonStorage(circlesStorageKey(eventSlug), [...joined, circle.id]);
      persistCircleJoin({ eventId: demoEvent.id, circleId: circle.id, signalName: storedSignal?.name });
    }
    if (dropResponse) {
      markHelloUnlocked(eventSlug, circle.id);
      setHelloUnlocked(true);
      return;
    }
    setHelloUnlocked(hasHelloUnlocked(eventSlug, circle.id));
    const timer = window.setTimeout(() => {
      markHelloUnlocked(eventSlug, circle.id);
      setHelloUnlocked(true);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [circle.id, dropResponse, eventSlug]);

  function onThreadScroll() {
    const node = threadRef.current;
    if (!node || helloUnlocked) return;
    if (node.scrollTop > 84) {
      markHelloUnlocked(eventSlug, circle.id);
      setHelloUnlocked(true);
    }
  }

  return (
    <GuestShell>
      <TopBar leftAction={<BackLink href={`/e/${eventSlug}/room`} />} />
      <section className="px-5 py-6">
        <button className="guest-micro float-right uppercase tracking-[0.1em] text-[var(--danger)]" type="button">Report</button>

        <h1 className="font-display clear-both text-[28px] leading-[1.1] text-[var(--text-main)]">{circle.name}</h1>
        <p className="mt-3 text-[15px] leading-6 text-[var(--text-soft)]">{circle.prompt}</p>
        <p className="mt-4 rounded-[12px] border border-[var(--border-default)] bg-[var(--surface)] p-3 text-[13px] leading-5 text-[var(--text-muted)]">
          Drop: {currentDrop.text}
        </p>

        <div ref={threadRef} onScroll={onThreadScroll} className="scrollbar-warm relative mt-5 max-h-[34dvh] space-y-3 overflow-y-auto rounded-[12px] border border-[var(--border-default)] bg-[var(--surface)] p-3">
          <div className="pointer-events-none sticky top-0 -mx-3 -mt-3 h-8 bg-[linear-gradient(to_bottom,var(--surface),rgba(23,29,50,0))]" />
          {[...messages, ...messages].map((message, index) => (
            <p key={`${message.signal}-${index}`} className="text-[13px] leading-6 text-[var(--text-soft)]">
              <span className="font-medium text-[var(--text-main)]">{message.signal}:</span> {message.body}
            </p>
          ))}
        </div>

        <button
          className={`mt-5 flex w-full items-center justify-between gap-4 rounded-[12px] border p-4 text-left text-[var(--text-main)] ${
            openToHello ? "border-[var(--live)] bg-[rgba(124,255,203,0.08)]" : "border-[var(--border-default)] bg-[var(--surface)]"
          }`}
          onClick={() => setOpenToHello((value) => !value)}
          type="button"
        >
          <span>
            <span className="block text-sm font-medium">Open to a Hello in this Circle</span>
            <span className="mt-1 block text-xs text-[var(--text-muted)]">They can say hi. You choose whether to reply.</span>
          </span>
          <span className={`h-6 w-10 rounded-full p-1 ${openToHello ? "bg-[var(--live)]" : "bg-[var(--surface-raised)]"}`}>
            <span className={`block h-4 w-4 rounded-full transition ${openToHello ? "translate-x-4 bg-[var(--bg-main)]" : "bg-[var(--text-soft)]"}`} />
          </span>
        </button>

        {info ? (
          <p className="mt-3 rounded-[10px] bg-[var(--surface)] p-3 text-xs text-[var(--text-muted)]">
            They can say hi. You choose whether to reply.
          </p>
        ) : null}

        <HelloUnlockHint unlocked={helloUnlocked} onInfo={() => setInfo((value) => !value)} />

        {helloUnlocked && signal ? (
          <GuestPrimaryButton className="mt-4 animate-[helloCheck_400ms_ease-out_both]" onClick={() => setHelloOpen(true)}>
            Send a Hello
          </GuestPrimaryButton>
        ) : null}

        {!signal ? (
          <a className="guest-primary mt-4" href={`/e/${eventSlug}/signal`}>
            Draw my Signal
          </a>
        ) : null}

        <div className="mt-5 flex justify-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1"><HelpCircle size={13} /> Help</span>
          <span className="inline-flex items-center gap-1 text-[var(--danger)]"><Flag size={13} /> Safety</span>
        </div>
      </section>

      {helloOpen && signal ? (
        <HelloSheet eventId={demoEvent.id} circleId={circle.id} signal={signal} onClose={() => setHelloOpen(false)} />
      ) : null}
    </GuestShell>
  );
}
