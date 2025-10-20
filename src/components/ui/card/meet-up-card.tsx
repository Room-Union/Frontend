import { Date, Person, Time } from "@/assets/icons";
import { Schedule } from "@/types/schedules";
import { formatDateTime } from "@/utils/format-date";
import Button from "../button/button";
import MemberCount from "../count/member-count";
import CardProfile from "../profile/card-profile";
import Progress from "../progress/progress";

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

interface MeetUpCardProps {
  data: Schedule;
}

const MeetUpCard = ({ data }: MeetUpCardProps) => {
  const percent = (data.currentMemberCount / data.maxMemberCount) * 100;
  const { date, time } = formatDateTime(data.scheduledAt);

  return (
    <div className="border-gray-neutral-300 tb:h-[170px] tb:w-[340px] tb:rounded-[20px] tb:px-5 tb:pb-[18px] tb:pt-5 flex h-[138px] w-[282px] flex-col justify-between rounded-2xl border px-[14px] pt-[14px] pb-[12px]">
      <div className="tb:gap-[14px] flex w-full items-center gap-[12px]">
        <CardProfile profileImageUrl={data.scheduleImage} />

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="typo-body-md-semibold tb:typo-title-2xs-semibold tb:pb-[10px] w-full overflow-hidden pb-[8px] text-ellipsis whitespace-nowrap text-neutral-900">
            {data.title}
          </p>
          <div className="tb:gap-[8px] flex flex-col gap-[4px]">
            <InfoItem Icon={Date} text={date} />
            <InfoItem Icon={Time} text={time} />
          </div>
        </div>
      </div>

      <div className="flex h-[38px] items-center justify-between">
        <div className="flex items-center">
          <Person className="mr-[4px] size-4 stroke-none text-neutral-300" />
          <Progress percent={percent} />
          <MemberCount
            current={data.currentMemberCount}
            max={data.maxMemberCount}
            size="xs"
            className="tb:typo-ui-sm-medium pl-[13px]"
            currentVariant="blue"
            otherVariant="neutral-500"
          />
        </div>

        <Button
          size="sm"
          variant="outline"
          className="typo-ui-sm-semibold w-[80px] -tracking-wider"
        >
          참여하기
        </Button>
      </div>
    </div>
  );
};

export default MeetUpCard;
