import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";

export default function VenueLoginPage() {
  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Venue access</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">Run Social Mode tonight.</h1>
        <p className="mt-5 leading-relaxed text-venue-muted">
          Demo login is enabled locally. Connect Supabase Auth to use magic links or phone OTP in production.
        </p>
        <div className="mt-8 grid gap-3">
          <PrimaryLink href="/venue/dashboard">Continue to dashboard</PrimaryLink>
          <SecondaryLink href="/">Back to guest entry</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
