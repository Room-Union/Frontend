"use client";

import useJoinGathering from "@/apis/gathering/mutation/use-join-gathering";
import { Information } from "@/components/section";
import { Button, UpdateGatheringModal } from "@/components/ui";
import CreateAppointmentModal from "@/components/ui/modal/gathering/appointments/create-appointment-modal";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import { checkIsSignedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface SideBarProps {
  data: GetGatheringDetailResponse;
  isOwner: boolean;
}

const SideBar = ({ data, isOwner }: SideBarProps) => {
  return (
    <div className="bg-base-white pc:sticky pc:top-[30px] pc:w-[380px] pc:rounded-[20px] pc:border pc:border-neutral-200 pc:p-6 flex h-fit w-full shrink-0 flex-col gap-[10px] border-t border-neutral-200 py-6">
      {/* Information: 태블릿 이상에서 보여줌, 이하에서 숨김 */}
      <Information data={data} className="hidden" />

      {isOwner ? (
        <div className="flex items-center gap-5 pt-2.5">
          <CreateAppointmentModal
            meetingId={data.meetingId}
            trigger={
              <Button
                variant="outline"
                size="md"
                className="pc:hidden tb:py-4 tb:text-xl tb:h-[60px] tb:rounded-2xl tb:px-[30px] block max-w-none"
              >
                약속 생성
              </Button>
            }
          />
          <UpdateGatheringModal meetingId={data.meetingId} data={data} />
        </div>
      ) : data.joined ? (
        <LeaveButton />
      ) : (
        <JoinButton
          meetingId={data.meetingId}
          disabled={data.maxMemberCount <= data.currentMemberCount}
        />
      )}
    </div>
  );
};

// SideBar에서 사용하는 버튼 컴포넌트들
interface ButtonProps {
  meetingId: number;
  disabled: boolean;
}

// 모임 참여 버튼
const JoinButton = ({ meetingId, disabled }: ButtonProps) => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { alertModal } = useModalStore();

  const { mutate: joinGathering } = useJoinGathering();

  const handleClick = () => {
    const isSignedIn = checkIsSignedIn();

    if (!isSignedIn) {
      alertModal({
        message: "로그인이 필요한 서비스입니다.",
        confirmText: "로그인 하기",
        cancelText: "취소",
        onConfirm: () => {
          router.push("/sign-in");
        },
      });
    } else {
      joinGathering(meetingId, {
        onSuccess: () => {
          toast({
            type: "success",
            message: "모임에 참여했습니다.",
          });
        },
        onError: () => {
          // Todo: 에러 상태에 따른 메시지 추가
          toast({
            type: "error",
            message: "모임 참여에 실패했습니다.",
          });
        },
      });
    }
  };

  return (
    <Button
      type="button"
      variant="primary"
      size="md"
      className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl mt-[10px] max-w-none"
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? "마감된 모임입니다." : "모임 참여하기"}
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
