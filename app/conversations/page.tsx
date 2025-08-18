"use client";
import ChatSidebar from "@/components/chat/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConversationsPage() {
  const [input, setInput] = useState("");

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
      {/* 좌측: 와이어프레임 사이드바 */}
      <ChatSidebar />

      {/* 본문: 중앙 타이틀/설명 + 하단 입력 */}
      <section className="flex min-h-[540px] flex-1 flex-col rounded-lg border bg-white p-5">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-bold">Pitch Mate</h1>
        </div>

        <p className="mx-auto mb-4 max-w-[56ch] text-center text-sm text-muted-foreground">
          Start a new chat to begin crafting your business plan with AI-powered guidance.
          The AI will reference previous inputs to provide relevant examples and personalized assistance.
        </p>

        {/* (메시지 리스트 자리) */}
        <div className="flex-1" />

        {/* 입력 + Enter */}
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter"
            className="h-10 flex-1 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-[#c7d2fe]"
          />
          <Button
            onClick={() => {
              if (!input.trim()) return;
              alert(`(데모) 전송: ${input}`);
              setInput("");
            }}
            className="h-10 rounded-md px-5"
          >
            Enter
          </Button>
        </div>
      </section>
    </div>
  );
}
