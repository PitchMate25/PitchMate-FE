"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lsCreateConv } from "@/lib/api/mock";

/**
 * /chat/demo
 * 새 대화방을 로컬스토리지에 생성하고 /chat/{id}로 즉시 이동합니다.
 * (UI는 표시하지 않는 리다이렉트 전용 페이지)
 */
export default function DemoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const id = lsCreateConv("New Chat");
    router.replace(`/chat/${id}`);
  }, [router]);

  return (
    <div className="p-6 text-sm text-muted-foreground">
      Creating a demo chat…
    </div>
  );
}
