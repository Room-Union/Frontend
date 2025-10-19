import type { CategoryType } from "./constants";
import type { SortType } from "./gathering-list";

interface Token {
  accessToken: string;
}
// 모임 리스트 조회 파라미터
interface GetGatheringListParams {
  category?: CategoryType;
  sort?: SortType;
  page?: number;
  size?: number;
}

export type { Token, GetGatheringListParams };
