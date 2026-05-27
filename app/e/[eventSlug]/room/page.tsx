"use client";

import { useParams } from "next/navigation";
import { Bell, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { VenueHeader } from "@/components/venue-header";
import { demoAnnouncements, demoEvent, demoSocialWindows, demoTables, demoVenue } from "@/lib/demo-data";

export default function RoomPage() {
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const socialWindowActive = demoSocialWindows.some((windowItem) => windowItem.status === "active");
  const recommendedTable = demoTables.find((table) => table.isSpotlighted) ?? demoTables[0];
  const currentAnnouncement = demoAnnouncements[0];

  return (
    <AppShell>
      <VenueHeader venue={demoVenue} event={demoEvent} count={demoTables.length} />
      <MotionShell className="pb-6">
        <section className="mb-5">
          <div className="inline-flex w-fit rounded-[999px] border border-venue-soft bg-venue-card px-3 py-1 text-xs font-medium text-venue-muted">
            {socialWindowActive ? "Live now" : "Tables paused"}
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-none">Pick a table.</h1>
          <p className="mt-3 text-sm leading-6 text-venue-muted">
            {demoVenue.name} / {demoEvent.title}
          </p>
        </section>

        {currentAnnouncement ? (
          <section className="mb-4 flex gap-3 rounded-[12px] border border-venue-soft bg-venue-card p-3">
            <Bell className="mt-0.5 shrink-0 text-venue-amberSoft" size={16} />
            <div>
              <p className="text-xs font-medium text-venue-dim">Host</p>
              <p className="mt-1 text-sm leading-6 text-venue-muted">{currentAnnouncement.body}</p>
            </div>
          </section>
        ) : null}

        {recommendedTable ? (
          <section className="mb-5 rounded-[14px] border border-venue-amber/35 bg-[linear-gradient(180deg,rgba(255,122,107,0.08),transparent_48%),#171D32] p-4">
            <p className="flex items-center gap-2 text-xs font-medium text-venue-dim">
              <Sparkles size={14} />
              Recommended
            </p>
            <h2 className="mt-2 text-2xl font-medium">{recommendedTable.name}</h2>
            <p className="mt-2 text-sm leading-6 text-venue-muted">{recommendedTable.prompt}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-venue-dim">
              <UsersRound size={14} />
              {recommendedTable.memberCount}/{recommendedTable.maxMembers} seated
            </p>
            <PrimaryLink className="mt-4 w-full" href={`/e/${eventSlug}/table/${recommendedTable.id}`}>
              Join this table
            </PrimaryLink>
          </section>
        ) : null}

        <section className="grid gap-2">
          <h2 className="text-sm font-medium text-venue-muted">All tables</h2>
          {demoTables.map((table) => (
            <article key={table.id} className={`rounded-[12px] border bg-venue-card p-3 ${table.energyLevel === "Active" ? "border-l-[3px] border-l-venue-olive border-venue-soft bg-venue-olive/5" : "border-venue-soft"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-medium text-venue-cream">{table.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-venue-muted">{table.description}</p>
                </div>
                <span className="shrink-0 rounded-[999px] bg-venue-raised px-2.5 py-1 text-xs text-venue-muted">
                  {table.memberCount}/{table.maxMembers}
                </span>
              </div>
              {recommendedTable?.id !== table.id ? (
                <SecondaryLink className="mt-3 min-h-10 w-full" href={`/e/${eventSlug}/table/${table.id}`}>
                  View table
                </SecondaryLink>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-[12px] border border-venue-soft bg-venue-card p-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-venue-danger" size={16} />
            <p className="text-sm leading-6 text-venue-muted">
              Hellos are optional after you join. Same table only, mutual, rate limited, easy to ignore or report.
            </p>
          </div>
          <SecondaryLink className="mt-3 min-h-10 w-full" href="/rules">Safety rules</SecondaryLink>
        </section>
      </MotionShell>
    </AppShell>
  );
}
