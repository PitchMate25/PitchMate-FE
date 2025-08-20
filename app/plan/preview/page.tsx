"use client";

import { useRouter } from "next/navigation";

export default function PlanPreviewPage() {
  const router = useRouter();

  const goToEditPage = () => {
    router.push("/plan/draft");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 제목/설명 */}
      <h1 className="text-4xl font-black tracking-tight">‘(주제)’에 대한 사업계획서</h1>
      <div className="my-3" /> 
      <p className="mt-1 text-sm text-muted-foreground">
        Your comprehensive business plan is ready for review. Scroll through to ensure all sections meet
        your expectations. You can edit any section directly
        <br /> or export the plan in your preferred format.
      </p>

      {/* 문서 본문(목 데이터) */}
      <section className="prose mt-8 max-w-none">
        <h2 className="text-2xl font-extrabold mb-2"> Executive Summary</h2>

        <div className="my-4" /> 

        <p>
        PlanForge is a revolutionary AI-powered platform designed to streamline the creation of comprehensive business plans.
        By leveraging advanced natural language processing and machine learning algorithms, PlanForge guides entrepreneurs and 
        businesses through every step of the planning process, from initial concept to detailed financial projections. Our platform offers customizable templates, 
        real-time collaboration tools, and expert insights, ensuring that users can craft professional, investor-ready business plans efficiently and effectively.
        </p>

        <div className="my-8" /> 

        <h2 className="text-2xl font-extrabold mb-2"> Market Analysis</h2>

        <div className="my-4" /> 

        <p>
        The market for business plan software is experiencing rapid growth, driven by the increasing number of startups and small businesses seeking structured guidance
        in their planning efforts. PlanForge stands out by offering a unique blend of AI-driven automation and user-friendly customization, catering to a broad spectrum
        of industries and business models. Our competitive advantage lies in our ability to generate high-quality, tailored content that significantly reduces the time 
        and effort required to produce a comprehensive business plan.       
        </p>

        <div className="my-8" /> 

        <h2 className="text-2xl font-extrabold mb-2"> Business Model</h2>

        <div className="my-4" /> 

        <p>
        PlanForge operates on a subscription-based model, offering tiered plans to accommodate different user needs and budgets. Our revenue streams include monthly and annual
        subscriptions, as well as potential future offerings such as premium templates and consulting services. We are committed to providing exceptional value to our users, 
        ensuring that PlanForge remains an indispensable tool for business planning and growth.        </p>
      </section>

      {/* 우측 하단 플로팅 액션 */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button
          onClick={goToEditPage}
          className="rounded-md border bg-white px-4 py-2 text-sm shadow"
        >
          Edit Plan
        </button>
        <button
          className="rounded-md bg-[#4F7DF2] px-4 py-2 text-sm text-white shadow"
          onClick={() => alert("(데모) PDF 내보내기")}
        >
          Export as PDF
        </button>
        <button
          className="rounded-md bg-[#1d4ed8] px-4 py-2 text-sm text-white shadow"
          onClick={() => alert("(데모) DOCX 내보내기")}
        >
          Export as DOCX
        </button>
      </div>
    </div>
  );
}
