// 모임 생성 폼 타입
interface GatheringFormData {
  category: string;
  title: string;
  description: string;
  image?: File;
  maxMemberCount: number;
  platformUrls: string[];
}

// 모임 생성 요청 타입
interface CreateGatheringRequest {
  title: string;
  description: string;
  category: string;
  image?: string;
  maxMemberCount: number;
  platformUrls: string[];
}

// 모임 상세 조회 타입
interface GetGatheringDetailResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  createdAt: string;
  currentMemberCount: number;
  maxMemberCount: number;
  host: {
    id: number;
    nickname: string;
    image: string;
  };
  isJoined: boolean;
  platformUrls: string[];
}

// 모임 수정 요청 타입
interface UpdateGatheringRequest {
  title?: string;
  description?: string;
  category?: string;
  image?: string;
  maxMemberCount?: number;
  platformUrls?: string[];
}

// 모임 삭제 응답 타입
interface DeleteGatheringRequest {
  id: number;
}

export type {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GatheringFormData,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
};
