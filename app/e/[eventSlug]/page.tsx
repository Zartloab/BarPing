import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoSocialWindows, getEventBySlug } from "@/lib/demo-data";
import { isExpired } from "@/lib/time";

export default async function EventLandingPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  const { venue, event } = getEventBySlug(eventSlug);
  const expired = isExpired(event.endsAt) || event.isClosed;
  const socialWindowActive = demoSocialWindows.some((windowItem) => windowItem.eventId === event.id && windowItem.status === "active");
  const isJoinable = !expired && socialWindowActive;

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-center py-4">
        <p className="text-sm font-medium text-venue-muted">{event.title} at {venue.name}</p>
        <h1 className="mt-4 font-serif text-5xl leading-none text-venue-cream">Pick a conversation table.</h1>
        <div className="mt-4 inline-flex w-fit rounded-[999px] border border-venue-soft bg-venue-card px-3 py-1 text-xs font-medium text-venue-muted">
          {expired ? "Closed" : socialWindowActive ? "Live now" : "Paused"}
        </div>
        <p className="mt-6 text-lg leading-7 text-venue-muted">
          No photos. No names. No pressure.
        </p>

        <div className="mt-8 grid gap-3">
          <PrimaryLink href={isJoinable ? `/e/${event.slug}/room` : "/support"}>
            {expired ? "Event closed" : socialWindowActive ? "See tonight's tables" : "Tables paused"}
          </PrimaryLink>
          <SecondaryLink href="/rules">Community rules</SecondaryLink>
        </div>

        <section className="mt-8 rounded-[12px] border border-venue-soft bg-venue-card p-4">
          <p className="text-xs font-medium text-venue-dim">How tonight works</p>
          <p className="mt-2 text-sm leading-6 text-venue-muted">Start by reading the tables. No names, no photos, no pressure to be available for hellos.</p>
        </section>
      </MotionShell>
    </AppShell>
  );
}
