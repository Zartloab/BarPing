import { Activity, Ban, CheckCircle2, MessageCircle, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { AdminMetricCard } from "@/components/admin-metric-card";
import type { PilotMetrics } from "@/lib/types";

export function PilotReport({ metrics }: { metrics: PilotMetrics }) {
  return (
    <section className="glass-card rounded-[28px] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Pilot report</p>
      <h2 className="mt-2 text-2xl font-semibold">Proof the room warmed up.</h2>
      <p className="mt-2 text-sm text-venue-muted">A venue-facing summary designed to decide whether to run BarPing again.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard label="Scan to check-in" value={`${metrics.scanToCheckin}%`} detail={`${metrics.qrScans} scans`} icon={<QrCode size={18} />} />
        <AdminMetricCard label="Peak active" value={metrics.peakActiveGuests} detail={`${metrics.checkIns} check-ins`} icon={<UsersRound size={18} />} />
        <AdminMetricCard label="Table joins" value={metrics.tableJoins} detail="Group-first adoption" icon={<Activity size={18} />} />
        <AdminMetricCard label="Accepted pings" value={metrics.acceptedPings} detail={`${metrics.pingsSent} sent`} icon={<MessageCircle size={18} />} />
        <AdminMetricCard label="Find Me accepted" value={metrics.findMeAccepted} detail={`${metrics.findMeRequested} requested`} icon={<CheckCircle2 size={18} />} />
        <AdminMetricCard label="Reports" value={metrics.reports} detail={`${metrics.blocks} blocks, ${metrics.bans} bans`} icon={<Ban size={18} />} />
        <AdminMetricCard label="Felt safe" value={`${metrics.feltSafePercent}%`} detail="Feedback responses" icon={<ShieldCheck size={18} />} />
        <AdminMetricCard label="Would use again" value={`${metrics.wouldUseAgainPercent}%`} detail="Pilot signal" icon={<CheckCircle2 size={18} />} />
      </div>
    </section>
  );
}
