import type { PageConversationSummary, Conversation, Message, Attachment, StreamEvent } from "./types";

const wait = (ms:number)=> new Promise(r=>setTimeout(r, ms));
const now = ()=> new Date().toISOString();

const mockConversations: PageConversationSummary = {
  meta: { page:1, size:20, totalElements:1, totalPages:1 },
  data: [{ id:"conv_demo_001", title:"시장조사 Q&A", createdAt:now(), updatedAt:now() }],
};

const mockMessages: Message[] = [
  { id:"m1", role:"user", content:"여행 관련 사업 추천해줘", createdAt:now(), status:"final" },
  { id:"m2", role:"ai", content:"비성수기 최적화·현지 체험 큐레이션·가족 일정 연동 아이디어가 유망해요.", createdAt:now(), status:"final" },
];

let aiCounter = 0;

const mockAttachments: Attachment[] = [
  { id:"att_001", conversationId:"conv_demo_001", messageId:"m2", kind:"plan", format:"pdf",
    name:"샘플_사업계획서.pdf", size: 128_000, createdAt: now() },
];

export const MockAPI = {
  async listConversations(){ await wait(300); return mockConversations; },
  async getConversation(id:string): Promise<Conversation> {
    await wait(300); return { id, title:"시장조사 Q&A", messages: mockMessages, createdAt:now(), updatedAt:now() };
  },
  async patchConversation(id:string, title:string){ await wait(200); return { id, title, messages: mockMessages, createdAt:now(), updatedAt:now() }; },
  async deleteConversation(_id:string){ await wait(200); },

  async sendMessage(_id:string, body:{ content:string; clientMessageId?: string|null }) {
    await wait(120);
    const userMsg: Message = { id: body.clientMessageId || "u-"+Math.random().toString(36).slice(2), role:"user", content: body.content, createdAt: now(), status:"final" };
    mockMessages.push(userMsg);
    const aiMsg: Message = { id: "ai-"+Math.random().toString(36).slice(2), role:"ai", content:"", createdAt: now(), status:"final" };
    mockMessages.push(aiMsg);
    return { user: userMsg, ai: aiMsg };
  },

  async streamMessage(_id:string, _body:{ content:string }, onEvent:(ev:StreamEvent)=>void) {
    const chunks = [
      "좋은 출발입니다. ",
      "‘발산→세부화→문서화’ 단계로 진행해볼게요. ",
      "핵심 기능은 동적 가격 신호, 일정 추천, 현지 체험 큐레이션입니다. ",
      "원하시면 PDF로 기본 사업계획서도 만들어 드릴게요."
    ];
    for (const c of chunks) { await wait(250); onEvent({ type:"token", delta:c }); }
    aiCounter++;
    if (aiCounter % 3 === 0) {
      mockAttachments.push({
        id:"att_"+Math.random().toString(36).slice(2),
        conversationId:"conv_demo_001",
        messageId:"m"+(mockMessages.length+1),
        kind:"plan", format:"pdf",
        name:"자동생성_사업계획서.pdf",
        size: 196_000, createdAt: now(),
      });
    }
    onEvent({ type:"done" });
  },

  async listAttachments(conversationId:string){ await wait(200); return mockAttachments.filter(a=>a.conversationId===conversationId); },
  async downloadAttachment(_cid:string, _aid:string){
    const blob = new Blob([`%PDF-1.4\n% Mock PDF ${now()}\n%%EOF`], { type:"application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "mock.pdf"; a.click();
    URL.revokeObjectURL(url);
  },
};
