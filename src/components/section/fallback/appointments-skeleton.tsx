const AppointmentsSkeleton = () => {
  return (
    <section className="pc:mx-0 tb:-mx-6 mo:-mx-5 animate-pulse pt-1">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="pc:first:ml-0 tb:first:ml-6 mo:first:ml-5 pc:last:mr-0 tb:last:mr-6 mo:last:mr-5 flex-shrink-0"
          >
            <div className="tb:h-[170px] tb:w-[340px] tb:rounded-[20px] tb:px-5 tb:pb-[18px] tb:pt-5 flex h-[138px] w-[282px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-[14px] pt-[14px] pb-[12px]">
              {/* Info Area */}
              <div className="tb:gap-[14px] flex w-full items-center gap-[12px]">
                {/* Profile Image Skeleton */}
                <div className="tb:size-[76px] size-[60px] flex-shrink-0 rounded-full bg-neutral-200" />

                <div className="flex min-w-0 flex-1 flex-col">
                  {/* Title Skeleton */}
                  <div className="tb:pb-[10px] pb-[8px]">
                    <div className="tb:h-6 h-5 w-32 rounded bg-neutral-200" />
                  </div>

                  {/* Date & Time Skeleton */}
                  <div className="tb:gap-[8px] flex flex-col gap-[4px]">
                    <div className="h-4 w-24 rounded bg-neutral-200" />
                    <div className="h-4 w-20 rounded bg-neutral-200" />
                  </div>
                </div>
              </div>

              {/* Progress Bar & Button Area */}
              <div className="flex h-[38px] w-full items-center justify-between gap-2.5">
                {/* Progress Bar Skeleton */}
                <div className="flex flex-1 items-center gap-2">
                  <div className="size-6 rounded bg-neutral-200" />
                  <div className="h-2 flex-1 rounded-full bg-neutral-200" />
                  <div className="h-4 w-10 rounded bg-neutral-200" />
                </div>

                {/* Button Skeleton */}
                <div className="h-[38px] w-[83px] rounded-lg bg-neutral-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppointmentsSkeleton;
