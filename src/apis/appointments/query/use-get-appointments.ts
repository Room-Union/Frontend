import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../appointments.api";

const useGetAppointments = (meetingId: number) => {
  return useQuery({
    queryKey: queryKeys.appointments.list(meetingId),
    queryFn: () => getAppointments(meetingId),

    // 캐시로 인해 이미지가 늦게 갱신되는 문제 해결
    select: (data) =>
      data.map((appointment) => ({
        ...appointment,
        imageUrl: appointment.imageUrl
          ? `${appointment.imageUrl}?date=${Date.now()}`
          : undefined,
      })),
    structuralSharing: false,
  });
};

export default useGetAppointments;
