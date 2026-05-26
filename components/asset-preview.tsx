"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import type { Event, EventAsset, EventTemplate, Venue } from "@/lib/types";
import { SecondaryButton } from "@/components/ui/buttons";
import { buildEventUrl, useQrCodeDataUrl } from "@/components/qr-code";

type ActionState = "idle" | "copy" | "download" | "print";

const assetSizes: Record<EventAsset["kind"], { width: number; height: number }> = {
  table_qr: { width: 1200, height: 900 },
  entrance_poster: { width: 1400, height: 1900 },
  bar_counter: { width: 1400, height: 900 },
  instagram_story: { width: 1080, height: 1920 },
  safety_card: { width: 1200, height: 900 },
  run_sheet: { width: 1400, height: 1800 }
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const paragraphs = text.split("\n");
  let cursorY = y;

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    let line = "";

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, cursorY);
        line = word;
        cursorY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) {
      ctx.fillText(line, x, cursorY);
      cursorY += lineHeight;
    }
    cursorY += lineHeight * 0.45;
  });

  return cursorY;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

const assetMeta: Record<EventAsset["kind"], { format: string; ratioClass: string; shellClass: string; useQr: boolean }> = {
  table_qr: {
    format: "Table card - landscape print",
    ratioClass: "aspect-[4/3]",
    shellClass: "max-w-[620px]",
    useQr: true
  },
  entrance_poster: {
    format: "Entrance poster - portrait print",
    ratioClass: "aspect-[3/4]",
    shellClass: "max-w-[520px]",
    useQr: true
  },
  bar_counter: {
    format: "Bar counter sign - wide print",
    ratioClass: "aspect-[16/9]",
    shellClass: "max-w-[780px]",
    useQr: true
  },
  instagram_story: {
    format: "Instagram story - 9:16 PNG",
    ratioClass: "aspect-[9/16]",
    shellClass: "max-w-[330px]",
    useQr: true
  },
  safety_card: {
    format: "Safety card - small print",
    ratioClass: "aspect-[4/3]",
    shellClass: "max-w-[620px]",
    useQr: true
  },
  run_sheet: {
    format: "Staff run sheet - internal print",
    ratioClass: "aspect-[3/4]",
    shellClass: "max-w-[560px]",
    useQr: false
  }
};

