const GatheringGridSkeleton = () => {
  const skeletonCards = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="tb:w-full mo:w-full group relative">
      {/* 썸네일 */}
      <div className="pc:max-w-[275px] mo:w-full bg-gray-neutral-200 relative aspect-[4/3] animate-pulse rounded-[20px]" />
      {/* 본문 */}
      <div className="tb:pt-[18px] mo:pt-[12px] pr-1 pl-1">
        {/* 모임 명 */}
        <div className="bg-gray-neutral-200 tb:h-5 mo:h-4 mb-2 w-25 animate-pulse rounded" />
        {/* 카테고리 뱃지 및 인원 수 */}
        <div className="tb:pt-4 mo:pt-2 flex items-center justify-between">
          {/* 카테고리 뱃지 */}
          <div className="bg-gray-neutral-200 tb:px-[8px] tb:py-[6px] tb:h-5 mo:h-4 w-16 animate-pulse rounded" />
          {/* 인원 수 */}
          <div className="bg-gray-neutral-200 tb:h-4 mo:h-[13px] w-20 animate-pulse rounded" />
        </div>
      </div>
    </div>
  ));

  return (
    <section className="w-full">
      <div className="pc:grid-cols-4 mo:grid-cols-2 pc:gap-x-5 tb:gap-x-6 mo:gap-x-3 pc:gap-y-20 tb:gap-y-15 mo:gap-y-[30px] grid">
        {skeletonCards}
      </div>
    </section>
  );
};

export default GatheringGridSkeleton;
