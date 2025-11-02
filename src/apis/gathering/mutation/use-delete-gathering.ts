import { deleteGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { useToastStore } from "@/store/toast-store";
import { DeleteGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const useDeleteGathering = () => {
  const router = useRouter();
  const { toast } = useToastStore();
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteGatheringRequest) => deleteGathering(params),
    onSuccess: () => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void QueryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });

      router.back();
      toast({
        type: "normal",
        message: "모임을 삭제했습니다.",
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

export default useDeleteGathering;
