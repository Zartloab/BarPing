"use client";

import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryButton, PrimaryLink, SecondaryLink } from "@/components/ui/buttons";
import { createClient } from "@/lib/supabase/client";

export default function VenueLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();

  async function sendMagicLink() {
    setIsSending(true);
    setStatus("");

    if (!supabase) {
      window.localStorage.setItem("barping:v4:demo-admin", "true");
      setStatus("Demo access enabled. Continue to the dashboard.");
      setIsSending(false);
      return;
    }

    const redirectTo = new URL("/BarPing/venue/dashboard", window.location.origin).toString();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });

    setStatus(error ? error.message : "Magic link sent. Check your email.");
    setIsSending(false);
  }

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col justify-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
          <ShieldCheck size={22} />
        </div>
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-venue-amberSoft">Venue access</p>
        <h1 className="mt-4 font-serif text-5xl leading-none">Run Social Mode tonight.</h1>
        <p className="mt-5 leading-relaxed text-venue-muted">
          Staff sign in with a magic link. In demo mode, this unlocks the local pilot dashboard on this browser.
        </p>

        <label className="mt-8 block text-sm text-venue-muted">
          Venue email
          <div className="mt-2 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 focus-within:border-venue-amber/60">
            <Mail size={17} />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-10 flex-1 bg-transparent text-venue-cream outline-none"
              placeholder="manager@venue.com"
              type="email"
            />
          </div>
        </label>

        <div className="mt-5 grid gap-3">
          <PrimaryButton disabled={isSending || (!!supabase && !email.includes("@"))} onClick={sendMagicLink}>
            {supabase ? "Send magic link" : "Enable demo access"}
          </PrimaryButton>
          <PrimaryLink href="/venue/dashboard">Continue to dashboard</PrimaryLink>
          <SecondaryLink href="/">Back to guest entry</SecondaryLink>
        </div>
        {status ? <p className="mt-4 rounded-2xl bg-venue-amber/10 p-3 text-sm text-venue-amberSoft">{status}</p> : null}
      </MotionShell>
    </AppShell>
  );
}
