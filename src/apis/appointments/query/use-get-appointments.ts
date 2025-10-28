import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../appointments.api";

const useGetAppointments = (meetingId: number) => {
  return useQuery({
    queryKey: queryKeys.appointments.list(meetingId),
    queryFn: () => getAppointments(meetingId),
  });
};

export default useGetAppointments;
