import { demoEvent } from "@/lib/demo-data";

export function generateStaticParams() {
  return [{ eventId: demoEvent.id }];
}

export default function VenueEventLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
