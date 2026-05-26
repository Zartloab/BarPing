import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";

export default function SupportPage() {
  return (
    <AppShell>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Support</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">Need a human?</h1>
        <div className="mt-6 glass-card rounded-[28px] p-5">
          <p className="leading-relaxed text-venue-muted">
            For safety or venue support, contact support@barping.local. In a live venue, speak to staff immediately if anything feels unsafe.
          </p>
        </div>
        <SecondaryLink className="mt-6" href="/">Back</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
