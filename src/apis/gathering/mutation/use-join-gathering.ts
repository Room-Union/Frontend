import queryKeys from "@/apis/query-keys";
import { JoinGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGathering } from "../gathering.api";

const useJoinGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: JoinGatheringRequest) => joinGathering(params),
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

export default useJoinGathering;
