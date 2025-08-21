"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "";
const USE_MOCK =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "1";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100dvh-48px)] items-start justify-center bg-white pt-14">
      <div className="w-full max-w-md p-0">
        <h1 className="mb-6 text-center text-2xl font-extrabold">시작하기</h1>

        {/* 서버가 있을 때만 활성화 (목 모드면 비활성 + 안내) */}
        <Button
          variant="secondary"
          asChild={!USE_MOCK}
          onClick={() =>
            USE_MOCK && alert("체험 모드입니다. 아래 버튼으로 진행하세요.")
          }
          className="mb-3 w-full bg-[#60A5FA] text-sm font-bold text-white hover:bg-[#60A5FA] hover:text-white"
        >
          <a href={`${API}/auth/google`}>Continue with Kakao</a>
        </Button>

        {/* 체험 모드 진입(목/실 공통 제공) */}
        <Button
          variant="secondary"
          className="w-full rounded-md bg-gray-100 py-2 text-sm font-bold"
          onClick={() => router.push("/conversations")}
        >
          로그인 없이 체험하기
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground whitespace-nowrap -translate-x-4">
          계속 진행하시면 서비스 및 이용약관 및 개인정보 처리방침에 동의하신 것으로 간주합니다.{" "}
        </p>
      </div>
    </div>
  );
}
