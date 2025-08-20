// components/chat/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MoreVertical, PlusSquare } from "lucide-react";
import {
  lsCreateConv,
  lsGetConvs,
  lsClearAllConvs,
  lsRenameConv,
  lsDeleteConv,
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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // kebab(…) 메뉴

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-chat-item]")) setOpenMenuId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    // 로그인 여부 확인 및 목록 로드
    const ok = hasAccessTokenCookie();
    setAuthed(ok);

    if (ok) {
      setItems(lsGetConvs());
    } else {
      // 비로그인: 전부 정리 후 목록 비우기
      lsClearAllConvs();
      setItems([]);
    }

    // 다른 탭에서 변경 동기화
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pm_conversations") {
        if (hasAccessTokenCookie()) setItems(lsGetConvs());
        else setItems([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const NewChat = () => {
    if (!hasAccessTokenCookie()) {
      // 비로그인: 임시 방으로 이동(저장 X)
      const tempId = "temp_" + Math.random().toString(36).slice(2, 8);
      router.push(`/chat/${tempId}`);
      return;
    }
    // 로그인: 정상 생성
    const id = lsCreateConv("New Chat");
    setItems(lsGetConvs());
    router.push(`/chat/${id}`);
  };

  const isActive = (id: string) => pathname?.endsWith(id);

  // ===== 메뉴 액션 =====
  const renameConv = (id: string, current?: string | null) => {
    const next = prompt("새 제목을 입력하세요.", current || "Untitled");
    if (!next) return;
    lsRenameConv(id, next);
    setItems(lsGetConvs());
    setOpenMenuId(null);
  };

  const deleteConv = (id: string) => {
    if (!confirm("이 대화를 삭제할까요?")) return;

    // 1) 삭제 수행
    lsDeleteConv(id);

    // 2) 최신 목록으로 상태 갱신
    const rest = lsGetConvs();
    setItems(rest);
    setOpenMenuId(null);

    // 3) 내가 보고 있던 대화를 지웠다면 안전한 곳으로 리다이렉트
    if (isActive(id)) {
      if (rest.length > 0) {
        router.replace(`/chat/${rest[0].id}`); // 남은 첫 채팅으로
      } else {
        router.replace("/conversations"); // 아무것도 없으면 목록으로
      }
    }
  };

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

      {/* New Chat / AI */}
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

      {/* 기존 채팅 목록 */}
      {authed ? (
        <div className="mt-3 space-y-1 overflow-y-auto">
          {items.map((c) => (
            <div
              key={c.id}
              data-chat-item
              className="group relative flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-muted"
            >
              {/* 좌측: 타이틀 링크 */}
              <Link
                href={`/chat/${c.id}`}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1 text-sm ${
                  isActive(c.id) ? "bg-[#e9eefc] font-medium" : ""
                }`}
              >
                <span className="text-lg">💬</span>
                <span className="line-clamp-1">{c.title || "Untitled"}</span>
              </Link>

              {/* 우측: 케밥 버튼 */}
              <button
                aria-label="메뉴"
                className="invisible rounded p-1 opacity-70 hover:opacity-100 group-hover:visible"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId((prev) => (prev === c.id ? null : c.id));
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {/* 드롭다운 메뉴 */}
              {openMenuId === c.id && (
                <div
                  className="absolute right-1 top-7 z-20 w-36 rounded-md border bg-white p-1 shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full rounded px-2 py-1 text-left text-sm hover:bg-muted"
                    onClick={() => renameConv(c.id, c.title)}
                  >
                    이름 바꾸기
                  </button>
                  <button
                    className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-muted"
                    onClick={() => deleteConv(c.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
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
