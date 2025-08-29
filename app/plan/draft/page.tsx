// app/plan/draft/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function EditableSection({
  title,
  initialContent,
}: {
  title: string;
  initialContent: string;
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {editing ? (
        <>
          <textarea
            className="w-full rounded border p-2 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
          <Button onClick={() => setEditing(false)} className="mt-2">
            저장
          </Button>
        </>
      ) : (
        <>
          <p className="whitespace-pre-line">{content}</p>
          {/* 회색 버튼 적용 */}
          <Button onClick={() => setEditing(true)} variant="secondary" className="mt-2 font-semibold">
            부분 수정
          </Button>
        </>
      )}
    </section>
  );
}

type Section = { id: string; title: string; content: string };

export default function PlanDriftPage() {
  // 섹션들을 배열 상태로 관리
  const [sections, setSections] = useState<Section[]>([
    {
      id: "s1",
      title: "사업 주제 선정",
      content:
        `캠핑은 대중화되면서 고급 장비에 대한 수요는 높아졌지만, 비용과 보관 문제로 장비 구매에 부담을 느끼는 사용자들이 증가하고 있습니다. 특히 주말이나 연휴 등 특정 시기에만 캠핑을 즐기는 '라이트 캠퍼'들은 구매보다는 공유나 대여를 선호하는 경향이 뚜렷합니다. 또한, 장비는 계절과 트렌드에 따라 변화가 잦고, 다양한 브랜드의 장비를 경험해보고 싶은 니즈도 존재합니다. 이러한 시장 변화를 반영해, 고객 맞춤형으로 구성된 캠핑 장비를 일정 주기 배송하는 구독하는 서비스 모델을 사업 주제로 선정하였습니다. 기존의 일회성 대여와는 달리, 지속적이고 개인화된 경험을 제공하는 점이 핵심 차별 요소입니다.`,
    },
    {
      id: "s2",
      title: "사업 정의",
      content:
        `'캠핑기어 박스'는 고객의 캠핑 스타일, 인원, 경험 수준, 선호 장비 등을 분석하여 맞춤형 캠핑 패키지를 정기 배송하는 구독 서비스입니다. 예를 들어, 혼자 캠핑을 시작하는 고객에게는 경량·컴팩트한 장비 위주로, 가족 단위 고객에게는 대형 탠트, 키친테이블, 안전용품 등을 포함한 구성이 제공됩니다. 또한 계절과 캠핑 시즌에 따라 구성품이 바뀌어 늘 새롭고 실용적인 캠핑이 가능하게 됩니다. 고객은 구매 부담 없이 다양한 브랜드의 최신 장비를 체험하고, 일부 장비는 일정 기간 후 할인된 가격에 구매 옵션도 제공됩니다. 이 서비스는 단순한 렌탈이 아니라, 맞춤형 캠핑 경험을 큐레이션하는 플랫폼으로 정의되고자 합니다.`,
    },
    {
      id: "s3",
      title: "시장 조사 및 분석",
      content:
        `국내 캠핑 인구는 COVID-19 이후 급증해 700만 명을 넘어섰으며, 그중 상당수가 연 1-3회 이하로 캠핑을 즐기는 라이트 유저입니다. 이러한 유저층은 고가 장비를 직접 구매하기보다는 접근성 높고 관리할 필요 없는 서비스형 모델을 선호합니다. 글로벌 시장에서는 이미 'outdoor gear subscription' 형태의 모델이 북미 및 유럽에서 확산 중이며, 국내에는 유사 모델이 거의 없어 시장 진입 기회가 큽니다. 또한, 캠핑 유튜버와 인플루언서를 통한 트렌드 확산 속도도 빠르기 때문에, 브랜드 인지도 확보가 상대적으로 용이합니다. 경쟁사 분석 결과, 대부분이 단순 렌탈 중심이거나 특정 브랜드 제한형이어서, 개인화 + 구독 기반 모델은 시장에서 분명한 차별성과 경쟁력을 가질 수 있습니다.`,
    },
    {
      id: "s4",
      title: "비즈니스 모델 수립",
      content:
        `수익은 구독료(월 정액제)에서 발생하며, 구독 요금제는 '라이트', '베이직', '프리미엄' 등으로 다양하게 구성됩니다. 구독자 확보 후, 장비 제작사 및 유통사와 제휴를 통해 B2B 단가를 낮추고, 일정 기간 후 장비 판매를 유도하는 중고 판매/리퍼브 수익 모델도 병행할 수 있습니다. 또, 고객 데이터를 기반으로 한 장비 추천 AI 알고리즘, 체험 후기 콘텐츠 제작, 캠핑 정보 제공 등을 통해  플랫폼을 확장할 수 있습니다. 정기 배송 시스템은 물류 대행사 또는 자체 물류 구축으로 대응하며, 장비 회수 및 점검, 소독 시스템도 서비스 신뢰성 유지의 핵심이 됩니다. 나아가, 브랜드 협찬 제품 삽입 및 캠핑 체험 키트 구성을 통해 부가 수익원 확보가 가능합니다.`,
    },
    {
      id: "s5",
      title: "요약",
      content:
        `'캠핑용퓸 구독 서비스'는 캠핑에 관심은 있지만 장비 구매에 부담을 느끼는 고객층을 타겟으로 한, 개인화된 장비 정기 배송 모델입니다. 정기 구독을 통해 다양한 장비를 편리하게 경험하고, 플랫폼은 고객 데이터를 축적하여 더욱 정교한 장비 제공 서비스를 제공합니다. 국내 시장의 높은 수요 대비 유사 경쟁사가 적어, 선점 효과와 브랜드 확장 가능성이 큽니다. 단순 렌탈이 아닌 '경험 중심의 캠핑 큐레이션 서비스'로 자리매김함으로써, MZ세대를 중심으로 새로운 캠핑 소비 문화를 창출할 수 있는 기회가 됩니다. PitchMate는 이 아이디어를 대형 AI로 구체화하고, 핵심 요소를 반영한 사업계획서로 작성까지 빠르게 완성하도록 도와줍니다.`,
    },
  ]);

  // 항목 추가
  const addSection = () =>
    setSections((prev) => [
      ...prev,
      {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        title: "새 항목",
        content: "",
      },
    ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 제목/설명 + 오른쪽 '항목 추가' 버튼 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold">캠핑용품 구독 서비스</h1>
        <p className="mt-3 text-sm text-blue-900">
            고객 맞춤형 캠핑 장비를 정기적으로 배송하는 구독 모델로, 편리함과 신제품 체험을 제공
          </p>
        </div>

        {/* 회색 버튼 적용 */}
        <Button
          onClick={addSection}
          variant="secondary"
          className="font-semibold px-4 py-2 whitespace-nowrap"
        >
          항목 추가
        </Button>
      </div>

      <div className="my-8" />

      {/* 편집 가능한 섹션들 */}
      {sections.map((s) => (
        <EditableSection key={s.id} title={s.title} initialContent={s.content} />
      ))}
    </div>
  );
}
