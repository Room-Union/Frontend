import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsTest } from "../appointments-mock.api";

const useGetAppointments = (meetingId: number) => {
  return useQuery({
    queryKey: queryKeys.appointments.list(meetingId),
    queryFn: () => getAppointmentsTest(meetingId),
  });
};

export default useGetAppointments;
