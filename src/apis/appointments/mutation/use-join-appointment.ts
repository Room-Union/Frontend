import { joinAppointment } from "@/apis/appointments/appointments.api";
import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { JoinAppointmentRequest } from "@/types/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useJoinAppointment = () => {
  const { toast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: JoinAppointmentRequest) => joinAppointment(params),
    onSuccess: ({ meetingId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.list(meetingId),
      });

      toast({
        type: "normal",
        message: "약속에 참여했습니다.",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.code;
        switch (errorCode) {
          case "APPOINTMENT_MEMBER_LIMIT_REACHED":
            toast({
              message: "약속 인원이 마감되었습니다.",
              type: "error",
            });
            break;

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
        }
      }
    },
  });
};

export default useJoinAppointment;
