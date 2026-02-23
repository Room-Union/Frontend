import { ErrorField, ErrorToast } from "@/types/error";
import { SchemaType } from "@/types/schema";

const GLOBAL_ERROR_MESSAGES = {
  INVALID_INPUT_VALUE: {
    defaultType: "toast" as const,
    message: "잘못 입력되었습니다.",
    subMessage: "다시 시도해주세요.",
  },
  INTERNAL_SERVER_ERROR: {
    defaultType: "toast" as const,
    message: "서버 오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },
} satisfies Record<string, ErrorToast | ErrorField<SchemaType>>;

const AUTH_ERROR_MESSAGES = {
  ALREADY_REGISTERED_NICKNAME: {
    defaultType: "field" as const,
    field: "nickname",
    message: "이미 가입된 닉네임입니다.",
  },
  ALREADY_REGISTERED_EMAIL: {
    defaultType: "toast" as const,
    message: "이미 가입된 이메일입니다.",
  },
  EXPIRED_CODE: {
    defaultType: "field" as const,
    field: "verificationCode",
    message: "만료된 인증코드입니다.",
  },
  INVALID_CODE: {
    defaultType: "field" as const,
    field: "verificationCode",
    message: "인증 코드를 확인해주세요.",
  },
  EMAIL_VALIDATION_NOT_FOUND: {
    defaultType: "field" as const,
    field: "verificationCode",
    message: "해당 이메일 인증 내역을 찾을 수 없습니다.",
  },
  ALREADY_VERIFIED_EMAIL: {
    defaultType: "field" as const,
    field: "verificationCode",
    message: "이미 인증된 이메일입니다.",
  },
  INVALID_REFRESH_TOKEN: {
    defaultType: "toast" as const,
    message: "세션이 만료되었습니다.",
    subMessage: "다시 로그인해주세요.",
  },
  EXPIRED_REFRESH_TOKEN: {
    defaultType: "toast" as const,
    message: "세션이 만료되었습니다.",
    subMessage: "다시 로그인해주세요.",
  },
  REFRESH_TOKEN_NOT_FOUND: {
    defaultType: "toast" as const,
    message: "서버 오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },
} satisfies Record<string, ErrorToast | ErrorField<SchemaType>>;

export const GATHERING_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: {
    defaultType: "toast" as const,
    message: "서버 오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },
  DUPLICATE_MEETING_NAME: {
    defaultType: "toast" as const,
    message: "동일한 이름의 모임이 이미 존재합니다.",
  },
  MAX_COUNT_LESS_THAN_CURRENT: {
    defaultType: "field" as const,
    field: "maxMemberCount",
    message: "최대 인원 수는 현재 인원 수보다 작을 수 없습니다.",
  },
  APPOINTMENT_NOT_FOUND: {
    defaultType: "toast" as const,
    message: "약속을 찾을 수 없습니다.",
  },
  MEETING_NOT_FOUND: {
    defaultType: "toast" as const,
    message: "모임을 찾을 수 없습니다.",
  },
} satisfies Record<string, ErrorToast | ErrorField<SchemaType>>;

export const ERROR_MESSAGES = {
  ...AUTH_ERROR_MESSAGES,
  ...GLOBAL_ERROR_MESSAGES,
  DEFAULT: {
    defaultType: "toast" as const,
    message: "오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },
} satisfies Record<string, ErrorToast | ErrorField<SchemaType>>;
