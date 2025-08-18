"use client";

import Link from "next/link";

type Milestone = {
  id: string;
  title: string;
  state: "completed" | "in_progress" | "not_started";
};

const progress = 25; // 목 데이터: 진행률
const milestones: Milestone[] = [
  { id: "market", title: "Market Analysis", state: "completed" },
  { id: "product", title: "Product Definition", state: "in_progress" },
  { id: "marketing", title: "Marketing Strategy", state: "not_started" },
  { id: "finance", title: "Financial Projections", state: "not_started" },
  { id: "exec", title: "Executive Summary", state: "not_started" },
];

export default function PlanRoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Business Plan Roadmap</h1>
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
          {milestones.map((m) => (
            <li key={m.id} className="flex items-start gap-3">
              <span className="mt-1 text-lg">
                {m.state === "completed" ? "✅" : m.state === "in_progress" ? "✏️" : "⭕"}
              </span>
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="text-xs text-muted-foreground">
                  {m.state === "completed"
                    ? "Completed"
                    : m.state === "in_progress"
                    ? "In Progress"
                    : "Not Started"}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-muted-foreground">
          Click on any milestone to jump directly to that section of your business plan.
          Each step is designed to build upon the previous one, ensuring a cohesive and comprehensive final document.
        </p>
      </div>

      {/* 하단 링크 */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <Link
          href="/plan/preview"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          문서 미리보기로 이동
        </Link>
      </div>

      {/* 푸터 텍스트 느낌 */}
      <footer className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <a className="underline" href="#">Terms of Service</a>
        <a className="underline" href="#">Privacy Policy</a>
        <a className="underline" href="#">Contact Us</a>
      </footer>
    </div>
  );
}
