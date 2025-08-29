// app/plan/roadmap/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Roadmap, Milestone } from "@/lib/api/types";
import { getRoadmap } from "@/lib/api/roadmap";
import { Check, Pencil, Circle } from "lucide-react";

export default function PlanRoadmapPage() {
  const [data, setData] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const planId = "demo-plan";
    setLoading(true);
    getRoadmap(planId)
      .then((res) => {
        setData(res);
        setErr(null);
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        setErr(msg || "Failed to load");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-8 w-60 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-2 w-full animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold">사업계획서 로드맵</h1>
        <p className="mt-2 text-sm text-red-600">로드맵을 불러오지 못했습니다: {err}</p>
      </div>
    );
  }

  if (!data) return null;

  const progress = typeof data.progress === "number" ? data.progress : 25;

  // "요약(Executive Summary)" 제거
  const milestones = data.milestones.filter(
    (m) => m.title !== "요약(Executive Summary)"
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 relative">
      {/* 닫기 버튼 */}
      <button
        onClick={() => router.back()}
        aria-label="닫기"
        className="
          absolute top-9 right-7
          flex h-8 w-8 items-center justify-center
          rounded-full border border-gray-300 bg-white
          text-gray-600 hover:bg-gray-100
        "
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-[28px] font-extrabold leading-tight">사업계획서 로드맵</h1>
        <p className="mt-1 text-sm text-blue-900">
          Track your progress as you build your comprehensive business plan.
        </p>

        {/* 진행률 */}
        <section className="mt-6">
          <div className="mb-2 text-sm font-semibold">Plan Progress</div>
          <div className="h-[6px] w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-[6px] rounded-full"
              style={{ width: `${progress}%`, backgroundColor: "#4F7DF2" }}
            />
          </div>
          <div className="mt-2 text-xs font-medium text-blue-900">
            {progress}% Complete
          </div>
        </section>

        {/* 마일스톤 */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold">Key Milestones</h2>
          <ul className="space-y-6">
            {milestones.map((m, i) => (
              <TimelineItem key={m.id} m={m} isLast={i === milestones.length - 1} />
            ))}
          </ul>

          <p className="mt-8 text-xs text-black">
            위 사업계획서 로드맵은 핵심만 포함되어 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}

function TimelineItem({ m, isLast }: { m: Milestone; isLast: boolean }) {
  const stateText =
    m.state === "completed"
      ? "Completed"
      : m.state === "in_progress"
      ? "In Progress"
      : "Not Started";

  // 제목 색상: "사업 정의"는 항상 검정, 그 외는 기존 규칙
  const Title = (
    <div
      className={`font-semibold ${
        m.title === "사업 정의"
          ? "text-black"
          : m.state === "in_progress"
          ? "text-[#4F7DF2]"
          : "text-foreground"
      }`}
    >
      {m.title}
    </div>
  );

  // 설명
  const Desc = m.desc ? (
    <div className="text-xs text-blue-900">{m.desc}</div>
  ) : null;

  // 상태 텍스트: 남색으로 통일
  const State = <div className="text-xs text-blue-900">{stateText}</div>;

  // ✅ 아이콘 색상: 상태/타이틀 무관 전부 검정
  const iconColor = "text-black";

  return (
    <li className="grid grid-cols-[28px_1fr] gap-3">
      {/* 아이콘 + 수직선 */}
      <div className="relative flex justify-center">
        <span className="absolute left-1/2 top-6 h-[calc(100%_-_24px)] w-px -translate-x-1/2 bg-gray-200" />
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          {m.state === "completed" ? (
            <Check className={`h-4 w-4 ${iconColor}`} />
          ) : m.state === "in_progress" ? (
            <Pencil className={`h-4 w-4 ${iconColor}`} />
          ) : (
            <Circle className={`h-4 w-4 ${iconColor}`} />
          )}
        </span>
      </div>

      {/* 텍스트 영역 */}
      <div className="space-y-0.5">
        {Title}
        {m.state === "completed" ? (
          <>
            <div className="text-xs text-blue-900">문제 정의</div>
            {State}
          </>
        ) : (
          <>
            {Desc}
            {State}
          </>
        )}
      </div>
    </li>
  );
}
