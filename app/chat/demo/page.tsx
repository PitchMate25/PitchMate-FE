"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lsGetConvs, lsCreateConv } from "@/lib/api/mock";

export default function DemoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const isCreated = localStorage.getItem("demoChatsCreated");

    if (!isCreated) {
      // 기본 채팅 1~5 생성 (예시)
      for (let i = 1; i <= 5; i++) {
        lsCreateConv(`채팅 ${i}`);
      }
      localStorage.setItem("demoChatsCreated", "true");
    }

    const convs = lsGetConvs();
    const firstChat = convs?.[0];

    if (firstChat) {
      router.replace(`/chat/${firstChat.id}`);
    } else {
      // 예외적으로 채팅방이 아예 없으면 새로 생성 후 이동
      for (let i = 1; i <= 5; i++) {
        lsCreateConv(`채팅 ${i}`);
      }
      const id = "채팅 4";
      router.replace(`/chat/${id}`);
    }
  }, [router]);

  return (
    <div className="p-6 text-sm text-muted-foreground">
      Creating demo chats…
    </div>
  );
}
