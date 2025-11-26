import queryKeys from "@/apis/query-keys";
import { CreateAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../appointments.api";

const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateAppointmentRequest) => createAppointment(params),
    onSuccess: (_isSuccess, { meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useCreateAppointment;
