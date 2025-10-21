import { create } from "zustand";

type ToastType = "success" | "error" | "normal";

interface ToastOption {
  id?: string;
  type: ToastType;
  message: string;
}

interface ToastState {
  toastOptions: ToastOption[];
  toast: (options: Omit<ToastOption, "id">) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toastOptions: [],
  toast: (options: Omit<ToastOption, "id">) =>
    set((state) => ({
      toastOptions: [
        ...state.toastOptions,
        { ...options, id: crypto.randomUUID() },
      ],
    })),
  removeToast: (id: string) =>
    set((state) => ({
      toastOptions: state.toastOptions.filter((toast) => toast.id !== id),
    })),
}));

export { useToastStore };
