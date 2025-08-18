"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PlanCard = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

const plans: PlanCard[] = [
  {
    id: "conv_demo_001",
    title: "Tech Startup Business Plan",
    desc: "A comprehensive plan for a tech startup focusing on AI solutions.",
    image:
      // 일러스트 느낌의 깔끔한 썸네일
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "conv_demo_002",
    title: "Retail Business Plan",
    desc: "A detailed plan for a retail business specializing in sustainable products.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "conv_demo_003",
    title: "Consulting Business Plan",
    desc: "A strategic plan for a consulting firm offering business development services.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-[240px_1fr] gap-8 px-6 py-10">
      {/* Sidebar */}
      <aside className="h-fit rounded-2xl border bg-white p-4 shadow-sm">
        <div className="px-3 pb-2">
          <div className="text-[13px] font-semibold text-muted-foreground">PlanCraft</div>
          <div className="text-[11px] text-muted-foreground">
            Your AI-powered business plan assistant
          </div>
        </div>
        <nav className="mt-3 space-y-1">
          <NavItem href="/dashboard" active label="Dashboard" />
          <NavItem href="#" label="Templates" />
          <NavItem href="/conversations" label="AI Assistant" />
          <NavItem href="#" label="Resources" />
          <NavItem href="#" label="Settings" />
        </nav>
      </aside>

      {/* Content */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">My Business Plans</h1>
          <Button asChild className="rounded-full px-4 py-2 text-sm">
            <Link href="/chat/demo">Start New Plan</Link>
          </Button>
        </div>

        <div className="space-y-5">
          {plans.map((p) => (
            <article
              key={p.id}
              className="grid grid-cols-1 items-center gap-5 rounded-2xl border bg-white p-5 shadow-sm md:grid-cols-[1fr_260px]"
            >
              <div>
                <h3 className="text-[15px] font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <Button
                  asChild
                  variant="secondary"
                  className="mt-3 h-8 rounded-md px-3 text-[12px]"
                >
                  <Link href={`/chat/${p.id}`}>Continue Editing</Link>
                </Button>
              </div>

              {/* Right thumbnail */}
              <div className="overflow-hidden rounded-xl border bg-muted/30">
                <img
                  src={p.image}
                  alt=""
                  className="h-[140px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function NavItem({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
        active
          ? "bg-[#EEF2FF] font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
