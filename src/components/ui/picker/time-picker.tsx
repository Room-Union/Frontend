import { cn } from "@/utils/cn";
import { useState } from "react";

const HOURS = 24;
const MINUTES = 60;
const MINUTES_STEP = 5;

const getTimeButtonClassName = (isSelected: boolean): string => {
  return cn(
    "typo-body-sm-medium flex w-[42px] cursor-pointer items-center justify-center rounded-lg px-3 py-[7px] hover:bg-neutral-100 text-neutral-800",
    isSelected && "bg-blue-50 text-blue-600"
  );
};

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const handleSelectHour = (hour: number) => setSelectedHour(hour);
  const handleSelectMinute = (minute: number) => setSelectedMinute(minute);

  const hours = Array.from({ length: HOURS }, (_, i) => i);
  const minutes = Array.from({ length: MINUTES }, (_, i) => i * MINUTES_STEP);

  return (
    <div className="tb:border-none flex max-h-[298px] w-[160px] items-center overflow-hidden rounded-xl border border-neutral-200 p-3 px-2 pt-2.5 pb-4">
      <div className="tb:block mx-2.5 hidden w-[1px] self-stretch bg-neutral-100" />
      <div className="flex h-full max-h-[260px] flex-col items-center gap-y-2.5 overflow-y-auto px-2 py-2.5">
        {hours.map((hour) => {
          const isSelected = selectedHour === hour;

          return (
            <button
              key={hour}
              type="button"
              onClick={() => handleSelectHour(hour)}
              className={getTimeButtonClassName(isSelected)}
            >
              {hour.toString().padStart(2, "0")}
            </button>
          );
        })}
      </div>
      <div className="mx-2.5 w-[1px] self-stretch bg-neutral-100" />
      <div className="flex h-full max-h-[260px] flex-col items-center gap-y-2.5 overflow-y-auto px-2 py-2.5">
        {minutes.map((minute) => {
          const isSelected = selectedMinute === minute;

          return (
            <button
              key={minute}
              type="button"
              onClick={() => handleSelectMinute(minute)}
              className={getTimeButtonClassName(isSelected)}
            >
              {minute.toString().padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimePicker;
