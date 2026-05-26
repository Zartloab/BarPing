"use client";

import { useState } from "react";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { RunSheetPreview } from "@/components/run-sheet-preview";
import { PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { vibeLevelDescriptions } from "@/lib/constants";
import { demoEventTemplates, demoVenue } from "@/lib/demo-data";
import type { EventTemplate, VenueVibeLevel } from "@/lib/types";

export default function NewVenueEventPage() {
  const [template, setTemplate] = useState<EventTemplate>(demoEventTemplates[2]);
  const [vibeLevel, setVibeLevel] = useState<VenueVibeLevel>(template.defaultVibeLevel);
  const [findMeEnabled, setFindMeEnabled] = useState(template.findMeDefault);

  function chooseTemplate(nextTemplate: EventTemplate) {
    setTemplate(nextTemplate);
    setVibeLevel(nextTemplate.defaultVibeLevel);
    setFindMeEnabled(nextTemplate.findMeDefault);
  }

  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Create from template</p>
          <h1 className="mt-3 font-serif text-5xl leading-none">Launch a social night in five minutes.</h1>
          <p className="mx-auto mt-4 max-w-xl text-venue-muted">
            Pick the closest format. BarPing fills the QR kit, tables, host nudges, safety copy, and run sheet.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demoEventTemplates.map((item) => (
            <button
              key={item.id}
              onClick={() => chooseTemplate(item)}
              className={`rounded-[28px] border p-5 text-left transition ${
                template.id === item.id ? "border-venue-amber/65 bg-venue-amber/12 shadow-amber" : "border-white/[0.08] bg-white/[0.035]"
              }`}
              type="button"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-venue-muted">{item.eventType}</span>
                {template.id === item.id ? <Sparkles className="text-venue-amberSoft" size={18} /> : null}
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-venue-muted">{item.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-venue-dim">
                <Clock size={14} />
                {item.recommendedDurationMinutes} min - {item.tables.length} tables
              </p>
            </button>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-card rounded-[28px] p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Review</p>
            <h2 className="mt-2 text-2xl font-semibold">{template.eventTitle}</h2>
            <p className="mt-2 text-sm text-venue-muted">{demoVenue.name} - {template.eventType}</p>

            <div className="mt-5 grid gap-3">
              {(["Calm", "Social", "Mixer"] as VenueVibeLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setVibeLevel(level);
                    setFindMeEnabled(level !== "Calm");
                  }}
                  className={`rounded-[22px] border p-4 text-left ${
                    vibeLevel === level ? "border-venue-amber/60 bg-venue-amber/12" : "border-white/[0.08] bg-white/[0.035]"
                  }`}
                  type="button"
                >
                  <span className="block font-semibold">{level}</span>
                  <span className="mt-1 block text-sm text-venue-muted">{vibeLevelDescriptions[level]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setFindMeEnabled((value) => !value)}
              className="mt-5 flex w-full items-center justify-between rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4 text-left"
              type="button"
            >
              <span>
                <span className="block font-semibold">Find Me</span>
                <span className="mt-1 block text-sm text-venue-muted">Mutual color beacon inside accepted chats.</span>
              </span>
              <span className={`rounded-full px-3 py-1 text-xs ${findMeEnabled ? "bg-venue-amber text-venue-ink" : "bg-white/[0.06] text-venue-muted"}`}>
                {findMeEnabled ? "On" : "Off"}
              </span>
            </button>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SecondaryLink href="/venue/dashboard">Cancel</SecondaryLink>
              <PrimaryLink href="/venue/events/event-demo/qr">
                Create night
                <ArrowRight size={16} />
              </PrimaryLink>
            </div>
          </div>

          <div className="grid gap-6">
            <section className="glass-card rounded-[28px] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Generated tables</p>
              <div className="mt-4 grid gap-3">
                {template.tables.map((table) => (
                  <article key={table.name} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{table.name}</h3>
                        <p className="mt-1 text-sm text-venue-muted">{table.description}</p>
                      </div>
                      <span className="rounded-full bg-venue-olive/20 px-3 py-1 text-xs text-venue-muted">{table.energyLevel}</span>
                    </div>
                    <p className="mt-3 rounded-2xl bg-venue-soft p-3 text-sm text-venue-muted">{table.prompt}</p>
                  </article>
                ))}
              </div>
            </section>
            <RunSheetPreview template={template} />
          </div>
        </section>
      </MotionShell>
    </AppShell>
  );
}
