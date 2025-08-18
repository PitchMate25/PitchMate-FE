// app/plan/roadmap/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { Roadmap, Milestone } from "@/lib/api/types";
import { getRoadmap } from "@/lib/api/roadmap";

export default function PlanRoadmapPage() {
  const [data, setData] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // 임시: planId는 고정값 사용(나중에 URL 쿼리/파라미터로 전달)
    const planId = "demo-plan";
    setLoading(true);
    getRoadmap(planId)
      .then((res) => {
        setData(res);
        setErr(null);
      })
      .catch((e: any) => setErr(e?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-4 w-80 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-2 w-full animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold">로드맵</h1>
        <p className="mt-2 text-sm text-red-600">로드맵을 불러오지 못했습니다: {err}</p>
      </div>
    );
  }

  if (!data) return null;

  const progress = typeof data.progress === "number" ? data.progress : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">사업계획서 로드맵</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Track your progress as you build your comprehensive business plan.
      </p>

      {/* 진행률 바 */}
      <div className="mt-6">
        <div className="mb-1 text-sm font-semibold">Plan Progress</div>
        <div className="h-2 w-full overflow-hidden rounded bg-muted">
          <div
            className="h-2 rounded bg-[#9bb6ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{progress}% Complete</div>
      </div>

      {/* 마일스톤 리스트 */}
      <div className="mt-8">
        <h2 className="mb-3 text-xl font-bold">Key Milestones</h2>
        <ul className="space-y-5">
          {data.milestones.map((m) => (
            <MilestoneItem key={m.id} m={m} />
          ))}
        </ul>

        <p className="mt-6 text-xs text-muted-foreground">
          위 사업계획서 로드맵은 핵심만 포함되어 있습니다.
        </p>
      </div>
    </div>
  );
}

function MilestoneItem({ m }: { m: Milestone }) {
  const icon =
    m.state === "completed" ? "✅" : m.state === "in_progress" ? "✏️" : "⭕";

  const titleClass =
    m.state === "completed"
      ? "text-foreground"
      : m.state === "in_progress"
      ? "text-[#4F7DF2]"
      : "text-muted-foreground";

  const stateText =
    m.state === "completed"
      ? "Completed"
      : m.state === "in_progress"
      ? "In Progress"
      : "Not Started";

  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 text-lg">{icon}</span>
      <div>
        <div className={`font-medium ${titleClass}`}>{m.title}</div>
        <div className="text-xs text-muted-foreground">{stateText}</div>
        {m.desc && <div className="mt-1 text-xs text-muted-foreground">{m.desc}</div>}
      </div>
    </li>
  );
}
