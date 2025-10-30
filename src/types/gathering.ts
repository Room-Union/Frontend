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

// 폼 입력 타입 (CategoryInput이 배열로 동작)
interface GatheringFormInput extends Omit<BaseGatheringData, "category"> {
  category: CategoryType[]; // 폼에서는 배열로 처리, DB에는 문자열로 저장
  meetingImage?: File | string; // 새로 업로드 시에는 File, DB에서 받아올 때는 이미지 URL
}

// API 전송용 타입 (category를 문자열로 변환 후 사용)
interface GatheringFormData extends BaseGatheringData {
  meetingImage?: File | string;
  removeImageUrls?: string;
}

// ---- API Request/Response Types ----

// 모임 생성 요청
interface CreateGatheringRequest extends BaseGatheringData {
  meetingImage?: string;
}

// 모임 수정 요청
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

type JoinGatheringRequest = BaseGatheringRequest;

type LeaveGatheringRequest = BaseGatheringRequest;

// ---- Exports ----
export type {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GatheringFormData,
  GatheringFormInput,
  GetGatheringDetailRequest,
  GetGatheringDetailResponse,
  JoinGatheringRequest,
  LeaveGatheringRequest,
  UpdateGatheringRequest,
};
