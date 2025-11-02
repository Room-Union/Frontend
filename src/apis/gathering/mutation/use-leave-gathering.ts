import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { LeaveGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { leaveGathering } from "../gathering.api";

const useLeaveGathering = () => {
  const queryClient = useQueryClient();
  const { toast } = useToastStore();

  return useMutation({
    mutationFn: (params: LeaveGatheringRequest) => leaveGathering(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });

      toast({
        type: "success",
        message: "모임에서 탈퇴했습니다.",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.code;
        switch (errorCode) {
          case " APPOINTMENT_NOT_FOUND":
            toast({
              message: "약속을 찾을 수 없습니다.",
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

export default useLeaveGathering;
