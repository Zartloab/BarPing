"use client";

import { useState } from "react";
import { Copy, RotateCcw, Settings2 } from "lucide-react";
import { AssetGenerator } from "@/components/asset-generator";
import { HostModePanel } from "@/components/host-mode-panel";
import { PilotReport } from "@/components/pilot-report";
import { QRCard } from "@/components/qr-card";
import { RunSheetPreview } from "@/components/run-sheet-preview";
import { PrimaryLink, SecondaryButton } from "@/components/ui/buttons";
import { vibeLevelDescriptions } from "@/lib/constants";
import { loadLocalPilotEvent } from "@/lib/venue-pilot";
import type {
  Event,
  EventAsset,
  EventRecommendation,
  EventTable,
  EventTemplate,
  FeedbackResponse,
  Guest,
  HostAnnouncement,
  PilotMetrics,
  Report,
  SocialWindow,
  Venue,
  VenueVibeLevel
} from "@/lib/types";

type DashboardTab = "Set up" | "Live" | "After";

export function VenueNightDashboard({
  venue,
  event,
  templates,
  selectedTemplate,
  assets,
  tables,
  guests,
  announcements,
  windows,
  reports,
  metrics,
  feedback,
  recommendation
}: {
  venue: Venue;
  event: Event;
  templates: EventTemplate[];
  selectedTemplate: EventTemplate;
  assets: EventAsset[];
  tables: EventTable[];
  guests: Guest[];
  announcements: HostAnnouncement[];
  windows: SocialWindow[];
  reports: Report[];
  metrics: PilotMetrics;
  feedback: FeedbackResponse[];
  recommendation: EventRecommendation;
}) {
  const pilot = loadLocalPilotEvent();
  const activeEvent = pilot.event.id !== event.id ? pilot.event : event;
  const activeAssets = pilot.event.id !== event.id ? pilot.assets : assets;
  const activeTables = pilot.event.id !== event.id ? pilot.tables : tables;
  const activeWindows = pilot.socialWindow ? [pilot.socialWindow] : windows;
  const [tab, setTab] = useState<DashboardTab>("Set up");
  const [templateId, setTemplateId] = useState(activeEvent.templateId ?? selectedTemplate.id);
  const [vibeLevel, setVibeLevel] = useState<VenueVibeLevel>(activeEvent.vibeLevel ?? selectedTemplate.defaultVibeLevel);
  const [findMeEnabled, setFindMeEnabled] = useState(activeEvent.findMeEnabled ?? selectedTemplate.findMeDefault);
  const activeTemplate = templates.find((template) => template.id === templateId) ?? selectedTemplate;
  const launchStatus = activeEvent.isClosed ? "Closed" : activeEvent.isLive ? "Live" : "Set up";

  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Social Night in a Box</p>
          <h1 className="mt-3 font-serif text-5xl leading-none">{venue.name}</h1>
          <p className="mt-3 text-venue-muted">{activeTemplate.name} - {launchStatus}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PrimaryLink href={activeEvent.id === event.id ? "/venue/events/new" : `/venue/events/${activeEvent.id}/setup`}>
            {activeEvent.id === event.id ? "Create night" : "Continue setup"}
          </PrimaryLink>
          <PrimaryLink href={`/e/${activeEvent.slug}`}>Preview guest screen</PrimaryLink>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-2 rounded-full border border-white/[0.08] bg-venue-raised p-1">
        {(["Set up", "Live", "After"] as DashboardTab[]).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`min-h-11 rounded-full text-sm font-semibold transition ${
              tab === item ? "bg-venue-amber text-venue-ink" : "text-venue-muted hover:text-venue-cream"
            }`}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Set up" ? (
        <div className="grid gap-6">
          <section className="glass-card rounded-[28px] p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <Settings2 size={20} />
              </div>
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Step 1</p>
                <h2 className="mt-1 text-2xl font-semibold">Choose the night.</h2>
                <p className="mt-2 text-sm text-venue-muted">Templates fill in tables, prompts, staff scripts, QR copy, and the run sheet.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setTemplateId(template.id);
                    setVibeLevel(template.defaultVibeLevel);
                    setFindMeEnabled(template.findMeDefault);
                  }}
                  className={`rounded-[24px] border p-4 text-left transition ${
                    activeTemplate.id === template.id ? "border-venue-amber/60 bg-venue-amber/12" : "border-white/[0.08] bg-white/[0.035]"
                  }`}
                  type="button"
                >
                  <span className="block font-semibold text-venue-cream">{template.name}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-venue-muted">{template.description}</span>
                  <span className="mt-3 block text-xs text-venue-dim">{template.recommendedDurationMinutes} min - {template.tables.length} tables</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="glass-card rounded-[28px] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Step 2</p>
              <h2 className="mt-2 text-2xl font-semibold">Tune the room.</h2>
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
                  <span className="block font-semibold">Allow Find Me tonight</span>
                  <span className="mt-1 block text-sm text-venue-muted">Mutual-only shared color beacon.</span>
                </span>
                <span className={`rounded-full px-3 py-1 text-xs ${findMeEnabled ? "bg-venue-amber text-venue-ink" : "bg-white/[0.06] text-venue-muted"}`}>
                  {findMeEnabled ? "On" : "Off"}
                </span>
              </button>
            </div>
            <div className="glass-card rounded-[28px] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Generated tables</p>
              <h2 className="mt-2 text-2xl font-semibold">{activeTemplate.eventTitle}</h2>
              <div className="mt-5 grid gap-3">
                {activeTemplate.tables.map((table) => (
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
            </div>
          </section>

          <AssetGenerator assets={activeAssets} event={{ ...activeEvent, title: activeTemplate.eventTitle }} venue={venue} template={activeTemplate} />
          <RunSheetPreview template={activeTemplate} />
        </div>
      ) : null}

      {tab === "Live" ? (
        <div className="grid gap-6">
          <HostModePanel event={activeEvent} windows={activeWindows} announcements={announcements} tables={activeTables} />
          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="glass-card rounded-[28px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Live room</p>
                  <h2 className="mt-2 text-xl font-semibold">Active guests</h2>
                </div>
                <PrimaryLink href={`/e/${activeEvent.slug}/room`}>Open room</PrimaryLink>
              </div>
              <div className="mt-5 grid gap-3">
                {guests.slice(0, 6).map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between rounded-[22px] bg-white/[0.035] p-3">
                    <div>
                      <p className="font-semibold">{guest.alias}</p>
                      <p className="mt-1 text-xs text-venue-muted">{guest.entryChoice ?? guest.mode} - {guest.vibe}</p>
                    </div>
                    <span className="rounded-full bg-venue-olive/20 px-3 py-1 text-xs text-venue-muted">Active</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[28px] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Safety</p>
              <h2 className="mt-2 text-xl font-semibold">Reports and quick actions</h2>
              <div className="mt-5 grid gap-3">
                {reports.map((report) => (
                  <article key={report.id} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
                    <p className="font-semibold">{report.reason}</p>
                    <p className="mt-2 text-sm text-venue-muted">{report.reporterAlias} reported {report.reportedAlias}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <SecondaryButton className="min-h-10 px-3">Warn</SecondaryButton>
                      <SecondaryButton className="min-h-10 px-3">Event ban</SecondaryButton>
                      <PrimaryLink href="/venue/events/event-demo/reports">Review</PrimaryLink>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <QRCard event={activeEvent} />
        </div>
      ) : null}

      {tab === "After" ? (
        <div className="grid gap-6">
          <section className="glass-card rounded-[28px] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Recommendation</p>
                <h2 className="mt-2 font-serif text-4xl">{recommendation}</h2>
                <p className="mt-2 text-sm text-venue-muted">
                  Tables drove the strongest signal. Duplicate this night and keep the host announcement.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <PrimaryLink href="/venue/events/new">
                  <RotateCcw size={16} />
                  Duplicate event
                </PrimaryLink>
                <SecondaryButton>
                  <Copy size={16} />
                  Export summary
                </SecondaryButton>
              </div>
            </div>
          </section>
          <PilotReport metrics={metrics} />
          <section className="grid gap-4 md:grid-cols-3">
            <div className="glass-card rounded-[24px] p-4">
              <p className="text-sm text-venue-muted">Feedback responses</p>
              <p className="mt-3 text-3xl font-semibold">{feedback.length}</p>
            </div>
            <div className="glass-card rounded-[24px] p-4">
              <p className="text-sm text-venue-muted">Average rating</p>
              <p className="mt-3 text-3xl font-semibold">
                {(feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1)}
              </p>
            </div>
            <div className="glass-card rounded-[24px] p-4">
              <p className="text-sm text-venue-muted">Table felt easier</p>
              <p className="mt-3 text-3xl font-semibold">
                {Math.round((feedback.filter((item) => item.tableFeltEasier).length / feedback.length) * 100)}%
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
