"use client";

import { Copy, Download, Printer, QrCode } from "lucide-react";
import type { Event, EventAsset, EventTemplate, Venue } from "@/lib/types";
import { SecondaryButton } from "@/components/ui/buttons";

export function AssetPreview({
  asset,
  event,
  venue,
  template
}: {
  asset: EventAsset;
  event: Event;
  venue: Venue;
  template: EventTemplate;
}) {
  const qrLink = `/e/${event.slug}`;
  const isStory = asset.kind === "instagram_story";

  function copyText() {
    void navigator.clipboard?.writeText(`${asset.title}\n\n${asset.copy}\n\n${qrLink}`);
  }

  return (
    <article className={`glass-card rounded-[28px] p-4 ${isStory ? "min-h-[420px]" : ""}`}>
      <div className={`rounded-[24px] border border-white/[0.08] bg-venue-ink p-5 ${isStory ? "aspect-[9/16]" : "min-h-64"}`}>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">BarPing / Social Mode</p>
        <h3 className="mt-4 font-serif text-4xl leading-none text-venue-cream">{event.title}</h3>
        <p className="mt-2 text-sm text-venue-muted">{venue.name} - {template.name}</p>
        <div className="mt-6 grid h-24 w-24 place-items-center rounded-2xl bg-venue-cream text-venue-ink">
          <QrCode size={54} />
        </div>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-venue-muted">{asset.copy}</p>
        <p className="mt-4 break-all font-mono text-[0.68rem] uppercase tracking-[0.14em] text-venue-dim">{qrLink}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SecondaryButton className="min-h-10 px-3" onClick={() => window.print()}>
          <Printer size={15} />
          Print
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-3" onClick={copyText}>
          <Copy size={15} />
          Copy text
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-3" onClick={copyText}>
          <Download size={15} />
          Download PNG
        </SecondaryButton>
      </div>
    </article>
  );
}
