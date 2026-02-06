"use client";

import useJoinGathering from "@/apis/gathering/mutation/use-join-gathering";
import useLeaveGathering from "@/apis/gathering/mutation/use-leave-gathering";
import { Information } from "@/components/section";
import { Button, UpdateGatheringModal } from "@/components/ui";
import LikeButton from "@/components/ui/button/like-button";
import CreateAppointmentModal from "@/components/ui/modal/gathering/appointments/create-appointment-modal";
import {
  AUTH_MODAL_MESSAGES,
  GATHERING_MODAL_MESSAGES,
} from "@/constants/modal-message";
import { GATHERING_SUCCESS_MESSAGES } from "@/constants/success-message";
import { useAuthStore } from "@/store/auth-store";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { GetGatheringDetailResponse } from "@/types/gathering";
import handleError from "@/utils/handle-error";
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
          <div className="flex items-center gap-5">
            <LikeButton
              liked={data.liked ?? false}
              onClick={() => {}}
              size="size-9"
            />
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
                      약속 생성
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
    </div>
  );
};

// SideBar에서 사용하는 버튼 컴포넌트들
interface JoinButtonProps {
  meetingId: number;
  disabled: boolean;
}

// 모임 참여 버튼
const JoinButton = ({ meetingId, disabled }: JoinButtonProps) => {
  const router = useRouter();
  const { toast } = useToastStore();
  const { alertModal } = useModalStore();

  const { mutate: joinGathering } = useJoinGathering();
  const isSignedIn = useAuthStore((state) => state.authStatus);

  const handleClick = () => {
    if (!isSignedIn) {
      alertModal({
        ...AUTH_MODAL_MESSAGES.LOGIN_REQUIRED,
        onConfirm: () => {
          router.push("/sign-in");
        },
      });
    } else {
      joinGathering(meetingId, {
        onSuccess: () => {
          toast(GATHERING_SUCCESS_MESSAGES.JOIN);
        },
        onError: (error) => {
          handleError({ error, toast });
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
      {disabled ? "모임 참여 마감" : "모임 참여"}
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
      ...GATHERING_MODAL_MESSAGES.LEAVE,
      onConfirm() {
        leaveGathering(meetingId, {
          onSuccess: () => {
            toast(GATHERING_SUCCESS_MESSAGES.LEAVE);
          },
          onError: (error) => {
            handleError({ error, toast });
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
      모임 탈퇴
    </Button>
  );
};

export default SideBar;
