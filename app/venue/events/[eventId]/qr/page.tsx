"use client";

import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { VenueGuide } from "@/components/venue-guide";
import { CommandPanel, ConsolePanel, SectionLabel, VenueConsoleHeader } from "@/components/venue-console";
import { VenueThemeToggle } from "@/components/venue-theme-toggle";
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
          summary="Print cards for the room, download the story asset, and keep the guest link handy."
          action={<PrimaryLink href={`/venue/events/${event.id}/setup`}>Back to run sheet</PrimaryLink>}
        />

        <div className="flex flex-wrap justify-end gap-2">
          <VenueGuide compact />
          <VenueThemeToggle />
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid gap-5">
            <CommandPanel>
              <SectionLabel>Guest link</SectionLabel>
              <h1 className="mt-2 text-2xl font-medium tracking-[-0.01em]">Launch kit for tonight.</h1>
              <p className="mt-2 text-sm leading-6 text-venue-muted">
                Six venue-ready assets generated from the selected recipe. Guest-facing assets send people straight to tonight&apos;s tables.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-[10px] bg-white/10 px-3 py-2"><p className="text-lg font-medium">3</p><p className="text-xs text-venue-muted">print signs</p></div>
                <div className="rounded-[10px] bg-white/10 px-3 py-2"><p className="text-lg font-medium">1</p><p className="text-xs text-venue-muted">story</p></div>
                <div className="rounded-[10px] bg-white/10 px-3 py-2"><p className="text-lg font-medium">1</p><p className="text-xs text-venue-muted">run sheet</p></div>
              </div>
            </CommandPanel>
            <ConsolePanel>
              <SectionLabel>Guest link</SectionLabel>
              <div className="mt-3">
                <QRCard event={event} />
              </div>
            </ConsolePanel>
            <SecondaryLink href="/venue/dashboard">Back to run sheet</SecondaryLink>
          </div>

          <AssetGenerator assets={assets} event={event} venue={demoVenue} template={template} />
        </section>
      </MotionShell>
    </AppShell>
  );
}
