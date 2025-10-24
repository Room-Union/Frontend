import EmptyImage from "@/assets/icons-colored/empty-image";
import UserIcon from "@/assets/icons/users";
import { BadgeList, CategoryBadge } from "@/components/ui";
import { GetGatheringCardResponse } from "@/types/gathering-list";
import Image from "next/image";
import Link from "next/link";

const GatheringCard = ({
  gatheringInfo,
}: {
  gatheringInfo: GetGatheringCardResponse;
}) => {
  return (
    <Link href={`/gathering/detail/${gatheringInfo.meetingId}`}>
      <div className="tb:w-[275px] relative w-[200px] flex-none cursor-pointer">
        {/* 썸네일 */}
        <div className="tb:h-[214px] relative h-[150px] w-full overflow-hidden rounded-[20px] bg-neutral-100">
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
        </div>

        {/* 마감된 모임이에요 썸네일 */}
        {gatheringInfo.currentMemberCount === gatheringInfo.maxMemberCount && (
          <div className="bg-base-black-a-600 text-base-white typo-ui-md-bold tb:typo-title-sm-bold tb:h-[214px] tb:w-full absolute top-0 left-0 flex h-[150px] w-[200px] items-center justify-center rounded-[20px] text-center tracking-[-0.6px]">
            마감된 모임이에요
          </div>
        )}

        {/* 상태 뱃지 */}
        {gatheringInfo.badges.length > 0 && (
          <div className="tb:top-[20px] tb:right-[20px] absolute top-[12px] right-[12px] flex gap-[6px]">
            <BadgeList badges={gatheringInfo.badges} />
          </div>
        )}

        {/* 본문 */}
        <div className="pt-[18px] pr-1 pl-1">
          {/* 모임 명 */}
          <span className="typo-title-xs-semibold text-gray-neutral-900 truncate tracking-[-0.5px]">
            {gatheringInfo.name}
          </span>

          {/* 카테고리 뱃지 및 인원 수 */}
          <div className="flex items-center justify-between pt-[16px]">
            {/* 카테고리 뱃지 */}
            <CategoryBadge
              category={gatheringInfo.category}
              className="tb:typo-ui-sm-medium tb:px-[8px] tb:py-[6px] tb:tracking-[-0.14px]"
              size="sm"
            />
            {/* 인원 수 */}
            <span className="typo-ui-md-medium text-gray-neutral-400 inline-flex items-center tracking-[-0.5px]">
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
