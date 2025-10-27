import { create } from "zustand";

interface ModalState {
  modalOptions: ModalOptions | null;
  alertModal: (options: ModalOptions) => void;
  removeModalOptions: () => void;
}

interface ModalOptions {
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
  alertModal: (options: ModalOptions) => set({ modalOptions: options }),
  removeModalOptions: () => set({ modalOptions: null }),
}));

export { useModalStore };
