import queryKeys from "@/apis/query-keys";
import { CreateAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../appointments.api";

const useCreateAppointment = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateAppointmentRequest) => createAppointment(params),
    onSuccess: ({ meetingId }) => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useCreateAppointment;
