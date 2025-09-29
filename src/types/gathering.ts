// 모임 생성 요청 타입
interface CreateGatheringRequest {
  title: string;
  description: string;
  category: string;
  image?: string;
  maxMemberCount: number;
}

// 모임 상세 조회 타입
interface GetGatheringDetailResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  currentMemberCount: number;
  maxMemberCount: number;
  host: {
    id: number;
    nickname: string;
    image: string;
  };
  isJoined: boolean;
}

// 모임 수정 요청 타입
interface UpdateGatheringRequest {
  title?: string;
  description?: string;
  category?: string;
  image?: string;
  maxMemberCount?: number;
}

// 모임 삭제 응답 타입
interface DeleteGatheringRequest {
  id: number;
}

export type {
  CreateGatheringRequest,
  DeleteGatheringRequest,
  GetGatheringDetailResponse,
  UpdateGatheringRequest,
};
