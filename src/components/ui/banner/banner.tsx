import { Banner as BannerIcon } from "@/assets/icons-colored";

const Banner = () => {
  return (
    <div className="flex h-[244px] w-[1200px] items-center justify-between rounded-[28px] bg-blue-400 pr-[29.39px] pl-15">
      <header className="left-0 flex flex-col gap-[14px]">
        <h2 className="typo-title-md-bold text-blue-25">
          함께하는 온라인 모임
        </h2>
        <h3 className="typo-body-xl-semibold text-blue-100">
          관심사가 같은 사람들과 특별한 시간을 보내보세요
        </h3>
      </header>
      <BannerIcon className="h-full w-auto shrink-0 pt-[7.959px]" />
    </div>
  );
};

export default Banner;
