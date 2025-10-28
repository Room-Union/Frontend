"use client";

import Empty from "@/assets/icons-colored/empty";
import GatheringCard from "@/components/ui/card/gathering-card";
import { GetGatheringCardResponse } from "@/types/gathering-list";

const GatheringGrid = ({
  gatheringList,
}: {
  gatheringList: GetGatheringCardResponse[];
}) => {
  return (
    <section className="w-full">
      {/* 그리드 */}
      {gatheringList.length > 0 ? (
        <div className="pc:grid-cols-4 mo:grid-cols-2 pc:gap-5 tb:gap-6 mo:gap-3 pc:gap-y-20 tb:gap-y-15 mo:gap-y-[30px] grid">
          {gatheringList.map((gathering) => (
            <GatheringCard
              key={gathering.meetingId}
              className="tb:w-full mo:w-full"
              gatheringInfo={{
                meetingId: gathering.meetingId,
                name: gathering.name,
                description: gathering.description,
                meetingImage: gathering.meetingImage,
                category: gathering.category,
                currentMemberCount: gathering.currentMemberCount,
                maxMemberCount: gathering.maxMemberCount,
                platformURL: gathering.platformURL,
                userId: gathering.userId,
                createdAt: gathering.createdAt,
                badges: gathering.badges,
                joined: gathering.joined,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="pc:h-[294px] tb:h-[294px] mo:h-[179px] flex w-full flex-col items-center justify-center">
          <Empty className="h-[142px] w-[217px]" />
          <span className="typo-ui-lg-medium text-gray-neutral-400">
            아직 만들어진 모임이 없어요
          </span>
        </div>
      )}
    </section>
  );
};

export default GatheringGrid;
