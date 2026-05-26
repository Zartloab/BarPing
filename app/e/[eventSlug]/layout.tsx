import { demoEvent } from "@/lib/demo-data";

export function generateStaticParams() {
  return [{ eventSlug: demoEvent.slug }];
}

export default function EventLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
