import { createGathering } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { GatheringFormData } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GatheringFormData) => createGathering(params),
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

export default useCreateGathering;
