import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SafetyNotice } from "@/components/safety-notice";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoEvent, demoVenue, isDemoMode } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-between">
        <div className="pt-10">
          <p className="text-sm font-medium text-venue-muted">{demoVenue.name}</p>
          <h1 className="mt-4 font-serif text-5xl leading-none text-venue-cream">The room has a hidden layer.</h1>
          <p className="mt-5 text-lg leading-7 text-venue-muted">
            Scan the QR, draw your Signal, follow the Drop, join a Circle, and send a Hello if it feels right.
          </p>

          <div className="mt-8 grid gap-3">
            <PrimaryLink href={`/e/${demoEvent.slug}`}>Open Signal Night</PrimaryLink>
            <SecondaryLink href="/rules">Room rules</SecondaryLink>
          </div>

          <p className="mt-5 text-center text-sm text-venue-dim">No names. No photos. No exact location.</p>
        </div>

        <div className="pb-2">
          {isDemoMode() ? (
            <p className="mb-3 rounded-[999px] border border-venue-soft bg-venue-card px-4 py-2 text-center text-xs text-venue-muted">
              Demo mode active.
            </p>
          ) : null}
          <SafetyNotice compact />
          <div className="mt-4 text-center">
            <SecondaryLink className="min-h-9 px-3 text-xs" href="/venue/login">
              Venue staff
            </SecondaryLink>
          </div>
        </div>
      </MotionShell>
    </AppShell>
  );
}
