"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { demoEvent } from "@/lib/demo-data";

export default function TableRedirectPage() {
  const router = useRouter();
  const params = useParams<{ eventSlug: string; tableId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const tableId = params?.tableId ?? "table-music";

  useEffect(() => {
    router.replace(`/e/${eventSlug}/circle/${tableId}`);
  }, [eventSlug, router, tableId]);

  return (
    <main className="guest-stage grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <p className="font-display text-4xl">Opening Circle...</p>
        <a className="mt-5 block text-sm text-[var(--secondary)]" href={`/e/${eventSlug}/circle/${tableId}`}>
          Continue
        </a>
      </div>
    </main>
  );
}
