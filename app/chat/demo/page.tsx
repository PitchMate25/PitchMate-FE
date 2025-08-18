"use client";
import ChatSidebar from "@/components/chat/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatDemoPage() {
  const [input, setInput] = useState("");

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
      <ChatSidebar />

      <section className="flex min-h-[540px] flex-1 flex-col rounded-lg border bg-white p-5">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-bold">Pitch Mate</h1>
        </div>

        <p className="mx-auto mb-4 max-w-[56ch] text-center text-sm text-muted-foreground">
          Start a new chat to begin crafting your business plan with AI-powered guidance.
          The AI will reference previous inputs to provide relevant examples and personalized assistance.
        </p>

        <div className="flex-1" />

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
