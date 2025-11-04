import AlertCircle from "@/assets/icons-colored/alert-circle";

const GatheringListSectionFallback = () => {
  return (
    <section className="pc:h-[404px] mo:h-[306px] tb:h-[394px] flex flex-col items-center justify-center">
      <AlertCircle className="tb:h-[120px] tb:w-[120px] mo:h-[110px] mo:w-[80px]" />
      <span className="pc:mt-6 tb:mt-[22px] mo:mt-4 typo-ui-lg-medium text-gray-neutral-500">
        해당 섹션을 조회하지 못했습니다
      </span>
    </section>
  );
};

export default GatheringListSectionFallback;
