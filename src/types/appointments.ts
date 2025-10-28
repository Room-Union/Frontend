// ---- Base Types ----

// 약속 기본 데이터
interface BaseAppointmentData {
  title: string;
  scheduledAt: string;
  maxMemberCount: number;
}

type BaseAppointmentRequest = number;

// ---- Form Types ----

// 폼 타입
interface AppointmentFormInput {
  title: string;
  maxMemberCount: number;
  date: Date;
  time: { hour: number; minute: number };
  image?: File | string;
}

// API 전송용 타입
interface AppointmentFormData {
  title: string;
  maxMemberCount: number;
  scheduledAt: string;
  image?: File | string;
}

// ---- API Request/Response Types ----

interface CreateAppointmentRequest {
  meetingId: number;
  data: AppointmentFormData;
}

// 약속 상세 조회 응답
interface GetAppointmentResponse extends BaseAppointmentData {
  id: number;
  currentMemberCount: number;
  creatorId: number;
  imageUrl?: string;
  isJoined: boolean;
}

export type {
  AppointmentFormData,
  AppointmentFormInput,
  BaseAppointmentData,
  BaseAppointmentRequest,
  CreateAppointmentRequest,
  GetAppointmentResponse,
};
