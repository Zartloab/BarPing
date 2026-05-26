import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { DangerButton, PrimaryButton, SecondaryButton, SecondaryLink } from "@/components/ui/buttons";
import { demoReports } from "@/lib/demo-data";

export default function AdminReportsPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Reports</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Safety activity</h1>
        <div className="mt-6 grid gap-4">
          {demoReports.map((report) => (
            <article key={report.id} className="glass-card rounded-[28px] p-5">
              <h2 className="text-xl font-semibold">{report.reason}</h2>
              <p className="mt-2 text-venue-muted">{report.reporterAlias} reported {report.reportedAlias} - {report.status}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                <SecondaryButton>Reviewing</SecondaryButton>
                <DangerButton>Global ban</DangerButton>
                <SecondaryButton>Dismiss</SecondaryButton>
                <PrimaryButton>Actioned</PrimaryButton>
              </div>
            </article>
          ))}
        </div>
        <SecondaryLink className="mt-6" href="/admin">Back to admin</SecondaryLink>
      </MotionShell>
    </AppShell>
  );
}
