const UserProfileSkeleton = () => {
  return (
    <section className="tb:flex w-full items-center justify-center">
      <div className="mo:self-stretch tb:self-auto pc:px-13 pc:py-7 tb:px-[30px] tb:py-6 mo:px-5 mo:py-6 pc:gap-6 tb:gap-5 mo:gap-[19.47px] bg-blue-25 pc:rounded-[50px] tb:rounded-[36px] mo:rounded-[30px] tb:w-[385px] pc:h-[335px] tb:h-[287px] mo:h-[214px] flex flex-col items-center justify-center border border-blue-300">
        <div className="pc:gap-[18px] tb:gap-[14px] mo:gap-2 flex flex-col items-center justify-center">
          <div className="mo:p-[5px] tb:p-0 flex items-center justify-center">
            <div className="bg-gray-neutral-300 tb:w-[114px] tb:h-[114px] mo:w-11 mo:h-11 h-[40px] w-[40px] animate-pulse rounded-full" />
          </div>
          <div className="pc:gap-2 tb:gap-[6px] mo:gap-1 flex flex-col items-center justify-center">
            <div className="bg-gray-neutral-300 h-5 w-20 animate-pulse rounded-full"></div>
            <div className="bg-gray-neutral-300 h-5 w-50 animate-pulse rounded-full"></div>
          </div>
        </div>
        <div className="pc:gap-3 tb:gap-[9.735px] mo:gap-[9.74px] flex items-center justify-center">
          <div className="bg-gray-neutral-300 flex h-[38px] w-[109px] animate-pulse rounded-[10px]"></div>
          <div className="bg-gray-neutral-300 flex h-[38px] w-[109px] animate-pulse rounded-[10px]"></div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileSkeleton;
