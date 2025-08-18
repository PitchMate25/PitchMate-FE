"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lsGetConvs, lsCreateConv } from "@/lib/api/mock";

/**
 * /conversations 는 예전 데모 화면을 없애고
 * 들어오자마자 가장 최근 대화방으로 보내거나,
 * 없으면 새 대화방을 만들어 그 방으로 이동시킵니다.
 */
export default function ConversationsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      let list = lsGetConvs(); // [{id,title,createdAt,updatedAt}, ...]
      let targetId = list?.[0]?.id;

      // 대화가 하나도 없으면 새로 만들기
      if (!targetId) {
        targetId = lsCreateConv("New Chat");
        list = lsGetConvs();
      }

      router.replace(`/chat/${targetId}`);
    } catch {
      // 로컬스토리지가 막힌 환경 대비: 최소한 데모 방으로
      router.replace(`/chat/demo`);
    }
  }, [router]);

  // 잠깐 보이는 로딩
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
      이동 중…
    </div>
  );
}
