"use client";

import { Calendar, Clock } from "@/assets/icons";
import Label from "@/components/ui/input/label";
import { format } from "date-fns";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import DatePicker from "./date-picker";
import TimePicker from "./time-picker";

interface DateTimePickerProps {
  control: Control<FieldValues>;
}

const DateTimePicker = ({ control }: DateTimePickerProps) => {
  const [openedInput, setOpenedInput] = useState<"date" | "time" | null>(null);

  const toggleInput = (inputName: "date" | "time") => {
    setOpenedInput(openedInput === inputName ? null : inputName);
  };

  const formatDateValue = (date: Date | null) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  const formatTimeValue = (time: { hour: number; minute: number } | null) => {
    if (!time) return "";
    return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      <div className="tb:gap-2 flex flex-col gap-1.5">
        <Label htmlFor="date" text="약속 날짜" />
        <div className="flex w-full items-center justify-between">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DateTimeInput
                name="date"
                value={formatDateValue(field.value)}
                onClick={() => toggleInput("date")}
                icon={
                  <Calendar
                    className="tb:size-7 size-5.5 stroke-none"
                    viewBox="0 0 18 20"
                  />
                }
                placeholder="YYYY-MM-DD"
              />
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <DateTimeInput
                name="time"
                value={formatTimeValue(field.value)}
                onClick={() => toggleInput("time")}
                icon={<Clock className="tb:size-6 size-5 stroke-none" />}
                placeholder="HH:MM"
              />
            )}
          />
        </div>
      </div>

      {/* 태블릿 이상: 두 picker를 함께 표시 */}
      {openedInput && (
        <div className="tb:flex absolute left-0 z-50 mt-3 hidden h-[298px] w-[464px] items-start rounded-xl border border-stone-300 bg-white px-3 py-1.5">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selectedDate={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <TimePicker
                selectedHour={field.value?.hour ?? 0}
                selectedMinute={field.value?.minute ?? 0}
                onTimeChange={(hour, minute) =>
                  field.onChange({ hour, minute })
                }
              />
            )}
          />
        </div>
      )}

      {/* 모바일: 하나의 picker만 표시 */}
      {openedInput === "date" && (
        <div className="tb:hidden absolute left-0 z-50 mt-2">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selectedDate={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
        </div>
      )}

      {openedInput === "time" && (
        <div className="tb:hidden absolute right-0 z-50 mt-2">
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <TimePicker
                selectedHour={field.value?.hour ?? 0}
                selectedMinute={field.value?.minute ?? 0}
                onTimeChange={(hour, minute) =>
                  field.onChange({ hour, minute })
                }
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;

interface DateTimeInputProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  placeholder: string;
  onClick: () => void;
}

const DateTimeInput = ({
  name,
  value,
  icon,
  placeholder,
  onClick,
}: DateTimeInputProps) => {
  return (
    <label
      htmlFor={name}
      className="focus-within:outline-primary-500 tb:h-12 tb:w-[224px] tb:gap-2 tb:p-3 tb:rounded-xl flex w-[141.5px] cursor-pointer items-center gap-[6px] rounded-[10px] bg-neutral-50 px-3 py-[10px] focus-within:outline"
    >
      {icon}
      <input
        id={name}
        type="text"
        className="typo-ui-sm-medium tb:typo-ui-md-medium w-full cursor-pointer text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
        value={value}
        onClick={onClick}
        readOnly
        placeholder={placeholder}
      />
    </label>
  );
};
