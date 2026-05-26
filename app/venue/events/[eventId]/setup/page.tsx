"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Play, Printer, Wand2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AssetGenerator } from "@/components/asset-generator";
import { MotionShell } from "@/components/motion-shell";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryButton } from "@/components/ui/buttons";
import { demoEventTemplates, demoVenue, selectedDemoTemplate } from "@/lib/demo-data";
import { loadLocalPilotEvent, updatePilotLiveStatus } from "@/lib/venue-pilot";
import type { Event, SocialWindow } from "@/lib/types";

type SetupStep = "Template" | "Assets" | "Ready to launch";

export default function EventSetupPage() {
  const local = loadLocalPilotEvent();
  const [event, setEvent] = useState<Event>(local.event);
  const [socialWindow, setSocialWindow] = useState<SocialWindow | null>(local.socialWindow);
  const [step, setStep] = useState<SetupStep>("Template");
  const [message, setMessage] = useState("");
  const template = useMemo(
    () => demoEventTemplates.find((item) => item.id === event.templateId) ?? selectedDemoTemplate,
    [event.templateId]
  );
  const status = event.isClosed ? "Closed" : event.isLive || socialWindow?.status === "active" ? "Live" : "Set up";

  async function startNight() {
    const result = await updatePilotLiveStatus(event, "active");
    setEvent(result.event);
    setSocialWindow(result.socialWindow);
    setMessage("Social Mode is live. Guests can now join from the QR.");
  }

  return (
    <AppShell wide>
      <MotionShell className="py-4">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Launch setup</p>
            <h1 className="mt-3 font-serif text-5xl leading-none">{event.title}</h1>
            <p className="mt-3 text-venue-muted">{demoVenue.name} - {template.name}</p>
          </div>
          <span className="w-fit rounded-full bg-venue-amber/12 px-4 py-2 text-sm font-semibold text-venue-amberSoft">{status}</span>
        </header>

        <div className="mt-6 grid gap-2 rounded-full border border-white/[0.08] bg-venue-raised p-1 md:grid-cols-3">
          {(["Template", "Assets", "Ready to launch"] as SetupStep[]).map((item) => (
            <button
              key={item}
              onClick={() => setStep(item)}
              className={`min-h-11 rounded-full text-sm font-semibold transition ${
                step === item ? "bg-venue-amber text-venue-ink" : "text-venue-muted hover:text-venue-cream"
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {step === "Template" ? (
          <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="glass-card rounded-[28px] p-5">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <Wand2 size={20} />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">Template recipe</h2>
              <p className="mt-2 text-sm leading-relaxed text-venue-muted">{template.description}</p>
              <div className="mt-5 grid gap-3">
                <p className="rounded-2xl bg-white/[0.035] p-3 text-sm text-venue-muted">Vibe: {event.vibeLevel}</p>
                <p className="rounded-2xl bg-white/[0.035] p-3 text-sm text-venue-muted">Find Me: {event.findMeEnabled ? "On" : "Off"}</p>
                <p className="rounded-2xl bg-white/[0.035] p-3 text-sm text-venue-muted">Tables: {local.tables.length}</p>
              </div>
            </article>
            <article className="glass-card rounded-[28px] p-5">
              <h2 className="text-2xl font-semibold">Generated tables</h2>
              <div className="mt-5 grid gap-3">
                {local.tables.map((table) => (
                  <div key={table.id} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
                    <p className="font-semibold">{table.name}</p>
                    <p className="mt-1 text-sm text-venue-muted">{table.description}</p>
                    <p className="mt-3 rounded-2xl bg-venue-soft p-3 text-sm text-venue-muted">{table.prompt}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        ) : null}

        {step === "Assets" ? (
          <div className="mt-6 grid gap-6">
            <QRCard event={event} />
            <AssetGenerator assets={local.assets} event={event} venue={demoVenue} template={template} />
          </div>
        ) : null}

        {step === "Ready to launch" ? (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <article className="glass-card rounded-[28px] p-5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">Ready to initiate Social Mode</h2>
              <p className="mt-2 text-sm leading-relaxed text-venue-muted">
                Print the launch kit, brief staff, then start the social window when the host announces it.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SecondaryButton onClick={() => setStep("Assets")}>
                  <Printer size={16} />
                  Print launch kit
                </SecondaryButton>
                <button
                  onClick={startNight}
                  className="tap-highlight inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-venue-amber px-5 text-sm font-semibold text-venue-ink shadow-amber transition hover:bg-venue-amberSoft"
                  type="button"
                >
                  <Play size={16} />
                  Start Social Mode
                </button>
              </div>
              {message ? <p className="mt-4 rounded-2xl bg-venue-amber/10 p-3 text-sm text-venue-amberSoft">{message}</p> : null}
            </article>
            <article className="glass-card rounded-[28px] p-5">
              <h2 className="text-xl font-semibold">Tonight&apos;s guest link</h2>
              <div className="mt-5">
                <QRCard event={event} />
              </div>
              <PrimaryLink className="mt-5" href={`/e/${event.slug}`}>Preview guest entry</PrimaryLink>
            </article>
          </section>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryLink href="/venue/dashboard">Back to dashboard</PrimaryLink>
          <PrimaryLink href={`/venue/events/${event.id}/qr`}>Open launch kit</PrimaryLink>
        </div>
      </MotionShell>
    </AppShell>
  );
}
