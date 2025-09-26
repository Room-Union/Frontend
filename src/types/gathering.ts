// 모임 생성 요청 타입
interface GatheringCreate {
  title: string;
  description: string;
  category: string;
  image?: File; // 업로드할 이미지 파일
  maxMemberCount: number;
  condition: "free" | "approval";
}

// 모임 상세 조회 타입
interface GatheringDetail {
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
  condition: "free" | "approval";
  isJoined: boolean;
}

// 모임 수정 요청 타입
interface GatheringUpdate {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  image?: File; // 업로드할 이미지 파일
  maxMemberCount?: number;
  condition?: "free" | "approval";
}

// 모임 삭제 요청 타입
interface GatheringDelete {
  id: number;
}

export type {
  GatheringCreate,
  GatheringDelete,
  GatheringDetail,
  GatheringUpdate,
};
