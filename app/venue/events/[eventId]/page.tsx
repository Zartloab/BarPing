import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoEvent, demoGuests, demoTables } from "@/lib/demo-data";

export default function VenueEventPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Live event</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">{demoEvent.title}</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <QRCard event={demoEvent} />
          <section className="glass-card rounded-[28px] p-5">
            <h2 className="text-xl font-semibold">Controls</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <PrimaryLink href={`/e/${demoEvent.slug}`}>Open guest link</PrimaryLink>
              <SecondaryLink href={`/venue/events/${demoEvent.id}/reports`}>View reports</SecondaryLink>
              <SecondaryLink href={`/venue/events/${demoEvent.id}/setup`}>Setup</SecondaryLink>
              <SecondaryLink href={`/venue/events/${demoEvent.id}/qr`}>Launch kit</SecondaryLink>
              <SecondaryLink href="/venue/dashboard">Close event</SecondaryLink>
            </div>
          </section>
        </div>
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-[28px] p-5">
            <h2 className="text-xl font-semibold">Signals checked in</h2>
            <div className="mt-4 grid gap-3">
              {demoGuests.map((guest) => (
                <div key={guest.id} className="rounded-[20px] bg-white/[0.035] p-3">
                  <p className="font-semibold">{guest.alias}</p>
                  <p className="mt-1 text-sm text-venue-muted">{guest.vibe} - {guest.topics.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-[28px] p-5">
            <h2 className="text-xl font-semibold">Circles tonight</h2>
            <div className="mt-4 grid gap-3">
              {demoTables.map((table) => (
                <div key={table.id} className="rounded-[20px] bg-white/[0.035] p-3">
                  <p className="font-semibold">{table.name}</p>
                  <p className="mt-1 text-sm text-venue-muted">{table.description}</p>
                  <p className="mt-2 rounded-2xl bg-white/[0.04] px-3 py-2 text-sm text-venue-muted">{table.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MotionShell>
    </AppShell>
  );
}
