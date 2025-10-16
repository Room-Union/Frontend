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
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content
          className={cn(
            "tb:gap-[34px] tb:p-10 mo:gap-6 mo:p-6 tb:rounded-[36px] mo:rounded-3xl fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col bg-white p-10"
          )}
        >
          <VisuallyHidden>
            <Dialog.Title>{modalOptions?.message}</Dialog.Title>
            <Dialog.Description>{modalOptions?.description}</Dialog.Description>
          </VisuallyHidden>
          <div className="mo:min-w-74 mo:gap-2 tb:gap-5 tb:min-w-120 flex flex-col">
            {/* //닫기 버튼 영역 */}
            <div className="flex justify-end">
              <Dialog.Close asChild>
                <button
                  className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-slate-600 hover:text-slate-800 focus:outline-none"
                  aria-label="모달 닫기"
                >
                  <Delete className="size-6" />
                </button>
              </Dialog.Close>
            </div>

            {/* //메시지 영역 */}
            <div className="tb:typo-title-sm-semibold mo:text-base mo:leading-6 mo:font-semibold text-center">
              {modalOptions?.message}
            </div>
          </div>

          {/* //버튼 영역 */}
          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              size="md"
              className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
              onClick={() => {
                modalOptions?.onCancel?.();
                removeModalOptions();
              }}
            >
              <div>{modalOptions?.cancelText ?? "취소"}</div>
            </Button>
            <Button
              variant="primary"
              size="md"
              className="tb:typo-ui-xl-semibold tb:py-4 tb:px-[30px] tb:rounded-2xl tb:w-full tb:max-w-[474px] tb:h-[60px]"
              onClick={() => {
                modalOptions?.onConfirm?.();
                removeModalOptions();
              }}
            >
              <div>{modalOptions?.confirmText ?? "확인"}</div>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AlertModal;
