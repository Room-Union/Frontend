import { create } from "zustand";

interface ModalState {
  modalOptions: ModalOptions | null;
  alertModal: (options: ModalOptions) => void;
  removeModalOptions: () => void;
}

export interface ModalOptions {
  message: string;
  subMessage?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalOptions: null,
  alertModal: ({
    message,
    subMessage,
    description,
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
  }: ModalOptions) =>
    set({
      modalOptions: {
        message,
        subMessage,
        description,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
      },
    }),
  removeModalOptions: () => set({ modalOptions: null }),
}));

export { useModalStore };
