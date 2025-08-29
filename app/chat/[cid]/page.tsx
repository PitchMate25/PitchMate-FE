"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/chat/Sidebar";
import { lsGetMsgs, lsPushMsg, type ChatMsg } from "@/lib/api/mock";
import { ArrowUp } from "lucide-react";

const PRESET_RESPONSES = [
  "좋은 생각이에요! 요즘 자연 속에서 힐링하고 싶은 사람들이 많아서, 캠핑장은 여전히 수요가 높은 사업 중 하나예요. 구체적인 규모나 분위기도 정하셨나요?",
  "그렇다면 혹시 오늘 가볍게라도 '나는 이런 캠핑장을 해보고 싶다' 느낌 떠오르는 거 있으세요?",
  `훌륭한 아이디어입니다. 캠핑시장에서 특히 가족 중심의 따뜻한 캠핑 경험에 초점을 맞춘 비즈니스는 다음과 같은 강점과 근거를 가질 수 있습니다.

1. 가족 중심의 차별화된 세그먼트  
대부분의 캠핑 관련 플랫폼이나 서비스는 ‘모험’이나 ‘자연 체험’ 중심으로 구성되어 있으며, 가족 중심의 감성적이고 따뜻한 캠핑 경험을 강조하는 서비스는 아직 경쟁이 덜한 블루오션입니다.  
아이들과 함께 이용할 수 있는 안전하고 친화적인 캠핑장 추천, 가족 맞춤형 캠핑용품 큐레이션, 가족 레시피 추천 등으로 차별화를 꾀할 수 있습니다.

2. ESG 및 지속가능성 트렌드와 연계  
자연 속 캠핑은 환경 보전과 지속 가능한 여행이라는 테마와도 잘 맞습니다.  
가족을 대상으로 하는 만큼, ‘아이에게 자연을 경험하게 해주는 교육적 목적’과도 맞물려 사회적 가치와 마케팅 포인트를 동시에 충족할 수 있습니다.`,
];

const EXTRA_RESPONSES = [
  `여기에 요약 이후에 출력할 긴 멀티라인 문자열을 작성하세요.
여러 줄 텍스트와 마크다운 스타일도 가능합니다.`,
  "추가 질문이나 피드백이 있으시면 말씀해주세요!",
];

