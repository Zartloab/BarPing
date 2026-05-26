import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryLink } from "@/components/ui/buttons";

export default function PrivacyPage() {
  return (
    <AppShell>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Privacy</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">Temporary by design.</h1>
        <div className="mt-6 glass-card rounded-[28px] p-5">
          <p className="leading-relaxed text-venue-muted">
            BarPing does not show photos, real names, exact location, emails, or phone numbers to guests. Venue admins see event aliases,
            reports, activity, and ban state only for safety and operations.
          </p>
        </div>
        <SecondaryLink className="mt-6" href="/">Back</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
