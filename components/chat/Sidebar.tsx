// components/chat/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MoreVertical, PlusSquare, Hexagon, Circle, MessageCircle } from "lucide-react";
import {
  lsCreateConv,
  lsGetConvs,
  lsClearAllConvs,
  lsRenameConv,
  lsDeleteConv,
  type ConvSummary,
} from "@/lib/api/mock";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { isLoggedIn } from "@/lib/auth/client"; // ✅ 추가: /me 기반 로그인 체크

// (기존) hasAccessTokenCookie는 더 이상 사용하지 않음
function hasAccessTokenCookie() {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)accessToken=/.test(document.cookie);
}

export default function ChatSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<ConvSummary[]>([]);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // 메뉴 외부 클릭 시 닫기 (그대로)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-chat-item]")) setOpenMenuId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    // ✅ 로그인 여부를 /me로 판단 → 로그인 시 안내 문구 즉시 사라짐
    (async () => {
      const ok = await isLoggedIn();
      setAuthed(ok);

      if (ok) {
        setItems(lsGetConvs());
      } else {
        lsClearAllConvs();
        setItems([]);
      }
    })();

    // 다른 탭에서 변경 동기화 시에도 /me로 재판단
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pm_conversations") {
        (async () => {
          const ok = await isLoggedIn();
          setAuthed(ok);
          setItems(ok ? lsGetConvs() : []);
        })();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const NewChat = () => {
    // ✅ 쿠키 체크 대신 현재 authed 상태 사용
    if (!authed) {
      const tempId = "temp_" + Math.random().toString(36).slice(2, 8);
      router.push(`/chat/${tempId}`);
      return;
    }
    const id = lsCreateConv("새 채팅");
    setItems(lsGetConvs());
    router.push(`/chat/${id}`);
  };

  const isActive = (id: string) => pathname?.endsWith(id);

  const renameConv = (id: string, current?: string | null) => {
    const next = prompt("새 제목을 입력하세요.", current || "Untitled");
    if (!next) return;
    lsRenameConv(id, next);
    setItems(lsGetConvs());
    setOpenMenuId(null);
  };

  const deleteConv = (id: string) => {
    if (!confirm("이 대화를 삭제할까요?")) return;
    lsDeleteConv(id);
    const rest = lsGetConvs();
    setItems(rest);
    setOpenMenuId(null);
    if (isActive(id)) {
      if (rest.length > 0) {
        router.replace(`/chat/${rest[0].id}`);
      } else {
        router.replace("/conversations");
      }
    }
  };

  return (
    <aside className="w-[220px] shrink-0 rounded-lg border bg-white p-3 flex h-[calc(100vh-64px)] flex-col">
      {/* 상단 */}
      <div className="px-2 pb-2">
        <div className="text-[13px] font-semibold">Business Plan AI</div>
      </div>

      {/* New Chat / AI */}
      <div className="space-y-2">
        <Button variant="secondary" size="sm" className="w-full justify-start" onClick={NewChat}>
          <PlusSquare className="h-4 w-4" />
          새 채팅
        </Button>

        <Button asChild variant="secondary" size="sm" className="w-full justify-start">
          <Link href="/conversations" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center text-black">
              <Hexagon className="h-5 w-5" strokeWidth={2} fill="none" />
            </span>
            AI
          </Link>
        </Button>
      </div>

      {/* 기존 채팅 목록 / 안내문구 */}
      {authed ? (
        <div className="mt-3 space-y-1 overflow-y-auto">
          {items.map((c) => {
            const active = isActive(c.id);
            return (
              <div
                key={c.id}
                data-chat-item
                className={`group relative flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-muted ${
                  active ? "bg-[#e9eefc] font-medium" : ""
                }`}
              >
                <Link href={`/chat/${c.id}`} className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1 text-sm">
                  <MessageCircle className="h-4 w-4 text-black" />
                  <span className="line-clamp-1">{c.title || "Untitled"}</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    aria-label="이름 바꾸기"
                    className="rounded px-1.5 py-0.5 hover:bg-muted"
                    onClick={() => renameConv(c.id, c.title)}
                    title="이름 바꾸기"
                  >
                    <Pencil className="h-4 w-4 text-black" />
                  </button>
                  <button
                    aria-label="삭제"
                    className="rounded px-1.5 py-0.5 hover:bg-muted"
                    onClick={() => deleteConv(c.id)}
                    title="삭제"
                  >
                    <Trash2 className="h-4 w-4 text-black" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 px-2 text-xs text-muted-foreground">
          로그인하면 대화 기록이 저장됩니다.
        </div>
      )}

      {/* 하단 고정 */}
      <div className="mt-auto space-y-2">
        <Button asChild variant="secondary" size="sm" className="w-full">
          <Link href="/plan/roadmap">사업계획서 로드맵 확인</Link>
        </Button>
        <Button asChild size="sm" className="w-full bg-[#60A5FA] text-white hover:bg-[#60A5FA] hover:text-white">
          <Link href="/plan/preview">사업계획서 초안 확인</Link>
        </Button>
      </div>
    </aside>
  );
}
