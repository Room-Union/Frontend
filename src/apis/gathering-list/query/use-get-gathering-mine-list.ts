import queryKeys from "@/apis/query-keys";
import { GetGatheringMineListRequest } from "@/types/gathering-list";
import { useQuery } from "@tanstack/react-query";
import { getGatheringMineList } from "../gathering-list.api";

const useGetGatheringMineList = (params: GetGatheringMineListRequest) => {
  return useQuery({
    queryKey: queryKeys.gatheringList.mine(params.role),
    queryFn: () => getGatheringMineList(params),
  });
};

export default useGetGatheringMineList;
