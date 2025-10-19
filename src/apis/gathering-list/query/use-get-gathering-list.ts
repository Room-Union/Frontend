import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getGatheringListInfo } from "../gathering-list.api";
import type { CategoryType } from "@/types/constants";
import type { GetGatheringListParams } from "@/types/api";

// 사람 많은 순 10개 조회 query
const useGetGatheringTop10 = ({ category }: { category?: CategoryType }) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.top10(category),
    queryFn: () =>
      getGatheringListInfo({
        category,
        sort: "LATEST",
        size: 10,
        page: 0,
      }),
  });
};

// 모임 리스트 조회 query
const useGetGatheringListInfo = (params?: GetGatheringListParams) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list(params),
    queryFn: () =>
      getGatheringListInfo({
        category: params?.category ?? undefined,
        sort: params?.sort ?? "LATEST",
        size: params?.size ?? 8,
        page: params?.page ?? 0,
      }),
  });
};

export { useGetGatheringTop10, useGetGatheringListInfo };
