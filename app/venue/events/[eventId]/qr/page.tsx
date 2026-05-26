"use client";

import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { demoEventTemplates, demoVenue, selectedDemoTemplate } from "@/lib/demo-data";
import { loadLocalPilotEvent } from "@/lib/venue-pilot";

export default function EventQrPage() {
  const { event, assets } = loadLocalPilotEvent();
  const template = demoEventTemplates.find((item) => item.id === event.templateId) ?? selectedDemoTemplate;

  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Launch kit</p>
          <h1 className="mt-3 font-serif text-5xl leading-none">Print and share the night.</h1>
          <p className="mx-auto mt-4 max-w-xl text-venue-muted">
            Every item uses the same live event QR. Print posters and cards, download the Instagram story, and copy staff-ready text.
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <QRCard event={event} />
          <AssetGenerator assets={assets} event={event} venue={demoVenue} template={template} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryLink href={`/venue/events/${event.id}/setup`}>Back to setup</PrimaryLink>
          <SecondaryLink href="/venue/dashboard">Back to dashboard</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
