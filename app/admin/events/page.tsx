import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";
import { demoEvent, demoVenue } from "@/lib/demo-data";

export default function AdminEventsPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Events</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Live event oversight</h1>
        <article className="mt-6 glass-card rounded-[28px] p-5">
          <h2 className="text-xl font-semibold">{demoEvent.title}</h2>
          <p className="mt-2 text-venue-muted">{demoVenue.name} - {demoEvent.isLive ? "Live" : "Scheduled"}</p>
        </article>
        <SecondaryLink className="mt-6" href="/admin">Back to admin</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
