// lib/api/roadmap.ts
import type { Roadmap } from "@/lib/api/types";

const USE_MOCK =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "1";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

// 목업 구현을 여기서 import
import { mockGetRoadmap } from "@/lib/api/mock";

/** progress가 없으면 milestone 상태로 계산(완료=1, 그 외 0) */
export function calcProgressFromMilestones(roadmap: Roadmap): number {
  if (!roadmap.milestones?.length) return 0;
  const total = roadmap.milestones.length;
  const done = roadmap.milestones.filter((m) => m.state === "completed").length;
  return Math.round((done / total) * 100);
}

/** 로드맵 조회 (planId는 임시로 'demo-plan' 고정 사용 가능) */
export async function getRoadmap(planId: string): Promise<Roadmap> {
  if (USE_MOCK) {
    const data = await mockGetRoadmap(planId);
    return {
      ...data,
      progress:
        typeof data.progress === "number"
          ? data.progress
          : calcProgressFromMilestones(data),
    };
  }

  // ★ 서버 붙이면 이 부분만 실제 API로 교체
  // 예: GET /plans/{planId}/roadmap
  const res = await fetch(`${API_BASE}/plans/${encodeURIComponent(planId)}/roadmap`, {
    credentials: "include", // cookieAuth 사용 대비
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch roadmap: ${res.status}`);
  }
  const data = (await res.json()) as Roadmap;
  return {
    ...data,
    progress:
      typeof data.progress === "number"
        ? data.progress
        : calcProgressFromMilestones(data),
  };
}
