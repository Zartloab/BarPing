"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CirclePeekSheet, ActivityFeed, DropResponsePills, DropResponseSummary, IncomingHelloBar, LiveBar } from "@/components/guest-v7";
import { demoEvent, demoTables } from "@/lib/demo-data";
import {
  dropResponseStorageKey,
  demoDrops,
  readJsonStorage,
  responseCount,
  signalStorageKey,
  type SignalIdentity,
  writeJsonStorage
} from "@/lib/signal-night";
import { isRealSupabaseMode, persistDropResponse } from "@/lib/signal-night-client";
import type { DropResponse, EventTable } from "@/lib/types";

export default function RoomPage() {
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const drop = demoDrops[0];
  const realMode = isRealSupabaseMode();
  const [signal, setSignal] = useState<SignalIdentity | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<DropResponse | null>(null);
  const [peekCircle, setPeekCircle] = useState<EventTable | null>(null);
  const randomizedCounts = useMemo(() => demoTables.map((circle, index) => 3 + ((circle.memberCount + index) % 5)), []);

  useEffect(() => {
    setSignal(readJsonStorage<SignalIdentity | null>(signalStorageKey(eventSlug), null));
    const stored = readJsonStorage<{ dropId: string; response: DropResponse } | null>(dropResponseStorageKey(eventSlug), null);
    if (stored?.dropId === drop.id) setSelectedResponse(stored.response);
  }, [drop.id, eventSlug]);

  function respond(response: DropResponse) {
    setSelectedResponse(response);
    writeJsonStorage(dropResponseStorageKey(eventSlug), { dropId: drop.id, response });
    persistDropResponse({ eventId: demoEvent.id, eventSlug, dropId: drop.id, response, signalName: signal?.name });
  }

  return (
    <main className="guest-stage min-h-dvh">
      <LiveBar realMode={realMode} signalCount={realMode ? 0 : 18} />
      {!realMode ? <IncomingHelloBar eventId={demoEvent.id} eventSlug={eventSlug} /> : null}

      <section className="flex min-h-[35dvh] flex-col justify-center px-4 py-7 text-center">
        <h1 className="font-display drop-pulse mx-auto max-w-[390px] text-[40px] leading-[1.05]">{drop.text}</h1>
        <div className="mt-6">
          <DropResponsePills drop={drop} selected={selectedResponse} onSelect={respond} />
          {realMode ? (
            <p className="mt-3 text-center text-sm text-[var(--text-muted)]">
              {selectedResponse ? "You're in." : "The room is warming up."}
            </p>
          ) : (
            <DropResponseSummary drop={drop} response={selectedResponse} />
          )}
        </div>
      </section>

      <section className="px-4">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-2xl">Circles</h2>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {realMode ? "0 active" : `${demoTables.length} active`}
          </p>
        </div>
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {demoTables.map((circle, index) => {
            const hot = circle.energyLevel === "Active";
            const quiet = circle.energyLevel === "Quiet";
            const accent = index % 3 === 0 ? "var(--secondary)" : index % 3 === 1 ? "var(--live)" : "var(--warning)";
            return (
              <button
                key={circle.id}
                className="min-h-[172px] w-[72%] shrink-0 snap-start rounded-[12px] border border-white/10 bg-[var(--surface-raised)] p-4 text-left shadow-soft"
                style={{ borderLeft: `4px solid ${accent}` }}
                onClick={() => setPeekCircle(circle)}
                type="button"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[24px] leading-none">{circle.name}</span>
                  {hot ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)]" /> : null}
                </span>
                <span className="mt-3 block text-sm leading-5 text-[var(--text-soft)]">{circle.prompt}</span>
                <span className="font-mono mt-4 block text-xs text-[var(--text-muted)]">
                  {realMode ? 0 : randomizedCounts[index]} signals
                </span>
                <span className="mt-3 flex gap-1.5">
                  {["var(--secondary)", "var(--live)", "var(--warning)", "var(--primary)"].slice(0, 3 + (index % 2)).map((color, dotIndex) => (
                    <span key={`${circle.id}-${dotIndex}`} className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                  ))}
                </span>
                {quiet ? <span className="mt-3 block text-xs text-[var(--text-muted)]">Start it?</span> : null}
              </button>
            );
          })}
        </div>
      </section>

      <ActivityFeed />
      <p className="px-4 pb-6 text-xs text-[var(--text-muted)]">
        {realMode ? "Real room data only." : `${responseCount(drop)} people responded`}
      </p>

      {peekCircle ? (
        <CirclePeekSheet
          circle={peekCircle}
          eventId={demoEvent.id}
          eventSlug={eventSlug}
          signal={signal}
          onClose={() => setPeekCircle(null)}
        />
      ) : null}
    </main>
  );
}
