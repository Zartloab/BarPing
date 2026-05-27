"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import type { Event, EventAsset, EventTemplate, Venue } from "@/lib/types";
import { useEventUrl, useQrCodeDataUrl } from "@/components/qr-code";
import { SecondaryButton } from "@/components/ui/buttons";

type ActionState = "idle" | "copy" | "download" | "print";

const assetSizes: Record<EventAsset["kind"], { width: number; height: number }> = {
  table_qr: { width: 1200, height: 900 },
  entrance_poster: { width: 1400, height: 1900 },
  bar_counter: { width: 1400, height: 900 },
  instagram_story: { width: 1080, height: 1920 },
  safety_card: { width: 1200, height: 900 },
  run_sheet: { width: 1400, height: 1800 }
};

const assetMeta: Record<EventAsset["kind"], { format: string; ratioClass: string; shellClass: string; useQr: boolean; tone: string }> = {
  table_qr: { format: "Table card - landscape print", ratioClass: "aspect-[4/3]", shellClass: "max-w-[620px]", useQr: true, tone: "bg-white" },
  entrance_poster: { format: "Entrance poster - portrait print", ratioClass: "aspect-[3/4]", shellClass: "max-w-[520px]", useQr: true, tone: "bg-[#f7f7f2]" },
  bar_counter: { format: "Bar counter sign - wide print", ratioClass: "aspect-[16/9]", shellClass: "max-w-[780px]", useQr: true, tone: "bg-[#dfece0]" },
  instagram_story: { format: "Instagram story - 9:16 PNG", ratioClass: "aspect-[9/16]", shellClass: "max-w-[330px]", useQr: true, tone: "bg-[#e8a18f]" },
  safety_card: { format: "Safety card - small print", ratioClass: "aspect-[4/3]", shellClass: "max-w-[620px]", useQr: true, tone: "bg-[#f6d4c7]" },
  run_sheet: { format: "Staff run sheet - internal print", ratioClass: "aspect-[3/4]", shellClass: "max-w-[560px]", useQr: false, tone: "bg-white" }
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  let cursorY = y;
  text.split("\n").forEach((paragraph) => {
    let line = "";
    paragraph.split(" ").forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, cursorY);
        line = word;
        cursorY += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) {
      ctx.fillText(line, x, cursorY);
      cursorY += lineHeight;
    }
    cursorY += lineHeight * 0.45;
  });
}

