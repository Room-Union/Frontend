import { getGatheringDetailTest } from "@/apis/gathering/gathering.api";
import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";

const useGetGatheringDetail = (id: string) => {
  const numericId = Number(id);

  return useQuery({
    queryKey: queryKeys.gathering.detail(id),
    queryFn: () => getGatheringDetailTest(numericId),
    enabled: !!id && !isNaN(numericId),
  });
};

export default useGetGatheringDetail;
