import useDeleteAppointment from "@/apis/appointments/mutation/use-delete-appointment";
import useJoinAppointment from "@/apis/appointments/mutation/use-join-appointment";
import useLeaveAppointment from "@/apis/appointments/mutation/use-leave-appointment";
import { Date, Meetballs, Person, Time, Trash } from "@/assets/icons";
import {
  Button,
  CardProfile,
  Dropdown,
  MemberCount,
  Progress,
} from "@/components/ui";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { GetAppointmentResponse } from "@/types/appointments";
import { formatDateTime } from "@/utils/format-date";

import UpdateAppointmentModal from "../modal/gathering/appointments/update-appointment-modal";

interface MeetUpCardProps {
  data: GetAppointmentResponse;
  isOwner: boolean;
  meetingId: number;
  isGatheringJoined: boolean;
}

const MeetUpCard = ({
  data,
  isOwner,
  meetingId,
  isGatheringJoined,
}: MeetUpCardProps) => {
  const { alertModal } = useModalStore();
  const { toast } = useToastStore();
  const percent = (data.currentMemberCount / data.maxMemberCount) * 100;
  const { date, time } = formatDateTime(data.scheduledAt);
  const { mutate: deleteAppointment } = useDeleteAppointment();

  const handleClick = () => {
    alertModal({
      message: "모임 약속을 삭제하시겠습니까?",
      description: "삭제 후 복구가 불가능합니다.",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        deleteAppointment(
          { meetingId, appointmentId: data.id },
          {
            onSuccess: () => {
              toast({
                type: "normal",
                message: "모임 약속이 삭제 되었습니다.",
              });
            },
          }
        );
      },
    });
  };

  const isFull = data.currentMemberCount === data.maxMemberCount;
  const isClosed =
    new globalThis.Date(data.scheduledAt) < new globalThis.Date();

  return (
    <div className="tb:h-[170px] tb:w-[340px] relative flex h-[138px] w-[282px]">
      {/* Overlay */}
      {isClosed && (
        <div className="tb:typo-ui-md-medium bg-base-black-a-700 text-base-white typo-title-2xs-semibold tb:h-[170px] tb:w-[340px] absolute top-0 left-0 z-2 flex h-[138px] w-[282px] items-center justify-center rounded-2xl">
          마감된 약속이에요
        </div>
      )}

      <div className="border-gray-neutral-300 tb:h-[170px] tb:w-[340px] tb:rounded-[20px] tb:px-5 tb:pb-[18px] tb:pt-5 flex h-[138px] w-[282px] flex-col justify-between rounded-2xl border px-[14px] pt-[14px] pb-[12px]">
        {/* info */}
        <div className="tb:gap-[14px] flex w-full items-center gap-[12px]">
          <CardProfile profileImageUrl={data.imageUrl} />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="tb:pb-[10px] flex items-center justify-between pb-[8px]">
              <p className="typo-body-md-semibold tb:typo-title-2xs-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900">
                {data.title}
              </p>
              {isOwner && (
                <Dropdown
                  trigger={<Meetballs className="size-6 text-[#A4A4A4]" />}
                  contentAlign="end"
                  itemClassName="text-red-500"
                  items={[
                    {
                      icon: <Trash className="size-[18px] stroke-none" />,
                      text: "약속 삭제",
                      onClick: handleClick,
                    },
                  ]}
                />
              )}
            </div>
            <div className="tb:gap-[8px] flex flex-col gap-[4px]">
              <InfoItem Icon={Date} text={date} />
              <InfoItem Icon={Time} text={time} />
            </div>
          </div>
        </div>

        {/* progress bar & button */}
        <div className="flex h-[38px] w-full items-center justify-between gap-2.5">
          <div className="flex w-full items-center">
            <Person className="mr-[4px] size-6 stroke-none text-neutral-300" />
            <Progress percent={percent} size="sm" />
            <MemberCount
              current={data.currentMemberCount}
              max={data.maxMemberCount}
              size="xs"
              className="tb:typo-ui-sm-medium pl-[13px]"
              currentVariant="blue"
              otherVariant="neutral-500"
            />
          </div>

          {isOwner ? (
            <EditButton meetingId={meetingId} data={data} />
          ) : isGatheringJoined ? (
            data.isJoined ? (
              <LeaveButton meetingId={meetingId} appointmentId={data.id} />
            ) : (
              <JoinButton
                meetingId={meetingId}
                appointmentId={data.id}
                isFull={isFull}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

// InfoItem: 모임 일정 정보 아이콘과 텍스트 표시
interface InfoItemProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  text: string;
}

const InfoItem = ({ Icon, text }: InfoItemProps) => (
  <div className="flex items-center gap-[2px]">
    <Icon className="tb:mr-1 tb:size-[16px] mr-2 size-[14px] stroke-none text-neutral-400" />
    <p className="typo-ui-xs-medium tb:typo-ui-sm-medium text-neutral-500">
      {text}
    </p>
  </div>
);

interface EditButtonProps {
  meetingId: number;
  data: GetAppointmentResponse;
}

// Button: 버튼 컴포넌트들
const EditButton = ({ meetingId, data }: EditButtonProps) => {
  return (
    <UpdateAppointmentModal
      meetingId={meetingId}
      data={data}
      trigger={
        <Button
          size="sm"
          variant="outline"
          className="typo-ui-sm-semibold min-w-[83px] -tracking-wider"
        >
          약속 수정
        </Button>
      }
    />
  );
};

interface LeaveButtonProps {
  meetingId: number;
  appointmentId: number;
}
const LeaveButton = ({ meetingId, appointmentId }: LeaveButtonProps) => {
  const { mutate: leaveAppointment } = useLeaveAppointment();
  const { alertModal } = useModalStore();

  const handleClick = () => {
    alertModal({
      message: "약속 참여를 취소하시겠습니까?",
      onConfirm: () => {
        leaveAppointment({ meetingId, appointmentId });
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="typo-ui-sm-semibold min-w-[83px] -tracking-wider"
      onClick={handleClick}
    >
      참여 취소
    </Button>
  );
};

interface JoinButtonProps {
  meetingId: number;
  appointmentId: number;
  isFull: boolean;
}
const JoinButton = ({ meetingId, appointmentId, isFull }: JoinButtonProps) => {
  const { mutate: joinAppointment } = useJoinAppointment();
  const { alertModal } = useModalStore();

  const handleClick = () => {
    alertModal({
      message: "약속에 참여하시겠습니까?",
      confirmText: "참여",
      cancelText: "취소",
      onConfirm: () => {
        joinAppointment({ meetingId, appointmentId });
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="typo-ui-sm-semibold min-w-[80px] -tracking-wider"
      onClick={handleClick}
      disabled={isFull}
    >
      {isFull ? "인원마감" : "약속참여"}
    </Button>
  );
};

export default MeetUpCard;
