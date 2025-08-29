"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lsGetConvs } from "@/lib/api/mock";

export default function ConversationsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isCreated = localStorage.getItem("DemoRedirectPage");

      // 새 채팅 생성 로직은 이미 생성한 경우 실행하지 않음
      // 따라서 새 채팅 만들지 않고 기존방 유지

      // 기존 채팅방 목록을 불러옴
      const list = lsGetConvs();

      // 첫번째 채팅방으로 리다이렉트
      const targetId = list?.[0]?.id;

      if (targetId) {
        router.replace(`/chat/${targetId}`);
      } else {
        // 예외 상황: 채팅방이 아예 없으면 데모 화면 이동
        router.replace(`/chat/demo`);
      }
    } catch {
      router.replace(`/chat/demo`);
    }
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
      이동 중…
    </div>
  );
}
