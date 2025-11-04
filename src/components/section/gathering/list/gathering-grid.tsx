"use client";

import { Empty, Search } from "@/assets/icons-colored";
import GatheringCard from "@/components/ui/card/gathering-card";
import { GetGatheringCardResponse } from "@/types/gathering-list";

interface GatheringGridProps {
  gatheringList: GetGatheringCardResponse[];
  isSearchMode?: boolean;
}

const GatheringGrid = ({
  gatheringList,
  isSearchMode = false,
}: GatheringGridProps) => {
  return (
    <section className="w-full">
      {/* 그리드 */}
      {gatheringList.length > 0 ? (
        <div className="pc:grid-cols-4 mo:grid-cols-2 pc:gap-x-5 tb:gap-x-6 mo:gap-x-3 pc:gap-y-20 tb:gap-y-15 mo:gap-y-[30px] grid">
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
        <div className="pc:h-[520px] tb:h-[635px] mo:h-[515px] flex w-full flex-col items-center justify-center">
          {isSearchMode ? (
            <>
              <Search className="tb:w-[90px] tb:h-[90px] mo:w-[70px] mo:h-[70px] pc:mb-6 tb:mb-5 mo:mb-4" />
              <span className="typo-ui-xl-semibold text-gray-neutral-900 pc:mb-3 tb:mb-[10px] mo:mb-2">
                검색 결과가 없습니다.
              </span>

              <span className="tyop-ui-lg-semibold text-gray-neutral-400">
                검색어를 다시 한번 확인해보세요.
              </span>
            </>
          ) : (
            <>
              <Empty className="tb:mb-5 mo:mb-4 h-[142px] w-[217px]" />
              <span className="typo-ui-lg-medium text-gray-neutral-400">
                아직 만들어진 모임이 없어요
              </span>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default GatheringGrid;
