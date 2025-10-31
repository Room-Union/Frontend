"use client";
import { Delete } from "@/assets/icons";
import { useModalStore } from "@/store/modal-store";
import { cn } from "@/utils/cn";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import Button from "../../button/button";

const AlertModal = () => {
  const { modalOptions, removeModalOptions } = useModalStore();
  return (
    <Dialog.Root
      open={!!modalOptions?.message}
      onOpenChange={removeModalOptions}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/70" />
        <Dialog.Content
          className={cn(
            "tb:p-10 mo:p-6 tb:rounded-[36px] mo:rounded-3xl tb:gap-7.5 mo:gap-4 tb:min-w-[560px] mo:min-w-[343px] fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white"
          )}
        >
          <VisuallyHidden>
            <Dialog.Title>{modalOptions?.message}</Dialog.Title>
            <Dialog.Description>{modalOptions?.description}</Dialog.Description>
          </VisuallyHidden>

          <div className="tb:gap-4 mo:gap-2 flex w-full flex-col">
            <div className="mo:py-1 tb:py-0 flex w-full items-center justify-end">
              <Delete
                className="text-gray-neutral-500 size-6 cursor-pointer"
                onClick={() => removeModalOptions()}
              />
            </div>
            <div className="mo:gap-2.5 tb:gap-3 flex w-full flex-col items-center justify-center">
              <span className="mo:typo-title-xs-semibold tb:typo-title-sm-semibold text-gray-neutral-800">
                {modalOptions?.message}
              </span>
              {modalOptions?.subMessage && (
                <span className="mo:typo-ui-md-medium tb:typo-ui-lg-medium text-gray-neutral-600">
                  {modalOptions?.subMessage}
                </span>
              )}
            </div>
          </div>
          <div className="mo:py-1.5 tb:py-0 flex w-full items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="md"
              className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px] mo:min-w-[139.5px] tb:min-w-[232px]"
              onClick={() => {
                modalOptions?.onCancel?.();
                removeModalOptions();
              }}
            >
              {modalOptions?.cancelText}
            </Button>
            <Button
              variant="primary"
              size="md"
              className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px] mo:min-w-[139.5px] tb:min-w-[232px]"
              onClick={() => {
                modalOptions?.onConfirm?.();
                removeModalOptions();
              }}
            >
              {modalOptions?.confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AlertModal;
