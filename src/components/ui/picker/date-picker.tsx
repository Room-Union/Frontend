import { ArrowLeft, ArrowRight } from "@/assets/icons";
import { cn } from "@/utils/cn";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";

// 상수 정의
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const TOTAL_DAYS = 42;
const MAX_YEARS_AHEAD = 1;

// 날짜 스타일 정의
interface DateStyle {
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
}

// 유틸 함수
const isDateSelectable = (day: Date, minDate: Date, maxDate: Date): boolean => {
  return day >= minDate && day <= maxDate;
};

const getDateStyle = (
  day: Date,
  selectedDate: Date | null,
  viewingMonth: Date,
  today: Date
): DateStyle => {
  return {
    isSelected: selectedDate ? isSameDay(day, selectedDate) : false,
    isToday: isSameDay(day, today),
    isCurrentMonth: isSameMonth(day, viewingMonth),
  };
};

const getDateButtonClassName = (dateStyle: DateStyle): string => {
  return cn(
    "typo-body-sm-medium flex h-8 cursor-pointer items-center justify-center rounded-lg text-neutral-800 hover:bg-neutral-100 hover:font-semibold disabled:cursor-not-allowed disabled:text-neutral-200",
    dateStyle.isSelected && "bg-blue-50 font-semibold text-blue-600", // 선택된 날짜
    dateStyle.isToday && "font-semibold text-blue-600", // 오늘 날짜
    !dateStyle.isCurrentMonth && "text-neutral-300" // 다른 월의 날짜
  );
};

const DatePicker = () => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜
  const [viewingMonth, setViewingMonth] = useState<Date>(new Date()); // 현재 보고 있는 월

  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const maxDate = new Date(
    today.getFullYear() + MAX_YEARS_AHEAD,
    today.getMonth(),
    today.getDate()
  );

  const currentMonthStart = startOfMonth(viewingMonth); // 현재 보고 있는 월의 시작 날짜, ex) 2025-10-01 (일요일)
  const calendarStart = startOfWeek(currentMonthStart); // 월 시작 날짜의 첫 번째 일요일, ex) 2025-09-28

  // 캘린더에 표시될 모든 날짜를 배열로 변환
  const calendarDays = Array.from({ length: TOTAL_DAYS }, (_, index) => {
    return addDays(calendarStart, index);
  });

  // 핸들러 함수
  const handlePrevMonth = () => {
    setViewingMonth(subMonths(viewingMonth, 1));
  };

  const handleNextMonth = () => {
    setViewingMonth(addMonths(viewingMonth, 1));
  };

  const handleDateClick = (day: Date) => {
    if (!isDateSelectable(day, minDate, maxDate)) return;

    if (selectedDate && isSameDay(day, selectedDate)) {
      setSelectedDate(null);
      return;
    }

    setSelectedDate(day);

    if (!isSameMonth(day, viewingMonth)) {
      setViewingMonth(day);
    }
  };

  // 선택된 날짜가 최소 날짜 이하인 경우 이전 버튼 비활성화
  const isPrevMonthDisabled = isSameMonth(viewingMonth, minDate);
  // 선택된 날짜가 최대 날짜 이상인 경우 다음 버튼 비활성화
  const isNextMonthDisabled = isSameMonth(viewingMonth, maxDate);

  return (
    <div className="tb:border-none tb:w-[266px] tb:px-2 tb:pt-[10px] tb:pb-4 w-[298px] rounded-xl border border-neutral-200 bg-white p-6 px-5 py-4">
      {/* 캘린더 헤더: 이전 버튼, 월 표시, 다음 버튼 */}
      <div className="font-pretendard flex h-[34px] items-center justify-between bg-white py-[5px]">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevMonthDisabled}
          className="cursor-pointer text-neutral-800 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          <ArrowLeft className="size-7 stroke-none" />
        </button>

        <p className="typo-body-sm-semibold text-neutral-800">
          {format(viewingMonth, "yyyy년 MM월")}
        </p>

        <button
          onClick={handleNextMonth}
          disabled={isNextMonthDisabled}
          className="cursor-pointer text-neutral-800 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          <ArrowRight className="size-7 stroke-none" />
        </button>
      </div>

      {/* 캘린더 본문: 요일, 날짜 */}
      <div className="flex w-full flex-col items-center">
        {/* 요일 */}
        <div className="grid w-[250px] grid-cols-7 gap-x-1">
          {WEEKDAYS.map((weekday) => (
            <p
              key={weekday}
              className="typo-body-sm-medium flex h-8 items-center justify-center text-neutral-600"
            >
              {weekday}
            </p>
          ))}
        </div>

        {/* 날짜 */}
        <div className="grid w-[250px] grid-cols-7 gap-x-1">
          {calendarDays.map((day) => {
            const dateStyle = getDateStyle(
              day,
              selectedDate,
              viewingMonth,
              today
            );

            const isDisabled = !isDateSelectable(day, minDate, maxDate);

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={isDisabled}
                className={getDateButtonClassName(dateStyle)}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
