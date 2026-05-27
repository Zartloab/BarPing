"use client";

import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { CommandPanel, ConsolePanel, SectionLabel, VenueConsoleHeader } from "@/components/venue-console";
import { demoEventTemplates, demoVenue, selectedDemoTemplate } from "@/lib/demo-data";
import { loadLocalPilotEvent } from "@/lib/venue-pilot";

export default function EventQrPage() {
  const { event, assets } = loadLocalPilotEvent();
  const template = demoEventTemplates.find((item) => item.id === event.templateId) ?? selectedDemoTemplate;

  return (
    <AppShell wide>
      <MotionShell className="grid gap-5 py-2">
        <VenueConsoleHeader
          venue={demoVenue}
          event={event}
          status={event.isLive ? "Live" : "Set up"}
          summary="Print cards for the room, download the story asset, and keep the QR utility handy."
          action={<PrimaryLink href={`/venue/events/${event.id}/setup`}>Back to setup</PrimaryLink>}
        />

        <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid gap-5">
            <CommandPanel>
              <SectionLabel>Print studio</SectionLabel>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Launch kit for tonight.</h1>
              <p className="mt-2 text-sm leading-relaxed text-venue-muted">
                Six venue-ready assets generated from the selected recipe. Guest-facing assets share the same scannable event QR.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-[14px] bg-black/18 px-3 py-2"><p className="text-lg font-semibold">3</p><p className="text-xs text-venue-muted">print signs</p></div>
                <div className="rounded-[14px] bg-black/18 px-3 py-2"><p className="text-lg font-semibold">1</p><p className="text-xs text-venue-muted">story</p></div>
                <div className="rounded-[14px] bg-black/18 px-3 py-2"><p className="text-lg font-semibold">1</p><p className="text-xs text-venue-muted">run sheet</p></div>
              </div>
            </CommandPanel>
            <ConsolePanel>
              <SectionLabel>Event QR utility</SectionLabel>
              <div className="mt-3">
                <QRCard event={event} />
              </div>
            </ConsolePanel>
            <SecondaryLink href="/venue/dashboard">Back to dashboard</SecondaryLink>
          </div>

          <AssetGenerator assets={assets} event={event} venue={demoVenue} template={template} />
        </section>
      </MotionShell>
    </AppShell>
  );
}
