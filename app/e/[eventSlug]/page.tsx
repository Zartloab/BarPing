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
        <h1 className="mt-4 font-serif text-5xl leading-none text-venue-cream">The room is live.</h1>
        <div className="mt-4 inline-flex w-fit rounded-[999px] border border-venue-olive/40 bg-venue-olive/10 px-3 py-1 text-xs font-medium text-venue-olive">
          {expired ? "Closed" : socialWindowActive ? "Live now" : "Paused"}
        </div>
        <p className="mt-6 text-lg leading-7 text-venue-muted">
          Draw a Signal. Follow the Drop. Join a Circle. Send a Hello if it feels right.
        </p>
        <p className="mt-4 text-sm leading-6 text-venue-dim">No names. No photos. Everything fades tonight.</p>

        <div className="mt-8 grid gap-3">
          <PrimaryLink href={isJoinable ? `/e/${event.slug}/signal` : "/support"}>
            {expired ? "Room closed" : socialWindowActive ? "Draw my Signal" : "Room paused"}
          </PrimaryLink>
          <SecondaryLink href={`/e/${event.slug}/room`}>See tonight&apos;s Circles</SecondaryLink>
          <SecondaryLink href="/rules">Room rules</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
