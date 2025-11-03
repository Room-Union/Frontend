import queryKeys from "@/apis/query-keys";
import { GetGatheringMineListRequest } from "@/types/gathering-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGatheringMineList } from "../gathering-list.api";

const useGetGatheringMineList = (params: GetGatheringMineListRequest) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.mine(params),
    queryFn: () => getGatheringMineList(params),
  });
};

const useGetGatheringMineListInfinite = (
  params: Omit<GetGatheringMineListRequest, "page">
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.gatheringList.mineInfinite({ ...params, page: 0 }),
    queryFn: ({ pageParam }) =>
      getGatheringMineList({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? null : lastPage.page + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });
};

export { useGetGatheringMineList, useGetGatheringMineListInfinite };