function CopyLines({ copy, className = "" }: { copy: string; className?: string }) {
  return <p className={`whitespace-pre-line leading-6 text-venue-muted ${className}`}>{copy}</p>;
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
  const qrUrl = useEventUrl(event.slug);
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

    const isStory = asset.kind === "instagram_story";
    const isPortrait = asset.kind === "entrance_poster" || isStory || asset.kind === "run_sheet";
    const bg = asset.kind === "instagram_story" ? "#e8a18f" : asset.kind === "bar_counter" ? "#dfece0" : asset.kind === "safety_card" ? "#f6d4c7" : "#ffffff";
    const pad = Math.round(size.width * 0.075);
    const qrSize = Math.round(size.width * (isStory ? 0.42 : asset.kind === "bar_counter" ? 0.25 : 0.22));

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.strokeStyle = "#181d26";
    ctx.lineWidth = 2;
    ctx.strokeRect(pad * 0.55, pad * 0.55, size.width - pad * 1.1, size.height - pad * 1.1);

    ctx.fillStyle = "#aa2d00";
    ctx.font = `600 ${Math.round(size.width * 0.018)}px Arial`;
    ctx.fillText(asset.kind === "run_sheet" ? "BARPING / STAFF RUN SHEET" : "BARPING / SOCIAL MODE", pad, pad);

    ctx.fillStyle = "#181d26";
    ctx.font = `400 ${Math.round(size.width * (isStory ? 0.096 : isPortrait ? 0.072 : 0.056))}px Georgia`;
    wrapText(ctx, event.title, pad, pad + Math.round(size.height * 0.12), size.width - pad * 2, Math.round(size.width * (isPortrait ? 0.08 : 0.065)));

    ctx.fillStyle = "#454a54";
    ctx.font = `400 ${Math.round(size.width * 0.024)}px Arial`;
    ctx.fillText(`${venue.name} / ${template.name}`, pad, pad + Math.round(size.height * (isPortrait ? 0.3 : 0.26)));

    if (qrDataUrl && meta.useQr) {
      const image = new Image();
      image.src = qrDataUrl;
      await image.decode();
      const qrX = asset.kind === "bar_counter" ? size.width - pad - qrSize : pad;
      const qrY = isStory ? Math.round(size.height * 0.58) : pad + Math.round(size.height * (isPortrait ? 0.4 : 0.34));
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrX, qrY, qrSize, qrSize);
      ctx.drawImage(image, qrX + qrSize * 0.08, qrY + qrSize * 0.08, qrSize * 0.84, qrSize * 0.84);
    }

    ctx.fillStyle = "#333840";
    ctx.font = `400 ${Math.round(size.width * (asset.kind === "run_sheet" ? 0.027 : isStory ? 0.043 : 0.031))}px Arial`;
    const copyTop = asset.kind === "bar_counter" ? pad + Math.round(size.height * 0.42) : pad + Math.round(size.height * (isStory ? 0.38 : isPortrait ? 0.56 : 0.63));
    const copyWidth = asset.kind === "bar_counter" ? size.width - pad * 3 - qrSize : size.width - pad * 2;
    wrapText(ctx, asset.copy, pad, copyTop, copyWidth, Math.round(size.width * (isStory ? 0.058 : 0.041)));

    ctx.fillStyle = "#767b84";
    ctx.font = `600 ${Math.round(size.width * 0.018)}px Arial`;
    wrapText(ctx, meta.useQr ? qrUrl : "Internal staff guide", pad, size.height - pad, size.width - pad * 2, Math.round(size.width * 0.027));

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

    printWindow.document.write(`<!doctype html>
      <html>
        <head>
          <title>${escapeHtml(asset.title)}</title>
          <style>
            @page { margin: 0.35in; }
            body { background: #fff; color: #181d26; font-family: Arial, sans-serif; margin: 0; }
            main { min-height: calc(100vh - 0.7in); padding: 48px; border: 1px solid #e5e1d8; }
            .kicker { color: #aa2d00; font-size: 13px; font-weight: 700; letter-spacing: 4px; }
            h1 { font-family: Georgia, serif; font-size: 64px; font-weight: 400; line-height: 0.95; margin: 36px 0 12px; }
            .meta, p { color: #454a54; font-size: 24px; line-height: 1.45; }
            img { width: 190px; height: 190px; border: 1px solid #e5e1d8; border-radius: 12px; background: #fff; padding: 18px; margin: 42px 0 24px; }
            .url { color: #767b84; font-size: 13px; letter-spacing: 2px; overflow-wrap: anywhere; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <main>
            <div class="kicker">BarPing / Social Mode</div>
            <h1>${escapeHtml(event.title)}</h1>
            <div class="meta">${escapeHtml(venue.name)} / ${escapeHtml(template.name)}</div>
            ${qrDataUrl && meta.useQr ? `<img src="${qrDataUrl}" alt="QR code" />` : ""}
            <p>${escapeHtml(asset.copy).replaceAll("\n", "<br />")}</p>
            <div class="url">${meta.useQr ? escapeHtml(qrUrl) : "Internal staff guide"}</div>
          </main>
          <script>window.addEventListener("load", () => window.print());</script>
        </body>
      </html>`);
    printWindow.document.close();
    showDone("print", "Print view opened.");
  }

  const qrBlock = meta.useQr ? (
    <div className="grid h-28 w-28 shrink-0 place-items-center rounded-[10px] border border-venue-soft bg-white p-2 text-venue-cream">
      {qrDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={`QR code for ${event.title}`} className="h-24 w-24" src={qrDataUrl} />
      ) : (
        <Loader2 className="animate-spin" size={30} />
      )}
    </div>
  ) : null;

  return (
    <article className="rounded-[12px] border border-venue-soft bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-venue-cream">{asset.title}</h3>
          <p className="mt-1 text-sm text-venue-muted">{meta.format}</p>
        </div>
        <p className="rounded-[999px] border border-venue-soft bg-venue-raised px-3 py-1 text-xs text-venue-dim">
          {asset.kind === "instagram_story" ? "Download for socials" : asset.kind === "run_sheet" ? "Staff only" : "Print-ready"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-venue-soft bg-venue-raised p-4">
        <div className={`mx-auto ${meta.shellClass}`}>
          <div className={`${meta.ratioClass} relative overflow-hidden rounded-[10px] border border-venue-soft ${meta.tone} p-6`}>
            <div className="absolute inset-x-0 top-0 h-1 bg-venue-cream" />
            {asset.kind === "bar_counter" ? (
              <div className="flex h-full items-center justify-between gap-6">
                <div className="max-w-[62%]">
                  <p className="text-xs font-medium text-venue-danger">BarPing / at the bar</p>
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
                  <p className="text-xs font-medium text-venue-danger">@ {venue.name}</p>
                  <h4 className="mt-5 font-serif text-5xl leading-[0.9] text-venue-cream">Social Mode tonight</h4>
                </div>
                <div>
                  <CopyLines className="text-lg" copy={asset.copy} />
                  <div className="mt-5 flex items-end justify-between gap-4">
                    {qrBlock}
                    <p className="text-right text-xs text-venue-dim">Scan at the bar</p>
                  </div>
                </div>
              </div>
            ) : asset.kind === "run_sheet" ? (
              <div className="grid h-full content-start gap-4">
                <p className="text-xs font-medium text-venue-danger">Staff run sheet</p>
                <h4 className="font-serif text-4xl leading-none text-venue-cream">{event.title}</h4>
                <p className="text-sm text-venue-muted">{venue.name} / {template.name}</p>
                <div className="grid gap-2">
                  {runSheetItems.map((item) => (
                    <p key={item} className="rounded-[10px] border border-venue-soft bg-venue-raised px-3 py-2 text-sm text-venue-muted">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-venue-danger">BarPing / Social Mode</p>
                  <h4 className="mt-5 font-serif text-5xl leading-none text-venue-cream">{event.title}</h4>
                  <p className="mt-3 text-base text-venue-muted">{venue.name} / {template.name}</p>
                </div>
                <div>
                  {qrBlock}
                  <CopyLines className="mt-5 text-lg" copy={asset.copy} />
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-3xl break-all text-center text-xs text-venue-dim">
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
        <SecondaryButton className="min-h-10 px-3" disabled={(meta.useQr && !qrDataUrl) || actionState === "download"} onClick={downloadPng}>
          {actionState === "download" ? <Loader2 className="animate-spin" size={15} /> : <Download size={15} />}
          Download PNG
        </SecondaryButton>
      </div>
      {message || qrError ? <p className="mt-3 text-sm text-venue-danger">{message || qrError}</p> : null}
    </article>
  );
}
