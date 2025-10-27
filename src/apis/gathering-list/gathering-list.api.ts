import type {
  GetGatheringListRequest,
  GetGatheringListResponse,
  GetGatheringMineListRequest,
} from "@/types/gathering-list";
import { api } from "../api";

// 모임 리스트 조회
const getGatheringListInfo = async (params: GetGatheringListRequest) => {
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

const getGatheringMineList = async (params: GetGatheringMineListRequest) => {
  const response = await api.get(`/meetings/mine`, {
    params,
  });
  return response.data;
};

export { getGatheringListInfo, getGatheringMineList };
