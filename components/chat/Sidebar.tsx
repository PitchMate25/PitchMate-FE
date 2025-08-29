// components/chat/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PlusSquare, Hexagon, MessageCircle } from "lucide-react";
import {
  lsCreateConv,
  lsGetConvs,
  // lsClearAllConvs,  // ⛔ 더 이상 사용하지 않음: 비로그인도 저장 유지
  lsRenameConv,
  lsDeleteConv,
  type ConvSummary,
} from "@/lib/api/mock";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { isLoggedIn } from "@/lib/auth/client";

export default function ChatSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<ConvSummary[]>([]);
  const [authed, setAuthed] = useState<boolean | null>(null); // null = 체크 중

  // 현재 경로 마지막 세그먼트 기준 활성화 판단
  const activeId = useMemo(() => {
    if (!pathname) return null;
    const seg = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
    return seg[seg.length - 1] ?? null;
  }, [pathname]);

  useEffect(() => {
    // 1) 로그인 상태 파악(배지/문구에만 사용)
    // 2) 로컬 스토리지의 기존 대화 목록은 로그인 여부와 무관하게 항상 로드
    (async () => {
      try {
        const ok = await isLoggedIn();
        setAuthed(ok);
      } catch {
        setAuthed(false);
      } finally {
        setItems(lsGetConvs());
      }
    })();

    // 다른 탭 동기화: 항상 로컬 목록만 갱신
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pm_conversations") {
        setItems(lsGetConvs());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const NewChat = () => {
    // 로그인 여부와 무관하게 로컬에 생성/저장
    const id = lsCreateConv("새 채팅");
    setItems(lsGetConvs());
    router.push(`/chat/${id}`);
  };

  const renameConv = (id: string, current?: string | null) => {
    const next = prompt("새 제목을 입력하세요.", current || "Untitled");
    if (!next) return;
    lsRenameConv(id, next.trim());
    setItems(lsGetConvs());
  };

  const deleteConv = (id: string) => {
    if (!confirm("이 대화를 삭제할까요?")) return;
    lsDeleteConv(id);
    const rest = lsGetConvs();
    setItems(rest);

    if (activeId === id) {
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
        {/* 로그인/비로그인 배지(기능 차이는 없음, 안내용) */}
        {authed === true && (
          <div className="mt-1 text-[11px] text-green-600">로그인됨 · 클라우드 동기화 예정</div>
        )}
        {authed === false && (
          <div className="mt-1 text-[11px] text-gray-500">
            비로그인 · 이 기기(브라우저) 로컬에 저장됩니다
          </div>
        )}
        {authed === null && (
          <div className="mt-1 text-[11px] text-gray-400">로그인 상태 확인 중…</div>
        )}
      </div>

      {/* New Chat / AI */}
      <div className="space-y-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-start"
          onClick={NewChat}
          title="새 채팅 시작"
        >
          <PlusSquare className="h-4 w-4" />
          새 채팅
        </Button>

        <Button asChild variant="secondary" size="sm" className="w-full justify-start">
          <Link href="/conversations" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center text-black">
              <Hexagon className="h-5 w-5" strokeWidth={2} />
            </span>
            AI
          </Link>
        </Button>
      </div>

      {/* 대화 목록: 로그인 여부와 무관하게 항상 표시/관리 가능 */}
      <div className="mt-3 space-y-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-2 py-1 text-xs text-muted-foreground">아직 대화가 없습니다.</div>
        ) : (
          items.map((c) => {
            const active = activeId === c.id;
            return (
              <div
                key={c.id}
                className={`group relative flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-muted ${
                  active ? "bg-[#e9eefc] font-medium" : ""
                }`}
              >
                <Link
                  href={`/chat/${c.id}`}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1 text-sm"
                >
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
          })
        )}
      </div>

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
