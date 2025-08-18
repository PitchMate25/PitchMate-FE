"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const chats = ["Chat 1", "Chat 2", "Chat 3", "Chat 4"];

export default function ChatSidebar() {
  const pathname = usePathname();

  const NavBtn = ({
    href,
    children,
    active,
  }: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
        active ? "bg-[#e9eefc] font-medium" : "hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <aside className="w-[220px] shrink-0 rounded-lg border bg-white p-3">
      <div className="px-2 pb-2">
        <div className="text-[13px] font-semibold">Business Plan AI</div>
      </div>

      <div className="space-y-1">
        <NavBtn href="/chat/demo" active={pathname?.startsWith("/chat/demo")}>
          <span className="inline-block h-2 w-2 rounded-sm bg-black" />
          New Chat
        </NavBtn>
        <NavBtn href="/conversations">AI</NavBtn>
      </div>

      <div className="mt-3 space-y-1">
        {chats.map((c, i) => (
          <NavBtn key={i} href={`/chat/demo?c=${i}`}>
            <span className="text-lg">💬</span> {c}
          </NavBtn>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {/* 로드맵으로 이동 */}
        <Link
            href="/plan/roadmap"
            className="block w-full rounded-md bg-[#e9eefc] px-3 py-2 text-center text-sm hover:bg-[#dbe6ff]"
        >
        사업계획서 템플릿 확인
        </Link>

        <button className="w-full rounded-md border px-3 py-2 text-sm">
            Settings
        </button>
        </div>
    </aside>
  );
}
