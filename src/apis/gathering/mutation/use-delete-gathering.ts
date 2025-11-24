import { deleteGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { DeleteGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteGatheringRequest) => deleteGathering(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });
    },
  });
};

export default useDeleteGathering;
