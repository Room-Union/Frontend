import { Time } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { formatTime } from "@/utils/format-date";

interface TimerProps {
  className?: string;
  seconds: number;
}

const Timer = ({ className, seconds }: TimerProps) => {
  return (
    <div
      className={cn(
        "tb:typo-ui-sm-medium typo-ui-2xs-medium flex items-center gap-1 text-blue-600",
        className
      )}
    >
      <Time stroke="none" className="size-[14px] text-center" />
      <div className="w-[37px]">{formatTime(seconds)}</div>
    </div>
  );
};

export default Timer;
