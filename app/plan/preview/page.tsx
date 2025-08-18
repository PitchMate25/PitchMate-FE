"use client";

export default function PlanPreviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 제목/설명 */}
      <h1 className="text-2xl font-extrabold">‘(주제)’에 대한 사업계획서</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your comprehensive business plan is ready for review. Scroll through to ensure all sections meet
        your expectations. You can edit any section directly or export the plan in your preferred format.
      </p>

      {/* 문서 본문(목 데이터) */}
      <section className="prose mt-8 max-w-none">
        <h2>Executive Summary</h2>
        <p>
          PlanForge is a revolutionary AI-powered platform designed to streamline the creation of
          comprehensive business plans…
        </p>

        <h2>Market Analysis</h2>
        <p>
          The market for business plan software is experiencing rapid growth…
        </p>

        <h2>Business Model</h2>
        <p>
          PlanForge operates on a subscription-based model, offering tiered plans…
        </p>
      </section>

      {/* 우측 하단 플로팅 액션 */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button className="rounded-md border bg-white px-4 py-2 text-sm shadow">
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
