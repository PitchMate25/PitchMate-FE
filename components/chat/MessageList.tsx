"use client";
import type { Message } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function MessageList({ items }: { items: Message[] }){
  return (
    <div className="flex max-h-[70dvh] flex-col gap-3 overflow-y-auto p-4">
      {items.map(m=>(
        <div key={m.id} className={cn(
          "w-fit max-w-[90%] rounded-lg px-3 py-2 text-sm shadow-sm",
          m.role==="user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {m.content}
        </div>
      ))}
      {!items.length && <div className="p-4 text-sm text-muted-foreground">메시지를 입력해 대화를 시작하세요.</div>}
    </div>
  );
}
