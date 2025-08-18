"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Composer({ onSend, onStop, streaming }:{
  onSend:(text:string)=>void; onStop:()=>void; streaming:boolean;
}){
  const [text, setText] = useState("");
  const send = ()=>{ if(!text.trim()) return; onSend(text); setText(""); };
  return (
    <div className="border-t p-3">
      <div className="flex gap-2">
        <input className="flex-1 rounded-md border px-3 py-2" placeholder="아이디어나 요청을 입력하세요…" value={text}
          onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=> e.key==="Enter" && !e.shiftKey && send()}/>
        <Button onClick={send} disabled={streaming}>보내기</Button>
        <Button variant="secondary" onClick={onStop} disabled={!streaming}>중단</Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">스트리밍 응답이 표시되는 동안 ‘중단’으로 즉시 멈출 수 있어요.</p>
    </div>
  );
}
