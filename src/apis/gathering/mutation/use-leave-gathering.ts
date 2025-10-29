import queryKeys from "@/apis/query-keys";
import { LeaveGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGathering } from "../gathering.api";

const useLeaveGathering = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LeaveGatheringRequest) => leaveGathering(params),
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

export default useLeaveGathering;
