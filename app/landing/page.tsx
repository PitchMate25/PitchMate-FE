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
    title: "캠핑용품 구독 서비스",
    desc: "고객 맞춤형 캠핑 장비를 정기적으로 배송하는 구독 모델로, 편리함과 신제품 경험을 제공",
    image: "/images/image1.png", // ✅ 교체
  },
  {
    id: "conv_demo_002",
    title: "청소년 스포츠 캠프 창업",
    desc: "청소년 대상 스포츠 교육 체험 캠프를 운영해 건강 증진과 사회성 발달을 지원",
    image: "/images/image2.png", // ✅ 교체
  },
  {
    id: "conv_demo_003",
    title: "도시 속 1일 체험형 여행지",
    desc: "바쁜 도시인들을 위해 단기 맞춤 여행 상품으로, 다양한 체험과 휴식을 결합한 패키지 제공",
    image: "/images/image3.png", // ✅ 교체
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
        {/* ▶ 피그마 문구에 맞춰 교체 */}
        <p className="mb-6 text-sm text-black">
          PitchMate는 여행·레저 산업, 특히 캠핑·체험·채널·스포츠 분야에 특화되어 있는 대화형 AI로,  <br />
          AI와의 대화를 통해 사업 아이템을 구체화하고, 사업계획서의 핵심 요소를 빠짐없이 반영할 수 있습니다.
           <br /><br />
          대화 중에는 실시간 피드백과 방향 제시 기능을 통해 의사결정 속도를 높이고, 보다 정교한 사업 전략 수립을 지원합니다. <br />
          또한, 완성된 계획서는 PDF 또는 DOCX로 즉시 활용 가능한 형태로 제공되어 실제 비즈니스 준비에 바로 활용할 수 있습니다.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          <FeatureCard
            icon="💬"
            title="대화를 통한 사업 아이템 구체화"
            desc="사업 아이디어를 AI가 함께 구조화하고 보안해주어, 핵심을 놓치지 않는 완성도 높은 계획서로 발전시킬 수 있습니다."
          />
          <FeatureCard
            icon="🧭"
            title="여행·레저 분야 특화 지원"
            desc="캠핑, 체험, 스포츠 등 세부 분야에 맞춘 전문 가이드를 통해, 타깃 시장에서 최적화된 사업계획서를 빠르게 완성할 수 있습니다."
          />
          <FeatureCard
            icon="💡"
            title="실시간 피드백과 방향 제시"
            desc="AI가 아이디어의 강점과 나아갈 방향을 제공하여, 더 빠르고 명확하게 의사결정을 내릴 수 있습니다."
          />
          <FeatureCard
            icon="📄"
            title="사업계획서 작성 및 문서 추출"
            desc="대화만으로 완성도 높은 사업계획서를 생성하고, PDF 및 DOCX로 바로 추출해 실전에서 곧바로 활용 가능힙나다."
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
                <h3 className="font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-blue-900">{p.desc}</p>

                {/* ▶ 버튼 묶음: 수정하기 + 미리보기(파란색) */}
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="secondary" className="font-semibold">
                    <Link href={`/chat/demo?from=landing&plan=${p.id}`}>
                      수정하기
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-[#60A5FA] text-black hover:bg-[#60A5FA] hover:text-black font-semibold "
                  >
                    <Link href={`/preview/${p.id}`}>Export as PDF</Link>
                  </Button>
                </div>
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
        <Link href="/privacy" className="underline text-blue-900">
          개인정보 처리방침
        </Link>
        <Link href="/terms" className="underline text-blue-900">
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
      <p className="text-sm text-blue-900">{desc}</p>
    </div>
  );
}
