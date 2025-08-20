"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function EditableSection({
  title,
  initialContent,
}: {
  title: string;
  initialContent: string;
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {editing ? (
        <>
          <textarea
            className="w-full border rounded p-2 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
          <Button
            onClick={() => setEditing(false)}
            className="mt-2"
          >
            save
          </Button>
        </>
      ) : (
        <>
          <p className="whitespace-pre-line">{content}</p>
          <Button
            onClick={() => setEditing(true)}
            variant="outline"
            className="mt-2"
          >
            Editing
          </Button>
        </>
      )}
    </section>
  );
}

export default function PlanDriftPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 제목/설명 */}
      <h1 className="text-4xl font-extrabold">Business Plan Draft</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review the draft of your business plan. You can edit each section or export the entire plan.
      </p>

    <div className="my-8" /> 

      {/* editable sections */}
      <EditableSection
        title="1. Executive Summary"
        initialContent={`This section provides a concise overview of the business, including its mission,
        vision, and key objectives. It highlights the core value proposition and the target market, setting the stage
         for the detailed analysis that follows.`}
      />
      
      <EditableSection
        title="2. Market Analysis"
        initialContent={`This section delves into the market landscape, identifying key trends, customer needs, and 
        market size. It analyzes the competitive environment, highlighting opportunities and threats, and provides 
        a clear understanding of the target audience.`}
      />

      <EditableSection
        title="3. Competitive Differentiation"
        initialContent={`This section outlines the unique aspects of the business that set it apart from competitors.
        It details the competitive advantages, such as innovative products, superior customer service, or unique business
        processes, and explains how these advantages will be leveraged to gain market share.`}
      />

      <EditableSection
        title="4. Business Model"
        initialContent={`This section describes how the business will generate revenue and achieve profitability.
        It details the pricing strategy, sales channels, and customer acquisition methods, providing a clear picture of the financial framework.`}
      />

      <EditableSection
        title="5. Implementation Plan"
        initialContent={`This section outlines the steps required to launch and grow the business.
        It includes a timeline, key milestones, and resource allocation, ensuring a structured approach to execution.`}
      />

      {/* 우측 하단 플로팅 액션 */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button
          className="bg-[#1d4ed8] text-white text-sm shadow px-4 py-2"
          onClick={() => alert("저장되었습니다.")}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
