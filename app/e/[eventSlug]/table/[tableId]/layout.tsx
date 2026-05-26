import { demoTables } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoTables.map((table) => ({ tableId: table.id }));
}

export default function TableLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
