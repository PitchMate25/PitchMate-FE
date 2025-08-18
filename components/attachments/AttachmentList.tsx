"use client";
import type { Attachment } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Attachments } from "@/lib/api/client";

export function AttachmentList({ items, onRefresh }:{ items: Attachment[]; onRefresh?:()=>void }){
  if (!items.length) return <div className="p-3 text-sm text-muted-foreground">첨부가 없습니다.</div>;
  return (
    <div className="space-y-2 p-3">
      {items.map(a=>(
        <div key={a.id} className="flex items-center justify-between rounded border p-2">
          <div className="truncate">
            <div className="truncate text-sm font-medium">{a.name}</div>
            <div className="text-xs text-muted-foreground">{a.format.toUpperCase()} · {(a.size/1024).toFixed(1)} KB</div>
          </div>
          <Button size="sm" onClick={()=> Attachments.download(a.conversationId, a.id)}>다운로드</Button>
        </div>
      ))}
      {onRefresh && <div className="pt-2"><Button variant="ghost" size="sm" onClick={onRefresh}>새로고침</Button></div>}
    </div>
  );
}
