"use client";

import { useState } from "react";
import type { Event, EventAsset, EventTemplate, Venue } from "@/lib/types";
import { AssetPreview } from "@/components/asset-preview";

export function AssetGenerator({
  assets,
  event,
  venue,
  template
}: {
  assets: EventAsset[];
  event: Event;
  venue: Venue;
  template: EventTemplate;
}) {
  const [activeAssetId, setActiveAssetId] = useState(assets[0]?.id);
  const activeAsset = assets.find((asset) => asset.id === activeAssetId) ?? assets[0];

  if (!activeAsset) return null;

  return (
    <section className="glass-card rounded-[28px] p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Asset generator</p>
      <h2 className="mt-2 text-2xl font-semibold">Print and share the night.</h2>
      <p className="mt-2 text-sm text-venue-muted">
        Generated from the selected template, venue name, QR link, and safety copy.
      </p>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => setActiveAssetId(asset.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm ${
              activeAsset.id === asset.id
                ? "border-venue-amber/60 bg-venue-amber/15 text-venue-amberSoft"
                : "border-white/[0.08] bg-white/[0.035] text-venue-muted"
            }`}
            type="button"
          >
            {asset.title}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <AssetPreview asset={activeAsset} event={event} venue={venue} template={template} />
      </div>
    </section>
  );
}
