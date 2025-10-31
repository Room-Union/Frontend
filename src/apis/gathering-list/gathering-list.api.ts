import type {
  GetGatheringListRequest,
  GetGatheringListResponse,
  GetGatheringMineListRequest,
  GetGatheringSearchListRequest,
} from "@/types/gathering-list";
import { api } from "../api";

// 모임 리스트 조회
const getGatheringListInfo = async (params: GetGatheringListRequest) => {
  const response = await api.get<GetGatheringListResponse>(`/meetings`, {
    params,
  });
  return response.data;
};

const getGatheringSearchList = async (
  params: GetGatheringSearchListRequest
) => {
  const response = await api.get<GetGatheringListResponse>(`/meetings/search`, {
    params,
  });
  return response.data;
};

const getGatheringMineList = async (params: GetGatheringMineListRequest) => {
  const response = await api.get(`/meetings/mine`, {
    params,
  });
  return response.data;
};

export { getGatheringListInfo, getGatheringMineList, getGatheringSearchList };
