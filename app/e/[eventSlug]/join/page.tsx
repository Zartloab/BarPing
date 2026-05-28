"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { demoEvent } from "@/lib/demo-data";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;

  useEffect(() => {
    router.replace(`/e/${eventSlug}`);
  }, [eventSlug, router]);

  return (
    <main className="guest-stage grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <p className="font-display text-4xl">Opening the room...</p>
        <a className="mt-5 block text-sm text-[var(--secondary)]" href={`/e/${eventSlug}`}>
          Continue
        </a>
      </div>
    </main>
  );
}
