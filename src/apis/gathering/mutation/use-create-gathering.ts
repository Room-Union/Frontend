import { createGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { GatheringFormData } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const useCreateGathering = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GatheringFormData) => createGathering(params),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });

      router.push(`/gathering/detail/${response.meetingId}`);
      toast({
        type: "success",
        message: "모임 생성에 성공했습니다.",
      });
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

export default useCreateGathering;
