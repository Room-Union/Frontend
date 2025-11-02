import EmptyImage from "@/assets/icons-colored/empty-image";
import UserIcon from "@/assets/icons/users";
import {
  BadgeList,
  CategoryBadge,
  ClosedGatheringOverlay,
} from "@/components/ui";
import { GetGatheringCardResponse } from "@/types/gathering-list";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const GatheringCard = ({
  gatheringInfo,
  className,
}: {
  gatheringInfo: GetGatheringCardResponse;
  className?: string;
}) => {
  return (
    <Link href={`/gathering/detail/${gatheringInfo.meetingId}`}>
      <div
        className={cn(
          "tb:w-[275px] mo:w-[200px] relative cursor-pointer",
          "[container-type:inline-size]",
          className
        )}
      >
        {/* 썸네일 */}
        <div className="pc:max-w-[275px] mo:w-full relative aspect-[4/3] overflow-hidden rounded-[20px] bg-neutral-100">
          {gatheringInfo.meetingImage ? (
            <Image
              className="rounded-[20px] object-cover"
              src={gatheringInfo.meetingImage}
              alt={gatheringInfo.name}
              fill
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <EmptyImage className="absolute bottom-0" />
            </div>
          )}
          {/* 마감된 모임이에요 오버레이 */}
          {gatheringInfo.currentMemberCount ===
            gatheringInfo.maxMemberCount && <ClosedGatheringOverlay />}
        </div>

        {/* 상태 뱃지 */}
        {gatheringInfo.badges.length > 0 && (
          <div className="tb:top-[20px] tb:right-[20px] absolute top-[12px] right-[12px] flex gap-[6px]">
            <BadgeList badges={gatheringInfo.badges} />
          </div>
        )}

        {/* 본문 */}
        <div className="tb:pt-[18px] mo:pt-[12px] pr-1 pl-1">
          {/* 모임 명 */}
          <span className="tb:typo-title-xs-semibold mo:typo-ui-md-semibold text-gray-neutral-900 block truncate">
            {gatheringInfo.name}
          </span>

          {/* 카테고리 뱃지 및 인원 수 */}
          <div className="tb:pt-4 mo:pt-2 flex items-center justify-between">
            {/* 카테고리 뱃지 */}
            <CategoryBadge
              category={gatheringInfo.category}
              className="tb:typo-ui-sm-medium tb:px-[8px] tb:py-[6px]"
              size="sm"
            />
            {/* 인원 수 */}
            <span className="tb:typo-ui-md-medium text-gray-neutral-400 mo:typo-ui-xs-medium tb:gap-[6px] mo:gap-1 inline-flex items-center">
              <UserIcon className="h-[1em] w-[1em] fill-current stroke-none" />
              {gatheringInfo.currentMemberCount}/{gatheringInfo.maxMemberCount}
              명
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GatheringCard;
