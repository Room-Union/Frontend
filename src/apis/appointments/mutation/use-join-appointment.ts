import { joinAppointment } from "@/apis/appointments/appointments.api";
import queryKeys from "@/apis/query-keys";
import { JoinAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useJoinAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: JoinAppointmentRequest) => joinAppointment(params),
    onSuccess: ({ meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useJoinAppointment;
