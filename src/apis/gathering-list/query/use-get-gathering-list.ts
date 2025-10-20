import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import getGatheringListInfo from "../gathering-list.api";
import type { GetGatheringListRequest } from "@/types/gathering-list";

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params: GetGatheringListRequest) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list(params),
    queryFn: () => getGatheringListInfo(params),
  });
};

export default useGetGatheringListInfo;
