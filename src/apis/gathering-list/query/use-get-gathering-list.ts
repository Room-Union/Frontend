import queryKeys from "@/apis/query-keys";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import type { GetGatheringListRequest } from "@/types/gathering-list";
import { useQuery } from "@tanstack/react-query";
import getGatheringListInfo from "../gathering-list.api";

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params: GetGatheringListRequest) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list(params),
    queryFn: () => getGatheringListInfo(params),
  });
};

const useGetGatheringList = (params: Omit<GetGatheringListRequest, "page">) => {
  return useInfiniteScroll({
    queryKey: queryKeys.gatheringList.list({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringListInfo({ ...params, page: pageParam }),
  });
};

export { useGetGatheringList, useGetGatheringListInfo };
