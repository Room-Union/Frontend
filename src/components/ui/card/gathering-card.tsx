import React from 'react'
import { GetGatheringCardResponse } from '@/types/gathering-list'
import CategoryBadge from '../badges/category-badge'
import Image from 'next/image'
import StatusBadge from '../badges/status-badge'
import UserIcon from '@/assets/icons/users'

const GatheringCard = ({ gatheringInfo }: { gatheringInfo: GetGatheringCardResponse }) => {
  return (
    <div className="relative w-[285px]" >
      {/* 마감된 모임이에요 썸네일 */}
      {gatheringInfo.currentMemberCount === gatheringInfo.maxMemberCount && (
        <div className="absolute top-0 left-0 w-full h-[214px] rounded-[20px] bg-base-black-a-600 text-base-white text-[24px] leading-[24px] tracking-[-0.6px] font-Pretendard-normal font-bold text-center flex items-center justify-center">마감된 모임이에요</div>
      )}

      {/* 썸네일 */}
      <Image className="w-full h-[214px] rounded-[20px] object-cover" src={gatheringInfo.image || '/unsplash_laNNTAth9vs.png'} alt={gatheringInfo.title} width={285} height={214} />

      {/* 상태 뱃지 */}
      <StatusBadge status={gatheringInfo.status} className="absolute top-[20px] right-[20px]" />

      {/* 본문 */}
      <div className="pl-1 pr-1 pt-[18px]">
        {/* 모임 명 */}
        <span className="truncate font-Pretendard-normal text-[20px] leading-[20px] tracking-[-0.5px] text-gray-neutral-900">{gatheringInfo.title}</span>

        {/* 카테고리 뱃지 및 인원 수 */}
        <div className="pt-[16px] flex items-center justify-between">
          {/* 카테고리 뱃지 */}
          <CategoryBadge category={gatheringInfo.category} />
          {/* 인원 수 */}
          <span className="inline-flex items-center text-[16px] leading-[16px] tracking-[-0.5px] text-gray-neutral-400">
            <UserIcon className="w-[1em] h-[1em] fill-current stroke-none" />
            {gatheringInfo.currentMemberCount}/{gatheringInfo.maxMemberCount}명
          </span>
        </div>
      </div>
    </div>
  )
}

export default GatheringCard