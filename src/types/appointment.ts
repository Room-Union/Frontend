// ---- Base Types ----

// 약속 기본 데이터
interface BaseAppointmentData {
  title: string;
  scheduledAt: string;
  maxMemberCount: number;
}

type BaseAppointmentRequest = number;

// ---- API Request/Response Types ----

interface CreateAppointmentRequest extends BaseAppointmentData {
  title: string;
  maxMemberCount: number;
  scheduledAt: string;
  image?: File | string;
}

// 약속 상세 조회 응답
interface GetAppointmentResponse extends BaseAppointmentData {
  id: number;
  currentMemberCount: number;
  creatorId: number;
  image?: string;
  isJoined: boolean;
}

export type {
  BaseAppointmentData,
  BaseAppointmentRequest,
  CreateAppointmentRequest,
  GetAppointmentResponse,
};
