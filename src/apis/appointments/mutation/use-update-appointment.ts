import queryKeys from "@/apis/query-keys";
import { UpdateAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../appointments.api";

const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateAppointmentRequest) => updateAppointment(params),
    onSuccess: (_isSuccess, { meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useUpdateAppointment;
