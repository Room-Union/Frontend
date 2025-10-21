"use client";

import LinkButton from "@/components/ui/button/link-button";
import GatheringCard from "@/components/ui/card/gathering-card";
import Empty from "@/assets/icons-colored/empty";
import { GetGatheringCardResponse } from "@/types/gathering-list";

const GatheringGrid = ({
  title,
  subTitle,
  moreLink,
  gatheringList,
}: {
  title: string;
  subTitle: string;
  moreLink: string;
  gatheringList: GetGatheringCardResponse[];
}) => {
  return (
    <section className="w-full">
      {/* 헤더 */}
      <header className="mb-7 flex flex-row items-center justify-between">
        <div>
          <h2 className="typo-title-sm-semibold text-gray-neutral-900 mb-3">
            {title}
          </h2>
          <h3 className="typo-ui-lg-md text-gray-neutral-400">{subTitle}</h3>
        </div>
        <LinkButton className="sticky right-0" href={`${moreLink}`} />
      </header>

      {/* 그리드 */}
      {gatheringList.length > 0 ? (
        <div className="pc:grid-cols-4 grid grid-cols-2 gap-5">
          {gatheringList.slice(0, 8).map((gathering) => (
            <GatheringCard
              key={gathering.meetingId}
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
