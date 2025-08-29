"use client";

import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  async function refreshLogin() {
    if (!API) return setLoggedIn(false);
    try {
      const res = await fetch(`${API}/me`, { credentials: "include" });
      setLoggedIn(res.ok); // 200이면 로그인 상태
    } catch {
      setLoggedIn(false);
    }
  }

  // 1) 최초 로드 + 짧은 초기 폴링(3회, 800ms 간격) — setTimeout 사용 (id는 number)
  useEffect(() => {
    const timeouts: number[] = [];

    (async () => {
      await refreshLogin();

      // 3번 더 확인 (쿠키 생성 타이밍 보정)
      for (let i = 0; i < 3; i++) {
        const id = window.setTimeout(() => {
          void refreshLogin();
        }, 800 * (i + 1));
        timeouts.push(id);
      }
    })();

    return () => {
      // 예약된 timeout 정리
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
    };
  }, []);

  // 2) 라우트 변경 시 재확인
  useEffect(() => {
    void refreshLogin();
  }, [pathname]);

  // 3) 탭 포커스 시 재확인 (팝업 로그인 후 돌아왔을 때)
  useEffect(() => {
    const onFocus = () => { void refreshLogin(); };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <html lang="ko">
      <body className="min-h-dvh bg-white text-foreground antialiased">
        <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-3">
            {/* 좌측 로고 */}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-block h-3 w-3 rounded-sm bg-black" />
              PitchMate
            </Link>

            {/* 우측: 로그인 여부에 따라 Log in ↔ 아바타 */}
            <div className="flex items-center gap-3">
              {loggedIn ? (
                <UserCircle className="h-7 w-7 text-gray-700" />
              ) : (
                <Button asChild variant="secondary" size="sm" className="font-extrabold">
                  <Link href="/login">Log in</Link>
                </Button>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
