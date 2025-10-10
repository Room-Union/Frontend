import Schedules from "@/components/section/gathering/schedules";
import { GetGatheringDetailResponse } from "@/types/gathering";

const MainContent = ({ data }: { data: GetGatheringDetailResponse }) => {
  return (
    <div className="space-y-6 lg:col-span-2">
      {/* Image Banner */}
      {/* description: 이미지 출력 테스트 완료함, 와이어프레임 단계에서는 조건부 이미지 처리 생략 */}
      <div className="flex h-72 items-center justify-center bg-neutral-200">
        <span className="text-stone-500">[관련 이미지 배너]</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold">{data.name}</h1>

      {/* Category */}
      <div className="inline-block bg-zinc-300 px-3 py-1 text-sm text-zinc-800">
        {data.category}
      </div>

      {/* MemberCount */}
      <div className="text-base">
        👥 {data.currentMemberCount}/{data.maxMemberCount}명 참여 중
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">모임 설명</h2>
        <div className="bg-stone-50 p-6">
          <p className="leading-7 text-zinc-800">{data.description}</p>
        </div>
      </div>

      {/* Schedule Section */}
      <Schedules />
    </div>
  );
};

export default MainContent;
