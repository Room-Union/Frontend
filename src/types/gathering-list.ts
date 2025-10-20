import { CategoryType, BadgeType } from "./constants";

// 모임 카드 조회 타입
interface GetGatheringCardResponse {
  meetingId: number;
  name: string;
  description: string;
  meetingImage: string;
  category: Exclude<CategoryType, "all">;
  currentMemberCount: number;
  maxMemberCount: number;
  platformURL: string[];
  userId: number;
  createdAt: string;
  badges: BadgeType[];
  joined: boolean;
}

// 모임 리스트 조회 타입
type GetGatheringListResponse = GetGatheringCardResponse[];

type SortType = "LATEST" | "MEMBER_DESC";

// 모임 리스트 조회 파라미터
interface GetGatheringListRequest {
  category?: CategoryType;
  sort: SortType;
  page: number;
  size: number;
}

export type {
  GetGatheringCardResponse,
  GetGatheringListResponse,
  SortType,
  GetGatheringListRequest,
};
