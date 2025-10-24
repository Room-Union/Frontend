import { cn } from "@/utils/cn";

const HOURS = 24;
const MINUTES = 60;
const MINUTES_STEP = 5;

const getTimeButtonClassName = (isSelected: boolean): string => {
  return cn(
    "typo-body-sm-medium flex w-[42px] cursor-pointer items-center justify-center rounded-lg px-3 py-[7px] hover:bg-neutral-100 text-neutral-800",
    isSelected && "bg-blue-50 text-blue-600"
  );
};

interface TimePickerProps {
  selectedHour: number;
  selectedMinute: number;
  onTimeChange: (hour: number, minute: number) => void;
}

const TimePicker = ({
  selectedHour,
  selectedMinute,
  onTimeChange,
}: TimePickerProps) => {
  const handleSelectHour = (hour: number) => onTimeChange(hour, selectedMinute);
  const handleSelectMinute = (minute: number) =>
    onTimeChange(selectedHour, minute);

  const hours = Array.from({ length: HOURS }, (_, i) => i);
  const minutes = Array.from(
    { length: Math.floor(MINUTES / MINUTES_STEP) },
    (_, i) => i * MINUTES_STEP
  );

  return (
    <div className="tb:border-none flex max-h-[298px] w-[160px] items-center overflow-hidden rounded-xl border border-stone-300 bg-white p-3 px-2 pt-2.5 pb-4">
      <div className="tb:block mx-2.5 hidden w-[1px] self-stretch bg-neutral-100" />
      <div className="scrollbar-hide flex h-full max-h-[260px] flex-col items-center gap-y-2.5 overflow-y-auto px-2 py-2.5">
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
      <div className="scrollbar-hide flex h-full max-h-[260px] flex-col items-center gap-y-2.5 overflow-y-auto px-2 py-2.5">
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
