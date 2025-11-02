import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { DeleteAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteAppointment } from "../appointments.api";

const useDeleteAppointment = () => {
  const { toast } = useToastStore();
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteAppointmentRequest) => deleteAppointment(params),
    onSuccess: ({ meetingId }) => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });

      toast({ type: "normal", message: "약속이 삭제되었습니다." });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.code;
        switch (errorCode) {
          case "INTERNAL_SERVER_ERROR":
            toast({
              message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              type: "error",
            });
            break;

          default:
            toast({
              message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              type: "error",
            });
            break;
        }
      }
    },
  });
};

export default useDeleteAppointment;
