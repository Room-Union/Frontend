import React from "react";
import { GetGatheringCardResponse } from "@/types/gathering-list";
import CategoryBadge from "../badges/category-badge";
import Image from "next/image";
import StatusBadge from "../badges/status-badge";
import UserIcon from "@/assets/icons/users";
import Link from "next/link";

const GatheringCard = ({
  gatheringInfo,
}: {
  gatheringInfo: GetGatheringCardResponse;
}) => {
  return (
    <Link href={`/gathering/detail/${gatheringInfo.id}`}>
      <div className="relative w-[285px] flex-none cursor-pointer">
        {/* 마감된 모임이에요 썸네일 */}
        {gatheringInfo.currentMemberCount === gatheringInfo.maxMemberCount && (
          <div className="bg-base-black-a-600 text-base-white typo-title-sm-bold absolute top-0 left-0 flex h-[214px] w-full items-center justify-center rounded-[20px] text-center tracking-[-0.6px]">
            마감된 모임이에요
          </div>
        )}

        {/* 썸네일 */}
        <Image
          className="h-[214px] w-full rounded-[20px] object-cover"
          src={gatheringInfo.image || "/unsplash_laNNTAth9vs.png"}
          alt={gatheringInfo.title}
          width={285}
          height={214}
        />

        {/* 상태 뱃지 */}
        <StatusBadge
          status={gatheringInfo.status}
          className="absolute top-[20px] right-[20px]"
        />

        {/* 본문 */}
        <div className="pt-[18px] pr-1 pl-1">
          {/* 모임 명 */}
          <span className="typo-title-xs-semibold text-gray-neutral-900 truncate tracking-[-0.5px]">
            {gatheringInfo.title}
          </span>

          {/* 카테고리 뱃지 및 인원 수 */}
          <div className="flex items-center justify-between pt-[16px]">
            {/* 카테고리 뱃지 */}
            <CategoryBadge category={gatheringInfo.category} />
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
