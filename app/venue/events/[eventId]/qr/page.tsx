import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { SecondaryLink } from "@/components/ui/buttons";
import { launchKit } from "@/lib/constants";
import { demoEvent } from "@/lib/demo-data";

export default function EventQrPage() {
  return (
    <AppShell wide>
      <MotionShell className="mx-auto max-w-3xl py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">QR kit</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Print the moment.</h1>
        <div className="mt-6">
          <QRCard event={demoEvent} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="glass-card rounded-[28px] p-5">
            <h2 className="font-semibold">Table card copy</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-venue-muted">{launchKit.tableQr}</p>
          </article>
          <article className="glass-card rounded-[28px] p-5">
            <h2 className="font-semibold">Poster copy</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-venue-muted">{launchKit.entrancePoster}</p>
          </article>
        </div>
        <SecondaryLink className="mt-6" href="/venue/dashboard">Back to dashboard</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
