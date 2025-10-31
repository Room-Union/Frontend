import { Banner as BannerIcon } from "@/assets/icons-colored";
import { cn } from "@/utils/cn";

const Banner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "mo:h-[116.357px] pc:h-[244px] tb:h-[141.52px] pc:pl-15 pc:pr-[29.39px] tb:pl-[34.8px] tb:pr-[40.24px] mo:pl-[19px] mo:pr-[21.86px] align-self flex w-full items-center justify-between overflow-hidden rounded-[28px] bg-blue-400",
        className
      )}
    >
      <header className="pc:gap-[14px] tb:gap-[8.12px] mo:gap-[3.91px] left-0 flex flex-col">
        <h2 className="pc:typo-title-md-bold tb:typo-title-sm-bold mo:typo-body-lg-bold text-blue-25">
          함께하는 온라인 모임
        </h2>
        <h3 className="pc:typo-body-xl-semibold tb:typo-body-md-medium mo:typo-body-xs-medium text-blue-100">
          관심사가 같은 사람들과
          <br className="tb:hidden mo:block" /> 특별한 시간을 보내보세요
        </h3>
      </header>
      <BannerIcon className="pc:h-full tb:h-[144.593px] mo:h-[78.5px] pc:pt-[7.959px] tb:pt-[4.62] mo:pt:[14.51] w-auto shrink-0" />
    </div>
  );
};

export default Banner;
