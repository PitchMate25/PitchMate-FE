"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusSquare } from "lucide-react"; // 아이콘
import {
  lsCreateConv,
  lsGetConvs,
  lsClearAllConvs,
  type ConvSummary,
} from "@/lib/api/mock";

function hasAccessTokenCookie() {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)accessToken=/.test(document.cookie);
}

export default function ChatSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<ConvSummary[]>([]);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // 로그인 여부 판단(임시: cookieAuth 기반)
    const ok = hasAccessTokenCookie();
    setAuthed(ok);

    if (ok) {
      setItems(lsGetConvs());
    } else {
      // 🔴 비로그인 → 로컬 보관함/메시지 전부 삭제하고 목록 비우기
      lsClearAllConvs();
      setItems([]);
    }

    // storage 변경 시(다른 탭 등) 동기화
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pm_conversations") {
        if (hasAccessTokenCookie()) {
          setItems(lsGetConvs());
        } else {
          setItems([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const NewChat = () => {
    // 비로그인: 저장은 하지 않지만, 임시 방으로 이동하여 체험만 가능(새로고침 시 기록 없음)
    if (!hasAccessTokenCookie()) {
      const tempId = "temp_" + Math.random().toString(36).slice(2, 8);
      router.push(`/chat/${tempId}`);
      return;
    }
    // 로그인: 정상적으로 저장되는 신규 대화 생성
    const id = lsCreateConv("New Chat");
    setItems(lsGetConvs());
    router.push(`/chat/${id}`);
  };

  const isActive = (id: string) => pathname?.endsWith(id);

  return (
    <aside
      className="
        w-[220px] shrink-0 rounded-lg border bg-white p-3
        flex h-[calc(100vh-64px)] flex-col
      "
    >
      {/* 상단 */}
      <div className="px-2 pb-2">
        <div className="text-[13px] font-semibold">Business Plan AI</div>
      </div>

      {/* New Chat / AI — 얇은 라인 버튼 + 아이콘 */}
      <div className="space-y-2">
        <button
          onClick={NewChat}
          className="
            flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm
            hover:bg-muted
          "
        >
          <PlusSquare className="h-4 w-4" />
          New Chat
        </button>

        <Link
          href="/conversations"
          className="
            flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm
            hover:bg-muted
          "
        >
          <PlusSquare className="h-4 w-4" />
          AI
        </Link>
      </div>

      {/* 기존 채팅 목록 (로그인시에만 표시) */}
      {authed ? (
        <div className="mt-3 space-y-1 overflow-y-auto">
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted ${
                isActive(c.id) ? "bg-[#e9eefc] font-medium" : ""
              }`}
            >
              <span className="text-lg">💬</span>
              <span className="line-clamp-1">{c.title || "Untitled"}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-3 px-2 text-xs text-muted-foreground">
          로그인하면 대화 기록이 저장됩니다.
        </div>
      )}

      {/* 하단 고정 */}
      <div className="mt-auto space-y-2">
        <Link
          href="/plan/roadmap"
          className="block w-full rounded-md bg-[#e9eefc] px-3 py-2 text-center text-sm"
        >
          사업계획서 로드맵 확인
        </Link>
        <Link
          href="/plan/preview"
          className="block w-full rounded-md border px-3 py-2 text-center text-sm"
        >
          사업계획서 초안 확인
        </Link>
      </div>
    </aside>
  );
}
