import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BarPing | Conversation Tables for Venues",
  description: "A QR-based way for guests to pick a conversation table and join when ready.",
  manifest: process.env.NODE_ENV === "production" ? "/BarPing/manifest.webmanifest" : "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080807"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
