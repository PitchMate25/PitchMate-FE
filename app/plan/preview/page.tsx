// app/plan/roadmap/preview/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function PlanPreviewPage() {
  const router = useRouter();

  const goToEditPage = () => {
    router.push("/plan/draft");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 제목/설명 */}
      <h1 className="text-4xl font-black tracking-tight">캠핑용품 구독 서비스</h1>
      <div className="my-3" />
      <p className="mt-1 text-sm text-blue-900">
        고객 맞춤형 캠핑 장비를 정기적으로 배송하는 구독 모델로, 편리함과 신제품 체험을 제공
      </p>

      {/* 문서 본문 */}
      <section className="prose mt-8 max-w-none">
        {/* 사업 주제 선정 */}
        <h2 className="mb-2 text-2xl font-extrabold">사업 주제 선정</h2>
        <div className="my-4" />
        <p>
          캠핑용품 구독 서비스는 캠핑을 즐기지만 장비 구매에 부담을 느끼는 소비자들을 위해, 고객 맞춤형 장비를 정기적으로
          배송하는 구독형 모델입니다. 캠핑 장비는 가격, 보관, 유지관리 측면에서 진입장벽이 높고, 계절성과 유행 변화로 인해
          지속적인 교체 수요가 존재합니다. 본 서비스는 다양한 장비를 큐레이션하여 제공함으로써 이러한 문제를 해결하고,
          사용자에게 지속적인 캠핑 경험을 제공합니다.
        </p>

        <div className="my-8" />

        {/* 사업 정의 */}
        <h2 className="mb-2 text-2xl font-extrabold">사업 정의</h2>
        <div className="my-4" />
        <p>
          고객은 간단한 프로파일 설정을 통해 캠핑 경험 수준, 선호 장비, 캠핑 유형(솔로, 가족 등), 이용 시기 등을 입력합니다.
          이를 바탕으로 시즌별 장비 패키지를 구성해 정기 배송합니다. 구성품은 텐트, 랜턴, 의자, 테이블, 조리도구 등 기본 장비뿐
          아니라 캠핑 테마에 맞춘 특화 아이템(예: 여름엔 쿨러, 겨울엔 방한 텐트)도 포함됩니다. 또한 일정 사용 후 마음에 드는
          제품은 할인된 가격에 구매가 가능하며, 일부 브랜드 협찬 제품이 포함될 수 있습니다.
        </p>

        <div className="my-8" />

        {/* 시장 조사 및 분석 */}
        <h2 className="mb-2 text-2xl font-extrabold">시장 조사 및 분석</h2>
        <div className="my-4" />
        <p>
          국내 캠핑 인구는 700만 명 이상으로, MZ세대를 중심으로 계속 증가하고 있습니다. 특히 연간 1~3회 이상의
          ‘라이트 캠퍼’ 비중이 높으며, 이들은 고가 장비 구매보다 구독이나 대여 형태의 간편한 소비를 선호합니다.
          경쟁사 대부분은 단일 브랜드 대여 혹은 일회성 렌탈에 국한되어 있어, 개인화된 정기 구독 모델은 시장에서 확실한
          차별성을 가질 수 있습니다.
        </p>

        <div className="my-8" />

        {/* 비즈니스 모델 수립 */}
        <h2 className="mb-2 text-2xl font-extrabold">비즈니스 모델 수립</h2>
        <div className="my-4" />
        <ul className="list-disc pl-6">
          <li>
            <strong>수익 구조:</strong> 월 정액제 구독료 / 리퍼브 제품 판매 / 브랜드 광고 및 제휴 콘텐츠
          </li>
          <li>
            <strong>고객 유치 전략:</strong> 장기 이용자 대상 맞춤 혜택 제공, 캠핑 후기 기반 커뮤니티 운영 
          </li>
          <li>
            <strong>운영 전략:</strong> 외부 물류 대행과 제휴, 회수 및 소독 시스템 구축, 장비 상태 관리 자동화
          </li>
          <li>
            <strong>파트너십:</strong> 캠핑 장비 브랜드, 인플루언서, 지역 캠핑장 등과의 협업
          </li>
        </ul>
      </section>

      {/* 우측 하단 플로팅 액션 */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button
          onClick={goToEditPage}
          className="rounded-md border bg-white px-4 py-2 text-sm text-black font-semibold shadow"
        >
          수정
        </button>
        <button
          className="rounded-md bg-[#4F7DF2] px-4 py-2 text-sm text-black font-semibold shadow"
          onClick={() => alert("(데모) PDF 내보내기")}
        >
          Export as PDF
        </button>
        <button
          className="rounded-md bg-[#1d4ed8] px-4 py-2 text-sm text-black font-semibold shadow"
          onClick={() => alert("(데모) DOCX 내보내기")}
        >
          Export as DOCX
        </button>
      </div>
    </div>
  );
}
