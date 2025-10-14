import DetailSection from "@/components/section/gathering/detail-section";
import GatheringHeader from "@/components/section/gathering/gathering-header";
import Information from "@/components/section/gathering/information";
import Members from "@/components/section/gathering/members";
import Schedules from "@/components/section/gathering/schedules";

import { GetGatheringDetailResponse } from "@/types/gathering";
import Description from "./description";

export interface MainContentProps {
  data: GetGatheringDetailResponse;
}

const MainContent = ({ data }: MainContentProps) => {
  return (
    <div className="mo:px-6 tb:px-0 w-full max-w-[790px] px-5">
      {/* Header: 이미지, 제목, 카테고리, 생성일 */}
      <GatheringHeader data={data} />

      {/* Information: 태블릿 이하에서 보여줌 */}
      <DetailSection className="tb:hidden">
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
        <Schedules />
      </DetailSection>
    </div>
  );
};

export default MainContent;
