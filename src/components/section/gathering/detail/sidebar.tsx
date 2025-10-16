import Information from "@/components/section/gathering/detail/information";
import { Button } from "@/components/ui";
import { GetGatheringDetailResponse } from "@/types/gathering";

interface SideBarProps {
  data: GetGatheringDetailResponse;
}

const SideBar = ({ data }: SideBarProps) => {
  return (
    <div className="bg-base-white pc:sticky pc:top-[50px] pc:w-[380px] pc:rounded-[20px] pc:border pc:border-neutral-100 pc:p-6 mo:px-6 flex h-fit w-full shrink-0 flex-col gap-[10px] border-t border-neutral-200 px-5 py-6">
      {/* Information: 태블릿 이상에서 보여줌, 이하에서 숨김 */}
      <Information data={data} className="hidden" />

      <Button
        type="button"
        variant="primary"
        size="md"
        className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl mt-[10px] max-w-none"
      >
        모임 참여하기
      </Button>
    </div>
  );
};

export default SideBar;
