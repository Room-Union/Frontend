import { Date, Person, Time } from "@/assets/icons";
import { Schedule } from "@/types/schedules";
import { formatDateTime } from "@/utils/format-date";
import { cva } from "class-variance-authority";
import Button from "../button/button";
import MemberCount from "../count/member-count";
import CardProfile from "../profile/card-profile";
import Progress from "../progress/progress";

type SizeVariant = "sm" | "lg";

const COUNT_FONT_SIZE_MAP = {
  sm: "xs",
  lg: "sm",
} as const;

const cardVariants = cva(
  "flex flex-col justify-between border border-gray-neutral-300",
  {
    variants: {
      size: {
        sm: "w-[282px] h-[138px] rounded-2xl px-[14px] pt-[14px] pb-[12px]",
        lg: "w-[340px] h-[170px] rounded-[20px] px-5 pt-5 pb-[18px]",
      },
    },
  }
);

const titleVariants = cva(
  "text-neutral-900 text-ellipsis overflow-hidden whitespace-nowrap w-full",
  {
    variants: {
      size: {
        sm: "typo-body-md-semibold pb-[8px]",
        lg: "typo-title-2xs-semibold pb-[10px]",
      },
    },
  }
);

const infoContainerVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-[4px]",
      lg: "gap-[8px]",
    },
  },
});

const infoTextVariants = cva("text-neutral-500", {
  variants: {
    size: {
      sm: "typo-ui-xs-medium",
      lg: "typo-ui-sm-medium",
    },
  },
});

const iconVariants = cva("text-neutral-400 stroke-none", {
  variants: {
    size: {
      sm: "size-[14px] mr-2",
      lg: "size-[16px] mr-1",
    },
  },
});

const profileContainerVariants = cva("flex w-full items-center", {
  variants: {
    size: {
      sm: "gap-[12px]",
      lg: "gap-[14px]",
    },
  },
});

interface InfoItemProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  text: string;
  size: SizeVariant;
}

const InfoItem = ({ Icon, text, size }: InfoItemProps) => (
  <div className="flex items-center gap-[2px]">
    <Icon className={iconVariants({ size })} />
    <p className={infoTextVariants({ size })}>{text}</p>
  </div>
);

interface MeetUpCardProps {
  size: SizeVariant;
  data: Schedule;
}

const MeetUpCard = ({ size, data }: MeetUpCardProps) => {
  const percent = (data.currentMemberCount / data.maxMemberCount) * 100;
  const { date, time } = formatDateTime(data.scheduledAt);

  return (
    <div className={cardVariants({ size })}>
      <div className={profileContainerVariants({ size })}>
        <CardProfile size={size} profileImageUrl={data.scheduleImage} />

        <div className="flex min-w-0 flex-1 flex-col">
          <p className={titleVariants({ size })}>{data.title}</p>
          <div className={infoContainerVariants({ size })}>
            <InfoItem Icon={Date} text={date} size={size} />
            <InfoItem Icon={Time} text={time} size={size} />
          </div>
        </div>
      </div>

      <div className="flex h-[38px] items-center justify-between">
        <div className="flex items-center">
          <Person className="mr-[4px] size-4 stroke-none text-neutral-300" />
          <Progress size={size} color="blue" percent={percent} />
          <MemberCount
            current={data.currentMemberCount}
            max={data.maxMemberCount}
            size={COUNT_FONT_SIZE_MAP[size]}
            currentVariant="blue"
            otherVariant="neutral-500"
            className="pl-[13px]"
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
