"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Play, Printer, Table2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryButton, PrimaryLink, SecondaryButton, SecondaryLink } from "@/components/ui/buttons";
import { VenueGuide } from "@/components/venue-guide";
import { CommandPanel, ConsolePanel, SectionLabel, StageControl, UtilityPanel, VenueConsoleHeader } from "@/components/venue-console";
import { VenueThemeToggle } from "@/components/venue-theme-toggle";
import { demoEventTemplates, demoVenue, selectedDemoTemplate } from "@/lib/demo-data";
import { loadLocalPilotEvent, updatePilotLiveStatus } from "@/lib/venue-pilot";
import type { Event, SocialWindow } from "@/lib/types";

type SetupStep = "Template" | "Assets" | "Ready";

export default function EventSetupPage() {
  const local = loadLocalPilotEvent();
  const [event, setEvent] = useState<Event>(local.event);
  const [socialWindow, setSocialWindow] = useState<SocialWindow | null>(local.socialWindow);
  const [step, setStep] = useState<SetupStep>("Template");
  const [message, setMessage] = useState("");
  const template = useMemo(() => demoEventTemplates.find((item) => item.id === event.templateId) ?? selectedDemoTemplate, [event.templateId]);
  const status = event.isClosed ? "Closed" : event.isLive || socialWindow?.status === "active" ? "Live" : "Set up";

  async function startNight() {
    const result = await updatePilotLiveStatus(event, "active");
    setEvent(result.event);
    setSocialWindow(result.socialWindow);
    setMessage("Signal Night is live. Guests can now draw a Signal from the QR.");
  }

  return (
    <AppShell wide>
      <MotionShell className="grid gap-5 py-2">
        <VenueConsoleHeader
          venue={demoVenue}
          event={event}
          status={status}
          summary="Review Signals, Circles, Drops, and the launch kit before the room goes live."
          action={<VenueThemeToggle />}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <StageControl<SetupStep> items={["Template", "Assets", "Ready"]} value={step} onChange={setStep} />
          <VenueGuide compact />
        </div>

        <section className="rounded-[12px] border border-venue-soft bg-venue-card p-4">
          <p className="text-xs font-medium text-venue-dim">Simple version</p>
          <p className="mt-1 text-base font-medium">Review the Circle plan, print the guest link, then start only when staff and QR signs are ready.</p>
        </section>

        {step === "Template" ? (
          <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <CommandPanel>
              <SectionLabel>Template selected</SectionLabel>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">{template.name}</h2>
              <p className="mt-2 text-sm leading-6 text-venue-muted">{template.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <UtilityPanel><p className="text-xs text-venue-dim">Vibe</p><p className="mt-1 font-medium">{event.vibeLevel}</p></UtilityPanel>
                <UtilityPanel><p className="text-xs text-venue-dim">Hellos</p><p className="mt-1 font-medium">{event.findMeEnabled ? "Optional" : "Off"}</p></UtilityPanel>
                <UtilityPanel><p className="text-xs text-venue-dim">Assets</p><p className="mt-1 font-medium">{local.assets.length}</p></UtilityPanel>
              </div>
              <SecondaryLink className="mt-4" href="/venue/events/new">Change recipe</SecondaryLink>
            </CommandPanel>

            <ConsolePanel>
              <div className="flex items-center gap-3">
                <Table2 className="text-venue-danger" size={19} />
                <div>
                  <SectionLabel>Generated Circles</SectionLabel>
                  <h2 className="mt-1 text-xl font-medium">Room zones</h2>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {local.tables.map((table) => (
                  <article key={table.id} className="rounded-[10px] border border-venue-soft bg-white px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{table.name}</p>
                        <p className="mt-0.5 text-sm text-venue-muted">{table.description}</p>
                      </div>
                      <span className="rounded-[999px] bg-venue-olive/10 px-2.5 py-1 text-xs text-venue-olive">{table.energyLevel}</span>
                    </div>
                    <p className="mt-2 text-sm text-venue-muted">{table.prompt}</p>
                  </article>
                ))}
              </div>
            </ConsolePanel>
          </section>
        ) : null}

        {step === "Assets" ? (
          <div className="grid gap-5">
            <CommandPanel>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <SectionLabel>Print launch kit</SectionLabel>
                  <h2 className="mt-2 text-2xl font-medium">Print/share assets are ready.</h2>
                  <p className="mt-1 text-sm text-venue-muted">Every guest-facing asset uses the same guest link.</p>
                </div>
                <PrimaryLink href={`/venue/events/${event.id}/qr`}><Printer size={16} />Open launch kit</PrimaryLink>
              </div>
            </CommandPanel>
            <QRCard event={event} />
            <AssetGenerator assets={local.assets} event={event} venue={demoVenue} template={template} />
          </div>
        ) : null}

        {step === "Ready" ? (
          <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <CommandPanel>
              <div className="grid h-11 w-11 place-items-center rounded-[12px] bg-venue-olive/10 text-venue-olive">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.01em]">Ready to launch.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-venue-muted">
                Place the QR cards, brief staff, then press start when the host opens the room.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <SecondaryButton onClick={() => setStep("Assets")}><Printer size={16} />Print launch kit</SecondaryButton>
                <PrimaryButton onClick={startNight}><Play size={16} />Start Signal Night</PrimaryButton>
              </div>
              {message ? <p className="mt-4 rounded-[10px] bg-venue-olive/10 px-3 py-2 text-sm text-venue-olive">{message}</p> : null}
            </CommandPanel>
            <ConsolePanel>
              <SectionLabel>Guest link</SectionLabel>
              <h2 className="mt-2 text-xl font-medium">Tonight&apos;s guest link</h2>
              <div className="mt-4">
                <QRCard event={event} />
              </div>
              <PrimaryLink className="mt-4" href={`/e/${event.slug}`}>Preview guest entry</PrimaryLink>
            </ConsolePanel>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-venue-soft pt-4">
          <SecondaryLink href="/venue/dashboard">Back to run sheet</SecondaryLink>
          <SecondaryLink href={`/venue/events/${event.id}/qr`}>Open guest link</SecondaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
