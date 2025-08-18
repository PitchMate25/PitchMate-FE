"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PlanCard = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

const mockPlans: PlanCard[] = [
  {
    id: "conv_demo_001",
    title: "Tech Startup Business Plan",
    desc: "A comprehensive plan for a tech startup focusing on AI solutions.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "conv_demo_002",
    title: "Retail Business Plan",
    desc: "A detailed plan for a retail business specializing in sustainable products.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "conv_demo_003",
    title: "Consulting Business Plan",
    desc: "A strategic plan for a consulting firm offering business development services.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=1600&auto=format&fit=crop"
          alt="Idea"
          className="h-[320px] w-full rounded-xl object-cover"
        />
        {/* dim layer */}
        <div className="absolute inset-0 rounded-xl bg-black/35" />
        {/* centered copy */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-6 text-center text-white">
            {/* ⬇ 제목 크기 살짝 축소 + 줄바꿈 방지 */}
            <h1 className="mx-auto max-w-4xl text-2xl font-extrabold leading-tight tracking-tight md:text-4xl md:whitespace-nowrap [text-shadow:_0_2px_12px_rgba(0,0,0,.35)]">
              머릿속 숨어있는 아이디어를 구체화시키세요!
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-xs opacity-90 md:text-sm">
              Transform your business ideas into a comprehensive plan with our
              AI-powered assistant. Get step-by-step guidance, idea suggestions,
              and automated plan generation.
            </p>
          </div>
        </div>
        {/* ▶ 시작하기 버튼(미리보기 섹션 버튼과 동일 스타일) */}
        <div className="absolute bottom-6 right-6">
          <Button asChild size="sm" variant="secondary">
            <Link href="/login">시작하기</Link>
          </Button>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="mt-10">
        <h2 className="mb-3 text-2xl font-extrabold">주요 기능</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Our AI-powered assistant provides a comprehensive suite of tools to
          help you create a winning business plan.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          <FeatureCard
            icon="💬"
            title="대화형 AI"
            desc="Engage with our AI in a natural, conversational manner to develop your business plan."
          />
          <FeatureCard
            icon="🧭"
            title="Step-by-Step Guidance"
            desc="Receive clear, actionable guidance at every stage of the planning process."
          />
          <FeatureCard
            icon="💡"
            title="Idea Suggestions"
            desc="Unlock innovative ideas and strategies tailored to your business concept."
          />
          <FeatureCard
            icon="📄"
            title="Automated Plan"
            desc="Generate a complete, professional business plan document with ease."
          />
        </div>
      </section>

      {/* 사업계획서 미리보기 */}
      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">사업계획서 미리보기</h2>
          {/* ▶ 위 히어로와 동일 스타일 */}
          <Button asChild size="sm" variant="default">
            <Link href="/login">시작하기</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {mockPlans.map((p) => (
            <article
              key={p.id}
              className="grid grid-cols-1 items-center gap-4 rounded-xl border bg-white p-5 shadow-sm md:grid-cols-[1fr_280px]"
            >
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <Button asChild variant="secondary" className="mt-3">
                  <Link href={`/chat/demo?from=landing&plan=${p.id}`}>
                    Continue Editing
                  </Link>
                </Button>
              </div>
              <img
                src={p.image}
                alt=""
                className="h-[140px] w-full rounded-lg object-cover md:w-[280px]"
              />
            </article>
          ))}
        </div>
      </section>

      {/* Footer (회원가입 링크 제거 요청 반영) */}
      <footer className="mt-12 flex items-center justify-end gap-4 border-t py-6 text-xs text-muted-foreground">
        <Link href="/privacy" className="underline">
          개인정보 처리방침
        </Link>
        <Link href="/terms" className="underline">
          이용약관
        </Link>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-2 text-2xl">{icon}</div>
      <div className="mb-1 font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
