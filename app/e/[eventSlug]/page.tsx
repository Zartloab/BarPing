import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SafetyNotice } from "@/components/safety-notice";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoGuests, demoSocialWindows, getEventBySlug } from "@/lib/demo-data";
import { formatEventTime, isExpired } from "@/lib/time";

export default async function EventLandingPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  const { venue, event } = getEventBySlug(eventSlug);
  const expired = isExpired(event.endsAt) || event.isClosed;
  const socialWindowActive = demoSocialWindows.some((windowItem) => windowItem.eventId === event.id && windowItem.status === "active");

  return (
    <AppShell>
      <MotionShell className="min-h-[calc(100dvh-2.5rem)] py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">
          BarPing / Social Mode
        </p>
        <div className="mt-8">
          <h1 className="font-serif text-6xl leading-[0.92] text-venue-cream">Meet people already here.</h1>
          <p className="mt-5 text-lg leading-relaxed text-venue-muted">No swiping. No photos. No pressure.</p>
        </div>
        <section className="mt-8 glass-card rounded-[30px] p-5">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">Venue pass</p>
          <h2 className="mt-3 text-2xl font-semibold">{venue.name}</h2>
          <p className="mt-1 text-venue-muted">{event.title}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-white/[0.04] p-3">
              <p className="text-xs text-venue-dim">Time</p>
              <p className="mt-1 text-sm text-venue-cream">{formatEventTime(event.startsAt, event.endsAt)}</p>
            </div>
            <div className="rounded-3xl bg-white/[0.04] p-3">
              <p className="text-xs text-venue-dim">Room</p>
              <p className="mt-1 text-sm text-venue-cream">{demoGuests.length} active guests</p>
            </div>
          </div>
        </section>
        <div className="mt-6 grid gap-3">
          <PrimaryLink href={expired || !socialWindowActive ? "/support" : `/e/${event.slug}/join`}>
            {expired ? "Event closed" : socialWindowActive ? "Enter tonight" : "Social Mode paused"}
          </PrimaryLink>
          <SecondaryLink href="/rules">Community rules</SecondaryLink>
        </div>
        <p className="mt-5 text-center text-sm text-venue-dim">18+ - Venue-only - Temporary chat</p>
        <div className="mt-8">
          <SafetyNotice />
        </div>
      </MotionShell>
    </AppShell>
  );
}
