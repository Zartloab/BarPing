"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DropResponsePills } from "@/components/guest-v7";
import { demoEvent, demoGuests, getEventBySlug } from "@/lib/demo-data";
import { demoDrops, responseKeys } from "@/lib/signal-night";
import { isRealSupabaseMode } from "@/lib/signal-night-client";
import type { DropResponse } from "@/lib/types";

export default function EventLandingPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const { venue } = getEventBySlug(eventSlug);
  const drop = demoDrops[0];
  const realMode = isRealSupabaseMode();
  const [selected, setSelected] = useState<DropResponse | null>(null);
  const selectedIndex = useMemo(() => selected ? responseKeys.indexOf(selected) : -1, [selected]);

  function drawSignal() {
    const query = selected ? `?drop=${drop.id}&response=${selected}` : "";
    router.push(`/e/${eventSlug}/signal${query}`);
  }

  return (
    <main className="guest-stage flex min-h-dvh flex-col px-4 py-4">
      <header className="flex items-center justify-between gap-4 text-sm">
        <p className="truncate text-[var(--text-soft)]">{venue.name}</p>
        <p className="font-mono flex items-center gap-2 text-xs text-[var(--text-soft)]">
          <span className="live-dot h-2.5 w-2.5 rounded-full" />
          {realMode ? 0 : demoGuests.length + 16} signals
        </p>
      </header>

      <section className="flex flex-1 flex-col justify-center py-8 text-center">
        <div className="h-px bg-[var(--surface-raised)]" />
        <h1 className="font-display drop-pulse mx-auto my-10 max-w-[390px] text-[52px] leading-[1.05] text-[var(--text-main)]">
          {drop.text}
        </h1>
        <div className="h-px bg-[var(--surface-raised)]" />

        <div className="mt-8">
          <DropResponsePills drop={drop} selected={selected} onSelect={setSelected} />
          <p className="mt-5 text-sm text-[var(--text-muted)]">
            {selectedIndex >= 0 ? "You're in." : realMode ? "The room is warming up." : `${demoGuests.length + 16} people got this.`}
          </p>
        </div>

        {selected ? (
          <div className="mt-8 animate-[sheetIn_300ms_ease-out_both]">
            <button
              className="tap-highlight min-h-[52px] w-full rounded-[6px] bg-[var(--primary)] px-4 text-sm font-bold text-[var(--bg-main)] shadow-[0_18px_42px_rgba(255,122,107,0.22)]"
              onClick={drawSignal}
              type="button"
            >
              Draw my Signal
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
