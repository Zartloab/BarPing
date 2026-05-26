import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";
import { demoGuests } from "@/lib/demo-data";

export default function AdminBansPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Bans</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Event and global bans</h1>
        <div className="mt-6 grid gap-3">
          {demoGuests.slice(0, 3).map((guest) => (
            <article key={guest.id} className="glass-card flex items-center justify-between rounded-[24px] p-4">
              <div>
                <h2 className="font-semibold">{guest.alias}</h2>
                <p className="mt-1 text-sm text-venue-muted">No active ban</p>
              </div>
              <span className="rounded-full bg-venue-olive/20 px-3 py-1 text-xs text-venue-muted">Clear</span>
            </article>
          ))}
        </div>
        <SecondaryLink className="mt-6" href="/admin">Back to admin</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
