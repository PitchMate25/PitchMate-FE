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
          /* 배경 전구 이미지로 교체 */
          src="https://images.twinkl.co.uk/tr/raw/upload/u/ux/lightbulb-1875247-1920_ver_1.jpg"
          alt="Idea"
          className="h-[320px] w-full rounded-xl object-cover"
        />
        {/* dim layer */}
        <div className="absolute inset-0 rounded-xl bg-black/35" />
        {/* centered copy */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 텍스트 살짝 위로 (-translate-y-4) */}
          <div className="px-6 text-center text-white -translate-y-4">
            <h1 className="mx-auto max-w-4xl text-2xl font-extrabold leading-tight tracking-tight md:text-4xl md:whitespace-nowrap [text-shadow:_0_2px_12px_rgba(0,0,0,.35)]">
              머릿속 숨어있는 아이디어를 구체화시키세요!
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-xs opacity-90 md:text-sm">
              AI가 도와주는 체계적인 사업 계획서 만들기!  <br />
              아이디어 발굴, 단계별 전략 수립, 사업 계획서 작성까지 전부 한 번에 해결하세요.
            </p>
          </div>
        </div>
        {/* ▶ Hero 시작하기 버튼 */}
        <div className="absolute bottom-6 right-6">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-[#60A5FA] text-sm font-bold text-white hover:bg-[#60A5FA] hover:text-white"
          >
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
          {/* ▶ 미리보기 시작하기 버튼 */}
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-[#60A5FA] text-sm font-bold text-white hover:bg-[#60A5FA] hover:text-white"
          >
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
                {/* 버튼 텍스트: Continue Editing → 수정하기 */}
                <Button asChild variant="secondary" className="mt-3 font bold">
                  <Link href={`/chat/demo?from=landing&plan=${p.id}`}>
                    수정하기
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

      {/* Footer */}
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
