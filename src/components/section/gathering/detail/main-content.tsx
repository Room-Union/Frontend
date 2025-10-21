import {
  Description,
  DetailSection,
  GatheringHeader,
  Information,
  Members,
  Schedules,
} from "@/components/section";
import type { GetGatheringDetailResponse } from "@/types/gathering";

export interface MainContentProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
}

const MainContent = ({ data, isOwner }: MainContentProps) => {
  return (
    <div className="tb:px-0 pc:max-w-[790px] pc:flex-1 pc:min-w-0 w-full px-5">
      {/* Header: 이미지, 제목, 카테고리, 생성일, 모임 삭제 버튼 */}
      <GatheringHeader data={data} isOwner={isOwner} />

      {/* Information: 태블릿 이하에서 보여줌 */}
      <DetailSection className="pc:hidden">
        <Information data={data} />
      </DetailSection>

      {/* Description */}
      <DetailSection title="모임 설명">
        <Description data={data} />
      </DetailSection>

      {/* MemberList */}
      <DetailSection title="멤버들">
        <Members />
      </DetailSection>

      {/* Schedule Section */}
      <DetailSection title="모임 약속">
        <Schedules isOwner={isOwner} />
      </DetailSection>
    </div>
  );
};

export default MainContent;
