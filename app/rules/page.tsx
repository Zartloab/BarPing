import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";
import { communityRules, safetyNotice } from "@/lib/constants";

export default function RulesPage() {
  return (
    <AppShell>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Community rules</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">Keep it easy.</h1>
        <div className="mt-6 grid gap-4">
          <section className="glass-card rounded-[28px] p-5">
            <h2 className="font-semibold">Room rules</h2>
            <p className="mt-3 leading-relaxed text-venue-muted">{communityRules}</p>
          </section>
          <section className="glass-card rounded-[28px] p-5">
            <h2 className="font-semibold">Safety</h2>
            <p className="mt-3 leading-relaxed text-venue-muted">{safetyNotice}</p>
          </section>
        </div>
        <SecondaryLink className="mt-6" href="/">Back</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
