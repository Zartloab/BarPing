"use client";

import { useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";
import type { Event } from "@/lib/types";
import { SecondaryButton } from "@/components/ui/buttons";
import { QrCodeImage, useEventUrl, useQrCodeDataUrl } from "@/components/qr-code";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function QRCard({ event }: { event: Event }) {
  const [copied, setCopied] = useState(false);
  const eventUrl = useEventUrl(event.slug);
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
            body { background: #fff; color: #181d26; font-family: Arial, sans-serif; margin: 0; padding: 48px; }
            main { border: 1px solid #e5e1d8; border-radius: 16px; padding: 48px; }
            .kicker { color: #FF7A6B; font-size: 13px; font-weight: 700; letter-spacing: 4px; }
            h1 { font-family: Georgia, serif; font-size: 56px; font-weight: 400; margin: 28px 0 8px; }
            p { color: #454a54; font-size: 22px; }
            img { width: 240px; height: 240px; border-radius: 12px; background: #fff; border: 1px solid #e5e1d8; padding: 20px; margin-top: 36px; }
            .url { color: #767b84; font-size: 13px; letter-spacing: 2px; overflow-wrap: anywhere; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <main>
            <div class="kicker">BarPing / Guest link</div>
            <h1>${event.title}</h1>
            ${dataUrl ? `<img src="${dataUrl}" alt="QR code" />` : ""}
            <p>Scan the QR, draw your Signal, follow the Drop, and join a Circle when ready.</p>
            <p class="url">${eventUrl}</p>
          </main>
          <script>window.addEventListener("load", () => window.print());</script>
        </body>
      </html>`);
    printWindow.document.close();
  }

  return (
    <section className="venue-panel-flat rounded-[12px] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-venue-dim">Guest link</p>
          <h2 className="mt-2 text-lg font-medium text-venue-cream">{event.title}</h2>
          <p className="mt-1 break-all text-sm text-venue-muted">{eventUrl}</p>
        </div>
        <div className="qr-surface grid h-24 w-24 shrink-0 place-items-center rounded-[10px] border border-venue-soft bg-white p-2 text-venue-cream">
          <QrCodeImage alt={`QR code for ${event.title}`} value={eventUrl} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SecondaryButton className="min-h-9 px-3" onClick={downloadQr} disabled={!dataUrl}>
          {dataUrl ? <Download size={16} /> : <Loader2 className="animate-spin" size={16} />}
          Download QR
        </SecondaryButton>
        <SecondaryButton className="min-h-9 px-3" onClick={printQr} disabled={!dataUrl}>
          <Printer size={16} />
          Print QR
        </SecondaryButton>
        <SecondaryButton className="min-h-9 px-3" onClick={copyLink}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy link"}
        </SecondaryButton>
      </div>
    </section>
  );
}
