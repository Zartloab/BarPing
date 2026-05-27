"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, FileText, Printer, Table2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryButton, SecondaryLink } from "@/components/ui/buttons";
import { CommandPanel, ConsolePanel, SectionLabel, StageControl, UtilityPanel, VenueConsoleHeader } from "@/components/venue-console";
import { vibeLevelDescriptions } from "@/lib/constants";
import { demoEvent, demoEventTemplates, demoVenue } from "@/lib/demo-data";
import { createPilotEvent } from "@/lib/venue-pilot";
import type { EventTemplate, VenueVibeLevel } from "@/lib/types";

type CreateStep = "Template" | "Review" | "Create";

export default function NewVenueEventPage() {
  const router = useRouter();
  const [step, setStep] = useState<CreateStep>("Template");
  const [template, setTemplate] = useState<EventTemplate>(demoEventTemplates[2]);
  const [vibeLevel, setVibeLevel] = useState<VenueVibeLevel>(template.defaultVibeLevel);
  const [findMeEnabled, setFindMeEnabled] = useState(template.findMeDefault);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  function chooseTemplate(nextTemplate: EventTemplate) {
    setTemplate(nextTemplate);
    setVibeLevel(nextTemplate.defaultVibeLevel);
    setFindMeEnabled(nextTemplate.findMeDefault);
  }

  async function createNight() {
    setIsCreating(true);
    setError("");
    try {
      const result = await createPilotEvent(template, vibeLevel, findMeEnabled);
      router.push(`/venue/events/${result.event.id}/setup`);
    } catch {
      setError("We could not save this night. Check your connection and try again.");
      setIsCreating(false);
    }
  }

  return (
    <AppShell wide>
      <MotionShell className="grid gap-5 py-2">
        <VenueConsoleHeader
          venue={demoVenue}
          event={{ ...demoEvent, title: template.eventTitle }}
          status="Set up"
          summary="Choose a reusable night recipe. BarPing generates the tables, prompts, launch kit, and run sheet."
          action={<PrimaryButton onClick={() => setStep("Create")}>Create night</PrimaryButton>}
        />

        <StageControl<CreateStep> items={["Template", "Review", "Create"]} value={step} onChange={setStep} />

        <section className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
          <ConsolePanel>
            <div className="flex items-end justify-between gap-3">
              <div>
                <SectionLabel>Night recipes</SectionLabel>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Pick the closest format.</h1>
              </div>
              <p className="text-xs text-venue-dim">{demoEventTemplates.length} templates</p>
            </div>
            <div className="mt-4 grid gap-2">
              {demoEventTemplates.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    chooseTemplate(item);
                    setStep("Review");
                  }}
                  className={`rounded-[14px] border px-4 py-3 text-left transition ${
                    template.id === item.id ? "border-venue-amber/50 bg-venue-amber/10" : "border-white/[0.08] bg-white/[0.018] hover:border-white/[0.16]"
                  }`}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-venue-cream">{item.name}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-venue-muted">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-venue-dim">{item.eventType}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-xs text-venue-dim">
                    <Clock size={13} />
                    {item.recommendedDurationMinutes} min · {item.tables.length} tables · {item.defaultVibeLevel}
                  </p>
                </button>
              ))}
            </div>
          </ConsolePanel>

          <div className="grid gap-5">
            <CommandPanel>
              <SectionLabel>Selected recipe</SectionLabel>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{template.eventTitle}</h2>
              <p className="mt-1 text-sm text-venue-muted">{demoVenue.name} · {template.eventType}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <UtilityPanel><Table2 size={16} /><p className="mt-2 text-lg font-semibold">{template.tables.length}</p><p className="text-xs text-venue-muted">tables</p></UtilityPanel>
                <UtilityPanel><Printer size={16} /><p className="mt-2 text-lg font-semibold">6</p><p className="text-xs text-venue-muted">assets</p></UtilityPanel>
                <UtilityPanel><FileText size={16} /><p className="mt-2 text-lg font-semibold">{template.recommendedDurationMinutes}</p><p className="text-xs text-venue-muted">minutes</p></UtilityPanel>
              </div>
            </CommandPanel>

            <ConsolePanel>
              <SectionLabel>Room settings</SectionLabel>
              <div className="mt-3 grid gap-2">
                {(["Calm", "Social", "Mixer"] as VenueVibeLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setVibeLevel(level);
                      setFindMeEnabled(level !== "Calm");
                    }}
                    className={`rounded-[14px] border px-3 py-2 text-left text-sm ${vibeLevel === level ? "border-venue-amber/45 bg-venue-amber/10" : "border-white/[0.08] bg-white/[0.018]"}`}
                    type="button"
                  >
                    <span className="font-semibold text-venue-cream">{level}</span>
                    <span className="ml-2 text-venue-muted">{vibeLevelDescriptions[level]}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setFindMeEnabled((value) => !value)}
                className="mt-3 flex min-h-11 w-full items-center justify-between rounded-[14px] border border-white/[0.08] bg-white/[0.018] px-3 text-left"
                type="button"
              >
                <span className="text-sm font-semibold">Find Me color beacon</span>
                <span className={`rounded-full px-2.5 py-1 text-xs ${findMeEnabled ? "bg-venue-amber text-venue-ink" : "bg-white/[0.06] text-venue-muted"}`}>
                  {findMeEnabled ? "On" : "Off"}
                </span>
              </button>
            </ConsolePanel>

            <ConsolePanel>
              <SectionLabel>Generated prompts</SectionLabel>
              <div className="mt-3 grid gap-2">
                {template.tables.slice(0, 3).map((table) => (
                  <p key={table.name} className="rounded-[14px] bg-black/18 px-3 py-2 text-sm text-venue-muted">
                    <span className="font-semibold text-venue-cream">{table.name}</span> · {table.prompt}
                  </p>
                ))}
              </div>
            </ConsolePanel>
          </div>
        </section>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/[0.08] pt-4">
          <SecondaryLink href="/venue/dashboard">Cancel</SecondaryLink>
          <PrimaryButton disabled={isCreating} onClick={createNight}>
            {isCreating ? "Creating..." : "Create night"}
            <ArrowRight size={16} />
          </PrimaryButton>
        </div>
        {error ? <p className="rounded-[14px] bg-venue-danger/10 p-3 text-sm text-venue-danger">{error}</p> : null}
      </MotionShell>
    </AppShell>
  );
}
