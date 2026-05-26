export function generateStaticParams() {
  return [{ chatId: "demo-chat" }];
}

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
