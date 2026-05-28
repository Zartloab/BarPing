"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Radio, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { VenueHeader } from "@/components/venue-header";
import { demoEvent, demoGuests, demoPilotMetrics, demoSocialWindows, demoTables, demoVenue } from "@/lib/demo-data";
import { circleName, circleStatus, demoDrops, signalStorageKey, type SignalIdentity } from "@/lib/signal-night";

export default function RoomPage() {
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const [signal, setSignal] = useState<SignalIdentity | null>(null);
  const socialWindowActive = demoSocialWindows.some((windowItem) => windowItem.status === "active");
  const featuredCircle = demoTables.find((table) => table.isSpotlighted) ?? demoTables[0];
  const currentDrop = demoDrops[0];
  const activeCircleCount = demoTables.filter((table) => table.isActive !== false).length;

  useEffect(() => {
    const saved = window.localStorage.getItem(signalStorageKey(eventSlug));
    if (!saved) return;
    try {
      setSignal(JSON.parse(saved) as SignalIdentity);
    } catch {
      setSignal(null);
    }
  }, [eventSlug]);

  return (
    <AppShell>
      <VenueHeader venue={demoVenue} event={demoEvent} count={activeCircleCount} />
      <MotionShell className="pb-6">
        <section className="mb-5">
          <div className="inline-flex w-fit rounded-[999px] border border-venue-olive/40 bg-venue-olive/10 px-3 py-1 text-xs font-medium text-venue-olive">
            {socialWindowActive ? "Live now" : "Room paused"}
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-none">The room is live.</h1>
          <p className="mt-3 text-sm leading-6 text-venue-muted">
            {signal ? `${signal.name} / ${signal.vibe}` : "Draw a Signal to unlock the room layer."}
          </p>
        </section>

        <section className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-[12px] border border-venue-soft bg-venue-card p-3">
            <p className="text-2xl font-medium">{demoGuests.length + 11}</p>
            <p className="text-xs text-venue-muted">Signals checked in</p>
          </div>
          <div className="rounded-[12px] border border-venue-soft bg-venue-card p-3">
            <p className="text-2xl font-medium">{activeCircleCount}</p>
            <p className="text-xs text-venue-muted">Circles active</p>
          </div>
          <div className="rounded-[12px] border border-venue-soft bg-venue-card p-3">
            <p className="text-2xl font-medium">{demoPilotMetrics.acceptedPings}</p>
            <p className="text-xs text-venue-muted">Hellos accepted</p>
          </div>
          <div className="rounded-[12px] border border-venue-soft bg-venue-card p-3">
            <p className="text-2xl font-medium">10m</p>
            <p className="text-xs text-venue-muted">temporary chats</p>
          </div>
        </section>

        <section className="mb-5 rounded-[14px] border border-venue-blue/35 bg-venue-blue/10 p-4">
          <p className="flex items-center gap-2 text-xs font-medium text-[#B9C7FF]">
            <Radio size={14} />
            {currentDrop.title}
          </p>
          <h2 className="mt-2 text-xl font-medium">{currentDrop.body}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentDrop.actions.map((action) => (
              <span key={action} className="rounded-full bg-venue-raised px-3 py-1 text-xs text-venue-muted">{action}</span>
            ))}
          </div>
        </section>

        {featuredCircle ? (
          <section className="mb-5 rounded-[14px] border border-venue-amber/35 bg-[linear-gradient(180deg,rgba(255,122,107,0.08),transparent_48%),#171D32] p-4">
            <p className="flex items-center gap-2 text-xs font-medium text-venue-dim">
              <Sparkles size={14} />
              Featured Circle
            </p>
            <h2 className="mt-2 text-2xl font-medium">{circleName(featuredCircle)}</h2>
            <p className="mt-2 text-sm leading-6 text-venue-muted">{featuredCircle.prompt}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-venue-dim">
              <UsersRound size={14} />
              {featuredCircle.memberCount} Signals / {featuredCircle.energyLevel}
            </p>
            <PrimaryLink className="mt-4 w-full" href={`/e/${eventSlug}/table/${featuredCircle.id}`}>
              Join Circle
            </PrimaryLink>
          </section>
        ) : null}

        <section className="grid gap-2">
          <h2 className="text-sm font-medium text-venue-muted">Circles</h2>
          {demoTables.map((circle) => (
            <article key={circle.id} className={`rounded-[12px] border bg-venue-card p-3 ${circle.energyLevel === "Active" ? "border-l-[3px] border-l-venue-olive border-venue-soft bg-venue-olive/5" : "border-venue-soft"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-medium text-venue-cream">{circleName(circle)}</h3>
                  <p className="mt-1 text-sm leading-6 text-venue-muted">{circleStatus(circle)}</p>
                </div>
                <span className="shrink-0 rounded-[999px] bg-venue-raised px-2.5 py-1 text-xs text-venue-muted">
                  {circle.memberCount} Signals
                </span>
              </div>
              {featuredCircle?.id !== circle.id ? (
                <SecondaryLink className="mt-3 min-h-10 w-full" href={`/e/${eventSlug}/table/${circle.id}`}>
                  View Circle
                </SecondaryLink>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-[12px] border border-venue-soft bg-venue-card p-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-venue-danger" size={16} />
            <p className="text-sm leading-6 text-venue-muted">
              Hellos are optional and contextual. They can ignore it. No pressure. Everything fades tonight.
            </p>
          </div>
          <SecondaryLink className="mt-3 min-h-10 w-full" href="/rules">Room rules</SecondaryLink>
        </section>
      </MotionShell>
    </AppShell>
  );
}
