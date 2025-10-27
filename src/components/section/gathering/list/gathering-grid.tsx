"use client";

import Empty from "@/assets/icons-colored/empty";
import LinkButton from "@/components/ui/button/link-button";
import GatheringCard from "@/components/ui/card/gathering-card";
import { GetGatheringCardResponse } from "@/types/gathering-list";
import { cn } from "@/utils/cn";

const GatheringGrid = ({
  title,
  subTitle,
  moreLink,
  gatheringList,
  containerClassName,
  gridClassName,
}: {
  title: string;
  subTitle: string;
  moreLink: string;
  gatheringList: GetGatheringCardResponse[];
  containerClassName?: string;
  gridClassName?: string;
}) => {
  return (
    <section className="w-full">
      {/* 헤더 */}
      <header className="mb-7 flex flex-row items-center justify-between">
        <div>
          <h2 className="tb:typo-title-sm-semibold text-gray-neutral-900 mo:typo-title-2xs-semibold mb-3">
            {title}
          </h2>
          <h3 className="tb:typo-ui-lg-md sm:typo-ui-sm-medium text-gray-neutral-400">
            {subTitle}
          </h3>
        </div>
        <LinkButton className="sticky right-0" href={`${moreLink}`} />
      </header>

      {/* 그리드 */}
      {gatheringList.length > 0 ? (
        // ToDo: 모임 리스트와 공통 부분 추가 필요
        // 스크롤을 위한 컨테이너
        <div className={cn("", containerClassName)}>
          <div className={cn("", gridClassName)}>
            {gatheringList.map((gathering) => (
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
