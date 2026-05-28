"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DropResponsePills, DropText, GuestPrimaryButton, GuestShell, TopBar } from "@/components/guest-v7";
import { demoEvent, demoGuests, demoTables, getEventBySlug } from "@/lib/demo-data";
import { demoDrops } from "@/lib/signal-night";
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

  function drawSignal() {
    const query = selected ? `?drop=${drop.id}&response=${selected}` : "";
    router.push(`/e/${eventSlug}/signal${query}`);
  }

  return (
    <GuestShell>
      <TopBar signalCount={realMode ? 0 : demoGuests.length + 16} realMode={realMode} showBorder={false} />

      <section className="px-5 pb-8 pt-10 text-center">
        <p className="guest-label text-[var(--primary)]">Tonight&apos;s Drop</p>
        <div className="mx-auto mt-5 max-w-[360px]">
          <DropText>{drop.text}</DropText>
        </div>
        <p className="guest-label mt-5 text-[var(--text-muted)]">
          {realMode ? "The room is warming up." : `${demoGuests.length + 16} people got this.`}
        </p>

        <div className="mt-6">
          <DropResponsePills drop={drop} selected={selected} onSelect={setSelected} />
        </div>

        {selected ? (
          <div className="mt-8 animate-[staggerIn_320ms_ease-out_both]">
            <p className="guest-label mb-3 text-[var(--live)]">You&apos;re in</p>
            <GuestPrimaryButton onClick={drawSignal}>Draw my Signal</GuestPrimaryButton>
          </div>
        ) : null}
      </section>

      <section className="border-t border-[var(--border-subtle)] px-5 pb-8 pt-6">
        <div className="mb-4 flex items-end justify-between">
          <p className="guest-label text-[var(--text-muted)]">Circles tonight</p>
          <p className="guest-micro uppercase tracking-[0.1em] text-[var(--text-muted)]">{demoTables.length} open</p>
        </div>
        <div className="grid gap-3">
          {demoTables.slice(0, 3).map((circle, index) => {
            const accent = index % 3 === 0 ? "var(--secondary)" : index % 3 === 1 ? "var(--live)" : "var(--warning)";
            return (
              <article key={circle.id} className="circle-card">
                <div className="flex items-start gap-3">
                  <span className="accent-dot shrink-0" style={{ borderColor: accent, color: accent }}>{index + 1}</span>
                  <div>
                    <h2 className="font-display text-[24px] leading-[1.05] text-[var(--text-main)]">{circle.name}</h2>
                    <p className="mt-2 text-[13px] leading-5 text-[var(--text-soft)]">{circle.prompt}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <p className="guest-micro px-5 pb-6 text-center uppercase tracking-[0.1em] text-[var(--text-muted)]">{venue.name}</p>
    </GuestShell>
  );
}
