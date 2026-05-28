"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CircleCard, CirclePeekSheet, ActivityFeed, DropResponsePills, DropResponseSummary, DropText, GuestShell, StatsStrip, TopBar } from "@/components/guest-v7";
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
    <GuestShell>
      <TopBar realMode={realMode} signalCount={realMode ? 0 : 18} />

      <section className="px-5 pb-7 pt-8 text-center">
        <p className="guest-label text-[var(--primary)]">Tonight&apos;s Drop</p>
        <div className="mx-auto mt-4 max-w-[360px]">
          <DropText room>{drop.text}</DropText>
        </div>
        <div className="mt-6">
          <DropResponsePills drop={drop} selected={selectedResponse} onSelect={respond} />
          {realMode ? (
            <p className="guest-label mt-4 text-center text-[var(--text-muted)]">
              {selectedResponse ? "You're in." : "The room is warming up."}
            </p>
          ) : (
            <DropResponseSummary drop={drop} response={selectedResponse} />
          )}
        </div>
      </section>

      <section className="px-5">
        <StatsStrip signals={realMode ? 0 : 18} circles={realMode ? 0 : demoTables.length} hellos={realMode ? 0 : 7} />
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display mt-6 text-[28px] leading-none text-[var(--text-main)]">Circles</h2>
          <p className="guest-label text-[var(--text-muted)]">
            {realMode ? "0 active" : `${demoTables.length} active`}
          </p>
        </div>
        <div className="grid gap-3">
          {demoTables.map((circle, index) => {
            return (
              <CircleCard
                key={circle.id}
                circle={circle}
                index={index}
                count={realMode ? 0 : randomizedCounts[index]}
                onClick={() => setPeekCircle(circle)}
              />
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
    </GuestShell>
  );
}
