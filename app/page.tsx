"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Msg = { role: "user" | "assistant"; content: string };

async function postStream(body: any, onChunk: (t: string) => void) {
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) throw new Error("API error");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const frames = buf.split("\n\n");
    buf = frames.pop() || "";
    for (const f of frames) {
      if (!f.startsWith("data:")) continue;
      const data = f.replace(/^data:\s?/, "");
      if (data === "[DONE]") return;
      onChunk(data + "\n");
    }
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "여행 관련해서 무엇을 만들고 싶나요?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<null | "chat" | "plan">(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function downloadMarkdown(text: string) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `사업계획서_${new Date()
      .toISOString()
      .slice(0, 19)
      .replaceAll(":", "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ]);
    setLoading("chat");
    try {
      await postStream({ mode: "idea", userInput: text }, (chunk) => {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: (copy[copy.length - 1].content || "") + chunk,
          };
          return copy;
        });
      });
    } finally {
      setLoading(null);
    }
  }

  // 완성본(템플릿) 생성
  async function generatePlan() {
    const context = messages
      .map((m) => (m.role === "user" ? `U: ${m.content}` : `A: ${m.content}`))
      .join("\n")
      .slice(0, 6000);

    setMessages((m) => [
      ...m,
      { role: "assistant", content: "사업계획서 생성 중...\n" },
    ]);
    setLoading("plan");
    try {
      await postStream({ mode: "plan", context }, (chunk) => {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: (copy[copy.length - 1].content || "") + chunk,
          };
          return copy;
        });
      });
    } finally {
      setLoading(null);
    }
  }

  // 마지막 "완성본"만 다운로드 대상으로 인식
  const lastPlan = [...messages]
    .reverse()
    .filter((m) => m.role === "assistant")
    .map((m) => m.content.trim())
    .find((c) =>
      /(##\s*1\.\s*사업 개요)|(^#\s*AI\s*사업계획서)/m.test(c)
    );

  return (
    <div className="mx-auto max-w-3xl min-h-screen px-4 py-6">
      {/* Header (부제 제거) */}
      <header className="mb-4">
        <h1 className="text-xl font-bold">AI 사업계획서 생성</h1>
      </header>

      {/* Chat card */}
      <section className="rounded-2xl border bg-white shadow-sm">
        {/* Messages */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-gray-50 rounded-t-2xl">
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[80%] rounded-2xl px-4 py-2 shadow-sm bg-black text-white"
                    : "mr-auto max-w-[80%] rounded-2xl px-4 py-2 shadow-sm border bg-white"
                }
              >
                {m.role === "assistant" ? (
                  <div className="markdown-body text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-sm">
                    {m.content}
                  </pre>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </div>

        {/* Composer */}
        <div className="p-4 sm:p-6 rounded-b-2xl bg-white border-t">
          <div className="flex items-end gap-2">
            <textarea
              className="flex-1 h-24 resize-none rounded-xl border p-3 text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              placeholder="질문이나 아이디어를 입력하고 Enter(또는 보내기) ▶"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <Button onClick={sendMessage} disabled={loading !== null} className="h-10">
              보내기
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button onClick={generatePlan} disabled={loading !== null}>
              {loading === "plan" ? "사업계획서 생성 중..." : "사업계획서 생성"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => lastPlan && downloadMarkdown(lastPlan)}
              disabled={!lastPlan || loading !== null}
            >
              다운로드(.md)
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setMessages([{ role: "assistant", content: "새 대화를 시작합니다." }])
              }
              disabled={loading !== null}
            >
              새 대화
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