function CopyLines({ copy, className = "" }: { copy: string; className?: string }) {
  return <p className={`whitespace-pre-line leading-relaxed text-venue-muted ${className}`}>{copy}</p>;
}

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
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [message, setMessage] = useState("");
  const qrUrl = buildEventUrl(event.slug);
  const { dataUrl: qrDataUrl, error: qrError } = useQrCodeDataUrl(qrUrl);
  const meta = assetMeta[asset.kind];
  const runSheetItems = asset.copy.split("\n").filter(Boolean);
  const printableCopy = useMemo(
    () => `${asset.title}\n\n${asset.copy}${meta.useQr ? `\n\n${qrUrl}` : ""}`,
    [asset.copy, asset.title, meta.useQr, qrUrl]
  );

  function showDone(state: Exclude<ActionState, "idle">, successMessage: string) {
    setActionState(state);
    setMessage(successMessage);
    window.setTimeout(() => {
      setActionState("idle");
      setMessage("");
    }, 1800);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(printableCopy);
      showDone("copy", "Copied.");
    } catch {
      setMessage("Copy failed. Select the preview text manually.");
    }
  }

  async function drawAssetCanvas() {
    const size = assetSizes[asset.kind];
    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");

    ctx.fillStyle = "#080807";
    ctx.fillRect(0, 0, size.width, size.height);

    const padding = Math.round(size.width * 0.075);
    const isPortrait = asset.kind === "entrance_poster" || asset.kind === "instagram_story" || asset.kind === "run_sheet";
    const qrSize = Math.round(size.width * (asset.kind === "instagram_story" ? 0.42 : asset.kind === "bar_counter" ? 0.26 : 0.22));

    ctx.fillStyle = "#ffbd66";
    ctx.font = `600 ${Math.round(size.width * 0.02)}px Arial`;
    ctx.letterSpacing = "8px";
    ctx.fillText(asset.kind === "run_sheet" ? "BARPING / STAFF RUN SHEET" : "BARPING / SOCIAL MODE", padding, padding);
    ctx.letterSpacing = "0px";

    ctx.fillStyle = "#fff7e8";
    ctx.font = `700 ${Math.round(size.width * (asset.kind === "instagram_story" ? 0.105 : isPortrait ? 0.078 : 0.058))}px Georgia`;
    wrapText(ctx, event.title, padding, padding + Math.round(size.height * 0.12), size.width - padding * 2, Math.round(size.width * (isPortrait ? 0.086 : 0.07)));

    ctx.fillStyle = "#c6b899";
    ctx.font = `400 ${Math.round(size.width * 0.024)}px Arial`;
    ctx.fillText(`${venue.name} - ${template.name}`, padding, padding + Math.round(size.height * (isPortrait ? 0.29 : 0.26)));

    if (qrDataUrl && meta.useQr) {
      const image = new Image();
      image.src = qrDataUrl;
      await image.decode();
      const qrX = asset.kind === "bar_counter" ? size.width - padding - qrSize : padding;
      const qrY = asset.kind === "instagram_story" ? Math.round(size.height * 0.58) : padding + Math.round(size.height * (isPortrait ? 0.38 : 0.34));
      ctx.fillStyle = "#fff7e8";
      ctx.roundRect(qrX, qrY, qrSize, qrSize, Math.round(qrSize * 0.13));
      ctx.fill();
      ctx.drawImage(image, qrX + qrSize * 0.08, qrY + qrSize * 0.08, qrSize * 0.84, qrSize * 0.84);
    }

    ctx.fillStyle = "#c6b899";
    ctx.font = `400 ${Math.round(size.width * (asset.kind === "run_sheet" ? 0.028 : asset.kind === "instagram_story" ? 0.043 : 0.032))}px Arial`;
    const copyTop = asset.kind === "bar_counter" ? padding + Math.round(size.height * 0.42) : padding + Math.round(size.height * (asset.kind === "instagram_story" ? 0.38 : isPortrait ? 0.54 : 0.62));
    const copyWidth = asset.kind === "bar_counter" ? size.width - padding * 3 - qrSize : size.width - padding * 2;
    wrapText(ctx, asset.copy, padding, copyTop, copyWidth, Math.round(size.width * (asset.kind === "instagram_story" ? 0.06 : 0.043)));

    ctx.fillStyle = "#82765f";
    ctx.font = `600 ${Math.round(size.width * 0.019)}px Arial`;
    wrapText(ctx, meta.useQr ? qrUrl : "Internal staff guide", padding, size.height - padding, size.width - padding * 2, Math.round(size.width * 0.028));

    return canvas;
  }

  async function downloadPng() {
    setActionState("download");
    setMessage("Generating PNG...");
    const canvas = await drawAssetCanvas();
    const link = document.createElement("a");
    link.download = `${slugify(`${venue.name}-${event.title}-${asset.title}`)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showDone("download", "PNG downloaded.");
  }

  function printAsset() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setMessage("Pop-up blocked. Allow pop-ups to print.");
      return;
    }

    const safeTitle = escapeHtml(event.title);
    const safeVenue = escapeHtml(venue.name);
    const safeTemplate = escapeHtml(template.name);
    const safeAssetTitle = escapeHtml(asset.title);
    const safeCopy = escapeHtml(asset.copy);
    const safeQrUrl = escapeHtml(qrUrl);
    printWindow.document.write(`<!doctype html>
      <html>
        <head>
          <title>${safeAssetTitle}</title>
          <style>
            @page { margin: 0.35in; }
            body { background: #080807; color: #fff7e8; font-family: Arial, sans-serif; margin: 0; }
            main { min-height: calc(100vh - 0.7in); padding: 48px; border: 1px solid #3d3427; }
            .kicker { color: #ffbd66; font-size: 13px; font-weight: 700; letter-spacing: 8px; text-transform: uppercase; }
            h1 { font-family: Georgia, serif; font-size: 64px; line-height: 0.95; margin: 36px 0 12px; }
            .meta, p { color: #c6b899; font-size: 24px; line-height: 1.45; }
            img { width: 190px; height: 190px; border-radius: 24px; background: #fff7e8; padding: 18px; margin: 42px 0 24px; }
            .url { color: #82765f; font-size: 13px; letter-spacing: 5px; overflow-wrap: anywhere; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <main>
            <div class="kicker">BarPing / Social Mode</div>
            <h1>${safeTitle}</h1>
            <div class="meta">${safeVenue} - ${safeTemplate}</div>
            ${qrDataUrl && meta.useQr ? `<img src="${qrDataUrl}" alt="QR code" />` : ""}
            <p>${safeCopy.replaceAll("\n", "<br />")}</p>
            <div class="url">${meta.useQr ? safeQrUrl : "Internal staff guide"}</div>
          </main>
          <script>window.addEventListener("load", () => { window.print(); });</script>
        </body>
      </html>`);
    printWindow.document.close();
    showDone("print", "Print view opened.");
  }

  const qrBlock = meta.useQr ? (
    <div className="grid h-28 w-28 shrink-0 place-items-center rounded-[22px] bg-venue-cream text-venue-ink shadow-amber">
      {qrDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={`QR code for ${event.title}`} className="h-24 w-24" src={qrDataUrl} />
      ) : (
        <Loader2 className="animate-spin" size={30} />
      )}
    </div>
  ) : null;

  return (
    <article className="glass-card rounded-[28px] p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-venue-cream">{asset.title}</h3>
          <p className="mt-1 text-sm text-venue-muted">{meta.format}</p>
        </div>
        <p className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-xs text-venue-dim">
          {asset.kind === "instagram_story" ? "Download for socials" : asset.kind === "run_sheet" ? "Staff only" : "Print-ready"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[28px] border border-white/[0.08] bg-black/25 p-4">
        <div className={`mx-auto ${meta.shellClass}`}>
          <div className={`${meta.ratioClass} relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-venue-ink p-6 shadow-2xl`}>
            <div className="absolute inset-x-0 top-0 h-1 bg-venue-amber" />
            {asset.kind === "bar_counter" ? (
              <div className="flex h-full items-center justify-between gap-6">
                <div className="max-w-[62%]">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-venue-amberSoft">BarPing / at the bar</p>
                  <h4 className="mt-4 font-serif text-4xl leading-none text-venue-cream">Social Mode is live.</h4>
                  <CopyLines className="mt-4 text-base" copy={asset.copy} />
                </div>
                <div className="text-center">
                  {qrBlock}
                  <p className="mt-3 text-xs text-venue-muted">Scan to join</p>
                </div>
              </div>
            ) : asset.kind === "instagram_story" ? (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-venue-amberSoft">@ {venue.name}</p>
                  <h4 className="mt-5 font-serif text-5xl leading-[0.9] text-venue-cream">Social Mode tonight</h4>
                </div>
                <div>
                  <CopyLines className="text-lg" copy={asset.copy} />
                  <div className="mt-5 flex items-end justify-between gap-4">
                    {qrBlock}
                    <p className="text-right text-xs uppercase tracking-[0.18em] text-venue-dim">Scan at the bar</p>
                  </div>
                </div>
              </div>
            ) : asset.kind === "entrance_poster" ? (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-venue-amberSoft">BarPing / Social Mode</p>
                  <h4 className="mt-6 font-serif text-5xl leading-none text-venue-cream">{event.title}</h4>
                  <p className="mt-3 text-base text-venue-muted">{venue.name} - {template.name}</p>
                </div>
                <div>
                  <CopyLines className="mb-5 text-lg" copy={asset.copy} />
                  <div className="flex items-end justify-between gap-4">
                    {qrBlock}
                    <p className="max-w-36 text-right text-sm text-venue-muted">Point phones here before entering.</p>
                  </div>
                </div>
              </div>
            ) : asset.kind === "safety_card" ? (
              <div className="grid h-full content-between gap-5">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-venue-amberSoft">Safety card</p>
                  <h4 className="mt-4 font-serif text-4xl leading-none text-venue-cream">Respect the room.</h4>
                </div>
                <CopyLines className="text-lg" copy={asset.copy} />
                <div className="flex items-end justify-between gap-4">
                  {qrBlock}
                  <p className="max-w-56 text-sm text-venue-muted">Guests can block, report, or leave any chat anytime.</p>
                </div>
              </div>
            ) : asset.kind === "run_sheet" ? (
              <div className="grid h-full content-start gap-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-venue-amberSoft">Staff run sheet</p>
                <h4 className="font-serif text-4xl leading-none text-venue-cream">{event.title}</h4>
                <p className="text-sm text-venue-muted">{venue.name} - {template.name}</p>
                <div className="grid gap-2">
                  {runSheetItems.map((item) => (
                    <p key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm text-venue-muted">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-venue-amberSoft">BarPing / Social Mode</p>
                  <h4 className="mt-5 font-serif text-5xl leading-none text-venue-cream">{event.title}</h4>
                  <p className="mt-3 text-base text-venue-muted">{venue.name} - {template.name}</p>
                </div>
                <div>
                  {qrBlock}
                  <CopyLines className="mt-5 text-lg" copy={asset.copy} />
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-3xl break-all text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-venue-dim">
          {meta.useQr ? qrUrl : "Internal staff guide - no guest QR required"}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SecondaryButton className="min-h-10 px-3" onClick={printAsset}>
          <Printer size={15} />
          Print
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-3" onClick={copyText}>
          {actionState === "copy" ? <Check size={15} /> : <Copy size={15} />}
          Copy text
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-3" disabled={!qrDataUrl || actionState === "download"} onClick={downloadPng}>
          {actionState === "download" ? <Loader2 className="animate-spin" size={15} /> : <Download size={15} />}
          Download PNG
        </SecondaryButton>
      </div>
      {message || qrError ? <p className="mt-3 text-sm text-venue-amberSoft">{message || qrError}</p> : null}
    </article>
  );
}
