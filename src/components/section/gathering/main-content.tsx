import Schedules from "@/components/section/gathering/schedules";
import CategoryBadge from "@/components/ui/badges/category-badge";
import { GetGatheringDetailResponse } from "@/types/gathering";
import Image from "next/image";
import Members from "./members";

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
              <span>생성일: {data.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-neutral-100 py-[30px]">
        <h3 className="typo-title-xs-bold pb-[14px] text-neutral-800">
          모임 설명
        </h3>
        <p className="typo-body-md-medium text-gray- whitespace-pre-wrap">
          {data.description}
        </p>
      </div>

      {/* MemberList */}
      <Members />

      {/* Schedule Section */}
      <Schedules />
    </div>
  );
};

export default MainContent;
