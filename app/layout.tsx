import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import TopNavPlan from "@/components/TopNavPlan"; // ⬅️ 추가

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-dvh bg-[#F7F8FA] text-foreground antialiased">
        <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-block h-3 w-3 rounded-sm bg-black" />
              PitchMate
            </Link>

            {/* 우측: /plan/preview일 때만 네비 보임 */}
            <div className="flex items-center gap-3">
              <TopNavPlan />
              <Button asChild variant="secondary" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
