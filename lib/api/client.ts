import type { PageConversationSummary, Conversation, Message, Attachment, StreamEvent } from "./types";
import { MockAPI } from "./mock";

const API = process.env.NEXT_PUBLIC_API_BASE ?? "";
const USE_MOCK = typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "1";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") window.location.href = `${API}/auth/google`;
    throw new Error("Unauthorized");
  }
  if (!res.ok) { const t = await res.text().catch(()=> ""); throw new Error(`HTTP ${res.status} ${t}`); }
  const ct = res.headers.get("content-type") || "";
  return (ct.includes("application/json") ? res.json() : (res as unknown as T)) as T;
}

// ---- Conversations ----
async function realList(page=1, size=20){ return api<PageConversationSummary>(`/conversations?page=${page}&size=${size}`); }
async function realGet(id:string){ return api<Conversation>(`/conversations/${id}`); }
async function realPatch(id:string, title:string){ return api<Conversation>(`/conversations/${id}`, { method:"PATCH", body: JSON.stringify({ title })}); }
async function realDelete(id:string){ return fetch(API+`/conversations/${id}`, { method:"DELETE", credentials:"include" }); }
async function realSend(id:string, body:{ content:string; parentMessageId?:string|null; clientMessageId?:string|null }){
  return api<{ user: Message; ai: Message }>(`/conversations/${id}/messages`, { method:"POST", body: JSON.stringify(body) });
}

// ---- Attachments ----
async function realListAtt(conversationId:string){ return api<Attachment[]>(`/conversations/${conversationId}/attachments`); }
async function realDownloadAtt(conversationId:string, attachmentId:string){
  const res = await fetch(API+`/conversations/${conversationId}/attachments/${attachmentId}`, { credentials:"include" });
  if (res.status === 401) { if (typeof window !== "undefined") window.location.href = `${API}/auth/google`; throw new Error("Unauthorized"); }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob(); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  const cd = res.headers.get("Content-Disposition") || "";
  const match = cd.match(/filename\*=UTF-8''([^;]+)/) || cd.match(/filename="?([^"]+)"?/);
  a.download = match ? decodeURIComponent(match[1]) : "download"; a.click(); URL.revokeObjectURL(url);
}

// ---- Export (mock switch) ----
export const Conversations = {
  list: (p=1,s=20)=> USE_MOCK ? MockAPI.listConversations() : realList(p,s),
  get: (id:string)=> USE_MOCK ? MockAPI.getConversation(id) : realGet(id),
  patch: (id:string,title:string)=> USE_MOCK ? MockAPI.patchConversation(id,title) : realPatch(id,title),
  delete: (id:string)=> USE_MOCK ? MockAPI.deleteConversation(id) : realDelete(id),
  send: (id:string, body:{ content:string; parentMessageId?:string|null; clientMessageId?:string|null }) =>
    USE_MOCK ? MockAPI.sendMessage(id, body) : realSend(id, body),
};

export const Attachments = {
  list: (cid:string)=> USE_MOCK ? MockAPI.listAttachments(cid) : realListAtt(cid),
  download: (cid:string, aid:string)=> USE_MOCK ? MockAPI.downloadAttachment(cid,aid) : realDownloadAtt(cid,aid),
};

export async function streamMessage(
  conversationId: string,
  body: { content: string; parentMessageId?: string | null; clientMessageId?: string | null },
  onEvent: (ev: StreamEvent) => void,
  signal?: AbortSignal
) {
  if (USE_MOCK) return MockAPI.streamMessage(conversationId, { content: body.content }, onEvent);

  const res = await fetch(API + `/conversations/${conversationId}/messages?stream=true`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (res.status === 401) { if (typeof window !== "undefined") window.location.href = `${API}/auth/google`; throw new Error("Unauthorized"); }
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const td = new TextDecoder(); let buf = "";
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    buf += td.decode(value, { stream: true });
    let idx: number;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const raw = buf.slice(0, idx).trim(); buf = buf.slice(idx + 2);
      const lines = raw.split("\n");
      const event = (lines.find(l=>l.startsWith("event:"))?.slice(6).trim() || "token") as "token"|"done"|"error";
      const data = lines.find(l=>l.startsWith("data:"))?.slice(5).trim();
      try {
        const json = data ? JSON.parse(data) : {};
        if (event === "token") onEvent({ type:"token", delta: json.delta ?? "" });
        else if (event === "done") onEvent({ type:"done" });
        else if (event === "error") onEvent({ type:"error", error: json.error ?? "error" });
      } catch { if (event === "token") onEvent({ type:"token", delta: data ?? "" }); }
    }
  }
}
