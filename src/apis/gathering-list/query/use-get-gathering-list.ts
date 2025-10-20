import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import getGatheringListInfo from "../gathering-list.api";
import type { GetGatheringListParams } from "@/types/gathering-list";

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params: GetGatheringListParams) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list({ params }),
    queryFn: () => getGatheringListInfo(params),
  });
};

export default useGetGatheringListInfo;
