import { Time } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { formatTime } from "@/utils/format-date";
import { useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
  extendSeconds?: number;
  className?: string;
}

const Timer = ({
  initialSeconds,
  extendSeconds = 0,
  className,
}: TimerProps) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 시간 연장 : extendSeconds가 바뀌면 현재 남은 시간 + extendSeconds
  useEffect(() => {
    if (extendSeconds > 0) {
      setTime((prev) => prev + extendSeconds);
    }
  }, [extendSeconds]);

  return (
    <div
      className={cn(
        "tb:typo-ui-sm-medium typo-ui-2xs-medium flex items-center gap-1 text-blue-600",
        className
      )}
    >
      <Time className="size-[14px] text-center" />
      <div className="w-[37px]">{formatTime(time)}</div>
    </div>
  );
};

export default Timer;
