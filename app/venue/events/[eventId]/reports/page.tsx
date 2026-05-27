import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { DangerButton, PrimaryButton, SecondaryButton, SecondaryLink } from "@/components/ui/buttons";
import { demoReports } from "@/lib/demo-data";

export default function EventReportsPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Safety reports</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Review the room.</h1>
        <div className="mt-6 grid gap-4">
          {demoReports.map((report) => (
            <article key={report.id} className="glass-card rounded-[28px] p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-xl font-semibold">{report.reason}</h2>
                  <p className="mt-2 text-venue-muted">{report.reporterAlias} reported {report.reportedAlias}</p>
                  <p className="mt-3 text-sm text-venue-dim">Evidence is preserved for moderation review.</p>
                </div>
                <span className="rounded-full bg-venue-danger/10 px-3 py-1 text-xs text-venue-danger">{report.status}</span>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                <SecondaryButton>Warn user</SecondaryButton>
                <DangerButton>Event ban</DangerButton>
                <SecondaryButton>Close chat</SecondaryButton>
                <PrimaryButton>Mark actioned</PrimaryButton>
              </div>
            </article>
          ))}
        </div>
        <SecondaryLink className="mt-6" href="/venue/dashboard">Back to run sheet</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
