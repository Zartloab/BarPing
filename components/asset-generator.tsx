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
    <section className="venue-panel rounded-[12px] p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-venue-dim">Launch kit</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">Print and share the night.</h2>
          <p className="mt-1 text-sm text-venue-muted">
            Generated from the selected recipe, venue name, event QR, and safety copy.
          </p>
        </div>
        <p className="text-xs text-venue-dim">{assets.length} assets</p>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => setActiveAssetId(asset.id)}
            className={`min-h-9 shrink-0 rounded-[999px] border px-3 text-sm ${
              activeAsset.id === asset.id
                ? "border-venue-cream bg-venue-cream text-white"
                : "border-venue-soft bg-white text-venue-muted"
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
