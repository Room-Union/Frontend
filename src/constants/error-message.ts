import { ErrorType } from "@/types/error";
import { ERROR_CODE } from "./error-code";

const GLOBAL_ERROR_MESSAGES: Record<string, ErrorType> = {
  [ERROR_CODE.INVALID_INPUT_VALUE]: {
    defaultType: "toast" as const,
    message: "잘못 입력되었습니다.",
    subMessage: "다시 시도해주세요.",
  },
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    defaultType: "toast" as const,
    message: "서버 오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },

  DEFAULT: {
    defaultType: "toast" as const,
    message: "오류가 발생했습니다.",
    subMessage: "잠시 후 다시 시도해주세요.",
  },
};

export const AUTH_ERROR_MESSAGES: Record<string, ErrorType> = {
  [ERROR_CODE.ALREADY_REGISTERED_NICKNAME]: {
    defaultType: "field" as const,
    field: "nickname",
    message: "이미 가입된 닉네임입니다.",
  },
  [ERROR_CODE.ALREADY_REGISTERED_EMAIL]: {
    defaultType: "field" as const,
    field: "email",
    message: "이미 가입된 이메일입니다.",
  },
  ...GLOBAL_ERROR_MESSAGES,
};

export const ERROR_MESSAGES = {
  ...AUTH_ERROR_MESSAGES,
};
