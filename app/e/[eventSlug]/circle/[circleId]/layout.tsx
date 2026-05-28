import { demoTables } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoTables.map((circle) => ({ circleId: circle.id }));
}

export default function CircleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
