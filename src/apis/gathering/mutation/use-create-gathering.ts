import queryKeys from "@/apis/query-keys";
import { GatheringFormData } from "@/types/gathering";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGathering } from "../gathering.api";

const useCreateGathering = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GatheringFormData) => createGathering(params),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: queryKeys.gathering.all,
      });
    },
  });
};

export default useCreateGathering;
