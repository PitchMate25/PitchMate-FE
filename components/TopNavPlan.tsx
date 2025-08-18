"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNavPlan() {
  const pathname = usePathname();

  // ✅ /plan 아래 모든 경로(roadmap, preview 등)에서 노출
  if (!pathname?.startsWith("/plan")) return null;

  return (
    <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
      <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
      <Link href="#" className="hover:text-foreground">Plans</Link>
      <Link href="#" className="hover:text-foreground">Templates</Link>
      <Link href="#" className="hover:text-foreground">Resources</Link>
    </nav>
  );
}
