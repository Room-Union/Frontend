import { Time } from "@/assets/icons";
import { cn } from "@/utils/cn";

interface TimerProps {
  className?: string;
  timerRef?: React.RefObject<HTMLDivElement | null>;
}

const Timer = ({ className, timerRef }: TimerProps) => {
  return (
    <div
      className={cn(
        "tb:typo-ui-sm-medium typo-ui-2xs-medium flex items-center gap-1 text-blue-600",
        className
      )}
    >
      <Time stroke="none" className="size-[14px] text-center" />
      <div className="w-[37px]" ref={timerRef} />
    </div>
  );
};

export default Timer;
