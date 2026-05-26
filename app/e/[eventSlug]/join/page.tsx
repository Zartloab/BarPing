"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, Eye, HeartHandshake, MessageCircle, ShieldAlert, Smile, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SafetyNotice } from "@/components/safety-notice";
import { SignalCard } from "@/components/signal-card";
import { TopicChips } from "@/components/topic-chips";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { VibeSelector } from "@/components/vibe-selector";
import { communityRules, guestEntryChoices, modes, topics } from "@/lib/constants";
import { demoEvent } from "@/lib/demo-data";
import { generateAlias } from "@/lib/aliases";
import type { GuestEntryChoice, Mode, Vibe } from "@/lib/types";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const [step, setStep] = useState<"rules" | "entry" | "profile">("rules");
  const [accepted, setAccepted] = useState(false);
  const [vibe, setVibe] = useState<Vibe>("Social");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Music"]);
  const [mode, setMode] = useState<Mode>("Open to 1:1 chat");
  const [entryChoice, setEntryChoice] = useState<GuestEntryChoice>("Join a table");
  const [note, setNote] = useState("");
  const alias = useMemo(() => generateAlias(), []);

  const preview = {
    id: "me",
    alias,
    vibe,
    topics: selectedTopics,
    mode,
    note: note || "Here to meet people already in the room.",
    checkedInAt: new Date().toISOString(),
    expiresAt: demoEvent.endsAt,
    entryChoice
  };

  function chooseEntry(choice: GuestEntryChoice) {
    const entry = guestEntryChoices.find((item) => item.label === choice);
    setEntryChoice(choice);
    setMode(entry?.defaultMode ?? "Join a table");
    if (choice === "Join a table") {
      setVibe("Social");
      setSelectedTopics(["Music", "Random"]);
    }
    if (choice === "Open to pings") {
      setVibe("Social");
      setSelectedTopics(["Music", "Film"]);
    }
    if (choice === "Just browsing") {
      setVibe("Just Curious");
      setSelectedTopics(["Random"]);
    }
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic].slice(0, 5)
    );
  }

  function enterRoom() {
    window.localStorage.setItem(
      "barping-profile",
      JSON.stringify({ alias, vibe, topics: selectedTopics, mode, note, entryChoice })
    );
    router.push(`/e/${eventSlug}/room`);
  }

  return (
    <AppShell>
      <MotionShell className="py-4">
        {step === "rules" ? (
          <>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Before you enter</p>
            <h1 className="mt-4 font-serif text-5xl leading-none">Keep the room easy.</h1>
            <p className="mt-4 leading-relaxed text-venue-muted">{communityRules}</p>
            <div className="mt-6 grid gap-3">
              {[
                { title: "Be kind", body: "Conversation should feel welcome and mutual.", icon: HeartHandshake },
                { title: "No pressure", body: "Ignoring a ping is always fine.", icon: Smile },
                { title: "Report anything weird", body: "Venue staff can review and remove people.", icon: ShieldAlert }
              ].map((rule) => {
                const Icon = rule.icon;
                return (
                  <div key={rule.title} className="glass-card flex gap-3 rounded-[26px] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                      <Icon size={19} />
                    </div>
                    <div>
                      <h2 className="font-semibold">{rule.title}</h2>
                      <p className="mt-1 text-sm text-venue-muted">{rule.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setAccepted((value) => !value)}
              className="tap-highlight mt-6 flex w-full items-center gap-3 rounded-[24px] border border-white/[0.08] bg-venue-soft p-4 text-left"
            >
              <span className={`grid h-8 w-8 place-items-center rounded-full ${accepted ? "bg-venue-amber text-venue-ink" : "border border-white/[0.16]"}`}>
                {accepted ? <Check size={18} /> : null}
              </span>
              <span className="text-sm leading-relaxed text-venue-muted">
                I am 18+, physically at this venue/event, and I agree to the community rules.
              </span>
            </button>
            <PrimaryButton className="mt-4 w-full" disabled={!accepted} onClick={() => setStep("entry")}>
              I&apos;m in the venue
            </PrimaryButton>
            <div className="mt-5">
              <SafetyNotice compact />
            </div>
          </>
        ) : step === "entry" ? (
          <>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Choose your comfort level</p>
            <h1 className="mt-4 font-serif text-5xl leading-none">How do you want to join tonight?</h1>
            <p className="mt-4 leading-relaxed text-venue-muted">
              You can change this later. Tables are the easiest start, pings are mutual, and browsing is always fine.
            </p>
            <div className="mt-6 grid gap-3">
              {guestEntryChoices.map((choice) => {
                const active = entryChoice === choice.label;
                const Icon = choice.label === "Join a table" ? UsersRound : choice.label === "Open to pings" ? MessageCircle : Eye;
                return (
                  <button
                    key={choice.label}
                    onClick={() => chooseEntry(choice.label)}
                    className={`tap-highlight flex items-start gap-4 rounded-[26px] border p-4 text-left ${
                      active ? "border-venue-amber/60 bg-venue-amber/12" : "border-white/[0.08] bg-venue-card"
                    }`}
                    type="button"
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${active ? "bg-venue-amber text-venue-ink" : "bg-white/[0.05] text-venue-amberSoft"}`}>
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block font-semibold text-venue-cream">{choice.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-venue-muted">{choice.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SecondaryButton onClick={() => setStep("entry")}>Back</SecondaryButton>
              <PrimaryButton onClick={() => setStep("profile")}>Continue</PrimaryButton>
            </div>
          </>
        ) : (
          <>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Temporary profile</p>
            <h1 className="mt-4 font-serif text-5xl leading-none">
              {entryChoice === "Just browsing" ? "Set a quiet signal." : "What signal are you sending tonight?"}
            </h1>
            <p className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4 text-sm text-venue-muted">
              Joining as: <span className="font-semibold text-venue-cream">{entryChoice}</span>
            </p>
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-venue-muted">Vibe</h2>
              <VibeSelector value={vibe} onChange={setVibe} />
            </section>
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-venue-muted">Topics</h2>
              <TopicChips topics={topics} selected={selectedTopics} onToggle={toggleTopic} />
            </section>
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-venue-muted">Mode</h2>
              <div className="grid gap-2">
                {modes.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setMode(item.label)}
                    className={`tap-highlight rounded-[22px] border p-4 text-left ${
                      mode === item.label ? "border-venue-amber/55 bg-venue-amber/12" : "border-white/[0.08] bg-venue-card"
                    }`}
                    type="button"
                  >
                    <span className="block font-semibold text-venue-cream">{item.label}</span>
                    <span className="mt-1 block text-sm text-venue-muted">{item.description}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="mt-6">
              <div className="mb-3 flex justify-between text-sm text-venue-muted">
                <span>Optional note</span>
                <span>{note.length}/80</span>
              </div>
              <textarea
                value={note}
                maxLength={80}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Here for the live set."
                className="min-h-24 w-full resize-none rounded-[24px] border border-white/[0.08] bg-venue-soft p-4 text-venue-cream outline-none placeholder:text-venue-dim focus:border-venue-amber/60"
              />
            </section>
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-venue-muted">Preview</h2>
              <SignalCard guest={preview} />
            </section>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SecondaryButton onClick={() => setStep("rules")}>Back</SecondaryButton>
              <PrimaryButton disabled={!selectedTopics.length} onClick={enterRoom}>
                Enter room
              </PrimaryButton>
            </div>
          </>
        )}
      </MotionShell>
    </AppShell>
  );
}
