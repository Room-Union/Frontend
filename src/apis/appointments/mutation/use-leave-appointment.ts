import queryKeys from "@/apis/query-keys";
import { LeaveAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveAppointment } from "../appointments.api";

const useLeaveAppointment = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LeaveAppointmentRequest) => leaveAppointment(params),
    onSuccess: ({ meetingId }) => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useLeaveAppointment;
