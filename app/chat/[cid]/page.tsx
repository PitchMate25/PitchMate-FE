// app/chat/[cid]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/chat/Sidebar";
import { lsGetMsgs, lsPushMsg, type ChatMsg } from "@/lib/api/mock";
import { isLoggedIn } from "@/lib/auth/client";
import { ArrowUp } from "lucide-react";

export default function ChatRoomPage() {
  const { cid } = useParams<{ cid: string }>();
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null); // null: 체크 중
  const inputRef = useRef<HTMLInputElement>(null);

  // 로그인 여부 + 메시지 로드
  useEffect(() => {
    (async () => {
      const ok = await isLoggedIn();
      setAuthed(ok);

      if (!cid) return;
      // 로그인 상태에서만 저장된 기록 로드
      setMsgs(ok ? lsGetMsgs(cid) : []);
    })();
  }, [cid]);

  const send = async () => {
    if (!cid || !input.trim()) return;
    const text = input.trim();
    setInput("");

    const ok = authed ?? (await isLoggedIn());
    // 로그인 O → localStorage에 저장 (목업)
    if (ok) {
      lsPushMsg(cid, { role: "user", content: text });
      setMsgs(lsGetMsgs(cid));

      setTimeout(() => {
        lsPushMsg(cid, { role: "ai", content: `(${cid}) 응답: ${text}` });
        setMsgs(lsGetMsgs(cid));
      }, 500);
    } else {
      // 로그인 X → 화면에만 표시(저장 안 함)
      setMsgs((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          role: "user",
          content: text,
          createdAt: new Date().toISOString(),
        },
      ]);
      setTimeout(() => {
        setMsgs((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            role: "ai",
            content: `(${cid}) 응답: ${text}`,
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 500);
    }

    inputRef.current?.focus();
  };

  return (
    <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
      <ChatSidebar />

      {/* 세로 플렉스 + 하단 sticky 입력창 */}
      <section className="flex-1 rounded-lg border bg-white flex flex-col">
        {/* 헤더 */}
        <div className="border-b p-4 text-center">
          <h2 className="text-lg font-semibold">Pitch Mate</h2>
          <p className="text-sm text-muted-foreground">
            Start a new chat to begin crafting your business plan with
            AI-powered guidance. The AI will reference previous inputs to
            provide relevant examples and personalized assistance.
          </p>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "ml-auto bg-[#e9eefc]" : "bg-muted"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>

        {/* 입력창: 화면 하단 고정 */}
        <div className="sticky bottom-0 z-10 bg-background p-3">
          <div className="flex items-center rounded-md bg-secondary px-2 py-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Enter"
              className="flex-1 bg-transparent text-sm focus:outline-none text-foreground"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
