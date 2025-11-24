import { ToastParams } from "@/store/toast-store";

export const GATHERING_SUCCESS_MESSAGES = {
  CREATE: { type: "success", message: "모임이 생성되었어요!" },
  UPDATE: { type: "normal", message: "모임을 수정했어요!" },
  DELETE: { type: "normal", message: "모임을 삭제했어요!" },
  JOIN: { type: "normal", message: "모임에 참여했어요!" },
  LEAVE: { type: "normal", message: "모임에서 탈퇴했어요!" },
} as const satisfies Record<string, ToastParams>;

export const APPOINTMENT_SUCCESS_MESSAGES = {
  CREATE: { type: "success", message: "약속이 생성되었어요!" },
  UPDATE: { type: "normal", message: "약속을 수정했어요!" },
  DELETE: { type: "normal", message: "약속을 삭제했어요!" },
  JOIN: { type: "normal", message: "약속에 참여했어요!" },
  LEAVE: { type: "normal", message: "약속 참여를 취소했어요!" },
} as const satisfies Record<string, ToastParams>;
