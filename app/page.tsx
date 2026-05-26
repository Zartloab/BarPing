import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SafetyNotice } from "@/components/safety-notice";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoEvent, demoGuests, demoVenue, isDemoMode } from "@/lib/demo-data";
import { formatEventTime } from "@/lib/time";

export default function HomePage() {
  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-between">
        <div className="pt-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">
            BarPing / Social Mode
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.92] text-venue-cream">Meet people already here.</h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-venue-muted">
            No swiping. No photos. No pressure. Scan in, choose your vibe, and say hello only when it is mutual.
          </p>
          <div className="mt-8 glass-card rounded-[30px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">
                  Tonight
                </p>
                <h2 className="mt-2 text-xl font-semibold">{demoVenue.name}</h2>
                <p className="mt-1 text-sm text-venue-muted">{demoEvent.title}</p>
                <p className="mt-3 text-sm text-venue-dim">{formatEventTime(demoEvent.startsAt, demoEvent.endsAt)}</p>
              </div>
              <div className="rounded-full bg-venue-amber/12 px-3 py-1 text-xs text-venue-amberSoft">Live</div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-venue-muted">
              <span className="h-2 w-2 rounded-full bg-venue-amber" />
              {demoGuests.length} guests checked in
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <PrimaryLink href={`/e/${demoEvent.slug}`}>Enter tonight</PrimaryLink>
            <SecondaryLink href="/venue/dashboard">Venue dashboard</SecondaryLink>
          </div>
          <p className="mt-5 text-center text-sm text-venue-dim">18+ - Venue-only - Temporary chat</p>
        </div>
        <div className="pb-2">
          {isDemoMode() ? (
            <p className="mb-3 rounded-full border border-venue-amber/30 bg-venue-amber/10 px-4 py-2 text-center text-xs text-venue-amberSoft">
              Demo mode active. Connect Supabase env vars for production data.
            </p>
          ) : null}
          <SafetyNotice compact />
        </div>
      </MotionShell>
    </AppShell>
  );
}
