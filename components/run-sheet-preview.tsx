import { Clock, Megaphone } from "lucide-react";
import type { EventTemplate } from "@/lib/types";

export function RunSheetPreview({ template }: { template: EventTemplate }) {
  return (
    <section className="glass-card rounded-[28px] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Staff run sheet</p>
      <h2 className="mt-2 text-2xl font-semibold">{template.name}</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2 text-venue-amberSoft">
            <Clock size={17} />
            <h3 className="font-semibold text-venue-cream">Run of show</h3>
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-venue-muted">{template.assets.runOfShow}</p>
        </div>
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2 text-venue-amberSoft">
            <Megaphone size={17} />
            <h3 className="font-semibold text-venue-cream">Drop queue</h3>
          </div>
          <div className="grid gap-2">
            {template.hostNudges.map((nudge) => (
              <p key={nudge} className="rounded-2xl bg-venue-soft p-3 text-sm text-venue-muted">{nudge}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
