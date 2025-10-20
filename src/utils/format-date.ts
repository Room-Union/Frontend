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

export { formatDate, formatDateTime };
