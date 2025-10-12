import { Button } from "@/components/ui";
import { GetGatheringDetailResponse } from "@/types/gathering";

const SideBar = ({ data }: { data: GetGatheringDetailResponse }) => {
  return (
    <div className="tb:w-[380px] tb:rounded-[20px] tb:border tb:border-neutral-100 tb:p-6 mo:px-6 flex h-fit w-full shrink-0 flex-col gap-[10px] border-t border-neutral-200 px-5 py-6">
      <div className="tb:flex hidden h-[38px] justify-between">
        <h4 className="typo-body-md-semibold text-neutral-500">가입 조건</h4>
        <p className="typo-ui-md-medium">누구나 가입 가능</p>
      </div>

      <div className="tb:flex hidden h-[38px] justify-between">
        <h4 className="typo-body-md-semibold text-neutral-500">모임 인원</h4>
        <div className="typo-ui-md-medium flex items-center">
          <p>
            {data.currentMemberCount}/{data.maxMemberCount}
          </p>
          <span>명</span>
        </div>
      </div>

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
