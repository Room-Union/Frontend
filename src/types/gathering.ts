// ---- Base Types ----

import { CategoryType } from "./constants";

// 모임 기본 데이터
interface BaseGatheringData {
  name: string;
  description: string;
  category: CategoryType;
  maxMemberCount: number;
  platformURL: string[];
}

type BaseGatheringRequest = number;

// ---- Form Types ----

// 모임 생성 폼 데이터 (클라이언트에서 사용)
interface GatheringFormData extends BaseGatheringData {
  meetingImage?: File;
}

// ---- API Request/Response Types ----

// 모임 생성 요청
interface CreateGatheringRequest extends BaseGatheringData {
  meetingImage?: string;
}

// 모임 수정 요청 (생성 요청과 동일)
interface UpdateGatheringRequest {
  meetingId: number;
  data: GatheringFormData;
}

// 모임 상세 조회 요청
type GetGatheringDetailRequest = BaseGatheringRequest;

// 모임 상세 조회 응답
interface GetGatheringDetailResponse extends CreateGatheringRequest {
  meetingId: number;
  currentMemberCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage?: string;
  joined: boolean;
}

// 모임 삭제 요청
type DeleteGatheringRequest = BaseGatheringRequest;

// ---- Exports ----
export type {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GatheringFormData,
  GetGatheringDetailRequest,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
};
