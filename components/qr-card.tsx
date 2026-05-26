"use client";

import { useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import type { Event } from "@/lib/types";
import { SecondaryButton } from "@/components/ui/buttons";
import { buildEventUrl, QrCodeImage, useQrCodeDataUrl } from "@/components/qr-code";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function QRCard({ event }: { event: Event }) {
  const [copied, setCopied] = useState(false);
  const eventUrl = buildEventUrl(event.slug);
  const { dataUrl } = useQrCodeDataUrl(eventUrl);

  async function copyLink() {
    await navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadQr() {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `${slugify(event.title)}-qr.png`;
    link.href = dataUrl;
    link.click();
  }

  function printQr() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html>
      <html>
        <head>
          <title>${event.title} QR</title>
          <style>
            body { background: #080807; color: #fff7e8; font-family: Arial, sans-serif; margin: 0; padding: 48px; }
            main { border: 1px solid #3d3427; border-radius: 28px; padding: 48px; }
            .kicker { color: #ffbd66; font-size: 13px; font-weight: 700; letter-spacing: 8px; text-transform: uppercase; }
            h1 { font-family: Georgia, serif; font-size: 56px; margin: 28px 0 8px; }
            p { color: #c6b899; font-size: 22px; }
            img { width: 240px; height: 240px; border-radius: 24px; background: #fff7e8; padding: 20px; margin-top: 36px; }
            .url { color: #82765f; font-size: 13px; letter-spacing: 4px; overflow-wrap: anywhere; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <main>
            <div class="kicker">BarPing / Event QR</div>
            <h1>${event.title}</h1>
            ${dataUrl ? `<img src="${dataUrl}" alt="QR code" />` : ""}
            <p>Scan to join Social Mode.</p>
            <p class="url">${eventUrl}</p>
          </main>
          <script>window.addEventListener("load", () => window.print());</script>
        </body>
      </html>`);
    printWindow.document.close();
  }

  return (
    <section className="glass-card rounded-[28px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Event QR</p>
          <h2 className="mt-2 text-lg font-semibold text-venue-cream">{event.title}</h2>
          <p className="mt-1 break-all text-sm text-venue-muted">{eventUrl}</p>
        </div>
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-venue-cream p-2 text-venue-ink">
          <QrCodeImage alt={`QR code for ${event.title}`} value={eventUrl} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <SecondaryButton className="min-h-10 px-4" onClick={downloadQr} disabled={!dataUrl}>
          {dataUrl ? <Download size={16} /> : <Loader2 className="animate-spin" size={16} />}
          Download QR
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-4" onClick={printQr} disabled={!dataUrl}>
          <Printer size={16} />
          Print QR
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-4" onClick={copyLink}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy link"}
        </SecondaryButton>
      </div>
    </section>
  );
}
