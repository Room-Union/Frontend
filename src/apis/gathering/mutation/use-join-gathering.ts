import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { JoinGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { joinGathering } from "../gathering.api";

const useJoinGathering = () => {
  const queryClient = useQueryClient();
  const { toast } = useToastStore();

  return useMutation({
    mutationFn: (params: JoinGatheringRequest) => joinGathering(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });

      toast({
        type: "success",
        message: "모임에 참여했습니다.",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.code;
        switch (errorCode) {
          case "MEETING_MEMBER_LIMIT_REACHED":
            toast({
              message: "모집 정원이 마감되었습니다.",
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

export default useJoinGathering;
