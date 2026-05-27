import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";
import { demoVenue } from "@/lib/demo-data";

export default function VenueSettingsPage() {
  return (
    <AppShell wide>
      <MotionShell className="mx-auto max-w-2xl py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Venue settings</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">{demoVenue.name}</h1>
        <div className="mt-6 glass-card rounded-[28px] p-5">
          <p className="text-venue-muted">Brand color, contact email, staff roles, and venue status will connect to Supabase venue records.</p>
        </div>
        <SecondaryLink className="mt-6" href="/venue/dashboard">Back to run sheet</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
