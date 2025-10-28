import queryKeys from "@/apis/query-keys";
import { JoinAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinAppointment } from "../appointments.api";

const useJoinAppointment = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: JoinAppointmentRequest) => joinAppointment(params),
    onSuccess: ({ meetingId }) => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useJoinAppointment;
