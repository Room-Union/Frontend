import { create } from "zustand";

type ToastType = "success" | "error" | "normal";

/**
 * ToastOption
 * @property id - 토스트 고유 id
 * @property type - 토스트 타입 (success, error, normal)
 * @property message - 토스트 메시지
 * @property duration - 토스트 지속 시간 (default: 2000ms)
 */
interface ToastOption {
  id: string;
  type: ToastType;
  message: string;
  subMessage?: string;
  duration?: number;
}

interface ToastState {
  toastOptions: ToastOption[];
  toast: (toast: {
    type?: ToastType;
    message: string;
    subMessage?: string;
    duration?: number;
  }) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toastOptions: [],
  toast: ({ message, subMessage, type = "normal", duration = 2000 }) =>
    set((state) => ({
      toastOptions: [
        ...state.toastOptions,
        { message, subMessage, type, id: crypto.randomUUID(), duration },
      ],
    })),
  removeToast: (id: string) =>
    set((state) => ({
      toastOptions: state.toastOptions.filter((toast) => toast.id !== id),
    })),
}));

export { useToastStore };
