import { api } from "../api";
import type { GetGatheringListParams } from "@/types/gathering-list";
import type { GetGatheringListResponse } from "@/types/gathering-list";

// 모임 리스트 조회
const getGatheringListInfo = async (params: GetGatheringListParams) => {
  const response = await api.get<GetGatheringListResponse>(`/meetings`, {
    params: {
      category: params?.category,
      sort: params.sort,
      page: params.page,
      size: params.size,
    },
  });

  return response.data;
};

export default getGatheringListInfo;
