import {
  AppointmentFormData,
  AppointmentFormInput,
} from "@/types/appointments";
import { format } from "date-fns";

const DATE_OPTIONS = {
  month: "long",
  day: "numeric",
  weekday: "short",
} as const;

const TIME_OPTIONS = {
  hour: "numeric",
  minute: "numeric",
} as const;

const formatDate = (date: string) => {
  return date.split("T")[0].replace(/-/g, ". ");
};

const formatDateTime = (date: string) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("ko-KR", DATE_OPTIONS);
  const formattedTime = dateObj
    .toLocaleTimeString("ko-KR", TIME_OPTIONS)
    .replace(":", "시 ")
    .concat("분");

  return { date: formattedDate, time: formattedTime };
};

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const formatDateTimeToISOString = (formInput: AppointmentFormInput) => {
  const date = new Date(formInput.date);
  const time = formInput.time;

  date.setHours(time.hour, time.minutes, 0, 0);

  // DB에 저장되는 형식: yyyy-MM-ddTHH:mm
  const scheduledAt = format(date, "yyyy-MM-dd'T'HH:mm");

  const formData: AppointmentFormData = {
    title: formInput.title,
    maxMemberCount: formInput.maxMemberCount,
    image: formInput.image,
    scheduledAt,
  };

  return formData;
};

export { formatDate, formatDateTime, formatDateTimeToISOString, formatTime };
