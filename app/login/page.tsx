"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { isLoggedIn } from "@/lib/auth/client";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "";
const USE_MOCK =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "1";

async function waitUntilLoggedIn(timeoutMs = 90_000, intervalMs = 800) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const ok = await isLoggedIn(); // /me 200이면 로그인됨
    if (ok) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

export default function LoginPage() {
  const router = useRouter();

  // 이미 로그인 상태면 바로 /conversations 로 이동
  useEffect(() => {
    (async () => {
      const ok = await isLoggedIn();
      if (ok) router.replace("/conversations");
    })();
  }, [router]);

  const handleKakaoLogin = async () => {
    if (USE_MOCK) {
      alert("체험 모드입니다. 아래 버튼으로 진행하세요.");
      return;
    }

    const loginUrl = `${API}/auth/kakao/login`;

    // 팝업으로 로그인 진행
    const popup = window.open(loginUrl, "_blank", "width=480,height=700");
    if (!popup) {
      window.location.href = loginUrl; // 팝업 차단 시 fallback
      return;
    }

    // 로그인 완료될 때까지 대기
    const ok = await waitUntilLoggedIn();
    popup.close();
    if (ok) router.replace("/conversations");
    else alert("로그인이 확인되지 않았습니다. 다시 시도해 주세요.");
  };

  return (
    <div className="flex min-h-[calc(100dvh-48px)] items-start justify-center bg-white pt-14">
      <div className="w-full max-w-md p-0">
        <h1 className="mb-6 text-center text-2xl font-extrabold">시작하기</h1>

        {/* 카카오 로그인 */}
        <Button
          variant="secondary"
          onClick={handleKakaoLogin}
          className="mb-3 w-full bg-[#60A5FA] text-sm font-bold text-white hover:bg-[#60A5FA] hover:text-white"
        >
          Continue with Kakao
        </Button>

        {/* 체험 모드 */}
        <Button
          variant="secondary"
          className="w-full rounded-md bg-gray-100 py-2 text-sm font-bold"
          onClick={() => router.push("/conversations")}
        >
          로그인 없이 체험하기
        </Button>

        <p className="mt-4 text-center text-xs text-blue-900 whitespace-nowrap -translate-x-4">
          계속 진행하시면 서비스 및 이용약관 및 개인정보 처리방침에 동의하신 것으로 간주합니다.
        </p>
      </div>
    </div>
  );
}
