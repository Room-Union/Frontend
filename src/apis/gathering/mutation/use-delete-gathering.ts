import queryKeys from "@/apis/query-keys";
import { DeleteGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGathering } from "../gathering.api";

const useDeleteGathering = () => {
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
    },
  });
};

export default useDeleteGathering;
