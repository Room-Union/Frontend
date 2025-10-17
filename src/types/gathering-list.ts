import { CategoryType, StatusType } from "./constants";

// 모임 카드 조회 타입
interface GetGatheringCardResponse {
  id: number;
  title: string;
  image?: string;
  category: Exclude<CategoryType, "all">;
  currentMemberCount: number;
  maxMemberCount: number;
  status: StatusType;
}

// 모임 리스트 조회 타입
type GetGatheringListResponse = GetGatheringCardResponse[];

export type { GetGatheringCardResponse, GetGatheringListResponse };
