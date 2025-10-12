import DetailSection from "@/components/section/gathering/detail-section";
import Information from "@/components/section/gathering/information";
import Members from "@/components/section/gathering/members";
import Schedules from "@/components/section/gathering/schedules";
import CategoryBadge from "@/components/ui/badges/category-badge";

import { GetGatheringDetailResponse } from "@/types/gathering";
import formatDate from "@/utils/format-date";
import Image from "next/image";

const MainContent = ({ data }: { data: GetGatheringDetailResponse }) => {
  return (
    <div className="mo:px-6 tb:px-0 w-full max-w-[790px] px-5">
      <div>
        {/* Image Banner */}
        {data.meetingImage ? (
          <div className="h-[197.5px] w-full rounded-3xl bg-neutral-200">
            <Image src={data.meetingImage} alt={data.name} fill />
          </div>
        ) : (
          <div className="h-[197.5px] w-full rounded-3xl bg-neutral-200" />
        )}

        {/* Title & Category & CreatedAt */}
        <div className="space-y-[6px] py-6">
          {/* Title */}
          <h2 className="typo-title-md-bold h-10">{data.name}</h2>

          <div className="flex items-center gap-[10px]">
            {/* Category */}
            <CategoryBadge category={data.category} />

            {/* CreatedAt */}
            <div className="typo-body-sm-medium text-neutral-400">
              <span>생성일 {formatDate(data.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information: 태블릿 이하에서 보여줌 */}
      <DetailSection className="tb:hidden">
        <Information data={data} />
      </DetailSection>

      {/* Description */}
      <DetailSection title="모임 설명">
        <p className="typo-body-md-medium text-gray- whitespace-pre-wrap">
          {data.description}
        </p>
      </DetailSection>

      {/* MemberList */}
      <Members />

      {/* Schedule Section */}
      <Schedules />
    </div>
  );
};

export default MainContent;
