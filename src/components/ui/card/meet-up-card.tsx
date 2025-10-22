import { Date, Meetballs, Person, Time } from "@/assets/icons";
import { Button, CardProfile, MemberCount, Progress } from "@/components/ui";
import type { Schedule } from "@/types/schedules";
import { formatDateTime } from "@/utils/format-date";

interface MeetUpCardProps {
  data: Schedule;
  isOwner: boolean;
}

const MeetUpCard = ({ data, isOwner }: MeetUpCardProps) => {
  const percent = (data.currentMemberCount / data.maxMemberCount) * 100;
  const { date, time } = formatDateTime(data.scheduledAt);

  return (
    <div className="border-gray-neutral-300 tb:h-[170px] tb:w-[340px] tb:rounded-[20px] tb:px-5 tb:pb-[18px] tb:pt-5 flex h-[138px] w-[282px] flex-col justify-between rounded-2xl border px-[14px] pt-[14px] pb-[12px]">
      <div className="tb:gap-[14px] flex w-full items-center gap-[12px]">
        <CardProfile profileImageUrl={data.scheduleImage} />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="tb:pb-[10px] flex items-center justify-between pb-[8px]">
            <p className="typo-body-md-semibold tb:typo-title-2xs-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap text-neutral-900">
              {data.title}
            </p>
            {isOwner && (
              // Todo: 드롭다운 변경 예정
              <Button
                size="icon"
                variant="ghost"
                className="size-6 rounded-none"
              >
                <Meetballs className="size-6 text-[#A4A4A4]" />
              </Button>
            )}
          </div>
          <div className="tb:gap-[8px] flex flex-col gap-[4px]">
            <InfoItem Icon={Date} text={date} />
            <InfoItem Icon={Time} text={time} />
          </div>
        </div>
      </div>

      <div className="flex h-[38px] w-full items-center justify-between gap-2.5">
        <div className="flex w-full items-center">
          <Person className="mr-[4px] size-4 stroke-none text-neutral-300" />
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
          <EditButton />
        ) : data.joined ? (
          <LeaveButton />
        ) : (
          <JoinButton />
        )}
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

// Button: 버튼 컴포넌트들
// Todo: 모달 작업 후 모달로 변경 예정
const EditButton = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="typo-ui-sm-semibold min-w-[80px] -tracking-wider"
    >
      수정하기
    </Button>
  );
};

const LeaveButton = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="typo-ui-sm-semibold min-w-[83px] -tracking-wider"
    >
      참여 취소
    </Button>
  );
};

const JoinButton = () => {
  const handleClick = () => {
    // Todo: 참여 로직 추가
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="typo-ui-sm-semibold min-w-[80px] -tracking-wider"
      onClick={handleClick}
    >
      참여하기
    </Button>
  );
};

export default MeetUpCard;
