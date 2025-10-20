import { api } from "../api";
import type { GetGatheringListResponse } from "@/types/gathering-list";
import type { GetGatheringListParams } from "@/types/api";

// 모임 리스트 조회
const getGatheringListInfo = async (params?: GetGatheringListParams) => {
  const response = await api.get(`/meetings`, {
    params: {
      category: params?.category,
      sort: params?.sort,
      page: params?.page,
      size: params?.size,
    },
  });

  return response.data.content as GetGatheringListResponse;
};

export default getGatheringListInfo;
