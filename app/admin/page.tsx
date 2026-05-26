import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink } from "@/components/ui/buttons";

export default function AdminPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Platform admin</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Operate BarPing safely.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <PrimaryLink href="/admin/venues">Venues</PrimaryLink>
          <PrimaryLink href="/admin/events">Events</PrimaryLink>
          <PrimaryLink href="/admin/reports">Reports</PrimaryLink>
          <PrimaryLink href="/admin/bans">Bans</PrimaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
