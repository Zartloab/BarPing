"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Play, Printer, Table2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryButton, PrimaryLink, SecondaryButton } from "@/components/ui/buttons";
import { CommandPanel, ConsolePanel, SectionLabel, StageControl, UtilityPanel, VenueConsoleHeader } from "@/components/venue-console";
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
    setMessage("Social Mode is live. Guests can now join from the QR.");
  }

  return (
    <AppShell wide>
      <MotionShell className="grid gap-5 py-2">
        <VenueConsoleHeader
          venue={demoVenue}
          event={event}
          status={status}
          summary="Finish the launch checklist, print the kit, then start Social Mode when the room is ready."
          action={<PrimaryButton onClick={startNight}><Play size={16} />Start Social Mode</PrimaryButton>}
        />

        <StageControl<SetupStep> items={["Template", "Assets", "Ready"]} value={step} onChange={setStep} />

        {step === "Template" ? (
          <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <CommandPanel>
              <SectionLabel>Template selected</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{template.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-venue-muted">{template.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <UtilityPanel><p className="text-xs text-venue-dim">Vibe</p><p className="mt-1 font-semibold">{event.vibeLevel}</p></UtilityPanel>
                <UtilityPanel><p className="text-xs text-venue-dim">Find Me</p><p className="mt-1 font-semibold">{event.findMeEnabled ? "On" : "Off"}</p></UtilityPanel>
                <UtilityPanel><p className="text-xs text-venue-dim">Assets</p><p className="mt-1 font-semibold">{local.assets.length}</p></UtilityPanel>
              </div>
              <PrimaryLink className="mt-4" href="/venue/events/new">Change recipe</PrimaryLink>
            </CommandPanel>

            <ConsolePanel>
              <div className="flex items-center gap-3">
                <Table2 className="text-venue-amberSoft" size={19} />
                <div>
                  <SectionLabel>Generated tables</SectionLabel>
                  <h2 className="mt-1 text-xl font-semibold">Conversation zones</h2>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {local.tables.map((table) => (
                  <article key={table.id} className="rounded-[14px] border border-white/[0.08] bg-white/[0.018] px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{table.name}</p>
                        <p className="mt-0.5 text-sm text-venue-muted">{table.description}</p>
                      </div>
                      <span className="rounded-full bg-venue-olive/18 px-2.5 py-1 text-xs text-venue-muted">{table.energyLevel}</span>
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
                  <SectionLabel>Launch kit</SectionLabel>
                  <h2 className="mt-2 text-2xl font-semibold">Print/share assets are ready.</h2>
                  <p className="mt-1 text-sm text-venue-muted">Every guest-facing asset uses the same live event QR.</p>
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
              <div className="grid h-11 w-11 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">Ready to launch.</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-venue-muted">
                Place the QR cards, brief staff, then press start when the host announces Social Mode.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <SecondaryButton onClick={() => setStep("Assets")}><Printer size={16} />Print launch kit</SecondaryButton>
                <PrimaryButton onClick={startNight}><Play size={16} />Start Social Mode</PrimaryButton>
              </div>
              {message ? <p className="mt-4 rounded-[14px] bg-venue-amber/10 px-3 py-2 text-sm text-venue-amberSoft">{message}</p> : null}
            </CommandPanel>
            <ConsolePanel>
              <SectionLabel>Guest link</SectionLabel>
              <h2 className="mt-2 text-xl font-semibold">Tonight&apos;s QR</h2>
              <div className="mt-4">
                <QRCard event={event} />
              </div>
              <PrimaryLink className="mt-4" href={`/e/${event.slug}`}>Preview guest entry</PrimaryLink>
            </ConsolePanel>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-white/[0.08] pt-4">
          <PrimaryLink href="/venue/dashboard">Back to dashboard</PrimaryLink>
          <PrimaryLink href={`/venue/events/${event.id}/qr`}>Open launch kit</PrimaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
