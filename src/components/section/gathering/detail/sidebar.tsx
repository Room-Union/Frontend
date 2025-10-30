"use client";

import useJoinGathering from "@/apis/gathering/mutation/use-join-gathering";
import useLeaveGathering from "@/apis/gathering/mutation/use-leave-gathering";
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
    <div className="pc:top-[30px] pc:w-[380px] pc:mx-0 pc:h-fit pc:rounded-[20px] pc:border pc:border-neutral-200 pc:p-6 tb:-mx-6 mo:-mx-5 tb:py-6 sticky bottom-0 z-10 border-t border-neutral-200 bg-white py-3">
      <div className="tb:px-6 mo:px-5 pc:px-0">
        {/* Information: 태블릿 이상에서 보여줌, 이하에서 숨김 */}
        <Information data={data} className="hidden" />

        <div className="pc:pt-5">
          {isOwner ? (
            <div className="flex items-center gap-5">
              <CreateAppointmentModal
                meetingId={data.meetingId}
                trigger={
                  <Button
                    variant="outline"
                    size="md"
                    className="pc:hidden tb:py-4 tb:text-xl tb:h-[60px] tb:rounded-2xl tb:px-[30px] block max-w-none"
                  >
                    약속 생성하기
                  </Button>
                }
              />
              <UpdateGatheringModal meetingId={data.meetingId} data={data} />
            </div>
          ) : data.joined ? (
            <LeaveButton meetingId={data.meetingId} />
          ) : (
            <JoinButton
              meetingId={data.meetingId}
              disabled={data.maxMemberCount <= data.currentMemberCount}
            />
          )}
        </div>
      </div>
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
      className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl max-w-none"
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? "마감된 모임입니다." : "모임 참여하기"}
    </Button>
  );
};

// 모임 탈퇴 버튼
interface LeaveButtonProps {
  meetingId: number;
}

const LeaveButton = ({ meetingId }: LeaveButtonProps) => {
  const { toast } = useToastStore();
  const { alertModal } = useModalStore();
  const { mutate: leaveGathering } = useLeaveGathering();

  const handleClick = () => {
    alertModal({
      message: "모임을 탈퇴하시겠습니까?",
      onConfirm() {
        leaveGathering(meetingId, {
          onSuccess: () => {
            toast({
              type: "normal",
              message: "모임에서 탈퇴했습니다.",
            });
          },
          onError: () => {
            toast({
              type: "error",
              message: "모임 탈퇴에 실패했습니다.",
            });
          },
        });
      },
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      className="tb:h-[60px] tb:rounded-2xl tb:px-[30px] tb:py-4 tb:text-xl bg-gray-neutral-50 text-gray-neutral-800 max-w-none"
      onClick={handleClick}
    >
      모임 탈퇴하기
    </Button>
  );
};

export default SideBar;
