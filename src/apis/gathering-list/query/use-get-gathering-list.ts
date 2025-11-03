import queryKeys from "@/apis/query-keys";
import useSuspenseInfiniteScroll from "@/hooks/use-infinite-scroll";
import type {
  GetGatheringListRequest,
  GetGatheringSearchListRequest,
} from "@/types/gathering-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getGatheringListInfo,
  getGatheringSearchList,
} from "../gathering-list.api";

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params: GetGatheringListRequest) => {
  return useSuspenseQuery({
    queryKey: queryKeys.gatheringList.list(params),
    queryFn: () => getGatheringListInfo(params),
    retry: false,
  });
};

const useGetGatheringList = (params: Omit<GetGatheringListRequest, "page">) => {
  return useSuspenseInfiniteScroll({
    queryKey: queryKeys.gatheringList.infinite({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringListInfo({ ...params, page: pageParam }),
  });
};

const useGetGatheringSearchList = (
  params: Omit<GetGatheringSearchListRequest, "page">
) => {
  return useSuspenseInfiniteScroll({
    queryKey: queryKeys.gatheringList.search({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringSearchList({ ...params, page: pageParam }),
  });
};

export {
  useGetGatheringList,
  useGetGatheringListInfo,
  useGetGatheringSearchList,
};
