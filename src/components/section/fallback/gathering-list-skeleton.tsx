const GatheringListSkeleton = ({ subTitle = true }: { subTitle?: boolean }) => {
  const skeletonCards = Array.from({ length: 4 }, (_, index) => (
    <li key={index}>
      <div className="tb:w-[275px] mo:w-[200px] group relative">
        {/* 썸네일 */}
        <div className="pc:max-w-[275px] mo:w-full bg-gray-neutral-200 relative aspect-[4/3] animate-pulse rounded-[20px]" />
        {/* 본문 */}
        <div className="tb:pt-[18px] mo:pt-[12px] pr-1 pl-1">
          {/* 모임 명 */}
          <div className="bg-gray-neutral-200 tb:h-5 mo:h-4 w-25 animate-pulse rounded" />
          {/* 카테고리 뱃지 및 인원 수 */}
          <div className="tb:pt-4 mo:pt-2 flex items-center justify-between">
            {/* 카테고리 뱃지 */}
            <div className="bg-gray-neutral-200 tb:px-[8px] tb:py-[6px] tb:h-6.5 mo:h-5.5 w-16 animate-pulse rounded" />
            {/* 인원 수 */}
            <div className="bg-gray-neutral-200 tb:h-4 mo:h-[13px] w-15 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <section className="w-full">
      {/* 헤더 */}
      <header className="pc:mb-7 mo:mb-[22px] flex flex-row items-center justify-between">
        <div>
          <div className="bg-gray-neutral-200 pc:mb-3 mo:mb-2 tb:h-6 mo:h-[18px] w-54 animate-pulse rounded" />
          {subTitle && (
            <div className="bg-gray-neutral-200 tb:h-[18px] mo:h-[14px] w-48 animate-pulse rounded" />
          )}
        </div>
        <div className="bg-gray-neutral-200 tb:h-[18px] mo:h-[14px] w-12 animate-pulse rounded" />
      </header>
      {/* 캐러셀 */}
      <section>
        <div className="my-3 py-3">
          <ul className="flex w-fit flex-row gap-5">{skeletonCards}</ul>
        </div>
      </section>
    </section>
  );
};

export default GatheringListSkeleton;
