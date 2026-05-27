"use client";

import { useState } from "react";
import { Copy, Printer, Radio, RotateCcw, ShieldCheck, UsersRound } from "lucide-react";
import { AssetGenerator } from "@/components/asset-generator";
import { HostModePanel } from "@/components/host-mode-panel";
import { PilotReport } from "@/components/pilot-report";
import { QRCard } from "@/components/qr-card";
import { PrimaryLink, SecondaryButton } from "@/components/ui/buttons";
import { VenueGuide } from "@/components/venue-guide";
import { CommandPanel, ConsolePanel, SafetyPanel, SectionLabel, StageControl, UtilityPanel, VenueConsoleHeader } from "@/components/venue-console";
import { VenueThemeToggle } from "@/components/venue-theme-toggle";
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
  const [tab, setTab] = useState<DashboardTab>(activeEvent.isLive ? "Live" : "Set up");
  const [templateId, setTemplateId] = useState(activeEvent.templateId ?? selectedTemplate.id);
  const [vibeLevel, setVibeLevel] = useState<VenueVibeLevel>(activeEvent.vibeLevel ?? selectedTemplate.defaultVibeLevel);
  const [findMeEnabled, setFindMeEnabled] = useState(activeEvent.findMeEnabled ?? selectedTemplate.findMeDefault);
  const activeTemplate = templates.find((template) => template.id === templateId) ?? selectedTemplate;
  const status = activeEvent.isClosed ? "Closed" : tab === "After" ? "After" : activeEvent.isLive ? "Live" : "Set up";
  const averageRating = feedback.length ? (feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1) : "0.0";
  const tableFeltEasier = feedback.length
    ? Math.round((feedback.filter((item) => item.tableFeltEasier).length / feedback.length) * 100)
    : 0;

  return (
    <div className="grid gap-5">
      <VenueConsoleHeader
        venue={venue}
        event={{ ...activeEvent, title: activeTemplate.eventTitle }}
        status={status}
        summary={
          activeEvent.isLive
            ? `${guests.length} guests active. Keep nudges light and tables moving.`
            : "Choose a night recipe, check the generated setup, then print the launch kit."
        }
        action={
          <PrimaryLink href={activeEvent.id === event.id ? "/venue/events/new" : `/venue/events/${activeEvent.id}/setup`}>
            {activeEvent.id === event.id ? "Create night" : activeEvent.isLive ? "Open host mode" : "Continue setup"}
          </PrimaryLink>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StageControl<DashboardTab> items={["Set up", "Live", "After"]} value={tab} onChange={setTab} />
        <div className="flex flex-wrap gap-2">
          <VenueGuide />
          <VenueThemeToggle />
          <PrimaryLink className="hidden md:inline-flex" href={`/e/${activeEvent.slug}`}>
            Guest preview
          </PrimaryLink>
        </div>
      </div>

      <section className="rounded-[12px] border border-venue-soft bg-venue-card p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-medium text-venue-dim">What to do now</p>
            <p className="mt-1 text-base font-medium text-venue-cream">
              {tab === "Set up"
                ? "Choose the recipe, print the launch kit, then start when the room is ready."
                : tab === "Live"
                  ? "Use this screen as the host control room: nudge, spotlight, watch safety."
                  : "Review what worked, then duplicate the event if it is worth repeating."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tab === "Set up" ? (
              <>
                <PrimaryLink href="/venue/events/new">Create night</PrimaryLink>
                <PrimaryLink href={`/venue/events/${activeEvent.id}/qr`}>Print kit</PrimaryLink>
              </>
            ) : tab === "Live" ? (
              <PrimaryLink href={`/e/${activeEvent.slug}/room`}>Open guest room</PrimaryLink>
            ) : (
              <PrimaryLink href="/venue/events/new">Run this again</PrimaryLink>
            )}
          </div>
        </div>
      </section>

      {tab === "Set up" ? (
        <div className="grid gap-5">
          <CommandPanel>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <SectionLabel>Launch flow</SectionLabel>
                <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">Run a social night in 5 minutes.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-venue-muted">
                  Pick a recipe, review the generated tables and assets, then start when the host announces it.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <PrimaryLink href="/venue/events/new">Create night</PrimaryLink>
                <PrimaryLink href={`/venue/events/${activeEvent.id}/qr`}>
                  <Printer size={16} />
                  Print launch kit
                </PrimaryLink>
              </div>
            </div>
          </CommandPanel>

          <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <ConsolePanel>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <SectionLabel>Choose the night</SectionLabel>
                  <h2 className="mt-2 text-xl font-medium">Night recipes</h2>
                </div>
                <p className="text-xs text-venue-dim">{templates.length} formats</p>
              </div>
              <div className="mt-4 grid gap-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setTemplateId(template.id);
                      setVibeLevel(template.defaultVibeLevel);
                      setFindMeEnabled(template.findMeDefault);
                    }}
                    className={`rounded-[12px] border px-4 py-3 text-left transition ${
                      activeTemplate.id === template.id
                        ? "border-venue-cream bg-venue-raised"
                        : "border-venue-soft bg-white hover:border-venue-cream/25"
                    }`}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-venue-cream">{template.name}</p>
                        <p className="mt-1 text-sm leading-6 text-venue-muted">{template.description}</p>
                      </div>
                      <span className="shrink-0 rounded-[999px] border border-venue-soft bg-white px-2.5 py-1 text-xs text-venue-dim">
                        {template.eventType}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-venue-dim">
                      {template.recommendedDurationMinutes} min / {template.tables.length} tables / {template.defaultVibeLevel}
                    </p>
                  </button>
                ))}
              </div>
            </ConsolePanel>

            <ConsolePanel>
              <SectionLabel>Review generated setup</SectionLabel>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">{activeTemplate.eventTitle}</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <UtilityPanel>
                  <p className="text-xs text-venue-dim">Duration</p>
                  <p className="mt-1 font-medium">{activeTemplate.recommendedDurationMinutes} min</p>
                </UtilityPanel>
                <UtilityPanel>
                  <p className="text-xs text-venue-dim">Tables</p>
                  <p className="mt-1 font-medium">{activeTemplate.tables.length}</p>
                </UtilityPanel>
                <UtilityPanel>
                  <p className="text-xs text-venue-dim">Vibe</p>
                  <p className="mt-1 font-medium">{vibeLevel}</p>
                </UtilityPanel>
                <UtilityPanel>
                  <p className="text-xs text-venue-dim">Find Me</p>
                  <p className="mt-1 font-medium">{findMeEnabled ? "On" : "Off"}</p>
                </UtilityPanel>
              </div>
              <div className="mt-4 grid gap-2">
                {(["Calm", "Social", "Mixer"] as VenueVibeLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setVibeLevel(level);
                      setFindMeEnabled(level !== "Calm");
                    }}
                    className={`rounded-[10px] border px-3 py-2 text-left text-sm ${
                      vibeLevel === level ? "border-venue-cream bg-venue-raised" : "border-venue-soft bg-white"
                    }`}
                    type="button"
                  >
                    <span className="font-medium">{level}</span>
                    <span className="ml-2 text-venue-muted">{vibeLevelDescriptions[level]}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 border-t border-venue-soft pt-4">
                <p className="text-sm font-medium">Example prompts</p>
                <div className="mt-2 grid gap-2">
                  {activeTemplate.tables.slice(0, 3).map((table) => (
                    <p key={table.name} className="rounded-[10px] bg-venue-raised px-3 py-2 text-sm text-venue-muted">
                      {table.name}: {table.prompt}
                    </p>
                  ))}
                </div>
              </div>
            </ConsolePanel>
          </section>

          <AssetGenerator assets={activeAssets} event={{ ...activeEvent, title: activeTemplate.eventTitle }} venue={venue} template={activeTemplate} />
        </div>
      ) : null}

      {tab === "Live" ? (
        <div className="grid gap-5">
          <HostModePanel event={activeEvent} windows={activeWindows} announcements={announcements} tables={activeTables} />
          <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <ConsolePanel>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <SectionLabel>Room snapshot</SectionLabel>
                  <h2 className="mt-2 text-xl font-medium">Active guests</h2>
                </div>
                <PrimaryLink href={`/e/${activeEvent.slug}/room`}>Open room</PrimaryLink>
              </div>
              <div className="mt-4 grid gap-2">
                {guests.slice(0, 6).map((guest) => (
                  <div key={guest.id} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[10px] border border-venue-soft bg-white px-3 py-2.5">
                    <div>
                      <p className="font-medium">{guest.alias}</p>
                      <p className="mt-0.5 text-xs text-venue-muted">
                        {guest.entryChoice ?? guest.mode} / {guest.topics.slice(0, 2).join(", ")}
                      </p>
                    </div>
                    <span className="rounded-[999px] bg-[#dfece0] px-2.5 py-1 text-xs text-venue-olive">{guest.vibe}</span>
                  </div>
                ))}
              </div>
            </ConsolePanel>

            <SafetyPanel>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-venue-danger" size={20} />
                <div>
                  <SectionLabel>Safety</SectionLabel>
                  <h2 className="mt-1 text-xl font-medium">Reports</h2>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {reports.length ? (
                  reports.map((report) => (
                    <article key={report.id} className="rounded-[10px] border border-venue-danger/20 bg-white p-3">
                      <p className="font-medium">{report.reason}</p>
                      <p className="mt-1 text-sm text-venue-muted">
                        {report.reporterAlias} reported {report.reportedAlias}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <SecondaryButton className="min-h-9 px-3">Warn</SecondaryButton>
                        <SecondaryButton className="min-h-9 px-3">Event ban</SecondaryButton>
                        <PrimaryLink className="min-h-9 px-3" href="/venue/events/event-demo/reports">
                          Review
                        </PrimaryLink>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-[10px] bg-white p-3 text-sm text-venue-muted">
                    No reports so far. Keep an eye on the room while Social Mode is live.
                  </p>
                )}
              </div>
            </SafetyPanel>
          </section>
          <UtilityPanel>
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <SectionLabel>Event QR utility</SectionLabel>
                <p className="mt-2 text-sm text-venue-muted">Use this if a table card goes missing or someone asks for the guest link.</p>
              </div>
              <QRCard event={activeEvent} />
            </div>
          </UtilityPanel>
        </div>
      ) : null}

      {tab === "After" ? (
        <div className="grid gap-5">
          <CommandPanel>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <SectionLabel>Debrief</SectionLabel>
                <h2 className="mt-2 text-2xl font-medium">{recommendation}</h2>
                <p className="mt-2 text-sm text-venue-muted">
                  Tables were the strongest signal. Keep the host announcement and run this format again.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <PrimaryLink href="/venue/events/new">
                  <RotateCcw size={16} />
                  Run this again
                </PrimaryLink>
                <SecondaryButton>
                  <Copy size={16} />
                  Export summary
                </SecondaryButton>
              </div>
            </div>
          </CommandPanel>

          <section className="grid gap-3 md:grid-cols-4">
            <UtilityPanel>
              <UsersRound size={18} />
              <p className="mt-3 text-2xl font-medium">{metrics.checkIns}</p>
              <p className="text-sm text-venue-muted">check-ins</p>
            </UtilityPanel>
            <UtilityPanel>
              <Radio size={18} />
              <p className="mt-3 text-2xl font-medium">{metrics.tableJoins}</p>
              <p className="text-sm text-venue-muted">table joins</p>
            </UtilityPanel>
            <UtilityPanel>
              <p className="text-2xl font-medium">{metrics.acceptedPings}</p>
              <p className="text-sm text-venue-muted">accepted pings</p>
            </UtilityPanel>
            <UtilityPanel>
              <p className="text-2xl font-medium">{metrics.reports}</p>
              <p className="text-sm text-venue-muted">reports</p>
            </UtilityPanel>
          </section>

          <PilotReport metrics={metrics} />
          <section className="grid gap-3 md:grid-cols-3">
            <UtilityPanel>
              <p className="text-sm text-venue-muted">Feedback responses</p>
              <p className="mt-3 text-3xl font-medium">{feedback.length}</p>
            </UtilityPanel>
            <UtilityPanel>
              <p className="text-sm text-venue-muted">Average rating</p>
              <p className="mt-3 text-3xl font-medium">{averageRating}</p>
            </UtilityPanel>
            <UtilityPanel>
              <p className="text-sm text-venue-muted">Table felt easier</p>
              <p className="mt-3 text-3xl font-medium">{tableFeltEasier}%</p>
            </UtilityPanel>
          </section>
        </div>
      ) : null}
    </div>
  );
}
