import { MessageCircle, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { SectionLabel, UtilityPanel } from "@/components/venue-console";
import type { PilotMetrics } from "@/lib/types";

export function PilotReport({ metrics }: { metrics: PilotMetrics }) {
  return (
    <section className="venue-panel rounded-[12px] p-4 md:p-5">
      <SectionLabel>After-report</SectionLabel>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.01em]">What happened tonight</h2>
          <p className="mt-1 text-sm text-venue-muted">Owner-friendly signals for deciding whether to repeat the night.</p>
        </div>
        <p className="text-sm text-venue-muted">
          {metrics.feltSafePercent}% felt safe / {metrics.wouldUseAgainPercent}% would use again
        </p>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <UtilityPanel>
          <QrCode size={18} />
          <p className="mt-3 text-2xl font-medium">{metrics.qrScans}</p>
          <p className="text-sm text-venue-muted">{metrics.scanToCheckin}% scan-to-check-in</p>
        </UtilityPanel>
        <UtilityPanel>
          <UsersRound size={18} />
          <p className="mt-3 text-2xl font-medium">{metrics.peakActiveGuests}</p>
          <p className="text-sm text-venue-muted">peak active guests</p>
        </UtilityPanel>
        <UtilityPanel>
          <MessageCircle size={18} />
          <p className="mt-3 text-2xl font-medium">{metrics.chatsCreated}</p>
          <p className="text-sm text-venue-muted">{metrics.acceptedPings} accepted pings</p>
        </UtilityPanel>
        <UtilityPanel>
          <ShieldCheck size={18} />
          <p className="mt-3 text-2xl font-medium">{metrics.reports}</p>
          <p className="text-sm text-venue-muted">{metrics.blocks} blocks / {metrics.bans} bans</p>
        </UtilityPanel>
      </div>
    </section>
  );
}
