import type { ModalOptions } from "@/store/modal-store";

export const AUTH_MODAL_MESSAGES = {
  LOGIN_REQUIRED: {
    message: "로그인이 필요한 서비스입니다.",
    confirmText: "로그인",
    cancelText: "취소",
  },
} as const satisfies Record<string, ModalOptions>;

export const GATHERING_MODAL_MESSAGES = {
  DELETE: {
    message: "모임을 삭제하시겠습니까?",
    subMessage: "삭제 후 복구가 불가능합니다.",
    confirmText: "삭제",
    cancelText: "취소",
  },
  LEAVE: {
    message: "모임을 탈퇴하시겠습니까?",
    confirmText: "탈퇴",
    cancelText: "취소",
  },
} as const satisfies Record<string, ModalOptions>;

export const APPOINTMENT_MODAL_MESSAGES = {
  DELETE: {
    message: "모임 약속을 삭제하시겠습니까?",
    subMessage: "삭제 후 복구가 불가능합니다.",
    confirmText: "삭제",
    cancelText: "취소",
  },
  LEAVE: {
    message: "약속 참여를 취소하시겠습니까?",
  },
  JOIN: {
    message: "약속에 참여하시겠습니까?",
    confirmText: "참여",
    cancelText: "취소",
  },
} as const satisfies Record<string, ModalOptions>;
