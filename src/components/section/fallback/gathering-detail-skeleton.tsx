const GatheringDetailSkeleton = () => {
  return (
    <div className="pc:max-w-[1280px] pc:pt-12 tb:pt-9 mo:pt-[25px] pc:pb-[30.5px] mx-auto animate-pulse bg-white pb-0">
      <div className="pc:flex-row flex flex-col justify-between gap-[30px]">
        {/* Main Content Skeleton */}
        <div className="tb:px-0 pc:max-w-[790px] pc:flex-1 pc:min-w-0 w-full">
          {/* Header Skeleton */}
          <div className="mb-6">
            {/* Image Skeleton */}
            <div className="tb:rounded-3xl relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200" />

            {/* Title & Category & CreatedAt Skeleton */}
            <div className="tb:py-6 space-y-[6px] py-4.5">
              <div className="tb:h-10 h-6 w-3/4 rounded-lg bg-neutral-200" />
              <div className="flex gap-2.5">
                <div className="h-6 w-20 rounded-full bg-neutral-200" />
                <div className="h-6 w-32 rounded bg-neutral-200" />
              </div>
            </div>
          </div>

          {/* Information (태블릿 이하) */}
          <div className="pc:hidden tb:py-5 mb-6 rounded-2xl border-neutral-200 py-2">
            <div className="space-y-3">
              <div className="h-5 w-24 rounded bg-neutral-200" />
              <div className="h-5 w-36 rounded bg-neutral-200" />
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="tb:py-9 mb-6 rounded-2xl border-neutral-200 py-4">
            <div className="mb-4 h-6 w-24 rounded bg-neutral-200" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-neutral-200" />
              <div className="h-4 w-full rounded bg-neutral-200" />
              <div className="h-4 w-2/3 rounded bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="pc:top-[30px] pc:w-[380px] pc:mx-0 pc:h-fit pc:rounded-[20px] pc:border pc:border-neutral-200 pc:p-6 tb:-mx-6 mo:-mx-5 tb:py-6 sticky bottom-0 z-10 border-t border-neutral-200 bg-white py-3">
          <div className="tb:px-6 mo:px-5 pc:px-0">
            {/* Information (PC) */}
            <div className="pc:block pc:pt-2 hidden space-y-7">
              <div className="h-5 w-24 rounded bg-neutral-200" />
              <div className="h-5 w-36 rounded bg-neutral-200" />
              <div className="tb:h-[60px] tb:rounded-2xl h-12 w-full rounded-xl bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatheringDetailSkeleton;
