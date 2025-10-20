import queryKeys from "@/apis/query-keys";
import { useQuery } from "@tanstack/react-query";
import getGatheringListInfo from "../gathering-list.api";
import type { GetGatheringListParams } from "@/types/api";

// 모임 리스트 조회 query
const useGetGatheringListInfo = ({
  category,
  sort,
  size,
  page,
}: GetGatheringListParams) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.list({ category, sort, size, page }),
    queryFn: () =>
      getGatheringListInfo({
        category,
        sort,
        size,
        page,
      }),
  });
};

export default useGetGatheringListInfo;
