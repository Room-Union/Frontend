import useJoinGathering from "@/apis/gathering/mutation/use-join-gathering";
import { Information } from "@/components/section";
import { Button, UpdateGatheringModal } from "@/components/ui";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { checkIsSignedIn } from "@/utils/auth";

interface SideBarProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
}

const SideBar = ({ data, isOwner }: SideBarProps) => {
  return (
    <div className="bg-base-white pc:sticky pc:top-[30px] pc:w-[380px] pc:rounded-[20px] pc:border pc:border-neutral-200 pc:p-6 mo:px-6 flex h-fit w-full shrink-0 flex-col gap-[10px] border-t border-neutral-200 px-5 py-6">
      {/* Information: 태블릿 이상에서 보여줌, 이하에서 숨김 */}
      <Information data={data} className="hidden" />

      {isOwner ? (
        <UpdateGatheringModal meetingId={data.meetingId} data={data} />
      ) : data.joined ? (
        <LeaveButton />
      ) : (
        <JoinButton meetingId={data.meetingId} />
      )}
    </div>
  );
};

// SideBar에서 사용하는 버튼 컴포넌트들
interface ButtonProps {
  meetingId: number;
}

// 모임 참여 버튼
const JoinButton = ({ meetingId }: ButtonProps) => {
  const { mutate: joinGathering } = useJoinGathering();

  const handleClick = () => {
    const isSignedIn = checkIsSignedIn();

    if (!isSignedIn) {
      // Todo: alertModal 추가
    } else {
      joinGathering(meetingId);
    }
  };

  return (
    <Button
      type="button"
      variant="primary"
      size="md"
      className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl mt-[10px] max-w-none"
      onClick={handleClick}
    >
      모임 참여하기
    </Button>
  );
};

// 모임 탈퇴 버튼
const LeaveButton = () => {
  const handleClick = () => {
    // Todo: 모임 탈퇴 api 연결 (아직 api 미개발)
  };

  return (
    <Button
      type="button"
      variant="primary"
      size="md"
      className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl mt-[10px] max-w-none"
      onClick={handleClick}
    >
      모임 탈퇴하기
    </Button>
  );
};

export default SideBar;
