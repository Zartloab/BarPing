import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";
import { demoVenue } from "@/lib/demo-data";

export default function AdminVenuesPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Venues</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Venue accounts</h1>
        <article className="mt-6 glass-card rounded-[28px] p-5">
          <h2 className="text-xl font-semibold">{demoVenue.name}</h2>
          <p className="mt-2 text-venue-muted">{demoVenue.suburb}, {demoVenue.city} - Active</p>
        </article>
        <SecondaryLink className="mt-6" href="/admin">Back to admin</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
