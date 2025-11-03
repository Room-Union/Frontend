import { BadgeType, CategoryType } from "./constants";

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
interface GetGatheringListResponse {
  content: GetGatheringCardResponse[];
  page: number;
  size: number;
  last: boolean;
}

type SortType = "LATEST" | "MEMBER_DESC";

type SortDomainType = "latest" | "member-desc";

// 모임 리스트 조회 파라미터
interface GetGatheringListRequest {
  category?: CategoryType;
  sort: SortType;
  page: number;
  size: number;
}

interface GetGatheringSearchListRequest {
  category?: CategoryType;
  sort: SortType;
  meetingName?: string;
  page: number;
  size: number;
}

type RoleType = "HOST" | "MEMBER";

interface GetGatheringMineListRequest {
  role: RoleType;
  page: number;
  size: number;
}

export type {
  GetGatheringCardResponse,
  GetGatheringListRequest,
  GetGatheringListResponse,
  GetGatheringMineListRequest,
  GetGatheringSearchListRequest,
  RoleType,
  SortDomainType,
  SortType,
};
