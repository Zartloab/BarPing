import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";

const eventTypes = [
  "Social Night",
  "Live Music",
  "Gallery Night",
  "Singles Social",
  "Uni Event",
  "Coworking Mixer",
  "Creative Meetup",
  "Startup Drinks",
  "Private Event",
  "Other"
];

export default function NewVenueEventPage() {
  return (
    <AppShell wide>
      <MotionShell className="mx-auto max-w-2xl py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">New event</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Create a Social Mode night.</h1>
        <form className="mt-8 grid gap-4">
          {[
            ["Event title", "Thursday Social Mode"],
            ["Venue name", "Demo Bar"],
            ["Start time", "2026-05-26T19:00"],
            ["End time", "2026-05-26T23:30"],
            ["Max guests", "120"]
          ].map(([label, placeholder]) => (
            <label key={label} className="grid gap-2 text-sm text-venue-muted">
              {label}
              <input
                placeholder={placeholder}
                className="min-h-12 rounded-[20px] border border-white/[0.08] bg-venue-soft px-4 text-venue-cream outline-none focus:border-venue-amber/60"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm text-venue-muted">
            Event type
            <select className="min-h-12 rounded-[20px] border border-white/[0.08] bg-venue-soft px-4 text-venue-cream outline-none focus:border-venue-amber/60">
              {eventTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-venue-muted">
            House rules
            <textarea
              defaultValue="Be normal. Be kind. No harassment, pressure, hate, explicit messages, or creepy behaviour."
              className="min-h-28 rounded-[20px] border border-white/[0.08] bg-venue-soft p-4 text-venue-cream outline-none focus:border-venue-amber/60"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <SecondaryLink href="/venue/dashboard">Cancel</SecondaryLink>
            <PrimaryLink href="/venue/events/event-demo/qr">Create demo event</PrimaryLink>
          </div>
        </form>
      </MotionShell>
    </AppShell>
  );
}
