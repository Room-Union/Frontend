import { updateGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { UpdateGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateGathering = () => {
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
    },
  });
};

export default useUpdateGathering;
