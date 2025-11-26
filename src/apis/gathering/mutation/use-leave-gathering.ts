import queryKeys from "@/apis/query-keys";
import { LeaveGatheringRequest } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGathering } from "../gathering.api";

const useLeaveGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LeaveGatheringRequest) => leaveGathering(params),
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

export default useLeaveGathering;
