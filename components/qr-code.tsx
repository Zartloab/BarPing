"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import QRCode from "qrcode";

export function getAppBasePath() {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/BarPing") ? "/BarPing" : "";
}

export function buildEventUrl(slug: string) {
  if (typeof window === "undefined") return `/e/${slug}`;
  return new URL(`${getAppBasePath()}/e/${slug}`, window.location.origin).toString();
}

export function useQrCodeDataUrl(value: string) {
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!value) return;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 2,
      scale: 9,
      color: {
        dark: "#080807",
        light: "#fff7e8"
      }
    })
      .then((nextDataUrl) => {
        setDataUrl(nextDataUrl);
        setError("");
      })
      .catch(() => setError("Could not generate QR code."));
  }, [value]);

  return { dataUrl, error };
}

export function QrCodeImage({
  value,
  alt,
  className = "h-24 w-24"
}: {
  value: string;
  alt: string;
  className?: string;
}) {
  const { dataUrl } = useQrCodeDataUrl(value);

  if (!dataUrl) {
    return <Loader2 className="animate-spin text-venue-ink" size={28} />;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className={className} src={dataUrl} />;
}
