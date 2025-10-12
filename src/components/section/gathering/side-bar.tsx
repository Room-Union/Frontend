import Information from "@/components/section/gathering/information";
import { Button } from "@/components/ui";
import { GetGatheringDetailResponse } from "@/types/gathering";

interface SideBarProps {
  data: GetGatheringDetailResponse;
}

const SideBar = ({ data }: SideBarProps) => {
  return (
    <div className="tb:w-[380px] tb:rounded-[20px] tb:border tb:border-neutral-100 tb:p-6 mo:px-6 flex h-fit w-full shrink-0 flex-col gap-[10px] border-t border-neutral-200 px-5 py-6">
      <Information data={data} className="hidden" />

      <Button
        type="button"
        variant="primary"
        size="md"
        className="mo:h-[60px] mo:rounded-2xl mo:px-[30px] mo:py-4 mo:text-xl mt-[10px] max-w-none"
      >
        모임 참여하기
      </Button>
    </div>
  );
};

export default SideBar;
