import queryKeys from "@/apis/query-keys";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import type {
  GetGatheringListRequest,
  GetGatheringSearchListRequest,
} from "@/types/gathering-list";
import { useQuery } from "@tanstack/react-query";
import {
  getGatheringListInfo,
  getGatheringSearchList,
} from "../gathering-list.api";

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params: GetGatheringListRequest) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list(params),
    queryFn: () => getGatheringListInfo(params),
  });
};

const useGetGatheringList = (params: Omit<GetGatheringListRequest, "page">) => {
  return useInfiniteScroll({
    queryKey: queryKeys.gatheringList.infinite({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringListInfo({ ...params, page: pageParam }),
  });
};

const useGetGatheringSearchList = (
  params: Omit<GetGatheringSearchListRequest, "page">,
  skipSearchApi?: { enabled: boolean }
) => {
  const shouldEnableApi = skipSearchApi?.enabled === false ? false : true;

  return useInfiniteScroll({
    queryKey: queryKeys.gatheringList.search({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringSearchList({ ...params, page: pageParam }),
    enabled: shouldEnableApi,
  });
};

export {
  useGetGatheringList,
  useGetGatheringListInfo,
  useGetGatheringSearchList,
};
