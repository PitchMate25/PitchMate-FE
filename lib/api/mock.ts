// lib/api/mock.ts
// ───────── 로컬스토리지 기반 목업 유틸 (백엔드 붙이기 전 임시 동작용) ─────────

export type ConvSummary = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatMsg = {
  id: string;
  role: "user" | "ai";
  content: string;
  createdAt: string;
};

const K = {
  convs: "pm_conversations",
  msgs: (cid: string) => `pm_msgs_${cid}`,
  msgsPrefix: "pm_msgs_",
};

function nowISO() {
  return new Date().toISOString();
}

// ▼▼ 비로그인 시 전체 정리용
/** 로컬에 남아있는 모든 대화방/메시지(목록 + pm_msgs_*)를 삭제 */
export function lsClearAllConvs() {
  try {
    // 대화방 목록 제거
    localStorage.removeItem(K.convs);
    // 모든 메시지 키 제거
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith(K.msgsPrefix)) toRemove.push(key);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // noop
  }
}

// ── 대화방 목록
export function lsGetConvs(): ConvSummary[] {
  try {
    return JSON.parse(localStorage.getItem(K.convs) || "[]");
  } catch {
    return [];
  }
}

export function lsSaveConvs(list: ConvSummary[]) {
  localStorage.setItem(K.convs, JSON.stringify(list));
}

export function lsCreateConv(title = "New Chat") {
  const id = "conv_" + Math.random().toString(36).slice(2, 8);
  const list = lsGetConvs();
  const item: ConvSummary = { id, title, createdAt: nowISO(), updatedAt: nowISO() };
  list.unshift(item);
  lsSaveConvs(list);
  localStorage.setItem(K.msgs(id), JSON.stringify([]));
  return id;
}

// ── 메시지
export function lsGetMsgs(cid: string): ChatMsg[] {
  try {
    return JSON.parse(localStorage.getItem(K.msgs(cid)) || "[]");
  } catch {
    return [];
  }
}

export function lsPushMsg(cid: string, msg: Omit<ChatMsg, "id" | "createdAt">) {
  const msgs = lsGetMsgs(cid);
  const next: ChatMsg = { ...msg, id: String(msgs.length + 1), createdAt: nowISO() };
  msgs.push(next);
  localStorage.setItem(K.msgs(cid), JSON.stringify(msgs));

  // 대화방 updatedAt 갱신
  const convs = lsGetConvs().map((c) => (c.id === cid ? { ...c, updatedAt: nowISO() } : c));
  lsSaveConvs(convs);

  return next;
}

// lib/api/mock.ts (하단에 추가)

// --- 로드맵 목업 ---
import type { Roadmap } from "@/lib/api/types";

/** 데모용 로드맵 목업 데이터 */
const ROADMAP_FIXTURE: Roadmap = {
  planId: "demo-plan",
  title: "Demo Business Plan",
  // progress는 의도적으로 생략 → 프론트에서 계산되게
  milestones: [
    {
      id: "topic",
      title: "사업 주제 선정",
      desc: "문제 정의, 대상 고객, 제공 가치 포인트 정리",
      state: "completed",
    },
    {
      id: "market",
      title: "시장 조사 및 분석",
      desc: "SWOT 분석, TAM/SAM/SOM 등 시장 규모 분석",
      state: "in_progress",
    },
    {
      id: "product",
      title: "사업 정의(제품/서비스)",
      desc: "핵심 기능, 차별점, 제공 방식",
      state: "not_started",
    },
    {
      id: "bm",
      title: "비즈니스 모델 수립",
      desc: "수익 구조, 고객 확보/전환/유지 전략",
      state: "not_started",
    },
    {
      id: "exec",
      title: "요약(Executive Summary)",
      desc: "핵심 가치 제안과 요약본",
      state: "not_started",
    },
  ],
  updatedAt: new Date().toISOString(),
};

/** 목업 로드맵 조회 */
export async function mockGetRoadmap(planId: string): Promise<Roadmap> {
  // planId를 쓰고 싶으면 여기서 스위치 가능
  await new Promise((r) => setTimeout(r, 200)); // 살짝 딜레이
  return { ...ROADMAP_FIXTURE, planId };
}
