"use client";

import { Calendar, Clock } from "@/assets/icons";
import Label from "@/components/ui/input/label";
import { validateAppointmentDateTime } from "@/utils/appointment-time";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import DatePicker from "./date-picker";
import TimePicker from "./time-picker";

type PickerInputType = "date" | "time";

interface TimeValue {
  hour: number;
  minutes: number;
}

interface DateTimePickerProps {
  control: Control<FieldValues>;
}

const DateTimePicker = ({ control }: DateTimePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openedInput, setOpenedInput] = useState<PickerInputType | null>(null);
  const { formState, setError, clearErrors } = useFormContext();

  const toggleInput = (inputName: PickerInputType) => {
    setOpenedInput(openedInput === inputName ? null : inputName);
  };

  // Cross-field validation을 위한 헬퍼 함수
  const validateDateTime = (
    date: Date | null | undefined,
    time: { hour: number; minutes: number } | undefined
  ) => {
    const errorMessage = validateAppointmentDateTime(date ?? undefined, time);

    if (errorMessage) {
      setError("time", {
        type: "manual",
        message: errorMessage,
      });
    } else {
      clearErrors("time");
    }
  };

  const formatDateValue = (date: Date | null) => {
    return date ? format(date, "yyyy-MM-dd") : "";
  };

  const formatTimeValue = (time: TimeValue | null | undefined) => {
    if (!time) return "";
    return `${time.hour.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`;
  };

  // 외부 클릭 감지하여 picker 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openedInput &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenedInput(null);
      }
    };

    if (openedInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openedInput]);

  return (
    <div ref={containerRef} className="relative">
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
                error={undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field, fieldState }) => (
              <DateTimeInput
                name="time"
                value={formatTimeValue(field.value)}
                onClick={() => toggleInput("time")}
                icon={<Clock className="tb:size-6 size-5 stroke-none" />}
                placeholder="HH:MM"
                error={
                  (formState.errors.time?.message as string) ||
                  fieldState.error?.message
                }
              />
            )}
          />
        </div>
      </div>

      <TabletPickerView
        control={control}
        isOpen={!!openedInput}
        validateDateTime={validateDateTime}
      />
      <MobilePickerView
        control={control}
        openedInput={openedInput}
        validateDateTime={validateDateTime}
      />
    </div>
  );
};

export default DateTimePicker;

// 태블릿 이상: 두 picker를 함께 표시
const TabletPickerView = ({
  control,
  isOpen,
  validateDateTime,
}: {
  control: Control<FieldValues>;
  isOpen: boolean;
  validateDateTime: (
    date: Date | null | undefined,
    time: { hour: number; minutes: number } | undefined
  ) => void;
}) => {
  const { getValues } = useFormContext();

  if (!isOpen) return null;

  return (
    <div className="tb:flex absolute left-0 z-50 mt-3 hidden h-[298px] w-[464px] items-start rounded-xl border border-stone-300 bg-white px-3 py-1.5">
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker
            selectedDate={field.value}
            onDateChange={(date) => {
              field.onChange(date);
              const time = getValues("time");
              validateDateTime(date, time);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ field: dateField }) => (
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <TimePicker
                selectedHour={field.value?.hour ?? 0}
                selectedMinutes={field.value?.minutes ?? 0}
                selectedDate={dateField.value}
                onTimeChange={(hour, minutes) => {
                  const newTime = { hour: hour ?? 0, minutes: minutes ?? 0 };
                  field.onChange(newTime);
                  validateDateTime(dateField.value, newTime);
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
};

// 모바일: 하나의 picker만 표시
const MobilePickerView = ({
  control,
  openedInput,
  validateDateTime,
}: {
  control: Control<FieldValues>;
  openedInput: PickerInputType | null;
  validateDateTime: (
    date: Date | null | undefined,
    time: { hour: number; minutes: number } | undefined
  ) => void;
}) => {
  const { getValues } = useFormContext();

  return (
    <>
      {openedInput === "date" && (
        <div className="tb:hidden absolute left-0 z-50 mt-2">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selectedDate={field.value}
                onDateChange={(date) => {
                  field.onChange(date);
                  const time = getValues("time");
                  validateDateTime(date, time);
                }}
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
              <Controller
                control={control}
                name="date"
                render={({ field: dateField }) => (
                  <TimePicker
                    selectedHour={field.value?.hour ?? 0}
                    selectedMinutes={field.value?.minutes ?? 0}
                    selectedDate={dateField.value}
                    onTimeChange={(hour, minutes) => {
                      const newTime = { hour, minutes };
                      field.onChange(newTime);
                      validateDateTime(dateField.value, newTime);
                    }}
                  />
                )}
              />
            )}
          />
        </div>
      )}
    </>
  );
};

interface DateTimeInputProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  placeholder: string;
  onClick: () => void;
  error?: string;
}

const DateTimeInput = ({
  name,
  value,
  icon,
  placeholder,
  onClick,
  error,
}: DateTimeInputProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <label
        htmlFor={name}
        className="tb:h-12 tb:w-[224px] tb:gap-2 tb:p-3 tb:rounded-xl flex w-[141.5px] cursor-pointer items-center gap-[6px] rounded-[10px] bg-neutral-50 px-3 py-[10px] focus-within:inset-ring-1 focus-within:inset-ring-blue-500"
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
      {error && (
        <p className="typo-ui-xs-medium tb:typo-ui-sm-medium text-error-red">
          {error}
        </p>
      )}
    </div>
  );
};
