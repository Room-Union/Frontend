import { addMinutes, isBefore, isSameDay } from "date-fns";

export const ALLOWED_TIME_DIFFERENCE = 15; // 분

export const isTimeBeforeMinimum = (
  date: Date | null | undefined,
  hour: number,
  minutes: number
): boolean => {
  if (!date) return false;

  const isSelectedDateToday = isSameDay(date, new Date());
  if (!isSelectedDateToday) return false;

  const now = new Date();
  const target = new Date(date);
  target.setHours(hour, minutes, 0, 0);

  const allowedTime = addMinutes(now, ALLOWED_TIME_DIFFERENCE);

  return isBefore(target, allowedTime);
};

export const validateAppointmentDateTime = (
  date: Date | undefined,
  time: { hour: number; minutes: number } | undefined
): string | null => {
  if (!date || !time) return null;

  const isValidTime = !isTimeBeforeMinimum(date, time.hour, time.minutes);

  if (!isValidTime) {
    return "약속 시간은 현재 시간 이후 15분 이후여야 합니다.";
  }

  return null;
};
