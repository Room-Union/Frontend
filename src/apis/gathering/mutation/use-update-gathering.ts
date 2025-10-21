import queryKeys from "@/apis/query-keys";
import { UpdateGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGathering } from "../gathering.api";

const useUpdateGathering = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateGatheringRequest) => updateGathering(params),
    onSuccess: () => {
      void QueryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });

      void QueryClient.invalidateQueries({
        queryKey: queryKeys.gatheringList.all,
      });
    },
  });
};

export default useUpdateGathering;
