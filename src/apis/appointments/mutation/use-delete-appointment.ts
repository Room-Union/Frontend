import queryKeys from "@/apis/query-keys";
import { DeleteAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../appointments.api";

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteAppointmentRequest) => deleteAppointment(params),
    onSuccess: ({ meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });
    },
  });
};

export default useDeleteAppointment;
