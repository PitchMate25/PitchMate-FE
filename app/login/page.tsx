"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "";
const USE_MOCK =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "1";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100dvh-48px)] items-center justify-center bg-[#F7F8FA]">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-extrabold">시작하기</h1>

        {/* 서버가 있을 때만 활성화 (목 모드면 비활성 + 안내) */}
        <Button
          asChild={!USE_MOCK}
          disabled={USE_MOCK}
          onClick={() =>
            USE_MOCK && alert("체험 모드입니다. 아래 버튼으로 진행하세요.")
          }
          className="mb-3 w-full bg-[#4F7DF2] hover:bg-[#3f69d6]"
        >
          <a href={`${API}/auth/google`}>Continue with Google</a>
        </Button>

        {/* 체험 모드 진입(목/실 공통 제공) */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.push("/conversations")}
        >
          로그인 없이 체험하기
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a className="underline" href="/terms">Terms of Service</a> and{" "}
          <a className="underline" href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
