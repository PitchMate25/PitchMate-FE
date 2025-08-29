// app/chat/preview/page.tsx
"use client";

import ChatSidebar from "@/components/chat/Sidebar";
import { useEffect, useRef } from "react";

export default function ChatPreviewPage() {
  const listRef = useRef<HTMLDivElement>(null);

  const msgs = [
    {
      role: "ai",
      content: "어떤 생각을 발전시키고 싶나요? 주제 선정부터 같이 이야기 나눠봐요!",
    },
    { role: "user", content: "땅 사서 캠핑 사이트를 운영하고 싶어." },
    {
      role: "ai",
      content:
        "좋은 생각이에요! 요즘 자연 속에서 힐링하고 싶은 사람들이 많아서, 캠핑장은 여전히 수요가 높은 사업 중 하나예요. 구체적인 규모나 분위기도 정하셨나요?",
    },
    { role: "user", content: "아니 아직. 이제 정해야 해." },
    {
      role: "ai",
      content:
        "그렇다면 혹시 오늘 가볍게라도 \"나는 이런 캠핑장을 해보고 싶다\" 느낌 떠오르는 거 있으세요?",
    },
    {
      role: "ai",
      content: `훌륭한 아이디어입니다. 캠핑시장에서 특히 가족 중심의 따뜻한 캠핑 경험에 초점을 맞춘 비즈니스는 다음과 같은 강점과 근거를 가질 수 있습니다.

1. 가족 중심의 차별화된 세그먼트  
대부분의 캠핑 관련 플랫폼이나 서비스는 ‘모험’이나 ‘자연 체험’ 중심으로 구성되어 있으며, 가족 중심의 감성적이고 따뜻한 캠핑 경험을 강조하는 서비스는 아직 경쟁이 덜한 블루오션입니다.  
아이들과 함께 이용할 수 있는 안전하고 친화적인 캠핑장 추천, 가족 맞춤형 캠핑용품 큐레이션, 가족 레시피 추천 등으로 차별화를 꾀할 수 있습니다.

2. ESG 및 지속가능성 트렌드와 연계  
자연 속 캠핑은 환경 보전과 지속 가능한 여행이라는 테마와도 잘 맞습니다.  
가족을 대상으로 하는 만큼, ‘아이에게 자연을 경험하게 해주는 교육적 목적’과도 맞물려 사회적 가치와 마케팅 포인트를 동시에 충족할 수 있습니다.`,
    },
  ];

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  return (
    <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
      <ChatSidebar />

      <section className="flex-1 rounded-lg border bg-white flex flex-col">
        {/* 헤더 */}
        <div className="border-b p-4 text-center">
          <h2 className="text-lg font-semibold">Pitch Mate</h2>
          <p className="text-sm text-muted-foreground">
            This is a preview of your conversation.  
            Messages are displayed as they would appear in the chat.
          </p>
        </div>

        {/* 메시지 영역 */}
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {msgs.map((m, i) => {
            // ✅ 첫 번째 AI 메시지 → 카테고리 선택 UI
            if (m.role === "ai" && i === 0) {
              return (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="bg-gray-100 max-w-[80%] rounded-2xl px-4 py-4 text-sm">
                    <div className="mb-3 text-gray-800">{m.content}</div>

                    <div className="flex flex-wrap gap-2">
                      {["여행 / 레저", "기타", "캠핑", "체험 관광", "스포츠 레저"].map(
                        (label) => (
                          <button
                            key={label}
                            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer"
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // ✅ 일반 메시지
            return (
              <div key={i} className="flex items-start space-x-3">
                {m.role === "ai" && (
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
