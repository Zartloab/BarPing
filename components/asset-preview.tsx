"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import QRCode from "qrcode";
import type { Event, EventAsset, EventTemplate, Venue } from "@/lib/types";
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

function getBasePath() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/BarPing") ? "/BarPing" : "";
}

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
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrUrl, setQrUrl] = useState(`/e/${event.slug}`);
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [message, setMessage] = useState("");
  const isStory = asset.kind === "instagram_story";
  const printableCopy = useMemo(
    () => `${asset.title}\n\n${asset.copy}\n\n${qrUrl}`,
    [asset.copy, asset.title, qrUrl]
  );

  useEffect(() => {
    const basePath = getBasePath();
    const path = `${basePath}/e/${event.slug}`;
    const absoluteUrl = new URL(path, window.location.origin).toString();

    setQrUrl(absoluteUrl);
    QRCode.toDataURL(absoluteUrl, {
      errorCorrectionLevel: "M",
      margin: 2,
      scale: 9,
      color: {
        dark: "#080807",
        light: "#fff7e8"
      }
    })
      .then(setQrDataUrl)
      .catch(() => setMessage("Could not generate QR code."));
  }, [event.slug]);

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

    const padding = Math.round(size.width * 0.08);
    const qrSize = Math.round(size.width * (asset.kind === "instagram_story" ? 0.36 : 0.18));

    ctx.fillStyle = "#ffbd66";
    ctx.font = `600 ${Math.round(size.width * 0.022)}px Arial`;
    ctx.letterSpacing = "8px";
    ctx.fillText("BARPING / SOCIAL MODE", padding, padding);
    ctx.letterSpacing = "0px";

    ctx.fillStyle = "#fff7e8";
    ctx.font = `700 ${Math.round(size.width * (asset.kind === "instagram_story" ? 0.092 : 0.064))}px Georgia`;
    wrapText(ctx, event.title, padding, padding + Math.round(size.height * 0.12), size.width - padding * 2, Math.round(size.width * 0.078));

    ctx.fillStyle = "#c6b899";
    ctx.font = `400 ${Math.round(size.width * 0.026)}px Arial`;
    ctx.fillText(`${venue.name} - ${template.name}`, padding, padding + Math.round(size.height * 0.25));

    if (qrDataUrl) {
      const image = new Image();
      image.src = qrDataUrl;
      await image.decode();
      const qrX = padding;
      const qrY = padding + Math.round(size.height * 0.32);
      ctx.fillStyle = "#fff7e8";
      ctx.roundRect(qrX, qrY, qrSize, qrSize, Math.round(qrSize * 0.13));
      ctx.fill();
      ctx.drawImage(image, qrX + qrSize * 0.08, qrY + qrSize * 0.08, qrSize * 0.84, qrSize * 0.84);
    }

    ctx.fillStyle = "#c6b899";
    ctx.font = `400 ${Math.round(size.width * 0.03)}px Arial`;
    const copyTop = padding + Math.round(size.height * (asset.kind === "instagram_story" ? 0.56 : 0.38));
    wrapText(ctx, asset.copy, padding, copyTop, size.width - padding * 2, Math.round(size.width * 0.045));

    ctx.fillStyle = "#82765f";
    ctx.font = `600 ${Math.round(size.width * 0.019)}px Arial`;
    wrapText(ctx, qrUrl, padding, size.height - padding, size.width - padding * 2, Math.round(size.width * 0.028));

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
            ${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR code" />` : ""}
            <p>${safeCopy.replaceAll("\n", "<br />")}</p>
            <div class="url">${safeQrUrl}</div>
          </main>
          <script>window.addEventListener("load", () => { window.print(); });</script>
        </body>
      </html>`);
    printWindow.document.close();
    showDone("print", "Print view opened.");
  }

  return (
    <article className={`glass-card rounded-[28px] p-4 ${isStory ? "min-h-[420px]" : ""}`}>
      <div className={`rounded-[24px] border border-white/[0.08] bg-venue-ink p-5 ${isStory ? "aspect-[9/16]" : "min-h-64"}`}>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">BarPing / Social Mode</p>
        <h3 className="mt-4 font-serif text-4xl leading-none text-venue-cream">{event.title}</h3>
        <p className="mt-2 text-sm text-venue-muted">{venue.name} - {template.name}</p>
        <div className="mt-6 grid h-24 w-24 place-items-center rounded-2xl bg-venue-cream text-venue-ink">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={`QR code for ${event.title}`} className="h-20 w-20" src={qrDataUrl} />
          ) : (
            <Loader2 className="animate-spin" size={30} />
          )}
        </div>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-venue-muted">{asset.copy}</p>
        <p className="mt-4 break-all font-mono text-[0.68rem] uppercase tracking-[0.14em] text-venue-dim">{qrUrl}</p>
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
      {message ? <p className="mt-3 text-sm text-venue-amberSoft">{message}</p> : null}
    </article>
  );
}
