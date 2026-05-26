import { Activity, Ban, MessageCircle, QrCode, ShieldAlert, UsersRound } from "lucide-react";
import { AdminMetricCard } from "@/components/admin-metric-card";
import { AppShell } from "@/components/app-shell";
import { HostModePanel } from "@/components/host-mode-panel";
import { MotionShell } from "@/components/motion-shell";
import { PilotReport } from "@/components/pilot-report";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { launchKit } from "@/lib/constants";
import {
  demoAnnouncements,
  demoEvent,
  demoGuests,
  demoPilotMetrics,
  demoReports,
  demoSocialWindows,
  demoTables,
  demoVenue,
  isDemoMode
} from "@/lib/demo-data";

export default function VenueDashboardPage() {
  const acceptedPings = 4;
  const chats = 5;

  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Venue dashboard</p>
            <h1 className="mt-3 font-serif text-5xl leading-none">{demoVenue.name}</h1>
            <p className="mt-3 text-venue-muted">{demoEvent.title} - {demoEvent.eventType}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrimaryLink href="/venue/events/new">Create event</PrimaryLink>
            <SecondaryLink href={`/venue/events/${demoEvent.id}`}>Live event</SecondaryLink>
          </div>
        </header>

        {isDemoMode() ? (
          <div className="mb-6 rounded-[24px] border border-venue-amber/30 bg-venue-amber/10 p-4 text-sm text-venue-amberSoft">
            Demo mode is active. Supabase env vars are missing, so this dashboard uses local demo data.
          </div>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <AdminMetricCard label="QR scans" value={demoEvent.qrScans} detail="Tonight" icon={<QrCode size={18} />} />
          <AdminMetricCard label="Check-ins" value={demoGuests.length + 1} detail="Active profiles" icon={<UsersRound size={18} />} />
          <AdminMetricCard label="Pings sent" value={12} detail={`${acceptedPings} accepted`} icon={<MessageCircle size={18} />} />
          <AdminMetricCard label="Chats created" value={chats} detail={`${demoTables.length} table rooms`} icon={<Activity size={18} />} />
          <AdminMetricCard label="Reports" value={demoReports.length} detail="1 reviewing" icon={<ShieldAlert size={18} />} />
        </section>

        <div className="mt-6">
          <HostModePanel windows={demoSocialWindows} announcements={demoAnnouncements} tables={demoTables} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            <QRCard event={demoEvent} />
            <section className="glass-card rounded-[28px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Live room</p>
                  <h2 className="mt-2 text-xl font-semibold">Guest activity</h2>
                </div>
                <SecondaryLink href={`/e/${demoEvent.slug}/room`}>Open room</SecondaryLink>
              </div>
              <div className="mt-5 grid gap-3">
                {demoGuests.slice(0, 5).map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between rounded-[22px] bg-white/[0.035] p-3">
                    <div>
                      <p className="font-semibold">{guest.alias}</p>
                      <p className="mt-1 text-xs text-venue-muted">{guest.vibe} - {guest.mode}</p>
                    </div>
                    <span className="rounded-full bg-venue-olive/20 px-3 py-1 text-xs text-venue-muted">Active</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6">
            <section className="glass-card rounded-[28px] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Safety</p>
                  <h2 className="mt-2 text-xl font-semibold">Reports and bans</h2>
                </div>
                <Ban className="text-venue-amberSoft" size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                {demoReports.map((report) => (
                  <article key={report.id} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{report.reason}</p>
                      <span className="rounded-full bg-venue-danger/10 px-3 py-1 text-xs text-venue-danger">{report.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-venue-muted">
                      {report.reporterAlias} reported {report.reportedAlias}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <SecondaryLink href="/venue/events/event-demo/reports">View report</SecondaryLink>
                      <SecondaryLink href="/admin/bans">Ban tools</SecondaryLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-[28px] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Tables</p>
              <h2 className="mt-2 text-xl font-semibold">Group rooms</h2>
              <div className="mt-5 grid gap-3">
                {demoTables.map((table) => (
                  <div key={table.id} className="flex items-center justify-between rounded-[22px] bg-white/[0.035] p-3">
                    <div>
                      <p className="font-semibold">{table.name}</p>
                      <p className="mt-1 text-xs text-venue-muted">
                        {table.memberCount}/{table.maxMembers} guests - {table.prompt}
                      </p>
                    </div>
                    <span className="rounded-full bg-venue-amber/10 px-3 py-1 text-xs text-venue-amberSoft">Open</span>
                  </div>
                ))}
              </div>
              <SecondaryLink className="mt-4 w-full" href={`/venue/events/${demoEvent.id}`}>Create table</SecondaryLink>
            </section>
          </div>
        </div>

        <div className="mt-6">
          <PilotReport metrics={demoPilotMetrics} />
        </div>

        <section className="mt-6 glass-card rounded-[28px] p-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Launch Kit</p>
          <h2 className="mt-2 text-2xl font-semibold">Run the room, not just the software.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Table QR card", launchKit.tableQr],
              ["Entrance poster", launchKit.entrancePoster],
              ["Staff script", launchKit.staffScript],
              ["Safety card", launchKit.safetyCard],
              ["Instagram story", launchKit.instagramStory],
              ["Run of show", launchKit.runOfShow],
              ["Staff intro", launchKit.staffIntro],
              ["Midway prompt", launchKit.midwayPrompt],
              ["Final call", launchKit.finalCall],
              ["Find Me safety", launchKit.findMeSafety],
              ["Event name ideas", launchKit.eventNames.join("\n")]
            ].map(([title, copy]) => (
              <article key={title} className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-venue-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </MotionShell>
    </AppShell>
  );
}
