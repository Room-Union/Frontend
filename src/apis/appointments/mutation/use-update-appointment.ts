import queryKeys from "@/apis/query-keys";
import { UpdateAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../appointments.api";

const useUpdateAppointment = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateAppointmentRequest) => updateAppointment(params),
    onSuccess: ({ meetingId }) => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useUpdateAppointment;