function CategoryButtons() {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
      <div className="bg-gray-100 max-w-[80%] rounded-2xl px-4 py-4 text-sm">
        <div className="mb-3 text-gray-800">
          어떤 생각을 발전시키고 싶나요? 주제 선정부터 같이 이야기 나눠봐요!
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer">
            여행 / 레저
          </button>
          <button className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer">
            기타
          </button>
          <button className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer">
            캠핑
          </button>
          <button className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer">
            체험 관광
          </button>
          <button className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer">
            스포츠 레저
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryButtons({ onSelect }: { onSelect: (choice: string) => void }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
      <div className="bg-gray-100 max-w-[80%] rounded-2xl px-4 py-4 text-sm">
        <div className="mb-3 text-gray-800">
          좋아요, 그럼 지금까지 어떤 이야기 나누었는지 함께 정리해볼까요?
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer"
            onClick={() => onSelect("요약")}
          >
            요약
          </button>
          <button
            className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium transition-colors cursor-pointer"
            onClick={() => onSelect("아니요, 조금 더 구체화 해볼래요.")}
          >
            아니요, 조금 더 구체화 해볼래요.
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatRoomPage() {
  const { cid } = useParams<{ cid: string }>();
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);
  const [showSummaryButtons, setShowSummaryButtons] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 메시지 로드
  useEffect(() => {
    if (!cid) return;
    const loadedMsgs = lsGetMsgs(cid);
    setMsgs(loadedMsgs);

    const aiMsgCount = loadedMsgs.filter((m) => m.role === "ai").length;
    setResponseIndex(aiMsgCount);

    // 프리셋 응답 모두 출력 완료 시 버튼 표시
    if (aiMsgCount >= PRESET_RESPONSES.length) {
      setShowSummaryButtons(true);
    }
  }, [cid]);

  // 다른 탭/창에서 동기화
  useEffect(() => {
    if (!cid) return;
    const key = `pm_msgs_${cid}`;
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        const loadedMsgs = lsGetMsgs(cid);
        setMsgs(loadedMsgs);

        const aiMsgCount = loadedMsgs.filter((m) => m.role === "ai").length;
        setResponseIndex(aiMsgCount);

        if (aiMsgCount >= PRESET_RESPONSES.length) {
          setShowSummaryButtons(true);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [cid]);

  // 새 메시지 도착 자동 스크롤
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  const send = async () => {
    if (!cid || !input.trim()) return;
    const text = input.trim();
    setInput("");

    lsPushMsg(cid, { role: "user", content: text });
    setMsgs(lsGetMsgs(cid));

    setTimeout(() => {
      let response = "";

      if (text === "요약") {
        response = `네, 사업 주제 요약을 도와드릴게요. 

가족이 함께할 수 있는 따뜻하고 감성적인 분위기의 캠핑 경험을, 편리한 서비스를 통해 제공하는 
캠핑 브랜드(서비스)를 제공하고 싶어하시는군요. 

위 비즈니스의 핵심 요소는 아래와 같습니다.
1. 가족 단위의 고객을 타깃으로 한 캠핑 서비스
2. 따뜻하고 감성적인 분위기(위치, 공간 구성 등)
3. 편리성 제공(이용 절차, 장비, 예약, 음식, 위생 등에서의 편의)

위 내용에서 추가하고 싶은 부분이 있다면 편하게 말씀해주세요 : )
또는 위 내용에 만족한다면 구체적으로 사업을 정의해볼까요?`;

        setShowSummaryButtons(false);
        setResponseIndex((prev) => prev + 1);
      } else if (text === "아니요, 조금 더 구체화 해볼래요.") {
        response = `네, 좋습니다! 
가족 중심의 따뜻한 분위기와 편리함을 주요 서비스로 제공하고 싶다고 하셨는데요, 
이 주제를 선택한 계기(시장 분위기, 개인경험, 트렌드 등)가 있나요?`;

        setShowSummaryButtons(false);
        setResponseIndex((prev) => prev + 1);
      } else {
        response =
          responseIndex < PRESET_RESPONSES.length
            ? PRESET_RESPONSES[responseIndex]
            : "더 자세히 설명해주시면 더 구체적인 조언을 드릴 수 있습니다.";
        setResponseIndex((prev) => prev + 1);
      }

      lsPushMsg(cid, { role: "ai", content: response });
      setMsgs(lsGetMsgs(cid));
    }, 500);

    inputRef.current?.focus();
  };

  // SummaryButtons에서 선택한 버튼 처리하는 함수
  const handleSummarySelect = (choice: string) => {
    setShowSummaryButtons(false);
    if (choice === "요약") {
      sendCustomMessage("요약");
    } else if (choice === "아니요, 조금 더 구체화 해볼래요.") {
      sendCustomMessage("아니요, 조금 더 구체화 해볼래요.");
    }
  };

  // SummaryButtons에서 클릭시 직접 메시지 보내는 함수
  const sendCustomMessage = (text: string) => {
    if (!cid) return;

    lsPushMsg(cid, { role: "user", content: text });
    setMsgs(lsGetMsgs(cid));

    setTimeout(() => {
      let response = "";
      if (text === "요약") {
        response = `네, 사업 주제 요약을 도와드릴게요. 

가족이 함께할 수 있는 따뜻하고 감성적인 분위기의 캠핑 경험을, 편리한 서비스를 통해 제공하는 
캠핑 브랜드(서비스)를 제공하고 싶어하시는군요. 

위 비즈니스의 핵심 요소는 아래와 같습니다.
1. 가족 단위의 고객을 타깃으로 한 캠핑 서비스
2. 따뜻하고 감성적인 분위기(위치, 공간 구성 등)
3. 편리성 제공(이용 절차, 장비, 예약, 음식, 위생 등에서의 편의)

위 내용에서 추가하고 싶은 부분이 있다면 편하게 말씀해주세요 : )
또는 위 내용에 만족한다면 구체적으로 사업을 정의해볼까요?`;
      } else if (text === "아니요, 조금 더 구체화 해볼래요.") {
        response = `네, 좋습니다! 
가족 중심의 따뜻한 분위기와 편리함을 주요 서비스로 제공하고 싶다고 하셨는데요, 
이 주제를 선택한 계기(시장 분위기, 개인경험, 트렌드 등)가 있나요?`;
      }
      lsPushMsg(cid, { role: "ai", content: response });
      setMsgs(lsGetMsgs(cid));
      setResponseIndex((prev) => prev + 1);
    }, 500);
  };

  return (
    <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
      <ChatSidebar />

      <section className="flex-1 rounded-lg border bg-white flex flex-col">
        <div className="border-b p-4 text-center">
          <h2 className="text-lg font-semibold">Pitch Mate</h2>
          <p className="text-sm text-muted-foreground">
            Start a new chat to begin crafting your business plan with AI-powered guidance. The AI will reference previous inputs to provide relevant examples and personalized assistance.
          </p>
        </div>

        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {/* 첫 번째 버튼 그룹 - 항상 표시 */}
          <CategoryButtons />

          {/* 메시지들 */}
          {msgs.map((m) => (
            <div key={m.id} className="flex items-start space-x-3">
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
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* AI 응답 모두 출력 후 버튼 그룹 한 번 더 출력 및 추가 문자열 */}
          {showSummaryButtons && (
            <SummaryButtons onSelect={handleSummarySelect} />
          )}
        </div>

        <div className="sticky bottom-0 z-10 bg-background p-3">
          <div className="flex items-center rounded-md bg-secondary px-2 py-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Enter"
              className="flex-1 bg-transparent text-sm focus:outline-none text-foreground"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
