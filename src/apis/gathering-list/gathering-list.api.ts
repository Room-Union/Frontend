import { api } from "../api";
import type { CategoryType } from "@/types/constants";
import type {
  SortType,
  GetGatheringListResponse,
} from "@/types/gathering-list";
import type { GetGatheringListParams } from "@/types/api";

// 모임 리스트 조회
const getGatheringListInfo = async (params?: GetGatheringListParams) => {
  const response = await api.get(`/meetings`, {
    params: {
      category: params?.category,
      sort: params?.sort ?? "LATEST",
      page: params?.page ?? 0,
      size: params?.size ?? 10,
    },
  });

  return response.data.content as GetGatheringListResponse;
};

export { getGatheringListInfo };
