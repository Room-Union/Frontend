import { updateGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { UpdateGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpdateGathering = (setOpen?: (open: boolean) => void) => {
  const { toast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateGatheringRequest) => updateGathering(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });

      toast({ type: "normal", message: "모임 수정이 완료되었습니다." });
      setOpen?.(false);
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

          case "DUPLICATE_MEETING_NAME":
            toast({
              message: "동일한 이름의 모임이 이미 존재합니다.",
              type: "error",
            });
            break;

          case "MAX_COUNT_LESS_THAN_CURRENT":
            toast({
              message: "최대 인원 수는 현재 인원 수보다 작을 수 없습니다.",
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

export default useUpdateGathering;
