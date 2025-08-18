export type Provider = "google" | "kakao" | "naver";
export type Role = "user" | "ai" | "system";
export type MsgStatus = "streaming" | "final" | "error";

export interface PageMeta { page: number; size: number; totalElements: number; totalPages: number; }

export interface ConversationSummary {
  id: string;
  title?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  parentId?: string | null;
  status: MsgStatus;
  meta?: Record<string, any>;
  clientMessageId?: string | null;
}

export interface Conversation {
  id: string;
  title?: string | null;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  conversationId: string;
  messageId?: string | null;
  kind: "plan" | "transcript" | "other";
  format: "pdf" | "docx";
  name: string;
  size: number;
  createdAt: string;
}

export type StreamEvent =
  | { type: "token"; delta: string }
  | { type: "done" }
  | { type: "error"; error: string };

export interface PageConversationSummary {
  meta: PageMeta;
  data: ConversationSummary[];
}

/* -------------------------
   ✅ 로드맵 타입 (추가)
--------------------------*/
export type MilestoneState = "completed" | "in_progress" | "not_started";

export interface Milestone {
  id: string;
  title: string;
  desc?: string;
  state: MilestoneState;
}

export interface Roadmap {
  planId: string;
  title?: string;
  /** 서버가 주지 않으면 프론트에서 계산해 사용 */
  progress?: number;
  milestones: Milestone[];
  updatedAt?: string;
}